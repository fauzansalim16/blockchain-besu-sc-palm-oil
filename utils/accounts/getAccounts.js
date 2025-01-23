import Web3 from 'web3';
const web3 = new Web3('http://localhost:8545');

async function getAccounts() {
  try {
    const accounts = await web3.eth.getAccounts();
    console.log('Daftar akun yang ada dalam jaringan:', accounts);
  } catch (error) {
    console.error('Error mendapatkan akun:', error);
  }
}

getAccounts();
