import { styled } from "@renderer/config/stitches.config";
import { HiIdentification } from 'react-icons/hi2';
import { RiKeyFill } from 'react-icons/ri';
import ConfigContainer from "./components/ConfigContainer";
import { useSelector, useDispatch } from "react-redux";
import { changeAddress, changeWallet, selectUser } from "@renderer/redux/userSlice";
import ContextHolder from "@renderer/components/frames/ContextHolder";

export default function ConfigPage(){
    const dispatch = useDispatch();
    return (
        <Wrapper>
            <ConfigContainer secure Icon={KeyIcon} initialValue={useSelector(selectUser).walletKey} saveHandler={(text) => dispatch(changeWallet(text))}>Wallet Private Key</ConfigContainer>
            <ConfigContainer Icon={HiIdentification} initialValue={useSelector(selectUser).walletAddress} saveHandler={(text) => dispatch(changeAddress(text))}>Address</ConfigContainer>
        </Wrapper>
    )
}

const KeyIcon = styled(RiKeyFill, {
    paddingBottom: 2,
})

const Wrapper = styled(ContextHolder, {
    display: "flex",


    boxSizing: 'border-box',
    padding: 13,

    justifyContent: 'center',
    alignContent: 'flex-start',

    flexWrap: 'wrap',
    gap: 20,
})
