const a = document.querySelector('a');
const file = a.getAttribute("file");
a.removeAttribute("file");

a.style.visibility = "hidden";
a.style.display = "none";

const returnLink = document.querySelector("#return-main");
returnLink.style.visibility = "hidden";

const generating = document.querySelector("#generating");

let xhr = new XMLHttpRequest();
xhr.open('GET', file);
xhr.responseType = 'arraybuffer';

xhr.onload = (e) => {
	let blob = new Blob([xhr.response]);
	let url = URL.createObjectURL(blob);
	a.href = url
	setTimeout(() => {
		generating.style.display = "none";
		a.style.display = "block";
		a.style.visibility = "visible"
	}, 2000);
	setTimeout(() => {
		returnLink.style.visibility = "visible"
	}, 3000);
}

xhr.send();

