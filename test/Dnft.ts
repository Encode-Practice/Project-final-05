import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { DNFT} from "../typechain";
import { BigNumber } from "ethers";

describe("dNFT", async () => {
  
  let nft: DNFT;
  let accounts: SignerWithAddress[];
  
beforeEach(async () => {
   accounts = await ethers.getSigners();
   const  nftContractFactory = await ethers.getContractFactory("dNFT");
      nft = await nftContractFactory.deploy() as DNFT
      
     await nft.deployed();  
   
});

it("Should return the name and symbol of the NFT", async function () {
  const name  = await nft.name();
  const symbol  = await nft.symbol();
  expect(name).to.equal("dnft");
  expect(symbol).to.equal("dnft");
});

it("Checks the balance of an address", async function () {
   const balanceBN  = await nft.balanceOf(accounts[2].address);
   const balance = Number(balanceBN);
   expect(balance).to.be.greaterThanOrEqual(0);
 });
 

it("Can checkUpkeep interval", async function () {
   //const byteToString = ethers.utils.parseBytes32String("eg");
   const stringToBytes = ethers.utils.formatBytes32String('test');
   const checkUpkeep  = await nft.checkUpkeep(stringToBytes);

   expect(checkUpkeep).to.be.a("boolean");
});

it("can mint tokens", async function () {
    
    const mint = await nft.safeMint(accounts[1].address);
    mint.wait();
    let BN = await nft.balanceOf(accounts[1].address);
    const num = Number(BN);

   expect(num).to.greaterThan(0);
});

it("can change interval", async function () {
    
    await nft.changeInterval(60);
   const _getInterval = await nft.getInterval();
   console.log(_getInterval);
   const getInterval = await _getInterval.toNumber();
   console.log(`Interval is ${getInterval}`);

  expect(getInterval).to.be.greaterThanOrEqual(0);
});



})