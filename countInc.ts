////////////////////////////////////////////////////////////
//Versão 2: Incrementa Contador do Contator
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
     tx3 = await provDf.getTransaction('5641c8f23ec98438d96c5dc78fd0b19d2dc293a84264e78134c067301b3aee6f')
 
     console.log('Test TX3: ', tx3.id)
 
     //Para carregar o SC que será executado
     //const instance2 = Helloworld.fromTx(tx2, 0)
     const counter = Counter.fromTx(tx3, 0)
 
     // connect to a signer
     //await instance.connect(getDefaultSigner())
     await counter.connect(signer)

     // set current instance to be the deployed one 
     let currentInstance = counter 
  
     // call the method of current instance to apply the updates on chain 
     for (let i = 0; i < 3; ++i) { 
     //for (let i = 0; i < 1; ++i) {    
         // avoid mempool conflicts, sleep to allow previous tx "sink-into" the network 
         await sleep(2) 
  
         // create the next instance from the current 
         const nextInstance = currentInstance.next() 
  
         // apply updates on the next instance off chain 
         nextInstance.increment() 
  
         // call the method of current instance to apply the updates on chain 
         //const { tx: tx_i } = await currentInstance.methods.incrementOnChain({
         const { tx: callTx } = await currentInstance.methods.incrementOnChain({    
             next: { 
                 instance: nextInstance, 
                 balance, 
             }, 
         } as MethodCallOptions<Counter>) 

         tx3 = await provDf.getTransaction(callTx.id)
  
         console.log( 'Counter: ', currentInstance.count + 1n)
         console.log( 'TXID: ', callTx.id)

         // update the current instance reference 
         currentInstance = nextInstance 
      } 

} )()
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////