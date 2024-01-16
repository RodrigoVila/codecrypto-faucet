# FAUCET PROJECT

## BLOCKCHAIN CONFIGURATION

- [ ] Go to blockchain folder `cd blockchain`
- [ ] Run 
```bash
docker run --rm -it -v ${PWD}/data:/data ethereum/client-go:latest account new --datadir /data
```

*This will create a wallet with address, public and private key.*

- [ ] Copy the address from blockchain/data/keystore/UTC--XXXX" at the key "address".

![image](https://github.com/RodrigoVila/codecrypto-faucet/assets/42290738/ae7937db-98ba-4701-8ebe-d9491e113b6c)

- Replace the address inside blockchain/genesis.json:
- [ ] At "alloc" object
- [ ] At the "extradata" string. NOTE: There should be 64 "0" before the the address (image starts with 0xA) and 130 after (image ends with 914).

![image](https://github.com/RodrigoVila/codecrypto-faucet/assets/42290738/650dacf5-707c-4b2c-86c6-f01cd438d29d)

### ADDING EXTRA WALLET
You can add an extra wallet to receive funds when you initialize the Blockchain. To do so, copy the public address from your wallet and add it to the alloc object

![image](https://github.com/RodrigoVila/codecrypto-faucet/assets/42290738/04d2f11e-f970-4daa-82ff-577dc8698a4b)

## BLOCKCHAIN INTIALIZATION
- [ ] Run 
```bash
docker run --rm -it -v ${PWD}/genesis.json:/genesis.json -v ${PWD}/data:/data ethereum/client-go:latest init --datadir /data /genesis.json
```

## LAUNCH DB
- [ ] Replace "--miner.etherbase" and "--unlock" addresses in the next command for the same address you used at the genesis.json at the previous step.

**IMPORTANT NOTE: I'm using windows 11 with WSL and I needed to add the flag --ipcdisable. If you are runing a unix system, probably you don't need this flag**

- [ ] Run

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

## LAUNCH BACKEND
-[ ] Go to backend folder and open the .env file
-[ ] Add the passwd you created at `BLOCKCHAIN CONFIGURATION` section
-[ ] Open a new console
-[ ] Go to backend folder `cd backend`
-[ ] Run `npx nodemon app.js`. Install nodemon if necessary

## LAUNCH FRONTEND
-[ ] Open a new console
-[ ] Go to frontend folder `cd frontend`
-[ ] Install dependencies. Run `npm i`
-[ ] Run `npm run dev`

## HOW TO USE?
-[ ] Visit website at `http://localhost:5173/`
-[ ] [Connect your Metamask account](https://docs.metamask.io/wallet/how-to/connect/)
-[ ] Click on the button to get some fake coins.

