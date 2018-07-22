const Blockchain = require('./index');
const Block = require('./block');

describe('Blockchain', () => {
  let bc, bc2;
  beforeEach(() => {
    bc = new Blockchain();
    bc2 = new Blockchain();
  });

  it('should start with a genesis block', () => {
    expect(bc.chain[0]).toEqual(Block.genesis());
  });
  it('should add a new block to the chain', () => {
    const data = 'foo';
    bc.addBlock(data);
    expect(bc.chain[bc.chain.length-1].data).toEqual(data);
  });
  it('should validate a valid chain', () => {
    bc2.addBlock('foo');
    expect(bc.isValid(bc2.chain)).toBe(true);
  });
  it('should validate a valid chain', () => {
    bc2.addBlock('not foo');
    expect(bc.isValid(bc2.chain)).toBe(true);
  });
  it('should replace the chain with a valid chain', () => {
    bc2.addBlock('goo');
    bc.replaceChain(bc2.chain);
    expect(bc.chain).toEqual(bc2.chain);
  });
  it('should shouldn\'t replace the chain if the new chain\'s legnth is less than or equal to the chains\'s length', () => {
    bc.addBlock('foo');
    bc.replaceChain(bc2.chain);
    expect(bc.chain).not.toEqual(bc2.chain);    
  });
});