// Import Web3.js
import Web3 from 'web3';

// Alamat kontrak SimpleStorage
const contractAddress = '0xf25186B5081Ff5cE73482AD761DB0eB0d25abfBF';

// ABI dari kontrak SimpleStorage (hanya mengambil fungsi `get()`)
const abi = [
  {
    constant: true,
    inputs: [],
    name: 'get',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
];

// Alamat RPC provider (contohnya menggunakan Infura untuk mainnet)
const provider = 'http://127.0.0.1:8545';

// Membuat instance Web3 dengan provider (gunakan Infura atau node lokal)
const web3 = new Web3(new Web3.providers.HttpProvider(provider));

// Membuat instance kontrak
const contract = new web3.eth.Contract(abi, contractAddress);

// Fungsi untuk mengambil nilai dari kontrak
async function getValue() {
  try {
    const value = await contract.methods.get().call();
    console.log('Nilai yang disimpan dalam SimpleStorage: ', value);
  } catch (error) {
    console.error('Terjadi error:', error);
  }
}

// Panggil fungsi getValue
getValue();
