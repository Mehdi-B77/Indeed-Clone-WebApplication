import React from "react";
import amazon from "../assets/amazon.png";
import tiktok from "../assets/tiktok.png";
import adidas from "../assets/adidas.png";
import netflix from "../assets/netflix.png";
import google from "../assets/google.png";
import adobe from "../assets/adobe.png";
import spotify from "../assets/spotify.png";
import canva from "../assets/canva.png";

export function BarreEmployeurs() {
	return (
		<div className='h-40 mt-40 p-6 bg-violet text-center flex flex-col justify-center'>
			<p className='text-xl text-bleuF font-bold'>
				Nous collaborons avec{" "}
				<a className='underline'>plus de 1000 entreprises</a>
			</p>

			<div className='flex justify-center items-center mt-6'>
				<img src={adobe} alt='Adobe' className='w-32 h-12 mx-4' />
				<img src={amazon} alt='Amazon' className='w-24 h-16 mx-4' />
				<img src={google} alt='Google' className='w-32 h-20 mx-4' />
				<img src={tiktok} alt='TikTok' className='w-20 h-16 mx-4' />
				<img src={adidas} alt='Adidas' className='w-24 h-20 mx-4' />
				<img src={netflix} alt='Netflix' className='w-16 h-12 mx-4' />
				<img src={spotify} alt='Spotify' className='w-28 h-8 mx-4' />
				<img src={canva} alt='Canva' className='w-24 h-12 mx-4' />
			</div>
		</div>
	);
}
