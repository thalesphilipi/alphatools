import SquareFrame from "@renderer/components/frames/SquareFrame";
import { styled } from "@renderer/config/stitches.config";
import { selectUser } from "@renderer/redux/userSlice";
import { useSelector } from "react-redux";
import SettingsButton from "./components/SettingsButton";
import WalletInfo from "./components/WalletInfo";


export default function Footer(){
	return (
		<Wrapper>
			<WalletInfo accountAddress={useSelector(selectUser).walletAddress}/>
			<SettingsButton/>
		</Wrapper>
	)
}


const Wrapper = styled(SquareFrame, {
	display: "flex",
	alignItems: 'center',
	padding: '0 10px',
	gap: 10,
})
