import { Button } from "reactstrap";

const CourseDetails = () => {
	return (
		<div className="course-details">
			<video
				width="100%"
				controls
				className="rounded shadow-sm">
				<source
					src="https://www.youtube.com/watch?v=nA1Aqp0sPQo"
					type="video/mp4"
				/>
				Your browser does not support the video tag.
			</video>
			<div className="description-tabs mt-3 d-flex gap-2">
				<Button
					color="primary"
					className="rounded-pill px-4">
					Description
				</Button>
				<Button
					color="light"
					className="rounded-pill px-4">
					What you will learn
				</Button>
			</div>
			<div className="course-description mt-3 p-3 border rounded shadow-sm">
				<h4 className="fw-bold">What you'll learn</h4>
				<p className="text-muted">
					This course provides the fundamentals of PHP, MySQL, and CMS building.
				</p>
			</div>
		</div>
	);
};

export default CourseDetails;
