const ssABI=[
    {
        "inputs": [],
        "name": "retrieve",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "num",
                "type": "uint256"
            }
        ],
        "name": "store",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]
const ssAddress="0x4614101968e364F241717225b488232fd61b002D"

window.addEventListener('load', function() {

    if (typeof window.ethereum !== 'undefined') {
        console.log('window.ethereum is enabled')

    }
    else {
        console.log('window.ethereum is not enabled')
}})

let connect=document.getElementById("connect")
connect.onclick = async () => {
    if (typeof window.ethereum == 'undefined') {
        alert("Metamask is not available")
    }
    else {
        if (window.ethereum.isMetaMask==true){
            console.log("metamask is available")
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x2328' }],
            });
            await ethereum.request({ method: 'eth_requestAccounts'})
                    console.log("connected to evmos testnet")
                    connect.innerHTML = "connected"
                    connect.disabled = "true"
            let currentaccount=document.getElementById('currentac');
            currentaccount.innerHTML = 'Current Account: ' + ethereum.selectedAddress
            currentaccount.hidden=false
            let inputbox=document.getElementById("inputbox")
            let submit=document.getElementById("submit")
            inputbox.hidden=false
            submit.hidden=false
        }
        else {
            console.log("cannot connect to metamask,There may be some conflicts ")
        }
    }

}
const submit = document.getElementById('submit');
submit.onclick = async () => {
    // grab value from input

    let ssinput = document.getElementById('inputbox').value;
    console.log(ssinput)
    var web3 = new Web3(window.ethereum)
    const simpleStorage = new web3.eth.Contract(ssABI, ssAddress)
    ssinput=web3.utils.toWei(ssinput.toString(10), "ether");
    let sendtx=await simpleStorage.methods.store(ssinput).send({from: ethereum.selectedAddress})
    console.log("transation is pending")
    if (sendtx.status=true){
        console.log("tx sent")
        let ss=document.getElementById('storageValue')
        let ssvalue= await simpleStorage.methods.retrieve().call();
        ssvalue = web3.utils.fromWei(ssvalue.toString(10), "ether");
        ss.innerHTML="The storage value is: "+ssvalue
        ss.hidden=false

    }
    else alert("transaction is failed")

}

ethereum.on('chainChanged', async (chainId) => {
    if (chainId!='0x2328') {
        console.log("chainId:"+chainId + "is wrong")
        alert("We only support ropsten testnet,pls change your network")
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x2328'}],
        });
    }

});

ethereum.on('accountsChanged', async (accounts) => {
    console.log("account changed"+"current account is "+accounts)
    let currentaccount=document.getElementById('currentac');
    currentaccount.innerHTML = 'Current Account: ' + ethereum.selectedAddress
});


