import SquareFrame from "@renderer/components/SquareFrame"
import { styled } from "@renderer/config/stitches.config"
import NavButton from "./components/NavButton"
import {AiFillGold} from 'react-icons/ai'
import {RiTShirtFill} from 'react-icons/ri'

export default function SideScreen() {

    return (
        <Wrapper>
            <NavButton to={"/"} name={"Auto Bid"} Icon={AiFillGold}/>
            <NavButton to={"/traitBid"} name={"Trait Bid"} Icon={RiTShirtFill} iconSize={21}/>

        </Wrapper>
    )
}


const Wrapper = styled(SquareFrame, {
    width: '100%',
    height: '100%',

    boxSizing: 'border-box',

    padding: 10,
    display: "flex",
    flexDirection: 'column',
    gap: 10,
})

