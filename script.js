let letters = [];
let correctAnswerObject = { hiragana_letter: 'before' };
let previousAnswer = { hiragana_letter: 'hola' };

fetch('./letters.json').then((data) => data.json()).then((dataJSON) => {
	letters = dataJSON;
	renderRandomLetter();
});

const getRandomIndex = () => {
	return Math.floor(Math.random() * letters.length);
};

const renderRandomLetter = () => {
	changePreviousAnswer();
	randomIndex = getRandomIndex();
	if (checkForPreviousAnswer(letters[randomIndex].hiragana_letter)) {
		correctAnswerObject = letters[randomIndex];
		document.getElementById('letter').innerText = correctAnswerObject.hiragana_letter;
	} else {
		renderRandomLetter();
	}
};

const renderAnswer = (answer) => {
	const feedbackAnswer = document.getElementById('feedbackAnswer');
	answer ? (feedbackAnswer.innerText = 'Correcto!') : (feedbackAnswer.innerText = 'Incorrecto :(');
	nextQuestion();
};

const checkForAnswer = () => {
	const inputAnswer = document.getElementById('input').value;
	const correctAnswer = correctAnswerObject.latin_letter;
	inputAnswer === correctAnswer ? renderAnswer(true) : renderAnswer();
};

const cleanInputs = () => {
	document.getElementById('input').value = '';
	document.getElementById('feedbackAnswer').innerText = '';
};

const nextQuestion = () => {
	setTimeout(() => {
		renderRandomLetter();
		cleanInputs();
	}, 1000);
};

const checkForPreviousAnswer = (hiraganaLetter) => {
	if (hiraganaLetter === previousAnswer) {
		return false;
	}
	return true;
};

const changePreviousAnswer = () => {
	previousAnswer = correctAnswerObject.hiragana_letter;
};

document.getElementById('inputButton').addEventListener('click', () => checkForAnswer());
