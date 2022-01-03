import { createContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';

// ABI contains all details about our contract and 
// address is the address of our deployed contract
// on the blockchain.
import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = createContext();


export const TransactionProvider = ({ children }) => {
    

    useEffect(() => {
        const {ethereum} = window;
        const getEthereumContract = () => {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);
        
            console.log({provider, signer, transactionContract});
        
        }

        const checkIfWalletisConntected = async() => {
            if (!ethereum) return alert("Please install metamast!");
            
            const accounts = await ethereum.request({method: 'eth_accounts'});
        }
        checkIfWalletisConntected();
    },[])

    return (
        <TransactionContext.Provider >
            {children}
        </TransactionContext.Provider>
    )
}