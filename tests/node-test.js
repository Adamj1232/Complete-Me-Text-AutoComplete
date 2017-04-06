import {assert} from "chai";
import Node from '../scripts/Node';

describe('Node functionality and tests', () => {
  let node = new Node('b', {});

  it('should be a constructor', ()=> {

    assert.isFunction(Node)
  });

  it('should take in a letter', ()=> {

    assert.equal(node.data, 'b')
  });

  it('should take in a word', ()=> {
    let node2 = new Node('battle')

    assert.equal(node2.data, 'battle')
  });

  it('should take in a children as an object', ()=> {

    assert.deepEqual(node.children, {})
  });

  it('should start with the isWord property as 0', ()=> {

    assert.deepEqual(node.isWord, 0)
  });
})
