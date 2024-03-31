# hang-man-terminal-game

I asked ChatGPT how to find if array of objects contains object with a specific value for a property?
It asnwered with the following:

"const hasObjectWithPropertyValue = arrayOfObjects.some(obj => obj.name === targetValue);
In this example, arrayOfObjects.some() iterates through each object in the array and returns true if at least one object satisfies the condition (obj.name === targetValue), otherwise it returns false."

I only need to check if the condition is true, so I used it in the following way:

if (wordToGetArray.some(x => x.used === false)){
    // if there is some word that hasn't been used yet, play again
    // otherwise end the game
}