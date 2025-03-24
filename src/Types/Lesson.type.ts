export interface LessonFormProps {
	_id?: string;
	courseId: string;
	title: string;
	content: string;
	videoUrl: string;
	resources: any[]; // could be assignments + quizzes combined
}

export interface Video {
	_id?: string;
	title: string;
	videoURL: string;
}
export interface Quiz {
	_id?: string;
	questions: Question[];
}

export interface Question {
	_id?: string;
	question: string;
	correctAnswer: string;
	options: string[];
}
export interface Assignment {
	_id?: string;
	title: string;
	description: string;
	submissionURL: string;
}
