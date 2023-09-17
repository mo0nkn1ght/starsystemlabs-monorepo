const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy TestSpawn
  const TestSpawnFactory = await ethers.getContractFactory("TestSpawn");
  const testSpawnInstance = await TestSpawnFactory.deploy(deployer.address, deployer.address);
  await testSpawnInstance.deployed();
  console.log("TestSpawn deployed to:", testSpawnInstance.address);

  //Deploy MiningRig with the TestSpawn address
  const MiningRigFactory = await ethers.getContractFactory("MiningRig");
  const miningRigInstance = await MiningRigFactory.deploy(
    "0xC36442b4a4522E871399CD717aBDD847Ab11FE88", // NonfungiblePositionManager
    testSpawnInstance.address, // PPEPE set to TestSpawn's address
    "0x6982508145454Ce325dDbE47a25d4ec3d2311933", // PEPE
    "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", // WETH
    "0xb54b065d19A05d66C2e117E41F389034D54d7864"  // COSMIC_DISTILLERY 
  );
  await miningRigInstance.deployed();
  console.log("MiningRig deployed to:", miningRigInstance.address);

  // Call the BootUp function from the MiningRig contract
  const tx1 = await miningRigInstance.bootUp(2000, { value: ethers.utils.parseEther("0.01") });
  await tx1.wait();
  console.log("Called BootUp function on MiningRig");

  // Call the mineLiquidity function from the MiningRig contract
  const tx2 = await miningRigInstance.mineLiquidity(2000, { value: ethers.utils.parseEther("0.01") });
  await tx2.wait();
  console.log("Called mineLiquidity function on MiningRig");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
