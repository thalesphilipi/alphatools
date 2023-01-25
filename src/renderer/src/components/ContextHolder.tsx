import { styled } from "@stitches/react";


const ContextHolder = styled('section', {
    width: '100%', 
    height: '100%', 
    
    overflowY: "scroll",

    "&::-webkit-scrollbar":{
        display: "none",
    },
})

export default ContextHolder;