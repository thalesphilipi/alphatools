import { styled } from "@stitches/react";

const ButtonWrapper = styled('button', {

    background: '#30383C',
    borderRadius: 9,
    border: 0,


    cursor: 'pointer',

    color: '#7E868B',

    fontSize: 24,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',


    variants: {
        selected: {
            true:{
                background: '#40494E',
                border: '3px solid #4B545999',
            },
        },
    },
    defaultVariants: {
            selected: false,
    }
})

export default ButtonWrapper;