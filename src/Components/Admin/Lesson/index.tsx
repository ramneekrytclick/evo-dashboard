import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { CoursesTitle, LessonsTitle } from "@/Constant";
import { Container } from "reactstrap";
import LessonList from "./LessonList";

const LessonsPageContainer = ({id}:{id:string}) => {
    return (
        <>
            <Breadcrumbs mainTitle={LessonsTitle} parent={CoursesTitle} title={LessonsTitle}/>
            <Container fluid>
                <LessonList id={id}/>
            </Container>
        </>        
    );
}

export default LessonsPageContainer;