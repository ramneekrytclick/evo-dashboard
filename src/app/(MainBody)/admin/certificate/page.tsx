import CertificatePageContainer from "@/Components/Admin/Certificate";
export function generateMetadata() {
	return {
		title: "Issue Certificates",
		description: "Generate and issue completion certificates for students.",
	};
}
const CertificatePage = () => {
	return <CertificatePageContainer />;
};

export default CertificatePage;
