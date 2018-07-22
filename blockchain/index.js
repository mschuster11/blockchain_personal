const Block = require('./block');

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
  }

  addBlock(data) {
    const block = Block.mineBlock(this.chain[this.chain.length-1], data);
    this.chain.push(block);

    return block;
  }

  isValid(chain) {
    if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      return false;
    }
    for (var i = 1; i < chain.length; i++) {
      const block = chain[i];
      const lastBlock = chain[i-1];
      if(block.lastHash !== lastBlock.hostHash || block.hostHash !== Block.blockHash(block)) {
        return false;
      }
    }
    return true;
  }

  replaceChain(newChain) {
    if(newChain.length <= this.chain.length) {
      console.error('New chain\'s length is less than or equal to the length of the host chain.');
      return;
    }
    if(!this.isValid(newChain)) {
      console.error('New chain is not a valid chain');
      return;
    }
    this.chain = newChain;
  }
}

module.exports = Blockchain;