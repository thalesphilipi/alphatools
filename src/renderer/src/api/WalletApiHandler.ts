import axios from "axios";
import Web3 from "web3";
import { AbiItem } from "web3-utils"

export default class WalletApiHandler{
    
    static async getBalance(address: string) {
        const infuraApiKey = "b9179855ea7c47d695fa274a41f124ac"
        const web3 = new Web3(`https://mainnet.infura.io/v3/${infuraApiKey}`);
        const wethAddress = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';
        const wethAbi: AbiItem = 
            {
              "constant": true,
              "inputs": [
                {
                  "name": "owner",
                  "type": "address"
                }
              ],
              "name": "balanceOf",
              "outputs": [
                {
                  "name": "",
                  "type": "uint256"
                }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
            };
        const weth = new web3.eth.Contract([wethAbi], wethAddress);
        const retrieveBalance = await weth.methods.balanceOf(address).call((error: Error, result: string) => {
        if (error) {
            console.log(error);
            return "0.00000";
        } else {
            const balance = web3.utils.fromWei(result, 'ether');
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