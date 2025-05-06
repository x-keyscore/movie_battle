import React from 'react';
import { slideStyles } from './styles.css'
import { PresetBoundaryBtnIcon, PresetBoundaryBtnIconProps } from './presets';

interface Props {
	title: string;
	warning: string;
	btnLeft?: PresetBoundaryBtnIconProps;
	btnRight?: PresetBoundaryBtnIconProps;
}

export function SlideHeader({ title, warning, btnLeft, btnRight }: Props) {
	return (
		<div className={slideStyles.header}>
			<div className={slideStyles.boundaryGrid}>
				<div className={slideStyles.boundaryGridLeft}>
					{ btnLeft ? <PresetBoundaryBtnIcon {...btnLeft} /> : null }
				</div>
				<div className={slideStyles.boundaryGridCenter}>
					<div className={slideStyles.headerTitle} id="window-title">
						{title}
					</div>
				</div>
				<div className={slideStyles.boundaryGridRight}>
					{ btnRight ? <PresetBoundaryBtnIcon {...btnRight} /> : null }
				</div>
			</div>
			<div className={slideStyles.headerWarning} style={{ maxHeight: warning ? "2em" : "0em"}}>
				{warning}
			</div>
		</div>
	);
}