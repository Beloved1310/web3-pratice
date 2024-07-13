import express from "express";
import { Web3 } from "web3";

// Create a new instance of express
const app = express();
const port = 3007;

// Connect to an Ethereum node (you can use a provider like Infura or Alchemy)
const web3 = new Web3(
  "https://mainnet.infura.io/v3/dcf97963d1f64f01b3eacd02b9f70d08"
);

// Endpoint to get balance
app.get("/balance/:address", async (req, res) => {
  const { address } = req.params;

  try {
    // Get balance in Wei
    const balanceWei = await web3.eth.getBalance(address);

    // Convert balance from Wei to Ether
    const balanceEth = web3.utils.fromWei(balanceWei, "ether");

    res.send({ address, balance: balanceEth });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
