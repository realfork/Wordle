import { words } from "./wordList.js"
import * as rl from "readline-sync"
import clc from "cli-color"
import wordlist from "wordlist-english"

const word = words[Math.floor(Math.random() * words.length)].toLowerCase().split("")

for (let i = 1; i < 7;) {
    let input = rl.question((i == 1 ? clc.green("Wordle") : "") + clc.yellow(" > ")).toLowerCase()
    if (input.length != 5) {
        console.log(clc.red("Your guess must be 5 letters long!"))
        i--
    } else if (!wordlist["english"].includes(input)) {
        console.log(clc.red("Invalid word! Try again!"))
        i--
    } else input.split("").forEach((letter, index) => {
        if (index == 0) letter = letter.toUpperCase()
        if (word.includes(letter.toLowerCase())) {
            if (letter.toLowerCase() == word[index]) process.stdout.write(clc.green(letter))
            else if (word.filter(l => l == letter.toLowerCase()).length <= input.split("").filter(l => l == letter.toLowerCase()).length) process.stdout.write(clc.yellow(letter))
            else process.stdout.write(letter)
        }
        else process.stdout.write(letter)
    })

    if (input.split("").toString() == word.toString()) {
        console.log("\nCorrect! The word was: " + clc.green(input.charAt(0).toUpperCase() + input.slice(1)))
        break
    }
    i++
    if (i == 7) console.log("\nYou ran out of guesses. The word was: " + clc.green(word.join("").charAt(0).toUpperCase() + word.join("").slice(1)))
}