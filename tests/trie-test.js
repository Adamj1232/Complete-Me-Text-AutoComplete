import {assert} from "chai";
import Trie from '../scripts/Trie';
import Node from '../scripts/Node';
const fs = require('fs')
const text = "/usr/share/dict/words"
const dictionary = fs.readFileSync(text).toString().trim().split('\n')

require('locus');

describe('Trie functionality and tests', () => {
  let trie = new Trie;

  it('should be a constructor', ()=> {
    assert.isFunction(Trie)
  });

  it('list should have null root', () => {
    // console.log(trie.root)
    assert.deepEqual(trie.root, new Node());
  });

  it('should start with a completed word count of 0', ()=> {

    assert.equal(trie.count, false)
  });

  it('should have the isWord return false if it is not the end of the word', () => {
    trie.insert('battle');
  // eval(locus)

    trie.insert('bass')

    assert.equal(trie.count, 2);
  });

  it('should be able to find the first letter', () => {

    assert.property(trie.root.children, 'b');
  });


  it('should be able to split and find the last letter', () => {
    trie.insert('bat');

    assert.property(trie.root.children['b'].children['a'].children, 't');
  });

  it('should be able to split and find the last letter', () => {
    trie.insert('bam');

    assert.property(trie.root.children['b'].children['a'].children, 'm');
  });

  it('should have the isWord return true if it is not the end of the word', () => {
    trie.insert('bat');

    assert.equal(trie.root
      .children['b']
      .children['a']
      .children['t'].isWord, 1 );
  });

  it('should have the isWord return false if it is not the end of the word', () => {
    trie.insert('bait');


    assert.equal(trie.root
      .children['b']
      .children['a']
      .children['i'].isWord, false );
  });

  it('should have the isWord return false if it is not the end of the word', () => {
    trie.insert('bait');


    assert.equal(trie.root
      .children['b']
      .children['a']
      .children['i']
      .children['t'].isWord, true );
  });

  it('should be able to suggest words based on what is typed so far and what is available in the library', () => {
    let trie = new Trie;

    trie.insert('wait');
    trie.insert('want');
    trie.insert('waltz');
    trie.insert('bat');
    trie.insert('battle');
    trie.insert('bait');

    let suggest = trie.suggest('wa')
    // console.log(suggest)

    assert.deepEqual(suggest, ['waltz', 'want', 'wait'] );
  });

  it('should be able to suggest words based on what is typed so far and what is available in the library', () => {
    let trie = new Trie;

    trie.insert('wait');
    trie.insert('want');
    trie.insert('waltz');
    trie.insert('cat');
    trie.insert('calm');
    trie.insert('cope');

    let suggest = trie.suggest('ca')
    // console.log(suggest)

    assert.deepEqual(suggest, ['calm', 'cat'] );
  });

  it('should be able to poppulate the library with the computer dictionary', () => {
    let trie = new Trie;

    trie.addDictionary(dictionary)

    assert.equal(trie.count, 235886 );
  });

  it('should have a function that calculates the total word count', () => {
    let trie = new Trie;

    trie.insert('wait');
    trie.insert('want');
    trie.insert('waltz');
    trie.insert('cat');
    trie.insert('cattle');
    trie.insert('calm');
    trie.insert('cope');
    // console.log(JSON.stringify(trie, null, 4))

    assert.equal(trie.totalWords(), 7 );
  });

  it('should return suggestions ordered by how many times word has been selected in past', () => {
    let trie = new Trie;

    trie.insert('jam');
    trie.insert('jump');
    trie.insert('japan')
    trie.insert('jack');
    trie.insert('jazz');

    trie.select('jam');
    trie.select('jam');
    trie.select('jazz');
    trie.select('jack');
    trie.select('jazz');
    trie.select('jazz')
    trie.select('jack');


    let suggest = trie.suggest('ja')

    // console.log(JSON.stringify(trie, null, 4))

    assert.deepEqual(suggest, ['jazz', 'jack', 'jam', 'japan'] );
  });

  it('should return suggestions ordered by how many times word has been selected in past', () => {
    let trie = new Trie;

    trie.insert('jam');
    trie.insert('jazz');
    trie.insert('jack');
    trie.insert('want');
    trie.insert('watered');
    trie.insert('waltz');
    trie.insert('water');
    trie.insert('wasted');
    trie.insert('waste');
    trie.insert('water');
    trie.insert('cat');
    trie.insert('calm');

    trie.select('wasted');
    trie.select('wasted');
    trie.select('wasted');
    trie.select('wasted');
    trie.select('jam');
    trie.select('jam');
    trie.select('jazz');
    trie.select('jack');
    trie.select('wasted');
    trie.select('waste');
    trie.select('want');
    trie.select('waltz');
    trie.select('waltz');
    trie.select('water');
    trie.select('water');
    trie.select('water');
    trie.select('water');
    trie.select('cat');
    trie.select('calm');

    let suggest = trie.suggest('wa')

    // console.log(JSON.stringify(trie, null, 4))

    assert.deepEqual(suggest, ['wasted', 'water', 'waltz', 'waste', 'want', 'watered'] );
  });

  it('should be able to poppulate the library with the computer dictionary', () => {
    let trie = new Trie;

    trie.addDictionary(dictionary)

    assert.equal(trie.count, 235886 );

    trie.select('jazzy');
    trie.select('jazzy');
    trie.select('jazzy');
    trie.select('jazz');
    trie.select('wasted');
    trie.select('wasted');
    trie.select('jam');
    trie.select('jam');
    trie.select('jazz');
    trie.select('jazz');
    trie.select('jazz');


    let suggest = trie.suggest('jazz')

    assert.deepEqual(suggest, ['jazz', 'jazzy', "jazziness", "jazzily", "jazzer"] );
  });
})
