////////////////////////////////////////////////////////////
//Versão 2: Finaliza Contrato
////////////////////////////////////////////////////////////
//Scrypt crew
import { Counter } from './src/contracts/counter'
//import { getDefaultSigner, sleep } from './tests/testnet/util/txHelper'
import { getDefaultSigner, sleep } from './tests/utils/txHelper'
import { MethodCallOptions, DefaultProvider, bsv, TestWallet } from 'scrypt-ts' 
  
(async () => { 

    //****Inform here you private key
    const privateKey = bsv.PrivateKey.fromHex("894aaebc8b2ce399ada5c566d86b4a47f3755a775310f67cf4881735c0d60564", bsv.Networks.testnet)

    // Prepare signer.
    // See https://scrypt.io/docs/how-to-deploy-and-call-a-contract/#prepare-a-signer-and-provider
    
    let provDf = new DefaultProvider({network: bsv.Networks.testnet})
 
    const signer = new TestWallet(
        privateKey,
        provDf
    )

     await Counter.compile()

     const balance = 1000
     await provDf.connect()
     let tx3 = new bsv.Transaction

     //****Inform here the current state of the contract
     tx3 = await provDf.getTransaction('1c23d22b1e0ad7ca31fecb4fa18e28a970b4024e1ed9bf71e6141bccc9dedd88')
 
     console.log('Test TX3: ', tx3.id)

    
     const counterFinal = Counter.fromTx(tx3, 0)
     // connect to a signer
     //await instance.connect(getDefaultSigner())

     await counterFinal.connect(signer)

     const { tx: callTx } = await counterFinal.methods.finish()
     console.log('Final state: ', callTx.id)

} )()
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////