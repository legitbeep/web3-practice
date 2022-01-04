import { createContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { flushSync } from 'react-dom'

// ABI contains all details about our contract and 
// address is the address of our deployed contract
// on the blockchain.
import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = createContext();


const getItem = (name) => {
    if(typeof window !== "undefined") {
        return JSON.parse(localStorage.getItem(name))
    } else return 0;
}
const setItem = (name, value) => {
    if(typeof window !== "undefined") {
        localStorage[name] = value;
    }
}

export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [formData, setFormData] = useState({ addressTo: "" , amount : "", keyword: "", message: ""})
    const [ethereum, setEthereum] = useState(null);
    const [transactionCount,setTransactionCount] = useState(getItem("transactionCount"));
    const [loading, setLoading] = useState(false);

    const handleChange = (e, name) => {
        setFormData(prev => ({...prev, [name]: e.target.value}))
    }

    const logout = () => {
        setCurrentAccount("");
    }

    const getEthereumContract = () => {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const transactionContract = new ethers.Contract(contractAddress, contractABI.abi, signer);
    
        return transactionContract;
    }

    const sendTransaction = async() => {
        try{
            if (!ethereum) return alert("Please install metamast!");
            const { addressTo, amount, keyword, message } = formData;
            const transactionContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);
            console.log(parsedAmount)
            setLoading(true);
            await ethereum.request({
                method: "eth_sendTransaction",
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: "0x5208", // 21000 WEI = 0.000021 ETH
                    value: parsedAmount._hex, // only hex
                }]
            });

            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);
            await transactionHash.wait();
            const transactionCount = await transactionContract.getTransactionCount();

            setLoading(false);
            setTransactionCount(transactionCount.toNumber())
            setItem("transactionCount", transactionCount.toNumber());
        } catch(err) {
            console.log(err)
        }
    }

    const checkIfWalletisConntected = async(ethereum) => {
        try {
            if (!ethereum) return alert("Please install metamast!");
        
            const accounts = await ethereum.request({method: 'eth_accounts'});
            
            if( accounts.length ) {
                setCurrentAccount(accounts[0])
                // getAllTransactions();
            } else {
                console.log("No account found!")
            }
        } catch (err) {
            console.log(err)
        }
    }

    const connectWallet = async(ethereum) => {
        try{
            if(!ethereum) return alert('Please install metamask!');
            const accounts = await ethereum.request({method: 'eth_requestAccounts'});
            
            setCurrentAccount(accounts[0]);
        }catch(err) {
            console.log(err)
            throw new Error("No ethereum object found!");
        }
    }

    useEffect(() => {
        const {ethereum} = window;
        setEthereum(ethereum);
        checkIfWalletisConntected(ethereum);
    },[])

    return (
        <TransactionContext.Provider value={{ connectWallet, currentAccount, handleChange, sendTransaction, transactionCount, logout }}>
            {children}
        </TransactionContext.Provider>
    )
}