import React from "react";
import { PresetBoundaryBtnTextProps } from "./types";
import { stylesCommon } from '../../../../../styles';
import { slideStyles } from '../styles.css';

export function PresetBoundaryBtnText(props: PresetBoundaryBtnTextProps) {
	if (props.preset === "submit") {
		return (
			<button
				className={stylesCommon.btnDefault + " " + slideStyles.boundaryBtnText}
				type="button"
				aria-label={props.ariaLabel || props.text}
				onClick={props.onClick}
			>
				<div className={stylesCommon.btnDefaultText}>{props.text}</div>
			</button>
		)
	} else if (!props.preset) {
		return (props.component);
	}
}