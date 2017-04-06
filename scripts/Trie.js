import Node from '../scripts/Node'
const fs = require('fs')
const text = "/usr/share/dict/words"


export default class Trie {
  constructor() {
    this.root = new Node()
    this.count = 0
  }

  insert (userInput) {
    let currentLetter = this.root;

    userInput.split('').forEach( letter => {
      if (currentLetter.children[letter]) {
        return currentLetter = currentLetter.children[letter];
      }
      currentLetter.children[letter] = new Node(letter);
      currentLetter = currentLetter.children[letter];
    })
    this.count++;
    currentLetter.isWord = 1;
  }


  suggest(wordSoFar) {
    let currentLetter  = this.root;
    let letters        = wordSoFar.split('');
    let suggestions   = []

    letters.forEach( letter => {
      if (currentLetter.children[letter]) {
        currentLetter = currentLetter.children[letter];
        return;
      }
    })

    suggestions = this.availableWords(currentLetter, wordSoFar, suggestions);

    let sortedSuggestions = this.sortSuggestion(suggestions)

    let prioritizedSuggestions = sortedSuggestions.map((word) => {
      return word.split(":").pop()
    })

    return prioritizedSuggestions
  }



  availableWords(currentLetter, wordSoFar, suggestions) {
    let letterChildren = Object.keys(currentLetter.children);
    let usedCount = currentLetter.isWord

    if (currentLetter.isWord > 0) {
      let countWordSoFar = usedCount + ' :' + wordSoFar

      suggestions.push(countWordSoFar)
    }

    letterChildren.forEach( letter => {
      let nextLetter = currentLetter.children[letter];

      this.availableWords(nextLetter, wordSoFar + letter, suggestions);
    })
    return suggestions
  }


  addDictionary() {
    let dictionary = fs.readFileSync(text).toString().trim().split('\n')

    dictionary.forEach(word => {
      this.insert(word)
    })
  }


  totalWords() {
    return this.count
  }

  sortSuggestion(arr) {
    for (let i = 1; i < arr.length; i++) {
      var numToBeCompared = arr[i];

      for (var j = i - 1; j >= 0; j--) {
        if (numToBeCompared >= arr[j]) {
          var sorted = arr[j]

          arr[j] = numToBeCompared
          arr[j + 1] = sorted;
        } else {
          break;
        }
      }
    }
    return arr
  }


  select(wordSelected) {
    let currentLetter  = this.root;
    let letters        = wordSelected.split('');

    letters.forEach( letter => {
      if (currentLetter.children[letter]) {
        currentLetter = currentLetter.children[letter];
      }
      return currentLetter;
    })
    currentLetter.isWord > 0 ? currentLetter.isWord++ : null
  }
}
