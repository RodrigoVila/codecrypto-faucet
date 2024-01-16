const { Web3 } = require("web3");
const cors = require("cors")
const express = require('express')
const fs = require('fs')
require('dotenv').config()

const KEYSTORE_FILE_PATH = "../blockchain/data/keystore/UTC--2024-01-15T18-11-07.417919391Z--2d95124f580b55be9a1467f396f299283f267298"
const KEYSTORE_FILE_PWD = process.env.KEYSTORE_FILE_PWD
const PORT = 5000

const web3 = new Web3('http://localhost:9999')
const app = express()
const json = JSON.parse(fs.readFileSync(KEYSTORE_FILE_PATH))

app.use(cors());
app.listen(PORT, () => console.log("Server listening at port: ", PORT))

app.get('/faucet/:address', async (req, res) => {
    const receiverAddr = req.params.address
    try {
        const senderAccount = await web3.eth.accounts.decrypt(json, KEYSTORE_FILE_PWD);

        const tx = {
            chainId: 1234567,
            to: receiverAddr,
            from: senderAccount.address,
            gas: 21000,
            gasPrice: await web3.eth.getGasPrice(),
            value: web3.utils.toWei("0.1", "ether")
        }

        const { rawTransaction } = await senderAccount.signTransaction(tx)
        const receipt = await web3.eth.sendSignedTransaction(rawTransaction)
        res.json({ receipt })
    } catch (e) {
        console.error("Failed to process tx. Error: ", e)
        res.status(500).json({ message: "Failed to prccess tx" })
    }
})

app.get('/balance/:address', async (req, res) => {
    const { address } = req.params
    try {
        const rawBalance = await web3.eth.getBalance(address)
        const ethBalance = Number(web3.utils.fromWei(rawBalance, "ether"))
        const balance = ethBalance.toFixed(2)
        res.json({ balance })
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: "Failed to get balance" })
    }
})