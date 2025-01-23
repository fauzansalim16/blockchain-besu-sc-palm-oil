import Web3 from 'web3';
const web3 = new Web3('http://localhost:8545');

// Fungsi untuk membuat akun baru
function createNewAccount() {
  const newAccount = web3.eth.accounts.create();
  console.log('Address:', newAccount.address);
  console.log('Private Key:', newAccount.privateKey);
  return newAccount;
}

// Panggil fungsi untuk membuat akun baru
const account = createNewAccount();
