import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);
  const [tx, setTx] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [isLoading, setLoading] = useState(false);

  const wallet = window.ethereum;

  const getUrl = (type: "faucet" | "balance") => {
    /* If using WSL on Windows, get nameserver doing
    cat /etc/resolv.conf
    at your wsl console and replace "localhost"
    on the next line */
    return `http://192.168.176.1:5000/${type}/${currentAccount}`;
  };

  const connect = async () => {
    if (wallet) {
      try {
        const accounts: string[] = await wallet.request({
          method: "eth_requestAccounts",
        });
        setCurrentAccount(accounts[0]);
      } catch (e) {
        console.error("Error connecting to wallet: ", e);
      }
    }
  };

  const getBalance = async () => {
    const url = getUrl("balance");
    try {
      const res = await fetch(url);
      const { balance } = await res.json();
      setBalance(balance);
    } catch (e) {
      console.error("Error getting balance: ", e);
    }
  };

  const onButtonClick = async () => {
    if (!currentAccount) {
      alert("Connect wallet first");
      connect();
      return;
    }

    // Reset state to clean tx hash msg after a retry
    setTx(null);

    const url = getUrl("faucet");
    try {
      setLoading(true);

      const res = await fetch(url);
      const { transactionHash } = await res.json();
      setTx(transactionHash);
    } catch (e) {
      console.error("Error getting ETH: ", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    connect();

    wallet.on("accountsChanged", (accounts: string[]) =>
      setCurrentAccount(accounts[0])
    );
  }, []);

  useEffect(() => {
    currentAccount && getBalance();
  }, [currentAccount]);

  return (
    <div>
      <h3>{`Current account: ${currentAccount}`}</h3>
      <button onClick={onButtonClick} disabled={isLoading}>
        {isLoading ? "Loading..." : "Send 0.1 ETH"}
      </button>
      {tx ? <div>{`Success! Tx Hash: ${tx}`}</div> : null}
      <h4>{`Balance: ${balance} ETH`}</h4>
    </div>
  );
}

export default App;
