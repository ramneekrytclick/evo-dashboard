import { getAllCourses } from "@/app/api/cc";

const backendURL = process.env.NEXT_PUBLIC_SOCKET_URL || "";

export const getImageURL = (photo: string, type?: string) => {
	const resolvedPhoto = photo ? photo.replace(/\\/g, "/") : "";
	const profilePhotoUrl = resolvedPhoto.startsWith("uploads")
		? `${backendURL}/${resolvedPhoto}`
		: resolvedPhoto.startsWith("/uploads")
		? `${backendURL}${resolvedPhoto}`
		: `${backendURL}/uploads/${resolvedPhoto}`;
	const photoURL = photo ? profilePhotoUrl : "/assets/image-nf.png";
	if (!photo?.includes("/") && type) {
		return `${backendURL}/uploads/${type}/${resolvedPhoto}`;
	}
	if (photo == "") {
		return "/assets/image-nf.png";
	}
	return photoURL;
};
export const getCourseName = async (id: string) => {
	const response = await getAllCourses();
	const course = response.courses.find((course: any) => course._id === id);
	return course?.title || "N/A";
};
