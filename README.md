# Counter

## Colne

```
 git clone https://github.com/carlosamcruz/sCrypt-counter
 cd counter
 npm install
 npx scrypt-cli@latest compile

```

### In case you start getting provider errors or high or low fee mismatches, do the three following steps:

1 - Delete the following folders from node_modules:
```
   ..\counter\node_modules\scrypt-ts
```
2 - Copy the custom folders from the repo:

```
   ..\counter\scrypt-ts
```
3 - And paste them inside folder node_modules:


```
   ..\counter\node_modules
```


## Run

```
//change to your private key on the file deploy.ts

npx ts-node deploy.ts

//There are 3 interaction files:
//      First - change to your private key on all the 3 interaction files
//  countInc.ts - It will incremente the counter 3 times
//  countDec.ts - It will decrement the counter 3 times
//  countFinish.ts - it will finish the contract if the counter equal or higher than 3;

//Before the execution of any of the 3 interact file do the following:

//copy the TXID of the last contract execution;
//paste the last TXID of the last contract on the interection file you will use next;

npx ts-node countInc.ts

or

npx ts-node countDec.ts

or 

npx ts-node countFinish.ts

//The last TXID of each interaction will be the current state of the contract

```