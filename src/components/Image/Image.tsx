import type { ImgHTMLAttributes } from "react";
import { useState, useEffect } from "react";
import styles from "./Image.module.css";

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
	/** **Default:** `true` */
	isLazy?: boolean;
	/**
	 * **Default:** `true`
	 * 
	 * - `trusty`: display the image
	 * - `falsy`: does not display the image
	 * - `undefined`: waits until an image is loaded and ignores errors
	 */
	isAvailable?: unknown;
}

const fallback = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

export function Image(props: ImageProps) {
	if (!("isAvailable" in props)) props.isAvailable = true;
	const { src, isLazy, isAvailable, ...attributes } = props;
	const [isLoading, setIsLoading] = useState<null | boolean>(
		(isAvailable !== undefined && !isAvailable) ? null : true
	);

	useEffect(() => {
		setIsLoading(true);
	}, [src]);

	if ((isAvailable !== undefined && !isAvailable) || isLoading === null) {
		return (
			<div className={styles.wrapper}>
				<div className={styles.placeholder}>
					<img
						className={styles.unavailable}
						src="/icons/brand-logo.png"
					/>
				</div>
				<img
					src={fallback}
					draggable="false"
					{...attributes}
				/>
			</div>
		);
	}

	return (
		<div className={styles.wrapper}>
			{(isLazy !== false && isLoading) && (
				<div className={styles.placeholder}>
					<div className={styles.loading} />
				</div>
			)}
			{isAvailable === undefined ? (
				<img
					src={fallback}
					draggable="false"
					{...attributes}
				/>
			) : (
				<img
					src={src}
					style={{
						opacity: isLoading ? 0 : 1,
						transition: "opacity .10s ease-in"
					}}
					draggable="false"
					onLoad={() => setIsLoading(false)}
					onError={() => setIsLoading(null)}
					{...attributes}
				/>
			)}
		</div>
	);
}
