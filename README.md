# FAUCET PROJECT

## BLOCKCHAIN CONFIGURATION

- [ ] Go to blockchain folder `cd blockchain`
- [ ] Run 
```bash
docker run --rm -it -v ${PWD}/data:/data ethereum/client-go:latest account new --datadir /data
```

*This will create a wallet with address, public and private key.*

- [ ] Copy the address from blockchain/data/keystore/UTC--XXXX" at the key "address".

![Alt text](image-1.png)

- Replace the address inside blockchain/genesis.json:
- [ ] At "alloc" object
- [ ] At the "extradata" string. NOTE: There should be 64 "0" before the the address (image starts with 0xA) and 130 after (image ends with 914).

![Alt text](image-3.png)

### ADDING EXTRA WALLET
You can add an extra wallet to receive funds when you initialize the Blockchain. To do so, copy the public address from your wallet and add it to the alloc object

![Alt text](image-2.png)

## BLOCKCHAIN INTIALIZATION
-[ ] Run 
```bash
docker run --rm -it -v ${PWD}/genesis.json:/genesis.json -v ${PWD}/data:/data ethereum/client-go:latest init --datadir /data /genesis.json
```

## LAUNCH DB
-[ ] Replace "--miner.etherbase" and "--unlock" addresses in the next command for the same address you used at the genesis.json at the previous step.

**IMPORTANT NOTE: I'm using windows 11 with WSL and I needed to add the flag --ipcdisable. If you are runing a unix system, probably you don't need this flag**

-[ ] Run

```bash
docker run --rm -it -p 9999:8545 -v ${PWD}/data:/data ethereum/client-go:latest \
    --datadir /data \
    --allow-insecure-unlock \
    --miner.etherbase 2d95124f580b55be9a1467f396f299283f267298 \
    --mine \
    --unlock "2d95124f580b55be9a1467f396f299283f267298" \
    --http \
    --http.addr "0.0.0.0" \
    --http.port 8545 \
    --http.corsdomain "*" \
    --ipcdisable \
    --http.api "admin,eth,debug,miner,net,txpool,personal,web3"
```
