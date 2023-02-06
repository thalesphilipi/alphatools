import { styled } from "@renderer/config/stitches.config"



interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string,
    divStyle?: React.CSSProperties,
    isError?: boolean,
}

export default function InputField({ label, isError, divStyle, ...props }: InputProps) {

    return (
        <Wrapper style={divStyle}>
            <Label>{label}</Label>
            <Input readonly={props.readOnly} spellCheck={false} isError={isError} {...props}/>
        </Wrapper>
    )
}


const Wrapper = styled('div', {
    borderRadius: 5,
    background: '#2C3438',
    height: 36,
    display: "flex",
    overflow: 'hidden',
    justifyContent: 'flex-start',
})

const Label = styled("p", {
    display: "flex",
    justifyContent: 'center',
    alignItems: "center",

    boxSizing: "border-box",
    padding: '0 12px',
    paddingBottom: 2,

    fontFamily: 'Work Sans',
    fontWeight: 600,
    fontSize: 13,
    letterSpacing: '0.1em',

    color: '#B1B3B4',
    background: '#293034',

    whiteSpace: 'nowrap',
    borderRight: '2px solid #3B4145',
})

const Input = styled('input', {
    height: '100%',
    width: '100%',
    background: 'transparent',
    boxSizing: 'border-box',
    padding: "0 10px",
    paddingBottom: 2,

    fontFamily: 'DM Sans',
    fontWeight: 600,
    fontSize: 13,
    letterSpacing: "0.145em",

    color: "#909599AA",

    textAlign: 'center',
    '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button':{
        WebkitAppearance: 'none',
    },
    variants: {
        readonly: {
            true: {
                background: '#464E52',
            }
        },
        isError:{
            true: {
                background: '#342B2D'
            }
        }
    }
})