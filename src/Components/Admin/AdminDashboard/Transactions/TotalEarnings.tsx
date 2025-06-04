import { Card, CardBody, Col } from "reactstrap";
import { ApexOptions } from "apexcharts";
import dayjs from "dayjs";
import ReactApexChart from "react-apexcharts";
import SVG from "@/CommonComponent/SVG";
import { ArrowDown, ArrowUp, DivideCircle, DownloadCloud } from "react-feather";

interface Transaction {
	_id: string;
	amount: number;
	createdAt: string;
}

interface TransactionsProps {
	transactionsData: Transaction[];
}

const TotalEarnings: React.FC<TransactionsProps> = ({ transactionsData }) => {
	// Group earnings by date (yyyy-mm-dd)
	const earningsMap: Record<string, number> = {};
	transactionsData.forEach((txn) => {
		const date = dayjs(txn.createdAt).format("YYYY-MM-DD");
		earningsMap[date] = (earningsMap[date] || 0) + txn.amount;
	});

	const sortedDates = Object.keys(earningsMap).sort();
	const chartData = sortedDates.map((date) => earningsMap[date]);

	const userEarningsChartData: ApexOptions = {
		series: [{ name: "Earnings", data: chartData }],
		chart: {
			type: "area",
			height: 203,
			offsetY: -30,
			zoom: { enabled: false },
			toolbar: { show: false },
			dropShadow: {
				enabled: true,
				top: 5,
				left: 0,
				blur: 2,
				color: "#237fff",
				opacity: 0.2,
			},
		},
		colors: ["#237fff"],
		fill: {
			type: "gradient",
			gradient: {
				shadeIntensity: 1,
				opacityFrom: 0.5,
				opacityTo: 0.2,
				stops: [0, 100, 100],
			},
		},
		dataLabels: { enabled: false },
		grid: { show: false },
		xaxis: {
			categories: sortedDates,
			labels: { show: false },
			axisBorder: { show: false },
			axisTicks: { show: false },
		},
		yaxis: { show: false },
		stroke: { curve: "smooth", width: 3 },
		markers: {
			discrete: [
				{
					seriesIndex: 0,
					dataPointIndex: chartData.length - 1,
					fillColor: "#5C61F2",
					strokeColor: "#fff",
					size: 6,
					shape: "circle",
				},
			],
		},
		tooltip: {
			custom: ({ series, seriesIndex, dataPointIndex }) => `
        <div class="apex-tooltip p-2">
          <span>
            <span class="bg-primary"></span>
            Transaction Created
            <h3>₹${series[seriesIndex][dataPointIndex]}</h3>
          </span>
        </div>`,
		},
	};

	const totalAmount = chartData.reduce((a, b) => a + b, 0);

	return (
		<Card className='earning-card'>
			<div className='p-3 pb-0'>
				<h5>Total Earnings</h5>
			</div>
			<CommonCardEarning
				chart={userEarningsChartData}
				amount={`₹ ${totalAmount.toLocaleString()}`}
				percentage={"+15.5%"}
				icon={"up-arrow"}
			/>
		</Card>
	);
};

const CommonCardEarning: React.FC<any> = ({
	chart,
	amount,
	percentage,
	icon,
}) => {
	return (
		<CardBody className='p-0'>
			<ReactApexChart
				options={chart}
				series={chart.series}
				height={chart.chart.height}
				type={chart.chart.type}
			/>
			<div className='d-flex p-3 pt-0'>
				<h2 className='me-2'>{amount}</h2>
			</div>
		</CardBody>
	);
};

export default TotalEarnings;
