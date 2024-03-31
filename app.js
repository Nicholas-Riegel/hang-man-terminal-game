const prompt = require("prompt-sync")()

const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const wordsArray = [
	{
		word: 'elephant',
	},
	{
		word: 'sunshine',
	},
	{
		word: 'rainbow',
	},
	{
		word: 'bicycle',
	},
	{
		word: 'guitar',
	},
	{
		word: 'chocolate',
	},
	{
		word: 'adventure',
	},
	{
		word: 'butterfly',
	},
	{
		word: 'castle',
	},
	{
		word: 'waterfall',
	}
]

let wordToGet = ''
let wordToGetArray = []
let wrongAnswersArray = []
const numWrongAnswers = 5

player = {
	name: '',
	wins: 0,
	losses: 0
}

// to check how end of game works:
// for(let i = 0; i < wordsArray.length - 1; i++){
// 	wordsArray[i].used = true;
// }

const exitGame = () => {
	process.exit();
}

const display = () => {
	console.clear()
	let numPlayed = 0
	for (let i = 0; i < wordsArray.length; i++){
		if (wordsArray[i].used === true){
			numPlayed++
		}
	}
	console.log(`Player: ${player.name}`);
	console.log(`Games played: ${numPlayed}/${wordsArray.length}`);
	console.log(`Wins: ${player.wins}. Losses: ${player.losses}`);
	console.log(`Word to get: ${wordToGetArray}`);
	console.log(`Wrong answers: ${wrongAnswersArray}`);	
}

const setWordToGetArray = () => {
	if (wordsArray.some(x => x.used === false)){
		for(let i = 0; i < wordsArray.length; i++){
			if (wordsArray[i].used === false){
				wordToGet = wordsArray[i]['word']
				break;
			}
		}
		for(let i = 0; i < wordToGet.length; i++){
			wordToGetArray.push('_')
		}
	} else {
		console.log('END OF GAME!');
		exitGame()
	}
}

const setWrongAnswersArray = (num) => {
	for(let i = 0; i < num; i++){
		wrongAnswersArray.push('_')
	}
}


const beginGame = () => {
	
	console.clear()

	wordsArray.forEach(x => {
		x.used = false
	})
	
	console.log("Welcome to this Hangman game. Let's begin.")
	
	const username = prompt("Please type your name (or type 'exit' at anytime to exit the game): ")
	
	if (username === 'exit') exitGame()
	
	player.name = username;
	
	
	setWordToGetArray()

	setWrongAnswersArray(numWrongAnswers)
	
	chooseLetter()
}

const chooseLetter = () => {
  
	display()

  	let answer = ''
	
	while (!alphabet.includes(answer)){
		if(answer === 'exit') exitGame();
		answer = prompt(`Please type a letter (or type 'exit' to exit the game): `);
	}
	
	if (wordToGet.includes(answer)){
		correctAnswer(answer)
	} else {
		wrongAnswer(answer)
	}
}

const correctAnswer = (answer) => {
	for(let i = 0; i < wordToGet.length; i++){
		if (answer === wordToGet[i]){
			wordToGetArray.splice(i, 1, answer)
		}
	}
	if (!wordToGetArray.includes('_')){
		wordsArray.forEach(x => {
			if (x.word === wordToGet){
				x.used = true
			}
		})
		youWin()
	} else {
		chooseLetter()
	}
}

const wrongAnswer = (answer) => {
	for (let i = 0; i < wrongAnswersArray.length; i++){
		if (wrongAnswersArray[i] === '_'){
			wrongAnswersArray.splice(i, 1, answer)
			break;
		}
	}
	if (!wrongAnswersArray.includes('_')){
		wordsArray.forEach(x => {
			if (x.word === wordToGet){
				x.used = true
			}
		})
		youLose()
	} else {
		chooseLetter()
	}
}

const youWin = () => {
	
	player.wins++

	if (wordsArray.some(x => x.used === false)){	
		display()
		console.log(`Congratulations! You win!`);
		console.log('Would you like to play again?');
	} else {
		console.clear()
		display()
		console.log('END OF GAME!');
		exitGame()
	}
	
	let answer = ''
	
	while (answer !== 'yes' && answer !== 'no'){
		if(answer === 'exit') exitGame();
		answer = prompt(`Please type 'yes' or 'no' (or type 'exit' to exit the game): `);
	}
	
	if (answer === 'yes'){
		wordToGetArray = []
		wrongAnswersArray = []
		setWordToGetArray()
		setWrongAnswersArray(numWrongAnswers)
		chooseLetter()
	} else {
		exitGame()
	}
}

const youLose = () => {
	
	player.losses++
	
	if (wordsArray.some(x => x.used === false)){	
		display()
		console.log(`Sorry. You lost that game.`);
		console.log('Would you like to play again?');
	} else {
		console.clear()
		display()
		console.log('END OF GAME!');
		exitGame()
	}
	
	let answer = ''
	
	while (answer !== 'yes' && answer !== 'no'){
		if(answer === 'exit') exitGame();
		answer = prompt(`Please type 'yes' or 'no' (or type 'exit' to exit the game): `);
	}
	
	if (answer === 'yes'){
		wordToGetArray = []
		wrongAnswersArray = []
		setWordToGetArray()
		setWrongAnswersArray(numWrongAnswers)
		chooseLetter()
	} else {
		exitGame()
	}
}

beginGame();

