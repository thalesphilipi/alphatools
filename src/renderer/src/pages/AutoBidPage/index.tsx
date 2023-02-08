import ContextHolder from "@renderer/components/frames/ContextHolder"
import { styled } from "@renderer/config/stitches.config"
import BidsContainer from "./components/BidsContainer"
import BidStartTab from "./components/BidStartTab"

export default function AutoBidPage() {

    return (
        <Wrapper>
            <BidStartTab />
            <BidsContainer />
        </Wrapper>
    )
}

const Wrapper = styled(ContextHolder, {
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',

    "@sm": {
        flexDirection: 'row',
    }
})


