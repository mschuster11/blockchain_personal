const SHA256 = require('crypto-js/sha256');
const DIFFICULTY = 4;

class Block {
  constructor(timestamp, lastHash, hostHash, data, nouce) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hostHash = hostHash;
    this.data = data;
    this.nouce = nouce;
  }

  toString() {
    return `Block -
      Timestamp: ${this.timestamp}
      Last Hash: ${this.lastHash.substring(0,10)}
      Host Hash: ${this.hostHash.substring(0,10)}
      Nouce:     ${this.nouce}
      Data:      ${this.data}`;
  }

  static genesis() {
    return new this('Genesis time', '-------', 'f1r57-h45h', []);
  }

  static mineBlock(lastBlock, data) {
    const timestamp = Date.now();
    const lastHash = lastBlock.hostHash;
    let nouce = 0;
    let hostHash = Block.hash(timestamp, lastHash, data, nouce);    
    for (; hostHash.substring(0, DIFFICULTY) !== '0'.repeat(DIFFICULTY); nouce++) {
      hostHash = Block.hash(timestamp, lastHash, data, nouce);
    }
      
    return new this(timestamp, lastHash, hostHash, data, nouce);
  }

  static hash(timestamp, lastHash, data, nouce) {
    return SHA256(`${timestamp}${lastHash}${data}${nouce}`).toString();
  }

  static blockHash(block) {
    const { timestamp, lastHash, data, nouce } = block;
    return Block.hash(timestamp, lastHash, data, nouce);
  }
}

module.exports = Block; 