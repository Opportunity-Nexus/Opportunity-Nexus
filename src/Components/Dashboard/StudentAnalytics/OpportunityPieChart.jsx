import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

const OpportunityPieChart = ({ offcampusData }) => {
	const generateChartData = () => {
		if (
			!offcampusData ||
			!Array.isArray(offcampusData) ||
			offcampusData.length === 0
		) {
			return { labels: [], data: [] };
		}
		const labels = offcampusData.map((item) => item.opportunityType);
		const data = offcampusData.map((item) => item.count);
		return { labels, data };
	};
	const chartData = generateChartData();
	const data = {
		labels: ["Scholarships", "Workplace Prospects", "Coding Contests"],
		datasets: [
			{
				labels: chartData.labels,
				data: chartData.data,
				backgroundColor: [
					"rgb(0, 33, 94)",
					"rgb(44, 78, 128)",
					"rgb(119, 176, 170)",
				],
				hoverOffset: 4,
			},
		],
	};
	var options = {
		maintainAspectRatio: false,
		scales: {},
		legend: {
			labels: {
				fontSize: 100,
			},
		},
	};
	return (
			<Pie data={data} height={200} options={options} />
	);
};

export default OpportunityPieChart;
