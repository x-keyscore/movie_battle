import type { ImgHTMLAttributes } from "react";
import { useEffect, useState } from "react";
import styles from "./Image.module.css";

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
	isLazy?: boolean;
	/**
	 * Depending on the value :
	 * - `trusty`: display the image
	 * - `falsy`: does not display the image
	 * - `undefined`: waits until an image is loaded and ignores errors
	 */
	isAvailable: unknown;
}

const fallback = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";

export function Image({ src, isLazy, isAvailable, ...props }: ImageProps) {
	const [status, setStatus] = useState<"WAIT" | "DONE" | "VOID">(
		isAvailable === undefined || isAvailable ? "WAIT" : "VOID"
	);

	useEffect(() => {
		if (isAvailable === undefined || isAvailable) {
			setStatus("WAIT");
		} else {
			setStatus("VOID");
		}
	}, [isAvailable]);

	if (status === "VOID") {
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
					{...props}
				/>	
			</div>
		);
	}

	return (
		<div className={styles.wrapper}>
			{(isLazy && status === "WAIT") && (
				<div className={styles.placeholder}>
					<div className={styles.loading} />
				</div>
			)}
			<img
				src={isAvailable ? src : fallback}
				style={{
					opacity: status === "DONE" ? 1 : 0,
					transition: "opacity .10s ease-in"
				}}
				draggable="false"
				onLoad={() => isAvailable && setStatus("DONE")}
				onError={() => isAvailable && setStatus("VOID")}
				{...props}
			/>
		</div>
	);
}
