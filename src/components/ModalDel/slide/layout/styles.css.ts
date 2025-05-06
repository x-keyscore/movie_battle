import { style } from "@vanilla-extract/css"
import { stylesVar } from "../../../../styles";

const header = style({
	padding: "20px 20px 16px"
});

const headerTitle = style({
	color: stylesVar.color.text,
	fontSize: "26px",
	fontWeight: "600",
	textAlign: "center",
	textTransform: "uppercase"
});

const headerWarning = style({
	paddingTop: "4px",
	color: stylesVar.color.warn,
	fontSize: "15px",
	lineHeight: "15px",
	fontWeight: "500",
	textAlign: "center",
	overflow: "hidden",
	transition: "max-height 0.2s linear"
});

const footer = style({
	padding: "16px 20px 20px"
});

const boundaryGrid = style({
	display: "grid",
	gridTemplateColumns: "1fr auto 1fr",
	alignItems: "center",
	gap: "12px"
});
const boundaryGridLeft = style({
	justifySelf: "start"
});
const boundaryGridCenter = style({
	justifySelf: "center"
});
const boundaryGridRight = style({
	justifySelf: "end"
});
const boundaryBtnIcon = style({
	width: 36,
	height: 36
});
const boundaryBtnText = style({
	minWidth: 168,
	height: 40
});

const body = style({
	padding: "0 8%",
	minWidth: 320,
	boxSizing: "border-box",
	overflowY: "auto",
	overflowX: "auto"
});

const bodyDivider = style({
	display: "flex",
	alignItems: "center",
	color: stylesVar.color.text,
	fontWeight: "500",
	fontSize: "14px",
	letterSpacing: "0.03em",
	textTransform: "uppercase",
	marginBottom: "12px",
	"::after": {
		content: "",
		display: "inline-block",
		width: "100%",
		height: "1px",
		marginLeft: "8px",
		backgroundColor: stylesVar.color.action,
		flex: "1",
	},
	"selectors": {
		[`& ~ &`]: {
			marginTop: "12px",
		},
	},
});

const bodyContent = style({
	display: "flex",
	alignItems: "center",
	marginBottom: "16px",
	padding: "10px",
	borderRadius: "8px",
	boxSizing: "border-box",
	backgroundColor: stylesVar.color.bgZ0,
});

const bodyContentIcon = style({
	color: stylesVar.color.text,
	width: "22px",
	height: "22px",
	flexShrink: "0",
});

const bodyContentText = style({
	marginLeft: "8px",
	color: "var(--color-text-sub)",
	fontSize: "14px",
	fontWeight: "500",
});

/*-- INPUT MODE DEF --*/

const bodyVerticalInput = style({
	display: "flex",
	flexDirection: "column",
	alignItems: "start",
	paddingBottom: "12px"
});

const bodyHorizontalInput = style({
	display: "flex",
	flexDirection: "row-reverse",
	alignItems: "center",
	flexShrink: "0",
	paddingBottom: "12px"
});

/*-- INPUT GLOBAL DEF --*/

const bodyInputTitle = style({
	color: stylesVar.color.textSub,
	letterSpacing: "0.03em",
	textTransform: "uppercase",
	selectors: {
		[`${bodyVerticalInput} &`]: {
			display: "flex",
			flexWrap: "wrap",
			fontSize: "14px",
			fontWeight: "600",
			marginLeft: "8px",
			color: stylesVar.color.textSub
		},
		[`${bodyHorizontalInput} &`]: {
			minWidth: "100px",
			maxWidth: "40%",
			minHeight: "30px",
			boxSizing: "border-box",
			margin: "5px 10px 5px 4px",
			fontSize: "13px",
			fontWeight: "500",
			flexShrink: "0",
			transition: "height 0.15s ease-in-out",
			alignContent: "center"
		},
	}
});

const bodyInputTitleWarning = style({
	color: stylesVar.color.warn,
	letterSpacing: "initial",
	selectors: {
		[`${bodyVerticalInput} &:not(:empty)::before`]: {
			content: '"-"',
			margin: "0 4px"
		},
	}
});

const bodyInputSpacerGap = style({
	selectors: {
		[`${bodyVerticalInput} &`]: {
			marginBottom: "12px",
		},
	},
});

const bodyInputSpacerHead = style({
	selectors: {
		[`${bodyVerticalInput} &`]: {
			marginBottom: "8px"
		},
		[`${bodyHorizontalInput} &`]: {
			flex: "1",
			position: "relative",
			width: "100%",
			minWidth: "16px",
			height: "1px",
			backgroundColor: stylesVar.color.usable,
			transition: "background-color .15s ease-in-out"
		},
		[`${bodyHorizontalInput} &::before`]: {
			content: "",
			display: "block",
			height: "8px",
			width: "8px",
			borderRadius: "2px",
			transform: "translate(-50%,-50%)",
			position: "absolute",
			top: "50%",
			left: "4px",
			backgroundColor: stylesVar.color.usable,
			transition: "background-color .15s ease-in-out"
		},
		[`${bodyHorizontalInput} *:hover ~ &, ${bodyHorizontalInput} *:hover ~ &::before`]: {
			backgroundColor: stylesVar.color.action
		},
		[`${bodyHorizontalInput} *:focus-visible ~ &, ${bodyHorizontalInput} *:focus-visible ~ &::before`]: {
			backgroundColor: stylesVar.color.actionFocus
		},
		[`${bodyHorizontalInput} *.focus ~ &, ${bodyHorizontalInput} *.focus ~ &::before`]: {
			backgroundColor: stylesVar.color.actionFocus
		}
	},
});

const bodyInputSpacerFork = style({
	selectors: {
		[`${bodyVerticalInput} &`]: {
			marginBottom: "6px"
		},
		[`${bodyHorizontalInput} &`]: {
			position: "relative",
			width: "12px",
			height: "1px",
			flexShrink: "0.5",
			backgroundColor: stylesVar.color.usable,
			transition: "background-color .15s ease-in-out"
		},
		[`${bodyHorizontalInput} *:hover ~ &`]: {
			backgroundColor: stylesVar.color.action
		},
		[`${bodyHorizontalInput} *:focus-visible ~ &`]: {
			backgroundColor: stylesVar.color.actionFocus
		},
		[`${bodyHorizontalInput} *.focus ~ &`]: {
			backgroundColor: stylesVar.color.actionFocus
		}
	},
});

const bodyInputBtnDefault = style({
	get selectors() {
		return {
			[`${bodyVerticalInput} &`]: {
				width: "100%",
				height: "40px",
				padding: "6px 8px",
			},
			[`${bodyHorizontalInput} &`]: {
				width: "100%",
				height: "30px",
				padding: "0 8px",
			},
			[`${bodyHorizontalInput} &:has(+ ${bodyInputTypeText})`]: {
				width: "auto",
				borderTopLeftRadius: "0",
				borderBottomLeftRadius: "0"
			},
			[`${bodyHorizontalInput} ${bodyInputTypeText} + &`]: {
				borderRight: `1px solid ${stylesVar.color.usableBack}`,
				borderTopRightRadius: "0",
				borderBottomRightRadius: "0",
			}
		}
	},
});

const bodyInputBtnLink = style({
	"selectors": {
		[`${bodyVerticalInput} &`]: {
			fontSize: "14px",
			fontWeight: "500",
			margin: "4px"
		},
	},
});

const bodyInputTypeText = style({
	backgroundColor: stylesVar.color.usableBack,
	color: stylesVar.color.text,
	borderRadius: "8px",
	userSelect: "text",
	width: "100%",
	boxSizing: "border-box",
	transition: "border-color 0.15s ease-in-out",
	border: `2px solid ${stylesVar.color.usable}`,
	":disabled": {
		border: `2px solid ${stylesVar.color.usableBack}`
	},
	":focus": {
		borderColor: stylesVar.color.actionFocus
	},
	":hover": {
		borderColor: stylesVar.color.action
	},
	selectors: {
		"&[type='tel']": {
			maxWidth: "14ch"
		},
		"&:disabled:hover": {
			border: `2px solid ${stylesVar.color.usableBack}`
		},
		[`${bodyVerticalInput} &`]: {
			fontSize: "15px",
			padding: "10px"
		},
		[`${bodyHorizontalInput} &`]: {
			fontSize: "15px",
			padding: "4px 6px",
			height: "30px"
		},
		[`${bodyHorizontalInput} &:has(+ ${bodyInputBtnDefault})`]: {
			borderRight: `1px solid ${stylesVar.color.usableBack}`,
			borderTopLeftRadius: "0",
			borderBottomLeftRadius: "0",
		},
		[`${bodyHorizontalInput} ${bodyInputBtnDefault} + &`]: {
			borderTopRightRadius: "0",
			borderBottomRightRadius: "0"
		},
	}
});

const bodyInputTypeColor = style({
	backgroundColor: stylesVar.color.usableBack,
	color: stylesVar.color.text,
	height: "30px",
	borderRadius: "8px",
	userSelect: "text",
	width: "100%",
	maxWidth: "85px",
	boxSizing: "border-box",
	transition: "border-color 0.15s ease-in-out",
	border: `2px solid ${stylesVar.color.usable}`,
	":focus-visible": {
		borderColor: stylesVar.color.actionFocus,
	},
	":hover": {
		borderColor: stylesVar.color.action,
	},
	selectors: {
		[`${bodyVerticalInput} &`]: {
			width: "100%",
			minWidth: "70px",
			maxWidth: "85px",
			maxHeight: "35px"
		},
		[`${bodyHorizontalInput} &`]: {
			width: "100%",
			minWidth: "65px",
			maxWidth: "80px",
			maxHeight: "80px",
		},
	}
});

const bodyInputBtnPicture = style({
	position: "relative",
	width: 0,
	height: 0,
	transform: "translate(-15px, -25px)",
	"::before": {
		content: "",
		zIndex: -1,
		position: "absolute",
		top: 0,
		right: 0,
		width: 30,
		height: 30,
		borderRadius: "50%",
		transform: "translate(15px, -15px)",
		backgroundColor: stylesVar.color.usable,
		transition: "background-color 0.15s ease-in-out"
	},
	selectors: {
		[`&:hover::before`]: {
			backgroundColor: stylesVar.color.action
		},
		[`&:focus::before`]: {
			backgroundColor: stylesVar.color.actionFocus
		}
	}
});

const bodyInputTypePicture = style({
	cursor: "pointer",
	backgroundColor: stylesVar.color.usableBack,
	backgroundSize: "cover",
	backgroundRepeat: "no-repeat",
	boxSizing: "border-box",
	borderRadius: "8px",
	transition: "border-color 0.15s ease-in-out",
	border: `2px solid ${stylesVar.color.usable}`,
	":hover": {
		borderColor: stylesVar.color.action
	},
	":focus-visible": {
		borderColor: stylesVar.color.actionFocus
	},
	selectors: {
		[`${bodyVerticalInput} &`]: {
			width: "100%",
			minWidth: "70px",
			maxWidth: "85px",
			aspectRatio: "1 / 1"
		},
		[`${bodyHorizontalInput} &`]: {
			width: "80px",
			aspectRatio: "1 / 1"
		},
		[`${bodyHorizontalInput} ${bodyInputBtnPicture}:hover + &`]: {
			borderColor: stylesVar.color.action
		},
		[`${bodyHorizontalInput} ${bodyInputBtnPicture}:focus-visible + &`]: {
			borderColor: stylesVar.color.action
		}
	}
});

const bodyInputTypeSwitch = style({
	height: "var(--height)",
	width: "var(--width)",
	backgroundColor: stylesVar.color.usableBack,
	position: "relative",
	borderRadius: "8px",
	cursor: "pointer",
	border: `2px solid ${stylesVar.color.usable}`,
	transition: "border-color 0.15s ease-in-out",
	"::before": {
		content: "",
		height: "calc(var(--height) - 12px)",
		width: "calc(var(--height) - 12px)",
		transform: "translate(-50%,-50.5%)",
		position: "absolute",
		top: "50%",
		left: "calc((var(--height) - 6px) / 2 + 1px)",
		backgroundColor: stylesVar.color.usable,
		borderRadius: "4px",
		transition: "0.3s ease"
	},
	":hover": {
		borderColor: stylesVar.color.action
	},
	":focus-visible": {
		borderColor: stylesVar.color.actionFocus
	},
	selectors: {
		"&:checked::before": {
			backgroundColor: stylesVar.color.action,
			left: "calc(100% - (calc(var(--height) - 6px) / 2) - 1px)"
		},
		[`${bodyVerticalInput} &`]: {
			"vars": {
				"--height": "40px",
				"--width": "60px"
			}
		},
		[`${bodyHorizontalInput} &`]: {
			"vars": {
				"--height": "30px",
				"--width": "50px"
			}
		}
	}
});

export const slideStyles = {
	header,
	headerTitle,
	headerWarning,
	footer,
	boundaryGrid,
	boundaryGridLeft,
	boundaryGridCenter,
	boundaryGridRight,
	boundaryBtnIcon,
	boundaryBtnText,
	body,

	bodyDivider,

	bodyContent,
	bodyContentIcon,
	bodyContentText,

	bodyVerticalInput,
	bodyHorizontalInput,

	bodyInputTitle,
	bodyInputTitleWarning,

	bodyInputBtnDefault,
	bodyInputBtnLink,

	bodyInputSpacerGap,
	bodyInputSpacerHead,
	bodyInputSpacerFork,

	bodyInputTypeText,
	bodyInputTypeColor,
	bodyInputTypePicture,
	bodyInputBtnPicture,
	bodyInputTypeSwitch
}