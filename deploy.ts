import { Counter } from './src/contracts/counter'
import { bsv, TestWallet, DefaultProvider } from 'scrypt-ts'

//import * as dotenv from 'dotenv'

// Load the .env file
//dotenv.config()

// Read the private key from the .env file.
// The default private key inside the .env file is meant to be used for the Bitcoin testnet.
// See https://scrypt.io/docs/bitcoin-basics/bsv/#private-keys

//const privateKey = bsv.PrivateKey.fromWIF(process.env.PRIVATE_KEY || '')

//****Inform here you private key
const privateKey = bsv.PrivateKey.fromHex("894aaebc8b2ce399ada5c566d86b4a47f3755a775310f67cf4881735c0d60564", bsv.Networks.testnet)

// Prepare signer.
// See https://scrypt.io/docs/how-to-deploy-and-call-a-contract/#prepare-a-signer-and-provider
const signer = new TestWallet(
    privateKey,
    new DefaultProvider({
        network: bsv.Networks.testnet,
    })
)

async function main() {
    await Counter.compile()

    // TODO: Adjust the amount of satoshis locked in the smart contract:
    const amount = 1000

    const instance = new Counter(
        // TODO: Adjust constructor parameter values:
        0n
    )

    // Connect to a signer.
    await instance.connect(signer)

    // Contract deployment.
    const deployTx = await instance.deploy(amount)
    console.log(`Stateful contract deployed: ${deployTx.id}`)
}

main()