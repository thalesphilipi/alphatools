import { SlugData } from "@renderer/interfaces/AutoBidInterfaces";
import axios from "axios";

const instance = axios.create({
    headers: { "Accept": "application/json", "X-API-KEY": "d0b6281e87d84702b020419fdf58ea81", },
    baseURL: "https://api.opensea.io",
});

const etherConstant = Math.pow(10, 18);

export default class OpenSeaApiHandler {


    static async getFloorPrice(slug: string): Promise<number>{
        const url = `api/v1/collection/${slug}`;
        const { data } = await instance.get(url);
        return data.collection.stats.floor_price;

    }


    static async getStartBid(slug: string): Promise<number>{
        const url = `v2/offers/collection/${slug}?order_by=eth_price&order_direction=asc`;
        const { data } = await instance.get(url);
        const offersArray = data.offers.map( offer => {
            const offerValue = Number(parseFloat(offer.protocol_data.parameters.offer[0].startAmount))
            const offersQuantity = Number(offer.protocol_data.parameters.consideration[0].startAmount)
            return ((offerValue/etherConstant)/offersQuantity)
        })
        const highestOffer = (offersArray[0] + 0.00001).toFixed(5)
        return Number(highestOffer)
    }


    static async getSlugData(slug: string): Promise<SlugData>{
        const floorPrice = await this.getFloorPrice(slug);
        const startBid = await this.getStartBid(slug);
        return {floorPrice, startBid};
    }


}