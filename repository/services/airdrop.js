const {
	Connection, PublicKey, clusterApiUrl, Keypair,
	LAMPORTS_PER_SOL, Transaction, Account
} = require('@solana/web3.js');

const newPair = new Keypair();

const publicKey = new PublicKey(newPair._keypair.publicKey).toString();
const secretKey = newPair._keypair.secretKey;

console.log({ publicKey, secretKey });


const getWalletBalance = async() => {
	try {
		const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
		const myWallet = await Keypair.fromSecretKey(secretKey);

		const walletBalance = await connection.getBalance(
			new PublicKey(myWallet.publicKey)
		);

		console.log({ walletBalance });
	} catch (err) {
		console.log(err);
	}
};

const airdropSol = async () => {
	try {
		const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
		const myWallet = await Keypair.fromSecretKey(secretKey);

		const airdropSignature = await connection.requestAirdrop(
			new PublicKey(myWallet.publicKey), 2 * LAMPORTS_PER_SOL
		);

		const resp = await connection.confirmTransaction(airdropSignature);
		console.log(resp);
	} catch (err) {
		console.log(err);
	}
};

const driverFunction = async() => {
	await getWalletBalance();
	await airdropSol();
	await getWalletBalance();
};

driverFunction();

