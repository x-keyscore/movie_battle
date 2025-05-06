import React from "react";

type PresetBoundaryBtnPersProps = {
	preset?: never;
	component: React.JSX.Element;
}

export type PresetBoundaryBtnIconProps = {
	preset: "back" | "next" | "close";
	onClick: React.MouseEventHandler<HTMLButtonElement>;
} | PresetBoundaryBtnPersProps;

export type PresetBoundaryBtnTextProps = {
	preset: "submit";
	text: string;
	ariaLabel?: React.AriaAttributes['aria-label'];
	onClick: React.MouseEventHandler<HTMLButtonElement>;
} | PresetBoundaryBtnPersProps;