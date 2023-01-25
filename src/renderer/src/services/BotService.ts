import childProcessType from "child_process";
// import type pathType from 'path';
import { nanoid } from 'nanoid';


const ChildProcess: typeof childProcessType = require('child_process');
// const path: typeof pathType = require('path');

export default class BotService {

	static botsId: string[] = []

	static start(...params: string[]) {
		const id = nanoid(21);
		const name = "AlphaBot-" + id;
		ChildProcess.exec(`start "${name}" .\\resources\\bot\\bot.exe ${params.join(" ")}`);
		this.botsId.push(id);
		return id;
	}

	static stop(id: string) {
		if (this.botsId.includes(id)) {
			ChildProcess.exec(`taskkill /FI "WindowTitle eq ${"AlphaBot-" + id}" /T /F`)
		}
	}

	static async stopAll() {
		this.botsId.forEach( async (id) => ChildProcess.execSync(`taskkill /FI "WindowTitle eq ${"AlphaBot-" + id}" /T /F`))
	}

}
