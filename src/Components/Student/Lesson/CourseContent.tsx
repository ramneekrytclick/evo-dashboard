import { useState } from "react";
import { Button, Card, CardBody, Collapse, Input } from "reactstrap";
import Link from "next/link";

export const PlaceholderContent = () => (
	<div className="text-center p-5">
		<h4>Select a lesson, quiz, or assignment to view content</h4>
	</div>
);

export const ActiveContent = ({
	content,
}: {
	content: { type: string; title: string; videoId?: string };
}) => {
	if (content.type === "video") {
		return (
			<VideoContent
				title={content.title}
				videoId={content.videoId || ""}
			/>
		);
	} else if (content.type === "quiz") {
		return <QuizContent title={content.title} />;
	} else if (content.type === "assignment") {
		return <AssignmentContent title={content.title} />;
	}
	return null;
};

export const VideoContent = ({
	title,
	videoId,
}: {
	title: string;
	videoId: string;
}) => (
	<div className="course-details">
		<h4>{title}</h4>
		<iframe
			width="100%"
			height="500vh"
			src="https://www.youtube.com/embed/nA1Aqp0sPQo?si=7pkuSWCgODW174aV"
			title="YouTube video player"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
	</div>
);

const QuizContent = ({ title }: { title: string }) => (
	<div className="course-quiz p-4 border rounded shadow-sm">
		<h4>{title}</h4>
		<form>
			{["Question 1", "Question 2", "Question 3"].map((question, index) => (
				<div
					key={index}
					className="mb-3">
					<p>{question}</p>
					{["Option A", "Option B", "Option C", "Option D"].map(
						(option, idx) => (
							<div
								key={idx}
								className="form-check">
								<input
									className="form-check-input"
									type="radio"
									name={`q${index}`}
								/>
								<label className="form-check-label">{option}</label>
							</div>
						)
					)}
				</div>
			))}
			<Button
				color="primary"
				type="submit">
				Submit Quiz
			</Button>
		</form>
	</div>
);

const AssignmentContent = ({ title }: { title: string }) => (
	<div className="course-assignment p-4 border rounded shadow-sm">
		<h4>{title}</h4>
		<p>Answer the following question:</p>
		<textarea
			className="form-control"
			rows={5}
			placeholder="Write your answer here..."></textarea>
		<Button
			color="primary"
			className="mt-3">
			Submit Assignment
		</Button>
	</div>
);

const CourseContent = ({
	setActiveContent,
}: {
	setActiveContent: (content: { title: string; type: string }) => void;
}) => {
	const [openSections, setOpenSections] = useState<{ [key: number]: boolean }>(
		{}
	);

	const toggleSection = (index: number) => {
		setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }));
	};

	const courseSections = [
		{
			title: "Introduction to Web Development",
			items: [
				{
					title: "What is Web Development?",
					type: "video",
					videoId: "nA1Aqp0sPQo",
				},
				{ title: "Frontend vs Backend", type: "video", videoId: "nA1Aqp0sPQo" },
				{
					title: "Understanding HTML, CSS, and JavaScript",
					type: "video",
					videoId: "nA1Aqp0sPQo",
				},
				{ title: "Introduction Quiz", type: "quiz" },
				{ title: "Basic Concepts Assignment", type: "assignment" },
			],
		},
		{
			title: "HTML & CSS Basics",
			items: [
				{
					title: "HTML Structure and Elements",
					type: "video",
					videoId: "nA1Aqp0sPQo",
				},
				{
					title: "CSS Selectors and Properties",
					type: "video",
					videoId: "nA1Aqp0sPQo",
				},
				{ title: "HTML & CSS Quiz", type: "quiz" },
				{ title: "Create a Simple Web Page Assignment", type: "assignment" },
			],
		},
		{
			title: "JavaScript Fundamentals",
			items: [
				{
					title: "JavaScript Basics: Variables & Functions",
					type: "video",
					videoId: "nA1Aqp0sPQo",
				},
				{
					title: "DOM Manipulation and Events",
					type: "video",
					videoId: "nA1Aqp0sPQo",
				},
				{ title: "JavaScript Quiz", type: "quiz" },
				{ title: "Interactive Web Page Assignment", type: "assignment" },
			],
		},
		{
			title: "Building a Simple Website",
			items: [
				{
					title: "Structuring a Multi-Page Website",
					type: "video",
					videoId: "nA1Aqp0sPQo",
				},
				{
					title: "Adding Navigation and Styling",
					type: "video",
					videoId: "nA1Aqp0sPQo",
				},
				{ title: "Website Development Quiz", type: "quiz" },
				{
					title: "Complete a Personal Portfolio Assignment",
					type: "assignment",
				},
			],
		},
		{
			title: "Introduction to Responsive Design",
			items: [
				{ title: "CSS Media Queries", type: "video", videoId: "nA1Aqp0sPQo" },
				{
					title: "Using Flexbox and Grid",
					type: "video",
					videoId: "nA1Aqp0sPQo",
				},
				{ title: "Responsive Design Quiz", type: "quiz" },
				{
					title: "Convert a Website to be Mobile-Friendly Assignment",
					type: "assignment",
				},
			],
		},
	];

	return (
		<div className="course-content-menu p-3 border rounded shadow-sm bg-white">
			<Input
				type="text"
				placeholder="Search Lesson"
				className="mb-3 form-control rounded-pill"
			/>
			{courseSections.map((section, index) => (
				<div
					key={index}
					className="course-section mb-2">
					<Button
						color="link"
						className="text-dark fw-bold w-100 text-start"
						onClick={() => toggleSection(index)}>
						{section.title}{" "}
						{section.items.length > 0 && `(${section.items.length})`}{" "}
						{openSections[index] ? "▾" : "▸"}
					</Button>
					<Collapse isOpen={openSections[index]}>
						<Card className="border-0">
							<CardBody className="p-2">
								<ul className="list-unstyled">
									{section.items.length > 0 ? (
										section.items.map((item, idx) => (
											<Link
												href={"#"}
												key={idx}>
												<li className="lesson-item cursor-pointer d-flex justify-content-between p-2 border-bottom">
													<span
														className="text-primary cursor-pointer"
														onClick={() => setActiveContent(item)}>
														{item.title}
													</span>
												</li>
											</Link>
										))
									) : (
										<li className="text-muted small p-2">
											No content available
										</li>
									)}
								</ul>
							</CardBody>
						</Card>
					</Collapse>
				</div>
			))}
		</div>
	);
};

export default CourseContent;
