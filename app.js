const prompt = require("prompt-sync")()

const words = ["radar"]
const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

player = {
  name: ''
}

const exitGame = () => {
	process.exit();
}

const decision = (letter) => {

	let answer = ''
	
	while (!alphabet.includes(answer)){
		if(answer === 'exit') exitGame();
		answer = prompt(`Please type a letter (or type 'exit' to exit the game): `);
	}
	
	console.clear()
	
	if (answer === letter){
		console.log('this letter is in the word')
	} else if (answer === option2){
		console.log('this letter is not in the word')
	} else {
		exitGame();
	}
}

const beginGame = () => {

	console.clear()
  
	console.log("Welcome to this Hangman game. Let's begin.")
	
	const username = prompt("Please type your name (or type 'exit' at anytime to exit the game): ")
	
	if (username === 'exit') exitGame()
	
	player.name = username;
	
	console.clear()
	
	console.log(player)

	console.log(`Welcome, ${username}!`)
	
  listWord()
}

const listWord = () => {
  const spaces = []
  for(let i = 0; i < words[0].length; i++){
    spaces.push('_')
  }
  console.log(...spaces)

  chooseLetter()
}

const chooseLetter = () => {
  
  let answer = ''
	
	while (!alphabet.includes(answer)){
		if(answer === 'exit') exitGame();
		answer = prompt(`Please type a letter (or type 'exit' to exit the game): `);
	}
	
  console.log('you chose: ', answer)
	// console.clear()
	
	// if (answer === letter){
	// 	console.log('this letter is in the word')
	// } else if (answer === option2){
	// 	console.log('this letter is not in the word')
	// } else {
	// 	exitGame();
	// }
}


beginGame();