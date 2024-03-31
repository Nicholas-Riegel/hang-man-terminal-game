const prompt = require("prompt-sync")()

const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const wordsArray = [
	{
		word: 'elephant',
		used: false
	},
	{
		word: 'sunshine',
		used: false
	},
	{
		word: 'rainbow',
		used: false
	},
	{
		word: 'bicycle',
		used: false
	},
	{
		word: 'guitar',
		used: false
	},
	{
		word: 'chocolate',
		used: false
	},
	{
		word: 'adventure',
		used: false
	},
	{
		word: 'butterfly',
		used: false
	},
	{
		word: 'castle',
		used: false
	},
	{
		word: 'waterfall',
		used: false
	}
]

let wordToGet = ''
let wordToGetArray = []
let wrongAnswersArray = []

player = {
	name: ''
}

// for(let i = 0; i < wordsArray.length - 1; i++){
// 	wordsArray[i].used = true;
// }

const exitGame = () => {
	console.clear()
	process.exit();
}

const display = () => {
	console.clear()
	console.log(`Welcome ${player.name}!`);
	console.log(`Word to get: ${wordToGetArray}`);
	console.log(`Wrong answers: ${wrongAnswersArray}`);	
}

const findUnusedWord = () => {
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
		console.log('END OF GAME!');// this is not showing
		exitGame()
	}
}

const beginGame = () => {
	
	console.clear()
	
	console.log("Welcome to this Hangman game. Let's begin.")
	
	const username = prompt("Please type your name (or type 'exit' at anytime to exit the game): ")
	
	if (username === 'exit') exitGame()
	
	player.name = username;
	

	findUnusedWord()
	
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
	wrongAnswersArray.push(answer)
	chooseLetter()
}

const youWin = (params) => {
	
	if (wordsArray.some(x => x.used === false)){	
		display()
		console.log(`Congratulations! You win!`);
		console.log('Would you like to play again?');
	} else {
		console.clear()
		console.log('Congratulations. You win!');
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
		findUnusedWord()
		chooseLetter()
	} else {
		exitGame()
	}
}

beginGame();

