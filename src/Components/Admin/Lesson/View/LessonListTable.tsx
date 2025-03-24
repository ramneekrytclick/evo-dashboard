import { getLessons } from "@/app/api/admin/lessons/lesson";
import { useEffect, useState } from "react";

const LessonListTable = ({ id }: { id: string }) => {
	const [lessonListTableData, setLessonListTableData] = useState([]);
	const fetchData = async () => {
		try {
			const response = await getLessons(id);
			setLessonListTableData(response);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		fetchData();
	}, []);
	return <div>{JSON.stringify(lessonListTableData)}</div>;
};

export default LessonListTable;
