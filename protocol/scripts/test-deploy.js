const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy TestToken
  const TestToken = await ethers.getContractFactory("TestToken");
  const testToken = await TestToken.deploy(deployer.address, deployer.address);
  await testToken.deployed();
  console.log("TestToken deployed to:", testToken.address);

  // Deploy MiningRig with the TestToken address
  const MiningRig = await ethers.getContractFactory("MiningRig");
  const miningRig = await MiningRig.deploy(
    "0xC36442b4a4522E871399CD717aBDD847Ab11FE88", // NonfungiblePositionManager
    testToken.address, // PPEPE
    "0x6982508145454Ce325dDbE47a25d4ec3d2311933", // PEPE
    "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", // WETH
    "0xb54b065d19A05d66C2e117E41F389034D54d7864"  // COSMIC_DISTILLERY
  );
  await miningRig.deployed();
  console.log("MiningRig deployed to:", miningRig.address);

  // Grant MiningRig the Minter Role in TestToken
  await testToken.grantMinterRole(miningRig.address);
  console.log("Granted MiningRig the Minter Role in TestToken");

  // Call the BootUp function from the MiningRig contract
  const tx = await miningRig.bootUp(2000, { value: ethers.utils.parseEther("0.05") });
  await tx.wait();
  console.log("Called BootUp function on MiningRig");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
