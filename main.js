const field = document.querySelector('.field');
const border = 10;
const maxHeight = field.offsetHeight;
const maxWidth = field.offsetWidth;

const score = document.querySelector('.score__value');

let scoreValue = 0;
let step = 50;
let canBeMoved;

function addScore(amount = 1) {
	scoreValue += amount;
	score.textContent = scoreValue;
	scoreValue >= 20 ? score.style.color = 'green' : score.style.color = 'black';
}

const cubes = [];

const createCube = () => {
	const cube = document.createElement('div');
	cube.classList.add('square');
	field.appendChild(cube);
	cubes.push(cube);
	canBeMoved = true;
};

createCube();

function startFalling() {
	cubes.forEach((cube, index) => {
		if (maxHeight - cube.offsetTop <= cube.offsetHeight + step + border) {
			cube.style.top = `${maxHeight - cube.offsetHeight - border}px`;
			addScore();
			canBeMoved = false;
			cubes.splice(index, 1);
			createCube();
			return;
		}
		cube.style.top = `${cube.offsetTop + step}px`;
		addScore();
	});
}

const goDown = setInterval(startFalling, 1000);


function moveLeft(elem) {
	if (elem.offsetLeft < step) {
		elem.style.left = `0px`;
		return;
	}
	elem.style.left = `${elem.offsetLeft - step}px`;
}

function moveRight(elem) {
	if (maxWidth - elem.offsetLeft <= elem.offsetWidth + step + border) {
		elem.style.left = `${maxWidth - elem.offsetWidth - border}px`;
		return;
	}
	elem.style.left = `${elem.offsetLeft + step}px`;
}

function moveDown(elem) {
	elem.style.top = `${maxHeight - elem.offsetHeight - border}px`;
	canBeMoved = false;
	addScore(10);
}

document.addEventListener('keydown', (event) => {
	if (!canBeMoved) return;

	cubes.forEach((cube) => {
		if (event.key === 'ArrowLeft') {
			moveLeft(cube);
		} else if (event.key === 'ArrowRight') {
			moveRight(cube);
		} else if (event.key === 'ArrowDown') {
			moveDown(cube);
		}
	});
});

