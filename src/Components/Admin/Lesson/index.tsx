"use client";
import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { CoursesTitle } from "@/Constant";
import { useEffect, useState } from "react";
import { LessonType } from "@/Types/Lesson.type";
import { getLessons } from "@/app/api/admin/lessons/lesson";
import { toast } from "react-toastify";
import LessonLearningPage from "./LessonLearningPage";

const LessonsPageContainer = ({ id }: { id: string }) => {
	const [lessons, setLessons] = useState<LessonType[]>([]);
	const fetchLessons = async () => {
		try {
			const response = await getLessons(id);
			setLessons(response);
		} catch (error) {
			toast.error("Error fetching lessons");
		}
	};

	useEffect(() => {
		fetchLessons();
	}, []);

	return (
		<>
			<Breadcrumbs
				mainTitle={"Course View"}
				parent={CoursesTitle}
				title={"Course View"}
			/>
			<LessonLearningPage
				lessons={lessons}
				refresh={() => {
					fetchLessons();
					console.log("refreshed");
				}}
			/>
		</>
	);
};

export default LessonsPageContainer;
