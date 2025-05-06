import React, { createContext, useContext } from "react";
import { createPortal } from "react-dom";
import { modalStyles } from "./modal.css";
import { slideStyles } from "./slide/slide.css";
import { slideStyles as slideLayoutStyles } from "./slide/layout/styles.css";
import { ModalProvide } from "./types";
import styles from "./Modal.module.css";
import clsx from "clsx";

export const ModalContext = createContext<ModalProvide | null>(null);

export function useModal() {
	const value = useContext(ModalContext);
	if (value === null) {
		throw new Error("Value is null");
	}
	return (value);
}

interface ModalProps {
	children?: React.ReactNode;
	modalProvide: ModalProvide;
}

export function Modal({ modalProvide, children }: ModalProps) {
	const { modalConfig, modalState, modalTools } =  modalProvide;

	const mediaQueryStyles = (`
		@media (max-width: ${modalConfig.maxWidth}px) {
			.${modalStyles.backdrop} {
				display: none;
			}
			.${modalStyles.mask} {
				background-color: ${stylesVar.color.bgZ2};
			}
			.${slideStyles.slideChild} {
				height: 100%;
				max-height: 100vh;
				justify-content: start;
				border-radius: 0;
			}
			.${slideLayoutStyles.body} {
				padding: 8px 4%;
			}
		}
	`)

	const maskStyle = {
		maxWidth: (modalConfig.maxWidth * 2) + "px",
	}

	return (
		createPortal(
			<ModalContext.Provider value={modalProvide}>
				<div
					id="root-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"
					className={modalStyles.container}
					
				>
					<style>{mediaQueryStyles}</style>
					{
						(modalConfig.usedBackdrop) &&
						<div
							className={clsx(styles.backdrop, modalState.isClosing ? styles.fadeOut : styles.fadeIn)}
							onClick={e => {
								e.stopPropagation();
								modalTools.close();
							}}
						>
						</div>
					}
					<div
						className={modalStyles.mask + ` ${modalState.isClosing ? modalStyles.maskFadeOut : modalStyles.maskFadeIn}`}
						style={maskStyle}
					>
						{children}
					</div>
				</div>
			</ModalContext.Provider>,
			document.body!
		)
	);
}