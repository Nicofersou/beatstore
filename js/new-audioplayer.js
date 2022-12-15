const playButton = document.querySelector('.play-button'),
	audio = document.querySelector('audio'),
	playIcon = `
		<svg
			xmlns:dc="http://purl.org/dc/elements/1.1/"
			xmlns:cc="http://creativecommons.org/ns#"
			xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
			xmlns:svg="http://www.w3.org/2000/svg"
			xmlns="http://www.w3.org/2000/svg"
			id="play-icon"
			version="1.1"
			height="50"
			width="50"
			viewBox="0 0 1200 1200"
			fill="#FFFFFF">
			<path
				d="M 600,1200 C 268.65,1200 0,931.35 0,600 0,268.65 268.65,0 600,0 c 331.35,0 600,268.65 600,600 0,331.35 -268.65,600 -600,600 z M 450,300.45 450,899.55 900,600 450,300.45 z"
				id="path16995" />
		</svg>
	  `,
	pauseIcon = `
		<svg
				xmlns:dc="http://purl.org/dc/elements/1.1/"
				xmlns:cc="http://creativecommons.org/ns#"
				xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
				xmlns:svg="http://www.w3.org/2000/svg"
				xmlns="http://www.w3.org/2000/svg"
				id="pause-icon"
				version="1.1"
				height="50"
				width="50"
				viewBox="0 0 1200 1200"
				fill="#FFFFFF">
				<path
					id="path15778"
					d="M 600,0 C 268.62914,0 0,268.62914 0,600 c 0,331.37086 268.62914,600 600,600 331.37086,0 600,-268.62914 600,-600 C 1200,268.62914 931.37086,0 600,0 z m -269.16515,289.38 181.71397,0 0,621.24 -181.71397,0 0,-621.24 z m 356.61633,0 181.71399,0 0,621.24 -181.71399,0 0,-621.24 z" />
				</svg>
	  `;

//Alternar boton de play y pausa, y parar y reanudar audio
playButton.addEventListener('click', function () {
	if (audio.paused) {
		audio.play();
		playButton.innerHTML = pauseIcon;
	} else {
		audio.pause();
		playButton.innerHTML = playIcon;
	}
});

const timeline = document.querySelector('.slider');

audio.onended = function () {
	playButton.innerHTML = playIcon;
};

//Cambia la posicion del boton del sonido
function changetimelinePosition() {

	const percentagePosition = (100 * audio.currentTime) / audio.duration;
	timeline.style.backgroundSize = `${percentagePosition}% 100%`;
	timeline.value = percentagePosition * 10;
}

audio.ontimeupdate = changetimelinePosition;

try {
	timeline.addEventListener('change', function () {
		const time = (timeline.value * audio.duration) / 100;
		audio.currentTime = time / 10;
	});
} catch {
}

try {
	timeline.addEventListener('input', function () {
		timeline.style.backgroundSize = `${timeline.value/10}% 100%`;
		detailsAudio.ontimeupdate = null;
	});
} catch {
}

//Dejar de actualizar el boton del sonido cuando el usuario mantiene clicado
// en otra parte del boton del sonido, y volver a actualizarlo cuando el usuario suelta el click
try {
	timeline.addEventListener('mousedown', function () {
		audio.ontimeupdate = null;
	});
} catch {
}

try {
	timeline.addEventListener('mouseup', function () {
		audio.ontimeupdate = changetimelinePosition;
	});
} catch {
}

let forward = document.querySelector('.forward-button');
forward.addEventListener('click', function () {
	const beatName = document.querySelector('.player-beat-name > h3');
	for (let i = 0; i < window.beats.length; i++) {
		if (window.beats[i].includes(beatName.innerHTML)) {
			let file;
			if (i + 1 === window.beats.length) {
				file = window.beats[0];
				beatName.innerHTML = window.beatNames[0];
			} else {
				file = window.beats[i + 1];
				beatName.innerHTML = window.beatNames[i + 1];
			}
			
			let xhr = new XMLHttpRequest();
			xhr.open('GET', file);
			xhr.responseType = 'arraybuffer';
	  
			xhr.onload = (e) => {
			  let blob = new Blob([xhr.response]);
			  let url = URL.createObjectURL(blob);
			  audio.src = url
			  audio.play();
			}
	  
			xhr.send();

			audio.play();
			playButton.innerHTML = pauseIcon;
			break;
		}
	}
});

let backward = document.querySelector('.backwards-button');
backward.addEventListener('click', function () {
	const beatName = document.querySelector('.player-beat-name > h3');
	for (let i = 0; i < window.beats.length; i++) {
		if (window.beats[i].includes(beatName.innerHTML)) {
			let file;
			if (i === 0) {
				file = window.beats[window.beats.length - 1];
				beatName.innerHTML = window.beatNames[window.beats.length - 1];
			} else {
				file = window.beats[i - 1];
				beatName.innerHTML = window.beatNames[i - 1];
			}

			let xhr = new XMLHttpRequest();
			xhr.open('GET', file);
			xhr.responseType = 'arraybuffer';
	  
			xhr.onload = (e) => {
			  let blob = new Blob([xhr.response]);
			  let url = URL.createObjectURL(blob);
			  audio.src = url
			  audio.play();
			}
	  
			xhr.send();

			audio.play();
			playButton.innerHTML = pauseIcon;
			break;
		}
	}
});

//Controlador de volumen

const volumeInput = document.querySelector('.volume-slider');

volumeInput.value = 50;
volumeInput.style.backgroundSize = `100% 100%`;

audio.onvolumechange = changeVolumeProgress;

function changeVolumeProgress() {
	volumeInput.style.backgroundSize = volumeInput.value;
	const percentagePosition = audio.volume * 100;
	volumeInput.style.backgroundSize = `${percentagePosition}% 100%`;
}

volumeInput.addEventListener('change', function () {
	audio.volume = volumeInput.value / 100;
});

volumeInput.addEventListener('input', function() {
	audio.volume = volumeInput.value / 100;
});