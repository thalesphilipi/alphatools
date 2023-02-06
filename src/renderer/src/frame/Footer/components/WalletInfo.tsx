import WalletApiHandler from "@renderer/api/WalletApiHandler";
import { styled } from "@renderer/config/stitches.config";
import { useMemo } from "react";
import { FaEthereum } from 'react-icons/fa';
import { useQuery } from "react-query";
import Web3 from "web3";


interface WalletInfoProps {
    accountAddress?: string
}
export default function WalletInfo({ accountAddress = "0x0000000000000000000000000000000000000000" }: WalletInfoProps) {
    const isValidAddress = useMemo(() => Web3.utils.isAddress(accountAddress), [accountAddress]);

    const {data} = useQuery(['user', accountAddress,  'wallet'], () => WalletApiHandler.getBalance(accountAddress), {
        refetchInterval: 5000,
        enabled: isValidAddress,
    })

    return (
        <Wrapper>
            <BalanceContainer>
                <IconHolder>
                    <EtherIcon />
                </IconHolder>
                <BalanceHolder>
                    <BalanceValue>
                        {data || "-------"}
                    </BalanceValue>
                    <MonetaryUnit>
                        WETH
                    </MonetaryUnit>
                </BalanceHolder>
            </BalanceContainer>
            <AccountAddress>
                {isValidAddress ? accountAddress : "0x00000000000000000000000000000000000000000"}
            </AccountAddress>
        </Wrapper>
    )
}


const Wrapper = styled('div', {
    height: 45,
    flexGrow: 1,
    display: "flex",
    flexDirection: 'column',
    alignItems: 'center',

    WebkitUserSelect: 'none',

})

const BalanceContainer = styled('div', {

    height: 28,
    color: '#C0C7CB',
    display: 'flex',
    justifyContent: "center",
    alignItems: 'center',
    width: '100%',
})

const IconHolder = styled('div', {
    display: 'flex',
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 5,
})
const EtherIcon = styled(FaEthereum, {
    color: '#DB91D5',
    fontSize: 18,
    paddingBottom: 1,

})
const BalanceHolder = styled('div', {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    textAlign: 'center',
    fontFamily: 'DM Sans',
    fontSize: 15,
    paddingRight: 5,
})
const BalanceValue = styled('p', {
    fontWeight: 400,
})

const MonetaryUnit = styled('p', {
    fontWeight: 700,

})

const AccountAddress = styled('p', {
    color: '#586369',
    width: 140,
    textOverflow: "ellipsis",
    overflow: 'hidden',

    fontFamily: 'DM Sans',
    fontWeight: '500',
    fontSize: 12,

    cursor: 'pointer',

    borderRadius: 4,
    padding: '0 5px',
    paddingRight: 0,
    hover: {
        background: '#7E868B1e',
    }
})
