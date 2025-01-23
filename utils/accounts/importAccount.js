import Web3 from 'web3';

const web3 = new Web3('http://localhost:8545');

// Kunci pribadi dari akun yang ingin diimpor
const privateKey = '0xae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f';

// Mengimpor akun menggunakan kunci pribadi
const account = web3.eth.accounts.privateKeyToAccount(privateKey);

console.log('Akun yang diimpor:', account);

// Mendapatkan saldo akun dalam Wei
async function getBalance() {
  const balanceWei = await web3.eth.getBalance(account.address);
  // Mengonversi saldo dari Wei ke Ether
  const balanceEther = web3.utils.fromWei(balanceWei, 'ether');

  console.log(`Saldo akun ${account.address}: ${balanceEther} ETH`);
}

// Panggil fungsi untuk mendapatkan dan menampilkan saldo
getBalance();
