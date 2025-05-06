import React, { useRef, useState, useEffect } from "react";
import { slideStyles } from './slide.css'
import { useModalContext } from "../Modal";
import { SlideState } from "./types";
import { useTransition } from "../../../hooks/useTransition/useTransition";

const TRANSITION_DURATION = 250;
const GAP_SLIDE = 15;

interface SlideProps {
	children?: React.ReactNode;
	/** Defined if the component is open */
	isOpen: boolean;
	/** Defines whether the component is the first to be opened */
	isFirst?: boolean;
	/** Defines whether the component becomes a group of slide components */
	isGroup?: boolean;
}

export function Slide({ children, isOpen, isFirst = false, isGroup = false }: SlideProps) {
	const openCountRef = useRef<number>(0);
	const { modalConfig, modalSlide, modalEvents } = useModalContext();
	const { maxWidth: winMaxWidth } = modalConfig;
	const [slideState, setSlideState] = useState<SlideState>({
		id: Math.random().toString(36).substring(2, 9),
		isClose: true,
		isRender: isGroup ? false : true,
	});
	const [transitionState, transitionLaunch] = useTransition();

	useEffect(() => {
		const eventId = modalEvents.current.on("CLOSE_SLIDE", ({ id, maintainedInSeq }) => {
			if (id !== slideState.id) return ;

			transitionLaunch({
				from: {
					x: 0,
					opacity: 1
				},
				to: {
					x: maintainedInSeq ? ((winMaxWidth + GAP_SLIDE) * -1) : (winMaxWidth + GAP_SLIDE),
					opacity: 0
				},
				duration: TRANSITION_DURATION
			});
			setTimeout(() => {
				setSlideState((prevState) => ({
					...prevState,
					isClose: true,
					isRender: isGroup ? false : true
				}));
			}, TRANSITION_DURATION + 100);
		});

		return (() => {
			modalEvents.current.off("CLOSE_SLIDE", eventId);
			modalSlide.delete(slideState.id);
			openCountRef.current = 0;
		})
	}, [])

	useEffect(() => {
		if (isOpen) {
			const presentInSeq = modalSlide.open(slideState.id, isGroup);
			openCountRef.current = openCountRef.current + 1;

			setSlideState((prevState) => {
				return {
					...prevState,
					isRender: true,
					isClose: false
				}
			});

			let disableAnimation = false;
			if ((isFirst && openCountRef.current < 2) || isGroup) {
				disableAnimation = true;
			}
			transitionLaunch({
				from: {
					x: presentInSeq ? ((winMaxWidth + GAP_SLIDE) * -1) : (winMaxWidth + GAP_SLIDE),
					opacity: 0
				},
				to: {
					x: 0,
					opacity: 1
				},
				duration: TRANSITION_DURATION,
				disableAnimation
			});
		}
	}, [isOpen]);

	var style: React.CSSProperties = {
		opacity: transitionState.opacity,
		transform: "translateX(" + transitionState.x + "px)",
		maxWidth: winMaxWidth + "px"
	};

	if (slideState.isClose) style.pointerEvents = 'none';
	if (!slideState.isRender) return (null);
	return (
		<div
			data-id={slideState.id}
			onClick={e => e.stopPropagation()}
			className={`${!isGroup ? slideStyles.slideChild : slideStyles.slideGroup}`}
			style={style}
		>
			{children}
		</div>
	);
}