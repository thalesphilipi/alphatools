import Web3 from "web3";
import { AbiItem } from "web3-utils"

export default class Web3Contracts {

    static infuraApiKey = "b9179855ea7c47d695fa274a41f124ac"
    static wethAddress = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';
    static web3 = new Web3(`https://mainnet.infura.io/v3/${this.infuraApiKey}`);

    static async getWethContract() {
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
      const weth = new this.web3.eth.Contract([wethAbi], this.wethAddress);
      return weth;
    }

};