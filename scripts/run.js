const hre = require("hardhat");

const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');
    // 0.1ETHをコントラクトに提供してデプロイする
    const waveContract = await waveContractFactory.deploy(
        { value: hre.ethers.utils.parseEther("0.1") });
    const wavePortal = await waveContract.deployed();

    console.log("WavePortal address:", wavePortal.address);
    console.log("WavePortal deployed by:", owner.address);
    console.log("WaveContract address: ", waveContract.address);

    let contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log("Contract balance: ", hre.ethers.utils.formatEther(contractBalance));

    let waveCount;
    waveCount = await wavePortal.getTotalWaves();
    console.log(waveCount.toNumber());

    let waveTxm = await waveContract.wave("A massage!");
    await waveTxm.wait();
    waveTxm = await waveContract.wave("Second massage!");
    await waveTxm.wait();

    // Waveした後のコントラクトの残高を取得し、結果を出力（0.0001ETH引かれていることを確認）
    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log("Contract balance: ", hre.ethers.utils.formatEther(contractBalance));

    //waveTxm = await waveContract.connect(randomPerson).wave("Another message!");
    //await waveTxm.wait();

    let allWaves = await waveContract.getAllWaves();
    console.log(allWaves);
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