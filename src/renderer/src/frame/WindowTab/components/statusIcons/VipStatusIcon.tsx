import { styled } from "@renderer/config/stitches.config"

export default function VipStatusIcon() {
    return (
        <Wrapper>
            <Text>VIP</Text>
        </Wrapper>
    )
}


const Wrapper = styled('div', {
    width: 28,
    height: 15,
    background: '#5FAD57',

    borderRadius: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
})

const Text = styled('p', {
    color: '#EFF7EE',

    fontFamily: 'Work Sans',
    fontWeight: 800,
    fontSize: 9,
    letterSpacing: '0.14em',
    paddingLeft: 2,
})