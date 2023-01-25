import AnchorWrapper from "@renderer/components/AnchorWrapper"
import { styled } from "@renderer/config/stitches.config"
import { IconType } from "react-icons/lib"
import { NavLinkProps } from "react-router-dom"

interface NavButtonProps extends NavLinkProps{
    Icon?: IconType,
    name?: string,
    iconSize?: number,
} 

export default function NavButton({name, Icon, iconSize, ...props}: NavButtonProps) {
    return (
        <Wrapper {...props}>
            <IconHolder >{Icon && (<Icon fontSize={iconSize}/>)}</IconHolder>
            <LabelHolder>
                <Title>{name}</Title>
                <Status>2 Working</Status>
            </LabelHolder>
        </Wrapper>
    )
}

const Wrapper = styled(AnchorWrapper, {
    background: '#30383C',
    height: 56,

    boxSizing: 'border-box',
    padding: 8,

    display: 'flex',

    gap: 8,


    '&.active': {
        padding: 5,
    }
})


const IconHolder = styled('div', {
    width: 67,
    height: '100%',

    background: '#2A3236',

    borderRadius: 13,

    display: 'flex',

    justifyContent: 'center',
    alignItems: 'center',

    fontSize: 27,

    "& svg": {
        paddingBottom: 2,
    },

    ".active > &": {
        background: '#363F43',
        color: '#9FA3A5'
    }
})


const LabelHolder = styled('div', {
    flexGrow: 1,
    height: '100%',
    display: 'flex',

    justifyContent: 'center',
    alignItems: 'center',
    gap: 1,

    flexDirection: 'column',
})

const Title = styled('p', {
    fontFamily: "Work Sans",
    fontSize: 16,
    letterSpacing: '0.01em',
    fontWeight: 500,

    paddingBottom: 3,

    color: '#DDE0E1',

    ".active > div > &": {
        color: '#ffffff',

    }
})

const Status = styled('p', {
    fontFamily: "Work Sans",
    fontSize: 11,
    letterSpacing: '0.01em',
    fontWeight: 400,

    paddingBottom: 2,

    color: '#7D8388',

    ".active > div > &": {
        color: '#C0C7CB',


    }

})