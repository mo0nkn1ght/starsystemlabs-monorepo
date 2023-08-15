const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());

    const PPEPE_ADDRESS = "0xPPEPEAddress";
    const PEPE_ADDRESS = "0xPEPEAddress";
    const WETH_ADDRESS = "0xWETHAddress";
    const COSMIC_DISTILLERY_ADDRESS = "0xCOSMIC_DISTILLERYAddress";

    const MiningRig = await hre.ethers.getContractFactory("MiningRig");
    const miningRig = await MiningRig.deploy(
        PPEPE_ADDRESS,
        PEPE_ADDRESS,
        WETH_ADDRESS,
        COSMIC_DISTILLERY_ADDRESS
    );

    await miningRig.deployed();

    console.log("MiningRig deployed to:", miningRig.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
