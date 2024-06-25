import React from "react";
import {
	FacebookShareButton,
	TwitterShareButton,
	LinkedinShareButton,
	FacebookIcon,
	TwitterIcon,
	LinkedinIcon,
} from "react-share";

export const ShareButtons = ({ url, title, description }) => {
	return (
		<div>
			{/* Bouton de partage Facebook */}
			<FacebookShareButton url={url} quote={title}>
				<FacebookIcon size={30} className='rounded-l' />
			</FacebookShareButton>

			{/* Bouton de partage Twitter */}
			<TwitterShareButton url={url} title={title}>
				<TwitterIcon size={30} />
			</TwitterShareButton>

			{/* Bouton de partage LinkedIn */}
			<LinkedinShareButton url={url} title={title} summary={description}>
				<LinkedinIcon size={30} className='rounded-r' />
			</LinkedinShareButton>
		</div>
	);
};
