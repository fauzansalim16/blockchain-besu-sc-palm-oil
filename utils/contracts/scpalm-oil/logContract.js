import Web3 from 'web3';
import fs from 'fs';

// Inisialisasi Web3 dengan provider (contoh: lokal node atau Infura)
const web3 = new Web3('http://127.0.0.1:8545'); // Ganti dengan provider Anda

// ABI dan alamat kontrak
const contractABI = [
  [
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_creatorID',
          type: 'uint256',
        },
        {
          internalType: 'uint256[]',
          name: '_broughtIDs',
          type: 'uint256[]',
        },
        {
          internalType: 'string',
          name: '_hash',
          type: 'string',
        },
        {
          internalType: 'uint256',
          name: '_timestamp',
          type: 'uint256',
        },
      ],
      name: 'storeTransaction',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'uint256',
          name: 'creatorID',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'string',
          name: 'hash',
          type: 'string',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'timestamp',
          type: 'uint256',
        },
      ],
      name: 'TransactionStored',
      type: 'event',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: '_hash',
          type: 'string',
        },
      ],
      name: 'getTransactionByHash',
      outputs: [
        {
          components: [
            {
              internalType: 'uint256',
              name: 'creatorID',
              type: 'uint256',
            },
            {
              internalType: 'uint256[]',
              name: 'broughtIDs',
              type: 'uint256[]',
            },
            {
              internalType: 'string',
              name: 'hash',
              type: 'string',
            },
            {
              internalType: 'uint256',
              name: 'timestamp',
              type: 'uint256',
            },
          ],
          internalType: 'struct SupplyChain.Transaction',
          name: '',
          type: 'tuple',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_creatorID',
          type: 'uint256',
        },
      ],
      name: 'getTransactionsByCreator',
      outputs: [
        {
          components: [
            {
              internalType: 'uint256',
              name: 'creatorID',
              type: 'uint256',
            },
            {
              internalType: 'uint256[]',
              name: 'broughtIDs',
              type: 'uint256[]',
            },
            {
              internalType: 'string',
              name: 'hash',
              type: 'string',
            },
            {
              internalType: 'uint256',
              name: 'timestamp',
              type: 'uint256',
            },
          ],
          internalType: 'struct SupplyChain.Transaction[]',
          name: '',
          type: 'tuple[]',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'transactionsByCreator',
      outputs: [
        {
          internalType: 'uint256',
          name: 'creatorID',
          type: 'uint256',
        },
        {
          internalType: 'string',
          name: 'hash',
          type: 'string',
        },
        {
          internalType: 'uint256',
          name: 'timestamp',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      name: 'transactionsByHash',
      outputs: [
        {
          internalType: 'uint256',
          name: 'creatorID',
          type: 'uint256',
        },
        {
          internalType: 'string',
          name: 'hash',
          type: 'string',
        },
        {
          internalType: 'uint256',
          name: 'timestamp',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  ],
];
const contractAddress = '0x2c2b9c9a4a25e24b174f26114e8926a9f2128fe4';

// Buat instance kontrak
const supplyChainContract = new web3.eth.Contract(contractABI, contractAddress);

// Mendengarkan event TransactionStored
supplyChainContract.events.TransactionStored({}, (error, event) => {
  if (error) {
    console.error('Error fetching event:', error);
  } else {
    console.log('New Event Captured:', event);
    saveLogToFile(event);
  }
});

// Fungsi untuk menyimpan log ke file
function saveLogToFile(event) {
  // Struktur data yang akan disimpan
  const logData = {
    creatorID: event.returnValues.creatorID,
    hash: event.returnValues.hash,
    timestamp: event.returnValues.timestamp,
    blockNumber: event.blockNumber,
    transactionHash: event.transactionHash,
  };

  // Menambahkan log ke file (append mode)
  fs.appendFile('contractLogs.json', JSON.stringify(logData, null, 2) + ',\n', (err) => {
    if (err) {
      console.error('Failed to write to file:', err);
    } else {
      console.log('Log saved successfully!');
    }
  });
}
