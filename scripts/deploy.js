const hre = require("hardhat");

const main = async () => {
  const [deployer] = await hre.ethers.getSigners();
  const accountBalance = await deployer.getBalance();
  const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');
  /* コントラクトに資金を提供できるようにする */
  const waveContract = await waveContractFactory.deploy(
    { value: hre.ethers.utils.parseEther("0.1") }
  );
  const wavePortal = await waveContract.deployed();

  console.log("Account balance:", ethers.utils.formatEther(accountBalance));
  console.log("WavePortal deployed to:", wavePortal.address);
  console.log("WavePortal deployed by:", deployer.address);

};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();