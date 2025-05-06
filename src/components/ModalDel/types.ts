import { RefObject } from "react";
import { EventCallback, EventsDefineNames, EventsManager } from "../../services";

export interface ModalConfig {
	/** Set maximum modal width. `px` */
	maxWidth: number;
	/** Activate the opaque background behind the modal. */
	usedBackdrop: boolean;
	/** Function for closing the modal. */
	close?: () => void;
	debug?: boolean;
}

export interface ModalState {
	isClosing: boolean;
	viewportWidth: number;
	slidesSequence: {
		id: string;
		isGroup: boolean;
	}[];
	slidesClosing: {
		id: string;
		maintainedInSeq: boolean;
	};
}
export type SetModalState = React.Dispatch<React.SetStateAction<ModalState>>;

export type ModalSlide = {
	open: (id: string, isGroup: boolean) => boolean;
	delete: (id: string) => void;
}

export type ModalEventsDefine = [
	{ name: "CLOSE_SLIDE", data: { id: string, maintainedInSeq: boolean } },
];

export type ModalEvents = RefObject<EventsManager<ModalEventsDefine>>;

export type ModalTools = {
	close: () => void;
}

export type ModalProvide = {
	modalConfig: ModalConfig;
	modalState: ModalState;
	modalSlide: ModalSlide;
	modalTools: ModalTools;
	modalEvents: ModalEvents;
}
