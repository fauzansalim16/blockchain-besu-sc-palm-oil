from web3 import Web3

# Koneksi ke node Ethereum
w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:8545'))

# Pre-seeded account with 90000 ETH
privateKeyA = "0xc87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3"
accountA = w3.eth.account.from_key(privateKeyA)

# Mengecek saldo akun A
accountABalance = w3.eth.get_balance(accountA.address)
print(f"Account A has balance of: {w3.from_wei(accountABalance, 'ether')} ETH")

# Membuat akun baru untuk transfer ETH
accountB = w3.eth.account.create()
accountBBalance = w3.eth.get_balance(accountB.address)
print(f"Account B has balance of: {w3.from_wei(accountBBalance, 'ether')} ETH")

# Mengirim ETH dari A ke B
rawTxOptions = {
    'nonce': w3.eth.get_transaction_count(accountA.address),
    'from': accountA.address,
    'to': accountB.address,
    'value': w3.to_wei(0.01, 'ether'),  # Jumlah ETH yang akan ditransfer
    'gasPrice': w3.to_wei('1', 'gwei'),
    'gas': 21000,
}

# Menandatangani transaksi
signed_tx = w3.eth.account.sign_transaction(rawTxOptions, privateKeyA)

# Mengirim transaksi
tx_hash = w3.eth.send_raw_transaction(signed_tx.raw_transaction)
print(f"Transaction hash: {tx_hash.hex()}")

# Menunggu receipt transaksi
tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
print(f"Transaction receipt: {tx_receipt}")