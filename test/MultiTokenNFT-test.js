const { expect } = require('chai')
const { ethers } = require('hardhat')
const {parseEther} = ethers.utils

describe.only('MultiTokenNFT', function () {
  let MultiTokenNFT, tokenContract, owner, addr1, addr2, addr3, addrs
  beforeEach(async function () {
    MultiTokenNFT = await ethers.getContractFactory('MultiTokenNFT')

   ; [owner, addr1, addr2, addr3, ...addrs] = await ethers.getSigners()
   tokenContract = await MultiTokenNFT.deploy("Asad","https://game.example/")
  })

  describe('Deployment There', function () {
    it('Should set the right Name', async function () {
      expect(await tokenContract.name()).to.equal("Asad")
    })

    it('Should set the right TRIANGLE', async function () {
      expect(await tokenContract.TRIANGLE()).to.equal(0)
    })
    it('Should set the right PENTAGON', async function () {
      expect(await tokenContract.PENTAGON()).to.equal(1)
    })
    it('Should set the right HEXAGON', async function () {
      expect(await tokenContract.HEXAGON()).to.equal(2)
    })
    it('Should set the right DIAMOND', async function () {
      expect(await tokenContract.DIAMOND()).to.equal(3)
    })
    it('Should set the right ARC', async function () {
      expect(await tokenContract.ARC()).to.equal(4)
    })
    it('Should set the right STAR', async function () {
      expect(await tokenContract.STAR()).to.equal(5)
    })
    it('Should set the right Supply Greater', async function () {
      await expect(
        tokenContract.mintToken(1,15),
      ).to.be.revertedWith('Not enough supply')
    })
    it('Should be minted', async function () {
      await tokenContract.connect(owner).mintToken(1,10)
      expect(await tokenContract.callStatic.balanceOf(owner.address,1)).to.be.equal(10)
      await tokenContract.safeTransferFrom(owner.address,addr1.address,1,5,"0x00")
      expect(await tokenContract.balanceOf(owner.address,1)).to.be.equal(5)
    })

    it('Should be balanceOf', async function () {
      expect(await tokenContract.callStatic.balanceOf(owner.address,1)).to.be.equal(10)
    })

    // it('Should be TransferOwner', async function () {
    //   await tokenContract.transferOwnership(addr1.address)
    // })

    // it('Should be SafeTransferFrom', async function () {
    //   await tokenContract.safeTransferFrom(owner.address,addr1.address,1,5,"0x00")
    // })

  })
})