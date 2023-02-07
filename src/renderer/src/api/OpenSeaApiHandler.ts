import { SlugData } from "@renderer/interfaces/AutoBidInterfaces";
import axios from "axios";

const instance = axios.create();



export default class OpenSeaApiHandler {


    static async getFloorPrice(slug: string) {

        const key = "d0b6281e87d84702b020419fdf58ea81";
        const headers = { "Accept": "application/json", "X-API-KEY": key, }
        const url = `https://api.opensea.io/api/v1/collection/${slug}`;
        const response = await instance.get(url, { headers });
        const { data } = response;
        return data.collection.stats.floor_price;

    }

    static async getStartBid(slug: string){
        const etherConstant = (10) ** -18;

        const key = "d0b6281e87d84702b020419fdf58ea81";
        const headers = { "Accept": "application/json", "X-API-KEY": key, }
        const url = `https://api.opensea.io/v2/offers/collection/${slug}?order_by=eth_price&order_direction=asc`;
        const response = await instance.get(url, { headers });
        const { data } = response;
        const value = (data.offers[0].protocol_data.parameters.offer[0].startAmount) * etherConstant;
        return Number((value + 0.0001).toLocaleString('en', {maximumFractionDigits: 4}))

    }

    static async getSlugData(slug: string): Promise<SlugData>{
        const floorPrice = await this.getFloorPrice(slug);
        const startBid = await this.getStartBid(slug);
        return {floorPrice, startBid};
    }
}