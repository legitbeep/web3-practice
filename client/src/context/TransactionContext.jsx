import { createContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { flushSync } from 'react-dom'

// ABI contains all details about our contract and 
// address is the address of our deployed contract
// on the blockchain.
import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = createContext();


export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [formData, setFormData] = useState({ addressTo: "" , amount : "", keyword: "", message: ""})
    const [ethereum, setEthereum] = useState(null);

    const handleChange = (e, name) => {
        setFormData(prev => ({...prev, [name]: e.target.value}))
    }

    const getEthereumContract = () => {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const transactionContract = new ethers.Contract(contractAddress, [contractABI], signer);
    
        console.log({provider, signer, transactionContract});
    
    }

    const sendTransaction = async() => {
        try{
            if (!ethereum) return alert("Please install metamast!");
            const { addressTo, amount, keyword, message } = formData;

            getEthereumContract();
        } catch(err) {
            console.log(err)
        }
    }

    const checkIfWalletisConntected = async() => {
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

    const connectWallet = async() => {
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
        flushSync( () => setEthereum(ethereum) );
        checkIfWalletisConntected();
    },[])

    return (
        <TransactionContext.Provider value={{ connectWallet, currentAccount, handleChange, sendTransaction  }}>
            {children}
        </TransactionContext.Provider>
    )
}