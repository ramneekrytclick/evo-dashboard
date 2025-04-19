const backendURL = process.env.NEXT_PUBLIC_SOCKET_URL || "";

export const getImageURL = (photo: string) => {
	const resolvedPhoto = photo ? photo.replace(/\\/g, "/") : "";
	const profilePhotoUrl = resolvedPhoto.startsWith("uploads")
		? `${backendURL}/${resolvedPhoto}`
		: resolvedPhoto.startsWith("/uploads")
		? `${backendURL}${resolvedPhoto}`
		: `${backendURL}/uploads/${resolvedPhoto}`;
	const photoURL = photo ? profilePhotoUrl : "/assets/avatar-placeholder.png";

	if (photo == "") {
		return "/assets/avatar-placeholder.png";
	}
	return photoURL;
};
