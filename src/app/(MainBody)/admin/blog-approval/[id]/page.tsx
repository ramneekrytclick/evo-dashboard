const page = async ({ params }: { params: Promise<{ id: string }> }) => {
	const slug = (await params).id;
	// console.log("slug", slug);

	return (
		<>
			<div>BLOG {slug}</div>
		</>
	);
};

export default page;
