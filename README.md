# hang-man-terminal-game

In this game Hangman, the user is presented with the number of letters in a word that they have to guess the letters to. The number of letters in the word is indicated by the number of underscores, e.g. `_,_,_,_,_,_,_`. The user has a certain number of chances to guess the right letter. The number of chances is also indicated with underscores. If the user gets a letter right, the letter is placed in the right place in the word. If the user gets a letter wrong, it is added to the wrong letters. I have about ten words to play with, and a score keeper keeps track of how many words the player got right and how many they didn't get. Players can exit the game at any time by typing 'exit' - all lower case. Enjoy!

1. I began with a display function. It begins by clearing the console. Then it checks to see how many games or words have already be used, so the player can see how far along they are in the game. Then it displays the player's name, the number of games (words) they have played out of the total number of games played. It also shows their wins and losses. Then it shows the word to get. Initially it just shows spaces for each letter. Then it shows the wrong answers. Initially this is also just a list of dashes.

```
// This function displays the game
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
```
2. Then I created the setWordToGetArray function. I asked ChatGPT how to find if array of objects contains object with a specific value for a property because I want to check of there is a word in the wordsArray that hasn't been used yet. It asnwered with the following:

```
const hasObjectWithPropertyValue = arrayOfObjects.some(obj => obj.name === targetValue);
In this example, arrayOfObjects.some() iterates through each object in the array and returns true if at least one object satisfies the condition (obj.name === targetValue), otherwise it returns false.
```

I only need to check if the condition is true, so I used it in the following way:

```
if (wordToGetArray.some(x => x.used === false)){
    // if there is some word that hasn't been used yet, play again
    // otherwise end the game
}
```
This first looks in the wordsArray, and checks if there are any words that haven't been used yet. If there are it takes the first one and sets it as the wordToGet. After the first one it breaks out of the for loop. Then I use another for loop to push the right number of underscores into the wordToGetArray. This will be used to show the player how many letters there are in the word. If all the words have been used, I log "END OF GAME!" and exit the game.

```
// This function sets the wordToGetArray
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
```
3. Next we also need to set the wrongAnswersArray, to keep track of the wrong letters the user has guessed. This function takes a number (set with the numWrongAnswers constant) and creates an array with that number of dashes to let the play know what wrong answers they have chosen and how many more wrong answers they have left.  

```
// This function sets the wrongAnswerArray
const setWrongAnswersArray = (num) => {
	for(let i = 0; i < num; i++){
		wrongAnswersArray.push('_')
	}
}
```

4. Then I begin the game. I clear the console. I make sure all the words in the array have a 'used' property set to false. I log a wecome message. I ask for the users name and tell them they can exit the game by typing 'exit' at any time. I set the players name. I set the WordToGetArray, the WrongAnswersArray, and call the chooseLetter function. 

```
// This function begins the game
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
```
5. Then created the chooseLetter function. This begins by calling the display() function. It then declares and assigns a variable. I use a while loop to make sure the user enters a letter of the alphabet. Or the user can type 'exit' to exit the game. Once we get the users answers we check if it is one of the letters of the wordToGet. If it is, I call the correctAnswer function. If it is not, I call the wrongAnswer function.

```
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
```

6. The correctAsnwer function begins by looping through the letters of the wordToGet and splicing the letter in the same index in the wordToGetArray. If the wordToGetArray doesn't have anymore underscores it changes the word's 'used' property to 'true' and calls the youWin() function. Otherwise it calls the chooseLetter function to let the user continue guessing letters. 

```
// This funciton is called if the user gets a correct letter
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
```

7. The wrongAnswer function takes the users answer and splices it into the first index of the wrongAnswersArray that is an underscore. If there are no more underscores, the word's 'used' property is turned to 'true' and the youLose function is called. If there are more underscores, the player can continue to guess letters. 

```
// This function is called if user gets a wrong answer
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
```

8. The youWin function begins by incrementing the player's 'win' property. It then checks to see if there are other words to play. If there are, the display function is called and the user is asked if they want to keep on playing. If there are no more words to play, the console is cleared. the display function is called, the user is told that this is the end of the game and we exit the game. If there are more words to play and the user answers 'yes' then we set the wordToGetArray and the wrongAnswersArry to empty arrays, and then call setWordToGetArray(), setWrongAnswersArray(numWrongAnswers), and chooseLetter(), to play another word. If the user does not answer 'yes' then we exit the game. 

```
const youWin = () => {
	
	player.wins++

	if (wordsArray.some(x => x.used === false)){	
		display()
		console.log(`Congratulations! You win!`);
		console.log('Would you like to keep playing?');
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
```

9. The youLose function works in much the same way. First we increment the player's losses score. Then we check to see if there are more words to play. If there are, we ask if the player would like to continue playing. If there aren't we display the final score, indicate that we've reached the end of the game and exit the game. If there are more words to play and the user indicates that they want to continue playing, we set the arrays to empty arrays and call the same functions as in the youWin functions. 

```
// This function is called if the user loses
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
```