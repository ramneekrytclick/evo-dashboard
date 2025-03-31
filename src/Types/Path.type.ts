import { CourseProps } from "./Course.type";

export interface PathProps {
	_id?: string;
	title: string;
	description: string;
	timing: string;
	price: number;
	courses: string[];
	wannaBeInterest: string[];
	photo?: File;
}
