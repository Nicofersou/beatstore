///Botones de la pestaña de compra

const buttons = document.querySelectorAll('.lease');
const normalLease = buttons[0];
const premiumLease = buttons[1];
const exclusiveLease = buttons[2];

normalLease.style.borderColor = "#ffb606";

for (let i = 0; i < buttons.length; i++) {
	buttons[i].addEventListener('click', function () {
		for (const button of buttons) {
			if (button != buttons[i]) {
				button.style.borderColor = "#000000";
			}
			buttons[i].style.borderColor = "#ffb606";
		}
	});
}