import Node from '../scripts/Node'

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
    currentLetter.isWord = true;
    currentLetter.wordSelectCount = 0
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

    let sortedWords = sortedSuggestions.map( wordObj =>{
      return wordObj.word
    })

    return sortedWords
  }

  availableWords(currentLetter, wordSoFar, suggestions) {
    let letterChildren = Object.keys(currentLetter.children);
    let usedCount = currentLetter.wordSelectCount

    if (currentLetter.isWord === true) {

      let countWordSoFar = {count: usedCount,  word: wordSoFar, }

      suggestions.push(countWordSoFar)
    }

    letterChildren.forEach( letter => {
      let nextLetter = currentLetter.children[letter];

      this.availableWords(nextLetter, wordSoFar + letter, suggestions);
    })
    return suggestions
  }

  addDictionary(dictionary) {
    dictionary.forEach( word => {
      this.insert(word)
    })
  }

  totalWords() {
    return this.count
  }

  sortSuggestion(arr) {
    for (let i = 1; i < arr.length; i++) {
      var numToBeCompared = arr[i].count;
      var swap = arr[i]

      for (var j = i - 1; j >= 0; j--) {
        if (numToBeCompared >= arr[j].count) {
          var sorted = arr[j]

          arr[j] = swap
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
    currentLetter.wordSelectCount++
  }
}
