import { styled } from "@renderer/config/stitches.config"
import AccountStatus from "./components/AccountStatus"
import ControlButtons from "./components/ControlButtons"
import Logo from "./components/Logo"



export default function WindowTab() {
    return (
        <WindowTabWrapper>
            <Logo version={process.env.npm_package_version}/>
            <AccountStatus value={0}/>
            <ControlButtons />
        </WindowTabWrapper>
        )
}

const WindowTabWrapper = styled('div', {
    display: 'flex',
    justifyContent: 'space-between',

    width: '100%',
    height: 32,
    background: '#30383C',
    WebkitUserSelect: 'none',
    WebkitAppRegion: 'drag',

    borderBottom: '1px solid #FC9927',
    boxShadow: '0px 4px 6px rgba(252, 153, 39, 0.25)'
})


