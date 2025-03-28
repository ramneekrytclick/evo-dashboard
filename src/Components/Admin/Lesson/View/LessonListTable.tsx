import { getLessonById } from "@/app/api/admin/lessons/lesson";
import { useEffect, useState } from "react";

const LessonListTable = ({ id }: { id: string }) => {
	const [lesson, setLesson] = useState<any>(null);

	const fetchData = async () => {
		try {
			const response = await getLessonById(id);
			setLesson(response);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	if (!lesson) return <div>Loading...</div>;

	return (
		<div className="p-4 space-y-6">
			<h2 className="text-2xl font-semibold">{lesson.title}</h2>
			<p className="text-gray-600">{lesson.content}</p>

			{/* Video */}
			<div>
				<h3 className="text-lg font-medium mb-2">Lesson Video</h3>
				<iframe
					className="w-full aspect-video rounded-md shadow"
					src={lesson.videoUrl?.replace("watch?v=", "embed/")}
					title="Lesson Video"
					frameBorder="0"
					allowFullScreen></iframe>
			</div>

			{/* Resources */}
			<div>
				<h3 className="text-lg font-medium mb-2">Resources</h3>
				<ul className="list-disc ml-6 space-y-1">
					{lesson.resources?.map((res: string, index: number) => (
						<li key={index}>
							<a
								href={res}
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-600 underline">
								Resource {index + 1}
							</a>
						</li>
					))}
				</ul>
			</div>

			{/* Quizzes */}
			<div>
				<div className="flex justify-between items-center mb-2">
					<h3 className="text-lg font-medium">Quizzes</h3>
					<button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
						Add Quiz
					</button>
				</div>
				{lesson.quizzes?.length === 0 ? (
					<p className="text-gray-500">No quizzes added yet.</p>
				) : (
					<ul className="space-y-2">
						{lesson.quizzes?.map((quiz: any, index: number) => (
							<li
								key={index}
								className="p-2 bg-gray-100 rounded shadow-sm">
								{quiz.question}
							</li>
						))}
					</ul>
				)}
			</div>

			{/* Assignments */}
			<div>
				<div className="flex justify-between items-center mb-2">
					<h3 className="text-lg font-medium">Assignments</h3>
					<button className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700">
						Add Assignment
					</button>
				</div>
				{lesson.assignments?.length === 0 ? (
					<p className="text-gray-500">No assignments added yet.</p>
				) : (
					<ul className="space-y-2">
						{lesson.assignments?.map((assignment: any, index: number) => (
							<li
								key={index}
								className="p-2 bg-gray-100 rounded shadow-sm">
								{assignment.title}
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};

export default LessonListTable;
