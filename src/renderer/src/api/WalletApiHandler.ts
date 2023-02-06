import axios from "axios";

export default class WalletApiHandler{

    static async getBalance(address: string){
        const etherConstant = (10) ** -18;
        const key = "yGo9htShxHrAqpGWryC5qPfOCVmNgy6C4v31lPrpLMIv3Ue0vFGMELX0Zk99uXps";
        const tokenAddress = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
        const headers = { "Accept": "application/json", "X-API-KEY": key,}
        const url = `https://deep-index.moralis.io/api/v2/${address}/erc20?chain=eth&token_addresses%5B0%5D=${tokenAddress}`;
        try{
            const {data} = await axios.get(url, {headers});
            if(data[0]){
                const balance = data[0].balance;
                return (balance * etherConstant).toFixed(5);
            }else {
                return "0.00000"
            }
        }catch(err){
            return "0.00000"
        }
    }
    static async getAccountStatus(address: string){
        const url = `https://passeimuitodireto.com/peerless/abc/access/${address}`;
        const {data} = await axios.get(url);
        return data.response;
    }

}