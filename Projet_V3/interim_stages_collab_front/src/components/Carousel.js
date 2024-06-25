import React, { useState } from "react";
import { Spinner } from "./Spinner";

export const Carousel = ({ items, onClick }) => {
	const [selectedItem, setSelectedItem] = useState(null);

	const handleClick = (item, index) => {
		setSelectedItem(index);
		onClick(item);
	};

	return (
		<div className='flex'>
			<div className='flex space-x-4 overflow-x-auto max-w-screen'>
				<div className='flex space-x-4'>
					{items.map((item, index) => (
						<p
							key={index}
							onClick={() => handleClick(item, index)}
							className={`${
								selectedItem === index
									? "bg-bleuF text-white"
									: "bg-violet text-bleuF"
							} px-2 py-1 rounded-lg text-sm font-semibold cursor-pointer hover:filter hover:brightness-90 transition-all duration-300`}
						>
							{item}
						</p>
					))}
				</div>
			</div>
		</div>
	);
};
