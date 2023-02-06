import { Task } from "@renderer/interfaces/AutoBidInterfaces";
import BotService from "@renderer/services/BotService";

export default class BotController {


    static createTask(tasks: Task[]) {
        const mappedTask = tasks.map(({ slug, priceLimit, percent }) => {
            return {slug, priceLimit, percent}
        })
        const params = mappedTask.map(task => Object.values(task).join(" ")).join(" y ");
        return BotService.start("2", params, "n");
    }

    static stopTask(id: string) {
        BotService.stop(id);
    }

    static resumeTask(id: string, tasks: Task[]) {
        const mappedTask = tasks.map(({ slug, priceLimit, percent }) => {return {slug, priceLimit, percent} })
        const params = mappedTask.map(task => Object.values(task).join(" ")).join(" y ");
        BotService.resume(id, "2", params, "n");
    }
}