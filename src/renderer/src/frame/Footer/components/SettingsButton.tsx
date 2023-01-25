import AnchorWrapper from "@renderer/components/AnchorWrapper";
import { useState } from "react";
import { styled } from "@renderer/config/stitches.config";
import { IoMdSettings } from 'react-icons/io'

export default function SettingsButton() {
    const [selected, setSelected] = useState(false);
    return (
        <Wrapper to={"/config"} onClick={() => setSelected(!selected)}>
            <IoMdSettings />
        </Wrapper>
    )
}


const Wrapper = styled(AnchorWrapper, {
    width: 45,
    height: 45,
    flexShrink: 0,
    fontSize: 24,
})
