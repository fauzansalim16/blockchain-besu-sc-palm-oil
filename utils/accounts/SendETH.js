import Web3 from 'web3';
const web3 = new Web3('http://localhost:8545');

const privateKey = '0xae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f';

const account = web3.eth.accounts.privateKeyToAccount(privateKey);

async function sendTransaction() {
  const tx = {
    from: account.address,
    to: '0xFE3B557E8Fb62b89F4916B721be55cEb828dBd73', // Alamat penerima
    value: web3.utils.toWei('100', 'ether'), // Jumlah ETH yang akan dikirim
    gas: 2000000, // Jumlah gas
    gasPrice: web3.utils.toWei('20', 'gwei'), // Gas price (misalnya 20 Gwei)
  };

  // Menandatangani transaksi dengan kunci pribadi
  const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);

  // Mengirim transaksi yang telah ditandatangani
  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  console.log('Transaksi berhasil:', receipt);
}

sendTransaction();
