const { expect } = require('chai')
const { ethers } = require('hardhat')
const {parseEther} = ethers.utils

describe('AsadTokenERC1155', function () {
  let AsadTokenERC1155, asadTokenContract, owner, addr1, addr2, addr3, addrs
  beforeEach(async function () {
    AsadTokenERC1155 = await ethers.getContractFactory('AsadTokenERC1155')
    ;[owner, addr1, addr2, addr3, ...addrs] = await ethers.getSigners()
    asadTokenContract = await AsadTokenERC1155.deploy()
  })
  describe('Deployment', function () {
    it('Should set the right owner', async function () {
      expect(await asadTokenContract.owner()).to.equal(owner.address)
    })

    // it("should return transferOwnership", async function () {
    //   await asadTokenContract.transferOwnership(addr1.address)
    // })   
     it("should return SetUri", async function () {
      await asadTokenContract.connect(owner).setURI("https://github.com/spo0ds/")
    })

    it("should return Mint", async function () {
      await asadTokenContract.connect(owner).mint(owner.address,1,25,"0x00")
    })

    it("should return BalanceOf", async function () {
      expect(await asadTokenContract.connect(owner).balanceOf(owner.address,1)).to.equal("0")
    })

    it("should return isApproval", async function () {
      expect(await asadTokenContract.isApprovedForAll(owner.address,addr1.address)).to.equal(false)
    })

    it("should return setApproval", async function () {
      await asadTokenContract.connect(owner).setApprovalForAll(addr1.address,true)
      expect(await asadTokenContract.isApprovedForAll(owner.address,addr1.address)).to.equal(true)
    })

  })
})