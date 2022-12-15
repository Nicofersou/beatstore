const playerButton = document.querySelectorAll('.player-button'),
	audio = document.querySelectorAll('audio'),
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
				viewBox="0 0 1200 1200">
				<path
					id="path15778"
					d="M 600,0 C 268.62914,0 0,268.62914 0,600 c 0,331.37086 268.62914,600 600,600 331.37086,0 600,-268.62914 600,-600 C 1200,268.62914 931.37086,0 600,0 z m -269.16515,289.38 181.71397,0 0,621.24 -181.71397,0 0,-621.24 z m 356.61633,0 181.71399,0 0,621.24 -181.71399,0 0,-621.24 z" />
				</svg>
	  `;

for (let i = 0; i < playerButton.length; i++) {
	playerButton[i].addEventListener('click', function () {
		if (audio[i].paused) {
			audio[i].play();
			for (const beat of audio) {
				if (beat != audio[i]) {
					beat.pause();
				}
			}
			for (const icon of playerButton) {
				icon.innerHTML = playIcon;
			}
			playerButton[i].innerHTML = pauseIcon;
		} else {
			audio[i].pause();
			playerButton[i].innerHTML = playIcon;
		}
	});
}

const timeline = document.querySelectorAll('.slider');

for (let i = 0; i < audio.length; i++) {

	audio[i].onended = function() {
		playerButton[i].innerHTML = playIcon;
	};

	function changeTimelinePosition() {
		const percentagePosition = (100 * audio[i].currentTime) / audio[i].duration;
		timeline[i].style.backgroundSize = `${percentagePosition}% 100%`;
		timeline[i].value = percentagePosition;
	}

	audio[i].ontimeupdate = changeTimelinePosition;

	try {
		timeline[i].addEventListener('change', function() {
			const time = (timeline[i].value * audio[i].duration) / 100;
			audio[i].currentTime = time;
		});
	} catch{
	}

}

const soundButton = document.querySelectorAll('.sound-button'),
	soundIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#FFFFFF">
  <path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clip-rule="evenodd" />
</svg>`,
	muteIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#FFFFFF">
  <path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clip-rule="evenodd" />
</svg>`;

for (let i = 0; i < soundButton.length; i++) {
	soundButton[i].addEventListener('click', function() {
		audio[i].muted = !audio[i].muted;
		soundButton[i].innerHTML = audio[i].muted ? muteIcon[i] : soundIcon[i];
	});
}

//Volumen
const volumeInput = document.querySelectorAll('.volume-scroll');

for (let i = 0; i < volumeInput.length; i++) {
	volumeInput[i].value = 100;
	volumeInput[i].style.backgroundSize = `100% 100%`;
	volumeInput[i].style.display = 'none';

	audio[i].onvolumechange = changeVolumeProgress;

	function changeVolumeProgress() {
		volumeInput[i].style.backgroundSize = volumeInput[i].value;
		const percentagePosition = audio[i].volume * 100;
		volumeInput[i].style.backgroundSize = `${percentagePosition}% 100%`;
	}
	
	volumeInput[i].addEventListener('change', function() {
		audio[i].volume = volumeInput[i].value/100;
	});

}

//Display volume

const volumeBlock = document.querySelectorAll('.volume-controls');

for (let i=0; i < volumeBlock.length; i++) {
	volumeBlock[i].addEventListener('mouseover', function() {
		soundButton[i].style.display = 'none';
		volumeInput[i].style.display = "block";
	});
	
	volumeBlock[i].addEventListener('mouseout', function() {
		volumeInput[i].style.display = "none";
		soundButton[i].style.display = "block";
	});
}

const body = document.querySelector('body');
const see_more = document.querySelectorAll('.see_more');

for (const button of see_more) {
	button.addEventListener('click', function() {
		body.classList.remove("fade-in");
		body.classList.add("fade-out");
	});
}