import type { ImgHTMLAttributes } from "react";
import { useState } from "react";
import styles from "./Image.module.css";
import brandLogo from "../../assets/images/brand-logo.png";

interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "className"> {
	styles?: {
        box?: string;
        img?: string;
    };
	/** **Default:** `false` */
	draggable?: ImgHTMLAttributes<HTMLImageElement>['draggable'];
	/** **Default:** `true` */
	isWaitable?: boolean;
	/**
	 * **Default:** `true`
	 * 
	 * - `trusty`: Display the image
	 * - `falsy`: Display the placeholder
	 * - `undefined` or `null`: Display the loader
	 */
	isLoadable?: unknown;
}

function prepareProps(props: ImageProps) {
	props = { ...props };
	if (!("draggable" in props)) props.draggable = false;
	if (!("isWaitable" in props)) props.isWaitable = true;
	if (!("isLoadable" in props)) props.isLoadable = true;
	return (props);
}

export function Image(props: ImageProps) {
	const { styles: customStyles, isWaitable, isLoadable, ...attributes } = prepareProps(props);
	const [isLoading, setIsLoading] = useState<null | boolean>(
		(isLoadable != null && !isLoadable) ? null : true
	);

	if ((isLoadable !== undefined && !isLoadable) || isLoading === null) {
		return (
			<div className={customStyles?.box}>
				<div className={styles.placeholder}>
					<img
						className={styles.unavailable}
						src={brandLogo}
						draggable="false"
					/>
				</div>
			</div>
		);
	}

	return (
		<div className={customStyles?.box}>
			{((isWaitable !== false && isLoading) || isLoadable === undefined) && (
				<div className={styles.placeholder}>
					<div className={styles.loading} />
				</div>
			)}
			<img
				className={customStyles?.img}
				style={{
					opacity: isLoading ? 0 : 1,
					transition: "opacity .10s ease-in"
				}}
				onLoad={() => setIsLoading(false)}
				onError={() => setIsLoading(null)}
				{...attributes}
			/>
		</div>
	);
}