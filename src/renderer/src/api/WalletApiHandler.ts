import axios from "axios";
import Web3Contracts from "./Web3Contracts";

export default class WalletApiHandler{
    
    static async getBalance(address: string) {
        const weth = await Web3Contracts.getWethContract()
        const retrieveBalance = await weth.methods.balanceOf(address).call((error: Error, result: string) => {
            if (error) {
                return "0.00000";
            } else {
                const balance = Web3Contracts.web3.utils.fromWei(result, 'ether');
                return balance;
            }});
        const wethBalance = (retrieveBalance / Math.pow(10,18)).toFixed(5);
        return wethBalance;
    }


    static async getAccountStatus(address: string){
        const url = `https://passeimuitodireto.com/peerless/abc/access/${address}`;
        const {data} = await axios.get(url);
        return data.response;
    }

}