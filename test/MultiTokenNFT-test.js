const { expect } = require('chai')
const { ethers } = require('hardhat')
const {parseEther} = ethers.utils

describe('AsadTokenERC1155', function () {
  let AsadTokenERC1155, asadTokenContract, owner, addr1, addr2, addr3, addrs
  beforeEach(async function () {
    AsadTokenERC1155 = await ethers.getContractFactory('AsadTokenERC1155')

   ; [owner, addr1, addr2, addr3, ...addrs] = await ethers.getSigners()
    asadTokenContract = await AsadTokenERC1155.deploy()
  })

  describe('Deployment', function () {
    it('Should set the right owner', async function () {
      expect(await asadTokenContract.owner()).to.equal(owner.address)
    })
  })
})