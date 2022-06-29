const { expect } = require('chai')
const { BigNumber } = require('ethers')
const { ethers } = require('hardhat')
const {parseEther} = ethers.utils

describe.only('MultiTokenNFT', function () {
  let MultiTokenNFT, tokenContract, owner, addr1, addr2, addr3, addrs
  before(async function () {
    MultiTokenNFT = await ethers.getContractFactory('MultiTokenNFT')

   ; [owner, addr1, addr2, addr3, ...addrs] = await ethers.getSigners()
   tokenContract = await MultiTokenNFT.deploy("Asad","https://game.example/")
  })

  describe('Deployment There', function () {
    it('Should set the right Name', async function () {
      expect(await tokenContract.name()).to.equal("Asad")
    })

    it('Should be Owner', async function () {
      expect(await tokenContract.callStatic.owner()).to.be.equal(owner.address)
    })

    it('Should set the right TRIANGLE', async function () {
      expect(await tokenContract.callStatic.TRIANGLE()).to.equal(0)
    })
    it('Should set the right PENTAGON', async function () {
      expect(await tokenContract.callStatic.PENTAGON()).to.equal(1)
    })
    it('Should set the right HEXAGON', async function () {
      expect(await tokenContract.callStatic.HEXAGON()).to.equal(2)
    })
    it('Should set the right DIAMOND', async function () {
      expect(await tokenContract.callStatic.DIAMOND()).to.equal(3)
    })
    it('Should set the right ARC', async function () {
      expect(await tokenContract.callStatic.ARC()).to.equal(4)
    })
    it('Should set the right STAR', async function () {
      expect(await tokenContract.callStatic.STAR()).to.equal(5)
    })
    it('Should set the right Supply Greater', async function () {
      await expect(
        tokenContract.mintToken(1,15),
      ).to.be.revertedWith('Not enough supply')
    })
    it('Should set the right Owner', async function () {
      await expect(
        tokenContract.connect(addr1).mintToken(1,15),
      ).to.be.revertedWith('Ownable: caller is not the owner')
    })
    it('Should be minted', async function () {
      await tokenContract.connect(owner).mintToken(1,10)
      await tokenContract.connect(owner).mintToken(2,10)
      await tokenContract.connect(owner).mintToken(3,10)
      expect(await tokenContract.callStatic.balanceOf(owner.address,1)).to.be.equal(10)
      await tokenContract.safeTransferFrom(owner.address,addr1.address,1,5,"0x00")
      expect(await tokenContract.balanceOf(owner.address,1)).to.be.equal(5)
    })

    it('Should be balanceOf', async function () {
      expect(await tokenContract.callStatic.balanceOf(owner.address,1)).to.be.equal(5)
    })



    it('Should be SafeTransferFrom', async function () {
      console.log(tokenContract.functions)
      await tokenContract.safeTransferFrom(owner.address,addr1.address,1,5,"0x00")
    })

    it('Should be TotallSupply', async function () {
      expect(await tokenContract.callStatic.totalSupply(1)).to.be.equal(10)
    })

    it('Should be Check Id Exits', async function () {
      expect(await tokenContract.callStatic.exists(1)).to.be.equal(true)
    })
    it('Should be Check Id Not Exits', async function () {
      expect(await tokenContract.callStatic.exists(10)).to.be.equal(false)
    })
    it('Should be URI', async function () {
      expect(await tokenContract.uri(1)).to.be.equal("https://game.example/1.json")
    })

    it('Should be set Right Owner', async function () {
      await  expect( tokenContract.connect(addr1).mintBatch(owner.address,[1,2,3],[20,30,40],0x00)).to.be.revertedWith('Ownable: caller is not the owner')
    })

    it('Should be batchMint', async function () {
      await tokenContract.connect(owner).mintBatch(owner.address,[1,2,3],[BigNumber.from(20),BigNumber.from(30),BigNumber.from(40)],0x00)
    })

    it('Should be balanceOfbatch', async function () {
      // console.log(BigNumber.from("20"))
       expect(await tokenContract.callStatic.balanceOfBatch([owner.address,owner.address,owner.address],[1,2,3])).to.deep.equals([BigNumber.from("20"),BigNumber.from("40"),BigNumber.from("50")])
    })

    it("should return isApproval", async function () {
      expect(await tokenContract.isApprovedForAll(owner.address,addr1.address)).to.equal(false)
    })

    it("should return setApproval", async function () {
      await tokenContract.connect(owner).setApprovalForAll(addr1.address,true)
      expect(await tokenContract.isApprovedForAll(owner.address,addr1.address)).to.equal(true)
    })

        it('Should be TransferOwner', async function () {
      console.log(tokenContract.functions)
      await tokenContract.transferOwnership(addr1.address)
    })

  })
})