export interface LessonFormProps{
    _id?:string;
    courseId:string;
    title:string;
    description:string;
    videos:Video[]
    quizzes:Quiz[];
    assignments:Assignment[];
}

export interface Video{
    _id?:string;
    title:string;
    videoURL:string;
}
export interface Quiz {
    _id?:string;
    questions:Question[]
}

export interface Question{
    _id?:string;
    question:string;
    correctAnswer:string;
    options:string[]
}
export interface Assignment {
    _id?:string;
    title: string;
    description:string;
    submissionURL: string;

}