import type { ImgHTMLAttributes } from "react";
import { useState } from "react";
import styles from "./Image.module.css";

export function Image({ ...props }: ImgHTMLAttributes<HTMLImageElement>) {
	const [loading, setLoading] = useState(true);

	return (
		<>
			{loading && (
				<div className={styles.content}>
					<div className={styles.loader} />
				</div>
			)}
			<img
				style={{
					opacity: loading ? 0 : 1,
					transition: "opacity .50s ease-in-out",
				}}
				onLoad={() => setLoading(false)}
				{...props}
			/>
		</>
	);
} //onLoad={() => setLoading(false)}
