import React from 'react';
import { slideStyles } from './styles.css';
import { stylesCommon } from '../../../../styles';

interface Props {
	children: React.ReactNode;
}

export function SlideBody({ children }: Props) {
	return (
		<div className={slideStyles.body + " " + stylesCommon.scrollbar}>
			{children}
		</div>
	);
}