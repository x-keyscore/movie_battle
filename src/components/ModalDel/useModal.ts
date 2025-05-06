import React, { useRef, useState, useEffect } from 'react';
import { ModalConfig, ModalProvide, ModalState, ModalEvents, ModalEventsDefine, ModalTools, ModalSlide } from './types';
import { EventsManager } from '../../services';

export function useModal(modalConfig: ModalConfig) {
	const modalEvents = useRef(new EventsManager<ModalEventsDefine>());
	const [modalState, setModalState] = useState<ModalState>({
		viewportWidth: modalConfig.maxWidth,
		isClosing: false,
		slidesSequence: [],
		slidesClosing: {
			id: "",
			maintainedInSeq: true
		}
	});

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				modalClose();
			}
		};

		const handleResize = () => setModalState(prevState => {
			return ({ ...prevState, viewportWidth: window.innerWidth });
		});

		document.addEventListener('keydown', handleKeyDown);
		window.addEventListener("resize", handleResize);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			window.removeEventListener("resize", handleResize);
		}
	}, []);

	const modalClose = () => {
		if (!modalConfig?.close) return ;
		setModalState(prevState => {
			return ({ ...prevState, isClosing: true });
		});
		setTimeout(() => {
			if (modalConfig.close) modalConfig.close();
		}, 120);
	};

	const slideOpen: ModalSlide['open'] = (id, isGroup) => {
		const sequence = modalState.slidesSequence;
		const presentInSeq = sequence.some((item) => item.id === id);

		if (!presentInSeq) {
			if (sequence.length && !sequence[sequence.length - 1].isGroup) {
				const closeId = sequence[sequence.length - 1].id;

				modalEvents.current.emit("CLOSE_SLIDE", { 
					id: closeId,
					maintainedInSeq: true
				});
			}

			setModalState(prevState => {
				return ({
					...prevState,
					slidesSequence: [...sequence, { id, isGroup }]
				});
			});
		} else {
			const startIndex = sequence.findIndex(slide => slide.id === id) + 1;
			for (let i = startIndex; i < sequence.length; i--) {
				if (sequence[i].isGroup || i == sequence.length - 1) {
					const closeId = sequence[i].id;

					modalEvents.current.emit("CLOSE_SLIDE", { 
						id: closeId,
						maintainedInSeq: false
					});
					break ;
				}
			}

			setModalState(prevState => {
				return ({
					...prevState,
					slidesSequence: [...sequence.slice(0, startIndex)]
				});
			});
		}
		if (modalConfig.debug) {
			setModalState(prevState => {
				console.count("======== Modal debug ========");
				console.log("Opening ID : " + id + " | isGroup : " + isGroup);
				console.log("Sequence :\n", prevState.slidesSequence);
				return (prevState);
			});
		}
		return (presentInSeq);
	}

	const slideDelete: ModalSlide['delete'] = (id) => {
		const sequence = modalState.slidesSequence;
		const presentInSeq = sequence.some((item) => item.id === id);
		
		if (presentInSeq) {
			setModalState(prevState => {
				return ({
					...prevState,
					slidesSequence: [...prevState.slidesSequence.filter(item => item.id !== id)],
				});
			});
		}
	}

	const modalTools: ModalTools = {
		close: modalClose
	}

	const modalSlide: ModalSlide = {
		open: slideOpen,
		delete: slideDelete
	}

	const modalProvide: ModalProvide = {
		modalConfig,
		modalState,
		modalTools,
		modalSlide,
		modalEvents,
	}

	return {
		modalState: modalState,
		modalProvide: modalProvide,
		modalTools: modalTools
	} as const;
}