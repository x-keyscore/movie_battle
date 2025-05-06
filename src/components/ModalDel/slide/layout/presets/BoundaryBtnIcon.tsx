import React from "react";
import { PresetBoundaryBtnIconProps } from "./types";
import { stylesCommon } from '../../../../../styles';
import { slideStyles } from '../styles.css';
import { Svg } from "../../../../svg";

export function PresetBoundaryBtnIcon(props: PresetBoundaryBtnIconProps) {
	if (props.preset === "back") {
		return (
			<button
				className={stylesCommon.btnDefault + " " + slideStyles.boundaryBtnIcon}
				type="button"
				aria-label="Retour"
				onClick={props.onClick}>
				<Svg.Arrow className={stylesCommon.btnDefaultIcon} width={26} />
			</button>
		)
	} else if (props.preset === "next") {
		return (
			<button
				className={stylesCommon.btnDefault + " " + slideStyles.boundaryBtnIcon}
				type="button"
				aria-label="Suivant"
				onClick={props.onClick}>
				<Svg.Arrow className={stylesCommon.btnDefaultIcon} width={26} style={{transform: "rotate(180deg)"}} />
			</button>
		)
	} else if (props.preset === "close") {
		return (
			<button
				className={stylesCommon.btnDefault + " " + slideStyles.boundaryBtnIcon}
				type="button"
				aria-label="Fermer"
				onClick={props.onClick}>
				<Svg.Cross className={stylesCommon.btnDefaultIcon} width={18} />
			</button>
		)
	} else if (!props.preset) {
		return (props.component);
	}
}