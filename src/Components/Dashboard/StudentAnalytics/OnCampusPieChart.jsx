import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

const OnCampusPieChart = ({ onCampusOppData }) => {
	const data = {
	  labels: ["Expired Opportunities", "Active Opportunities"],
	  datasets: [
		{
		  data: [ onCampusOppData && (onCampusOppData.expiredOpportunities || 0) ,onCampusOppData && (onCampusOppData.activeOpportunities || 0)],
		  backgroundColor: [
			"rgb(143, 56, 77)",
			"rgb(92, 110, 145)",
		  ],
		  hoverOffset: 4,
		},
	  ],
	};
  
	const options = {
	  maintainAspectRatio: false,
	  legend: {
		labels: {
		  fontSize: 14,
		},
	  },
	};
  
	return <Pie data={data} height={200} options={options} />;
  };
  
  export default OnCampusPieChart;