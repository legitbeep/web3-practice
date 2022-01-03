const main = async () => {
  const Transactions = await hre.ethers.getContractFactory("Transactions");
  const transaction = await Transactions.deploy("Hello, Hardhat!");

  await transaction.deployed();

  console.log("Transactions deployed to:", transaction.address);
}

const runMain = async() => {
  try{
    await main();
    process.exit(0);
  }catch(err) {
    console.error(err);
    process.exit(1);
  }
}

runMain();