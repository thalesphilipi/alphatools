import { styled } from "@renderer/config/stitches.config"

export default function FreeStatusIcon() {
    return (
        <Wrapper>
            <Text>FREE</Text>
        </Wrapper>
    )
}


const Wrapper = styled('div', {
    width: 32,
    height: 15,
    background: '#4d5087',

    borderRadius: 2,
})

const Text = styled('p', {
    color: '#B6B6C5',
    
    width: '100%',
    height: '100%',

    fontFamily: 'Work Sans',
    fontWeight: 800,
    fontSize: 9,
    display: 'flex',

    justifyContent: 'center',
    alignItems: 'center',
})