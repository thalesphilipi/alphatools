
import { Outlet } from "react-router-dom";
import SquareFrame from "./components/SquareFrame";
import { globalCss, styled } from "./config/stitches.config";
import Footer from "./frame/Footer";
import WindowTab from "./frame/WindowTab";
import BotService from "./services/BotService";
import "./assets/fonts/fonts.css"
import WalletApiHandler from "./api/WalletApiHandler";
import SideScreen from "./frame/SideScreen";

const electron = require('electron')

electron.ipcRenderer.on("tryClose", _ => {
	BotService.stopAll().then(() => electron.ipcRenderer.send("forceClose"));
})

const globalStyle = globalCss({
	"*:focus": {
		outline: "none",
	}
})

function App(): JSX.Element {
	globalStyle();

	WalletApiHandler.getTest();
	return (
		<Window>
			<WindowTab />
			<MainContent>
				<SideScreen />
				<Context>
					<Outlet />
				</Context>
				<Footer />
			</MainContent>
		</Window>
	)
}

const Window = styled('section', {
	width: '100vw',
	height: '100vh',
})

const MainContent = styled('div', {
	width: '100%',
	height: 'calc(100% - 33px)',

	boxSizing: "border-box",

	padding: 17,

	display: "grid",
	gridTemplateColumns: '230px 1fr',
	gridTemplateRows: '1fr 60px',
	gridGap: '15px',
})




const Context = styled(SquareFrame, {
	gridRowStart: 1,
	gridRowEnd: 3,
	gridColumnStart: 2,
	overflow: 'hidden',
})
export default App
