export function generateMetadata() {
	return {
		title: "Blog Details",
		description: "View and manage blog details.",
	};
}
const page = async ({ params }: { params: Promise<{ id: string }> }) => {
	const slug = (await params).id;
	return (
		<>
			<div>BLOG {slug}</div>
		</>
	);
};

export default page;
