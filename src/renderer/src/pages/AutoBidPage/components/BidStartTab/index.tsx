import ButtonWrapper from "@renderer/components/ButtonWrapper";
import { styled } from "@renderer/config/stitches.config";
import { BotInstanceInterface } from "@renderer/interfaces/AutoBidInterfaces";
import { clearAddedTasks, selectAutoBidCreation } from "@renderer/redux/autoBidCreationSlice";
import { createInstance } from "@renderer/redux/autoBidInstancesSlice";
import { BsFillPlayFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import InputWrapper from "./compontens/InputWrapper";
import SelectedTasks from "./compontens/SelectedTasks";

export default function BidStartTab() {

	const tasks = useSelector(selectAutoBidCreation).addedTasks;
	const dispatch = useDispatch();

	function handleStartBot(){
		if(tasks.length > 0){
			dispatch(createInstance(tasks));
			dispatch(clearAddedTasks());
		}
	}
	
	return (
		<Wrapper>
			<InputWrapper />
			<SelectedTasks/>

			<StartButton onClick={handleStartBot}>
				<BsFillPlayFill />
			</StartButton>
		</Wrapper>
	)
}
const Wrapper = styled('section', {
	display: "flex",
	justifyContent: "flex-start",
	alignItems: 'center',
	background: '#363F43',
	borderBottom: '2px solid #3D464B',
	boxSizing: 'border-box',
	flexDirection: 'column',
	maxHeight: "75vh",
	gap: 12,

	padding: 12,

	"@sm": {
		width: '50%',
		borderBottom: 0,
		borderRight: '2px solid #3D464B',
		maxHeight: 'unset',
	}
})


const StartButton = styled(ButtonWrapper, {
	height: 34,
	responsiveWidth: 597,
	borderRadius: 5,

	background: '#60AF71',
	color: '#F3F3F3',
	fontSize: 24,

	"@sm": {
		maxWidth: 'unset',
	}
})
