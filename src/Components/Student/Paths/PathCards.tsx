import { Href, ImagePath } from "@/Constant";
import Image from "next/image";
import Link from "next/link";
import { Badge, Card, CardBody, Col, Progress } from "reactstrap";

export interface PathProps {
	_id?: string;
	name: string;
	description: string;
	courses: { _id: string; name: string }[];
	roadmapSuggestions?: string[];
}

export const learningPaths: PathProps[] = [
	{
		_id: "1",
		name: "Full Stack Developer Path",
		description:
			"A structured roadmap for mastering frontend and backend technologies.",
		courses: [
			{ _id: "c1", name: "HTML & CSS Basics" },
			{ _id: "c2", name: "JavaScript & React" },
			{ _id: "c3", name: "Node.js & Databases" },
		],
		roadmapSuggestions: [
			"Complete foundational courses first",
			"Work on real-world projects",
		],
	},
	{
		_id: "2",
		name: "Data Science Mastery",
		description:
			"Learn data science, machine learning, and AI with real-world projects.",
		courses: [
			{ _id: "c4", name: "Python for Data Science" },
			{ _id: "c5", name: "Machine Learning Algorithms" },
		],
		roadmapSuggestions: [
			"Practice coding daily",
			"Stay updated with industry trends",
		],
	},
];

const MyLearningPaths = () => {
	return (
		<>
			{learningPaths.map((path) => (
				<Col
					xl={6}
					className="box-col-6"
					key={path._id}>
					<Card className="path-card">
						<CardBody>
							<div className="d-flex">
								<Image
									priority
									width={50}
									height={50}
									className="img-50 img-fluid m-r-20"
									src={`${ImagePath}/job-search/${path._id}.jpg`}
									alt={path.name}
								/>
								<div className="flex-grow-1">
									<h6 className="f-w-600">
										<Link href={`/student/my-courses`}>{path.name}</Link>
										<Badge
											color="success"
											className="pull-right">
											Roadmap
										</Badge>
									</h6>
								</div>
							</div>
							<p>{path.description}</p>
							<p>
								<strong>Courses Included:</strong>
							</p>
							<ul>
								{path.courses.map((course) => (
									<li key={course._id}>{course.name}</li>
								))}
							</ul>
							<div>
								<p className="mb-2">Progress</p>
								<Progress value={Math.floor(Math.random() * 100)} />
							</div>
						</CardBody>
					</Card>
				</Col>
			))}
		</>
	);
};

export default MyLearningPaths;
