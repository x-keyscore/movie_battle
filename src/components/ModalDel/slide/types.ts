export interface SlideState {
	id: string;
	isClose: boolean;
	isRender: boolean;
};

export type SetSlideState = React.Dispatch<React.SetStateAction<SlideState>>;