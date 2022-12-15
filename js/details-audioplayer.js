const detailsPlayerButton = document.querySelector('.details-player-button'),
	detailsAudio = document.querySelector('audio'),
	detailsdetailsPauseIcon = `
	<svg
	xmlns:dc="http://purl.org/dc/elements/1.1/"
	xmlns:cc="http://creativecommons.org/ns#"
	xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
	xmlns:svg="http://www.w3.org/2000/svg"
	xmlns="http://www.w3.org/2000/svg"
	id="play-icon"
	version="1.1"
	viewBox="0 0 1200 1200"
	fill="#FFFFFF">
	<path
		d="M 600,1200 C 268.65,1200 0,931.35 0,600 0,268.65 268.65,0 600,0 c 331.35,0 600,268.65 600,600 0,331.35 -268.65,600 -600,600 z M 450,300.45 450,899.55 900,600 450,300.45 z"
		id="path16995" />
</svg>
	  `,
	pauseIcon = `
	<svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" id="pause-icon" version="1.1" viewBox="0 0 1200 1200" fill="#FFFFFF">
	<path id="path15778" d="M 600,0 C 268.62914,0 0,268.62914 0,600 c 0,331.37086 268.62914,600 600,600 331.37086,0 600,-268.62914 600,-600 C 1200,268.62914 931.37086,0 600,0 z m -269.16515,289.38 181.71397,0 0,621.24 -181.71397,0 0,-621.24 z m 356.61633,0 181.71399,0 0,621.24 -181.71399,0 0,-621.24 z" />
</svg>
	  `;

detailsPlayerButton.addEventListener('click', function () {
	if (detailsAudio.paused) {
		detailsAudio.play();
		detailsPlayerButton.innerHTML = pauseIcon;
	} else {
		detailsAudio.pause();
		detailsPlayerButton.innerHTML = detailsdetailsPauseIcon;
	}
});

const detailsTimeline = document.querySelector('.details-timeline');

detailsAudio.onended = function () {
	detailsPlayerButton.innerHTML = detailsdetailsPauseIcon;
};

function changedetailsTimelinePosition() {
	const percentagePosition = (100 * detailsAudio.currentTime) / detailsAudio.duration;
	detailsTimeline.style.backgroundSize = `${percentagePosition}% 100%`;
	detailsTimeline.value = percentagePosition;
}

detailsAudio.ontimeupdate = changedetailsTimelinePosition;

try {
	detailsTimeline.addEventListener('change', function () {
		const time = (detailsTimeline.value * detailsAudio.duration) / 100;
		detailsAudio.currentTime = time;
	});
} catch {
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
	soundButton.addEventListener('click', function () {
		detailsAudio.muted = !detailsAudio.muted;
		soundButton.innerHTML = detailsAudio.muted ? muteIcon : soundIcon;
	});
}

//Volumen
const volumeInput = document.querySelector('.details-volume-scroll');

volumeInput.value = 100;
volumeInput.style.backgroundSize = `100% 100%`;
volumeInput.style.display = 'block';

detailsAudio.onvolumechange = changeVolumeProgress;

function changeVolumeProgress() {
	volumeInput.style.backgroundSize = volumeInput.value;
	const percentagePosition = detailsAudio.volume * 100;
	volumeInput.style.backgroundSize = `${percentagePosition}% 100%`;
}

volumeInput.addEventListener('change', function () {
	detailsAudio.volume = volumeInput.value / 100;
});

detailsPlayerButton.innerHTML = detailsdetailsPauseIcon;

try {
	detailsTimeline.addEventListener('change', function () {
		const time = (detailsTimeline.value * detailsAudio.duration) / 100;
		detailsAudio.currentTime = time;
	});
} catch {
}

try {
	detailsTimeline.addEventListener('input', function () {
		detailsTimeline.style.backgroundSize = `${detailsTimeline.value}% 100%`;
		detailsAudio.ontimeupdate = null;
	});
} catch {
}

try {
	detailsTimeline.addEventListener('mousedown', function () {
		detailsAudio.ontimeupdate = null;
	});
} catch {
}

try {
	detailsTimeline.addEventListener('mouseup', function () {
		detailsAudio.ontimeupdate = changedetailsTimelinePosition;
	});
} catch {
}

try {
	volumeInput.addEventListener('input', function () {
		volumeInput.style.backgroundSize = `${volumeInput.value}% 100%`; 
		detailsAudio.volume = volumeInput.value / 100;
	});
} catch {
}
