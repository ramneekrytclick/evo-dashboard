import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { CoursesTitle, LessonsTitle } from "@/Constant";
import { Container } from "reactstrap";

const LessonsPageContainer = ({id}:{id:string}) => {
    return (
        <>
            <Breadcrumbs mainTitle={LessonsTitle} parent={CoursesTitle} title={LessonsTitle}/>
            <Container fluid>

            </Container>
        </>        
    );
}

export default LessonsPageContainer;