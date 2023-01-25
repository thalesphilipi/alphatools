import { styled } from "@stitches/react";
import { NavLink } from "react-router-dom";

const AnchorWrapper = styled(NavLink, {

    background: '#30383C',
    borderRadius: 9,
    border: 0,


    cursor: 'pointer',

    color: '#7E868B',

    boxSizing: "border-box",

    WebkitUserSelect: 'none',
    WebkitUserDrag: 'none',



    fontSize: 24,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    hover: {
        border: 0,
        background: '#333c40',
    },

    "&.active": {
        background: '#40494E',
        border: '3px solid #4B545999',
        cursor: 'default'
    }
})

export default AnchorWrapper;