import { ApexOptions } from "apexcharts";
import Link from "next/link";
import React from "react";
import ReactApexChart from "react-apexcharts";
import { Button } from "reactstrap";
import { useRouter } from "next/navigation";

const CoursesCard = ({
	courseData,
	category,
}: {
	courseData: any[];
	category: any[];
}) => {
	const router = useRouter();

	// Map: categoryId => count
	const categoryCounts: Record<string, number> = {};
	courseData.forEach((course) => {
		if (course.category) {
			categoryCounts[course.category] =
				(categoryCounts[course.category] || 0) + 1;
		}
	});

	// Prepare data
	const chartCategories = category.map((cat) => cat.title);
	const chartData = category.map((cat) => categoryCounts[cat._id] || 0);
	const categorySlugMap = category.map((cat) => cat.slug); // use slug instead of ID

	const chartOptions: ApexOptions = {
		series: [
			{
				name: "Courses",
				type: "bar",
				data: chartData,
			},
		],
		chart: {
			height: 315,
			type: "bar",
			toolbar: { show: false },
			events: {
				dataPointSelection: (event, chartContext, config) => {
					const slug = categorySlugMap[config.dataPointIndex];
					if (slug) {
						router.push(`/admin/categories/courses/${slug}`);
					}
				},
			},
		},
		plotOptions: {
			bar: {
				borderRadius: 4,
				columnWidth: "40%",
				horizontal: false,
			},
		},
		xaxis: {
			categories: chartCategories,
			labels: {
				rotate: -45,
				style: {
					fontFamily: "Lexend, sans-serif",
					fontWeight: 600,
					colors: "#959595",
				},
			},
		},
		yaxis: {
			labels: {
				style: {
					fontFamily: "Lexend, sans-serif",
					fontWeight: 600,
					colors: "#171829",
				},
			},
		},
		colors: ["#237fff"],
		dataLabels: { enabled: false },
		grid: {
			xaxis: { lines: { show: false } },
			yaxis: { lines: { show: true } },
		},
		tooltip: {
			custom: ({ series, seriesIndex, dataPointIndex }) => `
				<div class="apex-tooltip p-2">
					<span>
						<span class="bg-primary"></span>
						Courses in ${chartCategories[dataPointIndex]}
						<h3>${series[seriesIndex][dataPointIndex]}</h3>
					</span>
				</div>`,
		},
	};

	return (
		<div className='card p-3'>
			<div className='d-flex justify-content-between'>
				<h5 className=' fw-medium'>Courses</h5>
				<Link href={`/admin/courses`}>
					<Button
						color='primary'
						className='px-3'
						outline>
						View All ({courseData.length})
					</Button>
				</Link>
			</div>
			<div style={{ overflow: "auto" }}>
				<div style={{ minWidth: "700px", cursor: "pointer" }}>
					<ReactApexChart
						options={chartOptions}
						series={chartOptions.series as any}
						type='bar'
						height={315}
					/>
				</div>
			</div>
		</div>
	);
};

export default CoursesCard;
