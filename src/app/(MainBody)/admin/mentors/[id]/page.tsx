import MentorContainer from "@/Components/Admin/Mentors/MentorPage";

const MentorPage = async ({
	params,
}: {
	params: Promise<{ id: string }>;
}) => {
    return (
        <MentorContainer id={(await params).id}/>
    );
}

export default MentorPage;