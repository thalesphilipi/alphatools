import { styled } from "@renderer/config/stitches.config"
import { IoCloseOutline } from "react-icons/io5"
import { BiFullscreen, BiExitFullscreen } from "react-icons/bi"
import { FaRegWindowMinimize } from "react-icons/fa"
import WindowController from "@renderer/controllers/WindowController"
import { useState, useEffect } from "react"
const {ipcRenderer} = require('electron');


export default function ControlButtons() {

    const [isMaximized, setIsMaximized] = useState<boolean>();

    useEffect(() => {
        ipcRenderer.on('window-maximized', () => setIsMaximized(true));
        ipcRenderer.on('window-unmaximized', () => setIsMaximized(false));
    }, [])

    return (
        <ControlButtonsWrapper >
            <ButtonHolder tabIndex={-1} onClick={WindowController.minimizeApp}><MinimizeIcon /></ButtonHolder>
            {
                isMaximized ?
                <ButtonHolder tabIndex={-1} onClick={WindowController.unMaximizeApp}><UndoMaximizeIcon /></ButtonHolder>
                :
                <ButtonHolder tabIndex={-1} onClick={WindowController.maximizeApp}><MaximizeIcon /></ButtonHolder>
            }
            <ExitButtonHolder tabIndex={-1} onClick={WindowController.closeApp}>
                <CloseIcon />
            </ExitButtonHolder>
        </ControlButtonsWrapper>
    )
}


const ControlButtonsWrapper = styled('div', {
    display: 'flex',
    height: '100%',
    WebkitAppRegion: 'no-drag',
    WebkitUserSelect: 'none'
})

const ButtonHolder = styled('button', {
    width: 38,
    height: '100%',
    border: 0,
    background: 'none',
    WebkitUserSelect: 'none',
    hover: {
        background: '#464E52'
    }
})

const ExitButtonHolder = styled(ButtonHolder, {
    background: '#B14848',
    width: 43,
    paddingRight: 2,
    hover: {
        background: '#A93D3D',
    }
})

const CloseIcon = styled(IoCloseOutline, {
    fontSize: 22,
    color: '#f0f0f0',
})

const MinimizeIcon = styled(FaRegWindowMinimize, {
    fontSize: 13,
    color: '#C9C9C9',
})

const MaximizeIcon = styled(BiFullscreen, {
    fontSize: 16,
    color: '#C9C9C9',
})

const UndoMaximizeIcon = styled(BiExitFullscreen, {
    fontSize: 20,
    color: '#C9C9C9',
})
