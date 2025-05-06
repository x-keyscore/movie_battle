import { style, keyframes } from '@vanilla-extract/css';

const container = style({
	position: "absolute",
	top: "0",
	left: "0",
	display: "flex",
	justifyContent: "center",
	width: "100vw",
	height: "inherit",
	zIndex: "137"
});

const backdrop = style({
	position: "absolute",
	top: "0",
	left: "0",
	width: "100vw",
	height: "100%",
	background: "#000000",
	opacity: "0.8",
});

const opacityInKeyframes = keyframes({
	"from": {
		opacity: "0",
	},
});
const backdropFadeIn = style({
	animation: `${opacityInKeyframes} 0.15s both`
});

const opacityOutKeyframes = keyframes({
	"to": {
		opacity: "0",
	},
});
const backdropFadeOut = style({
	animation: `${opacityOutKeyframes} 0.15s both`
});

export const mask = style({
	position: "absolute",
	width: "100%",
	height: "100%",
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	overflow: "clip",
});

const scaleInKeyframes = keyframes({
	"0%": {
		opacity: "0.6",
		transform: "scale(0.8)",
	},
	"100%": {
		opacity: "1",
		transform: "scale(1)",
	},
});

export const maskFadeIn = style({
	animation: `${scaleInKeyframes} 0.15s cubic-bezier(0.25,0.46,0.45,0.94) both`
});

const scaleOutKeyframes = keyframes({
	"0%": {
		opacity: "1",
		transform: "scale(1)",
	},
	"100%": {
		opacity: "0",
		transform: "scale(0.6)",
	},
});
export const maskFadeOut = style({
	animation: `${scaleOutKeyframes} 0.25s cubic-bezier(0.25,0.46,0.45,0.94) both`
});

export const modalStyles = {
	container,
	backdrop,
	backdropFadeIn,
	backdropFadeOut,
	mask,
	maskFadeIn,
	maskFadeOut
}
