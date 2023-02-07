import { SlugData } from "@renderer/interfaces/AutoBidInterfaces";
import axios from "axios";

const instance = axios.create({
    headers: { "Accept": "application/json", "X-API-KEY": "d0b6281e87d84702b020419fdf58ea81", },
    baseURL: "https://api.opensea.io",
});



export default class OpenSeaApiHandler {


    static async getFloorPrice(slug: string) {
        const url = `api/v1/collection/${slug}`;
        const { data } = await instance.get(url);
        return data.collection.stats.floor_price;

    }

    static async getStartBid(slug: string){
        const etherConstant = (10) ** -18;

        const url = `v2/offers/collection/${slug}?order_by=eth_price&order_direction=asc`;
        const { data } = await instance.get(url);
        
        const value = (data.offers[0].protocol_data.parameters.offer[0].startAmount) * etherConstant;
        return Number((value + 0.0001).toFixed(4))

    }

    static async getSlugData(slug: string): Promise<SlugData>{
        const floorPrice = await this.getFloorPrice(slug);
        const startBid = await this.getStartBid(slug);
        return {floorPrice, startBid};
    }
}