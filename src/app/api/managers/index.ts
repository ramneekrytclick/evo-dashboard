import { apiClient } from "@/utils/api";

export const getMyMentors = async () => {
	return (await apiClient.get("/managers/auth/my-mentors")).data;
};
export const getMentorStats = async (mentorId: string) => {
	return (await apiClient.get(`/managers/stats/${mentorId}`)).data;
};
