import { style } from '@vanilla-extract/css';
import { stylesVar } from '../../../styles';

const slideGroup = style({
	position: 'absolute',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: '100%',
	height: '100%'
});

const slideChild = style({
	position: 'absolute',
	display: 'flex',
	flexDirection: 'column',
	width: '100%',
	maxHeight: '90vh',
	borderRadius: 20,
	backgroundColor: stylesVar.color.bgZ2,
	transform: 'translateZ(0)'
});

export const slideStyles = {
	slideGroup,
	slideChild
}
