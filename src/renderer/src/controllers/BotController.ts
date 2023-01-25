import BotService from "@renderer/services/BotService";

export interface Task {
    slug: string,
    priceLimit: number,
}

export default class BotController{
    

    static createTask(...tasks: Task[]){

        const params = tasks.map(task => Object.values(task).join(" ")).join(" y ");

        BotService.start("2", params, "n");
    }
}