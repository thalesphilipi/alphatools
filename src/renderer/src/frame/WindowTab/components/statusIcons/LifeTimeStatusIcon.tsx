import { styled } from "@renderer/config/stitches.config"

export default function LifeTimeStatusIcon() {
    return (
        <Wrapper>
            <Text>LIFE TIME</Text>
        </Wrapper>
    )
}


const Wrapper = styled('div', {
    width: 60,
    height: 15,
    background: '#C8B449',

    borderRadius: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    boxShadow: '0px 0px 6px rgba(213, 191, 74, 0.69)',
})

const Text = styled('p', {
    color: '#EFF7EE',

    fontFamily: 'Work Sans',
    fontWeight: 800,
    fontSize: 9,
    letterSpacing: '0.05em',
})