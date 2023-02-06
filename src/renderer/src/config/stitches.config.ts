import { createStitches } from '@stitches/react';
import { CSS, PropertyValue } from "@stitches/react";
import Stitches from "@stitches/react/types/stitches";


const media = {
	sm: '(min-width: 1500px)',
};

const themeMap = {} as const;

const theme = {
};


const utils: Utils = {
	responsiveWidth: (width) => ({
		maxWidth: width,
		width: '100%'
	}),
	hover: styles => ({ "@media (hover: hover)": { "&:hover": styles } }),
	active: styles => ({ "&:active":  styles  }),
	focus: styles => ({ "&:focus":  styles  }),
	visited: styles => ({ "&:visited":  styles  }),
}


export const { styled, reset, config, globalCss } = createStitches({
	theme,
	media,
	utils,
})

type ThemedCSS = CSS<Stitches<"", typeof media, typeof theme, typeof themeMap, Utils>["config"]>;

type Utils = {
	responsiveWidth: (width: PropertyValue<"width">) => {},
	hover: (styles: ThemedCSS) => {},
	active: (styles: ThemedCSS) => {},
	focus: (styles: ThemedCSS) => {},
	visited: (styles: ThemedCSS) => {},
}