export interface Task {
    slug: string,
    priceLimit: number,
    startBid: number,
    percent: number,
}

export interface SlugData {
    floorPrice: number,
    startBid: number
}
export interface InfoTask extends Task {
    floorPrice: number,
}

export interface BotInstanceInterface {
    id: string,
    running: boolean,
    timerCountSeconds: number,
    tasks: Task[],
}
