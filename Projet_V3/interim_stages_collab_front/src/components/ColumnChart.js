import React, { useEffect, useRef, useState } from "react";
import ApexCharts from "apexcharts";

/**
 * statistic chart
 * @component
 * @returns {React.ReactElement}
 */
export function ColumnChart({ title, data, onChange }) {
	const chartRef = useRef(null);

	const mois = [
		"Janvier",
		"Février",
		"Mars",
		"Avril",
		"Mai",
		"Juin",
		"Juillet",
		"Aout",
		"Septembre",
		"Octobre",
		"Novembre",
		"Décembre",
	];
	const annees = ["2023", "2024"];
	const regions = ["Montpellier", "Oran", "Annaba", "Béjaia", "Paris"];

	const organizedData = data
		? data.map(({ _id, total }) => ({
				x: _id[0],
				y: total,
		  }))
		: [];

	const [selectedMois, setSelectedMois] = useState("");
	const [selectedAnnee, setSelectedAnnee] = useState("");
	const [selectedLieu, setSelectedLieu] = useState("");

	useEffect(() => {
		const options = {
			chart: {
				type: "bar",
				background: "#EEEDFF",
				height: 200,
				width: "100%",
				stroke: {
					curve: "smooth",
				},
				toolbar: {
					show: false,
				},
			},
			series: [
				{
					name: title,
					data: organizedData,
				},
			],
			xaxis: {
				categories: organizedData.map((item) => item.x),
				labels: {
					style: {
						colors: "#465475",
					},
				},
			},
			yaxis: {
				labels: {
					style: {
						colors: "#465475",
					},
				},
			},
			grid: {
				show: false,
			},
			colors: ["#218261", "#FF0000"],
		};

		const chart = new ApexCharts(chartRef.current, options);
		chart.render();

		return () => {
			chart.destroy();
		};
	}, [selectedAnnee, selectedMois, selectedLieu, data]);

	const handleMoisChange = (e) => {
		setSelectedMois(e.target.value);
		onChange(selectedLieu, e.target.value, selectedAnnee);
	};

	const handleAnneeChange = (e) => {
		setSelectedAnnee(e.target.value);
		onChange(selectedLieu, selectedMois, e.target.value);
	};

	const handleLieuChange = (e) => {
		setSelectedLieu(e.target.value);
		onChange(e.target.value, selectedMois, selectedAnnee);
	};

	return (
		<div className='chart-container w-full rounded shadow pt-4 bg-violet'>
			<div className='flex flex-row justify-between px-4'>
				<div className='flex items-center'>
					<label className='font-semibold text-bleuF text-xs'>Année </label>
					<select
						className='appearance-none ml-2 border text-center text-xs text-bleuF border-bleuF rounded-md shadow-sm focus:border-success focus:outline-none px-2 py-1'
						value={selectedAnnee}
						onChange={handleAnneeChange}
					>
						<option value=''></option>
						{annees.map((item, index) => (
							<option key={index} value={item}>
								{item}
							</option>
						))}
					</select>
				</div>
				<div className='flex items-center'>
					<label className='font-semibold text-bleuF text-xs'>Mois </label>
					<select
						className='appearance-none ml-2 border text-center text-xs text-bleuF border-bleuF rounded-md shadow-sm focus:border-success focus:outline-none px-2 py-1'
						value={selectedMois}
						onChange={handleMoisChange}
					>
						<option value=''></option>
						{mois.map((item, index) => (
							<option key={index} value={index + 1}>
								{item}
							</option>
						))}
					</select>
				</div>

				<div className='flex items-center'>
					<label className='font-semibold text-bleuF text-xs'>Région </label>
					<select
						className='appearance-none ml-2 border text-center text-xs text-bleuF border-bleuF rounded-md shadow-sm focus:border-success focus:outline-none px-2 py-1'
						value={selectedLieu}
						onChange={handleLieuChange}
					>
						<option value=''></option>
						{regions.map((key, index) => (
							<option key={index} value={key}>
								{key}
							</option>
						))}
					</select>
				</div>
			</div>
			<div ref={chartRef}></div>
		</div>
	);
}
