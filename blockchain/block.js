const SHA256 = require('crypto-js/sha256');

class Block {
  constructor(timestamp, lastHash, hostHash, data) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hostHash = hostHash;
    this.data = data;
  }

  toString() {
    return `Block -
      Timestamp: ${this.timestamp}
      Last Hash: ${this.lastHash.substring(0,10)}
      Host Hash: ${this.hostHash.substring(0,10)}
      Data:      ${this.data}`;
  }

  static genesis() {
    return new this('Genesis time', '-------', 'f1r57-h45h', []);
  }

  static mineBlock(lastBlock, data) {
    const timestamp = Date.now();
    const lastHash = lastBlock.hostHash;
    const hostHash = Block.hash(timestamp, lastHash, data);

    return new this(timestamp, lastHash, hostHash, data);
  }

  static hash(timestamp, lastHash, data) {
    return SHA256(`${timestamp}${lastHash}${data}`).toString();
  }

  static blockHash(block) {
    const { timestamp, lastHash, data } = block;
    return Block.hash(timestamp, lastHash, data);
  }
}

module.exports = Block; 