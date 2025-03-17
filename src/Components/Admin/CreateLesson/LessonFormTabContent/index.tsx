import { TabContent, TabPane } from "reactstrap";
import DetailsForm from "./DetailsForm";
import { getCourses } from "@/app/api/admin/course";
import { useEffect, useState } from "react";
import { LessonFormProps } from "@/Types/Lesson.type";
import VideosForm from "./VideosForm";
import AssignmentsForm from "./AssignmentsForm";
import QuizzesForm from "./QuizzesForm";
import { createLesson } from "@/app/api/admin/lessons/lesson";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { courseFakeData } from "@/FakeData/admin/course";

interface LessonFormTabContentProps {
	activeCallBack: (tab: number) => void;
	steps: number;
}
const LessonFormTabContent = ({
	activeCallBack,
	steps,
}: LessonFormTabContentProps) => {
	const router = useRouter();
	const initialDataValue = {
		courseId: "",
		title: "",
		description: "",
		videos: [],
		quizzes: [],
		assignments: [],
	};
	const [data, setData] = useState<LessonFormProps>(initialDataValue);
	const [courses, setCourses] = useState<any[]>([]);
	const handleSubmit = async () => {
		try {
			const response = await createLesson(data);
			toast.success("Lesson created successfully");
		} catch (error) {
			toast("Error in creating Lesson!");
		} finally {
			setData(initialDataValue);
			router.push("/admin/lessons");
		}
	};
	const fetchCourses = async () => {
		try {
			const response = await getCourses();
			setCourses(response.courses);
			setCourses(courseFakeData);
			return response.courses;
		} catch (error) {
			setCourses(courseFakeData);
			toast.error("Error fetching courses!");
			return [];
		}
	};
	useEffect(() => {
		fetchCourses();
	}, []);
	return (
		<TabContent
			className=" dark-field px-5"
			activeTab={steps}>
			<TabPane tabId={1}>
				<DetailsForm
					activeCallBack={activeCallBack}
					courses={courses}
					data={data}
					setData={setData}
				/>
			</TabPane>
			<TabPane tabId={2}>
				<VideosForm
					activeCallBack={activeCallBack}
					data={data}
					setData={setData}
				/>
			</TabPane>
			<TabPane tabId={3}>
				<AssignmentsForm
					activeCallBack={activeCallBack}
					data={data}
					setData={setData}
				/>
			</TabPane>
			<TabPane tabId={4}>
				<QuizzesForm
					activeCallBack={activeCallBack}
					data={data}
					setData={setData}
					submitFunction={handleSubmit}
				/>
			</TabPane>
		</TabContent>
	);
};

export default LessonFormTabContent;
