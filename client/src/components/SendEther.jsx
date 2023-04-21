import { useState } from "react";

function SendEther({ web3, account }) {
  const [receipt, setReceipt] = useState({});
  const [toggle, setToggle] = useState(false);
  const sendEther = async (event) => {
    event.preventDefault();
    // const _from = document.querySelector("#from");
    const _to = document.querySelector("#to");
    const _value = document.querySelector("#value");
    const weiValue = web3.utils.toWei(_value.value, "ether");
    web3.eth
      .sendTransaction({
        from: account, //_from.value,
        to: _to.value,
        value: weiValue,
      })
      .then(function (receipt) {
        setReceipt(receipt);
        setToggle(true);
      });
      
  };
  // console.log(receipt)
  return (
    <div className="sendEther">
      
      <h2>Send Ether</h2>
      <form onSubmit={sendEther}>
      <div className="details">
          <input className="one" type="text" id="to" placeholder="To Address"></input>
          <input className="two" type="text" id="value" placeholder="Value (in Ether)"></input>
      </div>
        <button type="submit">Send</button>
      </form>

      <span className="transactonDetails">{ toggle &&
      <div className="inTDetails">
        <p>Transaction Hash: {`${receipt.transactionHash}`}</p>
        <p>Block Hash: {`${receipt.blockHash}`}</p>
        <p>Block Number: {`${receipt.blockNumber}`}</p>
        <p className="last">Gas Used: {`${receipt.gasUsed}`}</p> 
      </div>}
      </span>
    </div>
  );
}

export default SendEther;
