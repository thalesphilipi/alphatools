import { styled } from "@renderer/config/stitches.config"
import FreeStatusIcon from "./statusIcons/FreeStatusIcon"
import LifeTimeStatusIcon from "./statusIcons/LifeTimeStatusIcon"
import VipStatusIcon from "./statusIcons/VipStatusIcon"

interface AccountStatusProps{
    value?: number,
}

export default function AccountStatus({value = 0} : AccountStatusProps) {

    return (
        <AccountStatusWrapper>
            <AccountStatusTitle>Account Status</AccountStatusTitle>
            {[<FreeStatusIcon />, <VipStatusIcon/>, <LifeTimeStatusIcon/>][value]}
        </AccountStatusWrapper>
    )
}


const AccountStatusWrapper = styled('div', {
    display: 'flex',
    justifyContent: 'center',
    gap: 10,
    alignItems: 'center',
    width: 160,
    height: '100%',
    
})

const AccountStatusTitle = styled('p', {
    fontFamily: 'DM Sans',
    fontWeight: 400,
    fontSize: 12,
    color: '#D3D4D5',
})

