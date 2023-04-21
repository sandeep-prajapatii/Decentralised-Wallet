import { useState, useEffect } from "react";
import "../App.css"

export default function Accounts({ web3, accountAddress }) {
  const [account, setAccount] = useState(null);
  const [accountBalance, setaccountBalance] = useState(null);
  const [provider, setProvider] = useState(null);
  useEffect(() => {
    const allAccounts = async () => {
      setProvider(web3.eth.currentProvider.host);
      console.log(web3.eth.currentProvider.host);
      var select = document.getElementById("selectNumber");
      var options = await web3.eth.getAccounts();

      for (var i = 0; i < options.length; i++) {
        var opt = options[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
      }
    };
    web3 && allAccounts();
  }, [web3]);

  const selectAccount = async () => {
    let selectedAccountAddress = document.getElementById("selectNumber").value;
    accountAddress(selectedAccountAddress);

    let accountBalance = await web3.eth.getBalance(selectedAccountAddress);
    setaccountBalance(accountBalance);
    setAccount(selectedAccountAddress);
  };

  return (
    <div className="accounts">
      <form id="myForm">
        <select id="selectNumber" onChange={selectAccount}>
          <option >Choose an account</option>
        </select>
      </form>
      <p>Connected Account: {account}</p><br/>
      <p>Account Balance (wei): {accountBalance}</p><br/>
      <p>Provider: {provider}</p>
    </div>
  );
}


