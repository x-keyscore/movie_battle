import React from 'react';
import { slideStyles } from './styles.css'
import { PresetBoundaryBtnIcon, PresetBoundaryBtnText, PresetBoundaryBtnIconProps, PresetBoundaryBtnTextProps } from './presets'

interface Props {
	btnLeft?: PresetBoundaryBtnIconProps;
	btnCenter?: PresetBoundaryBtnTextProps;
	btnRight?: PresetBoundaryBtnIconProps;
}

export function SlideFooter({ btnLeft, btnCenter, btnRight }: Props) {
	return (
		<div className={slideStyles.footer}>
			<div className={slideStyles.boundaryGrid}>
				<div className={slideStyles.boundaryGridLeft}>
					{ btnLeft ? <PresetBoundaryBtnIcon {...btnLeft} /> : null }
				</div>
				<div className={slideStyles.boundaryGridCenter}>
					{ btnCenter ? <PresetBoundaryBtnText {...btnCenter} /> : null }	
				</div>
				<div className={slideStyles.boundaryGridRight}>
					{ btnRight ? <PresetBoundaryBtnIcon {...btnRight} /> : null }	
				</div>
			</div>
		</div>
	);
}