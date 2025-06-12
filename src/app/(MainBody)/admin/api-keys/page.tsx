import ApiKeyContainer from "@/Components/Admin/ApiKey";
import { generateSEOMetadata } from "@/utils/seo";

export const metadata = generateSEOMetadata({
	title: "API Key Management",
	description:
		"Manage and review all API Keys for different user roles in the admin panel.",
	pathname: "/admin/api-keys",
	keywords: ["admin", "API Keys", "user roles", "dashboard"],
});

const ApiKeyPage = () => {
	return (
		<>
			<ApiKeyContainer />
		</>
	);
};

export default ApiKeyPage;
