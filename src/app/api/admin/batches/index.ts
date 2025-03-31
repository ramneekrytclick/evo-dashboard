import { BatchProps } from "@/Types/Course.type";
import { apiClient } from "@/utils/api";

export const getBatches = async () => {
	return [
		{
			_id: "67c80f02b412c5332de22569",
			course: "67c7de0070211804ea1d4bb1",
			name: "Batch 1 - Full Stack Development",
			startDate: "2025-03-10T00:00:00.000Z",
			endDate: "2025-06-10T00:00:00.000Z",
			students: [
				"67c81139f4cdb2c4acbdc222",
				"67c813bafa1b239f0e27a002",
				"67d7c1cb8de6ac36963b9a35",
				"67ce922117d183c5f40e6d83",
			],
			mentor: "67c98af51312698a4cc6b7bf",
			createdAt: "2025-03-05T08:44:50.923Z",
			updatedAt: "2025-03-30T15:16:22.506Z",
			__v: 5,
			chatMessages: [
				{
					sender: "67ce922117d183c5f40e6d83",
					message: "Hello everyone, excited to learn!",
					_id: "67d7d058c20267394d60c7c9",
					timestamp: "2025-03-17T07:33:44.618Z",
				},
			],
			batchWeekType: "Mon-Fri",
		},
		{
			_id: "67e3b519f331e6d9a85570b2",
			course: "67c7de0070211804ea1d4bb1",
			name: "Batch 1 - Full Stack Development",
			startDate: "2025-03-10T00:00:00.000Z",
			endDate: "2025-06-10T00:00:00.000Z",
			students: [],
			mentor: null,
			chatMessages: [],
			createdAt: "2025-03-26T08:04:41.919Z",
			updatedAt: "2025-03-26T08:04:41.919Z",
			__v: 0,
		},
		{
			_id: "67e3b55a825c502d22102110",
			name: "Batch 1 - Full Stack Development",
			batchWeekType: "Mon-Fri",
			startDate: "2025-03-10T00:00:00.000Z",
			endDate: "2025-06-10T00:00:00.000Z",
			course: "67c7de0070211804ea1d4bb1",
			students: [],
			mentor: null,
			createdAt: "2025-03-26T08:05:46.878Z",
			updatedAt: "2025-03-26T08:05:46.878Z",
			__v: 0,
		},
		{
			_id: "67e3b55d825c502d22102113",
			name: "Batch 1 - Full Stack Development",
			batchWeekType: "Mon-Fri",
			startDate: "2025-03-10T00:00:00.000Z",
			endDate: "2025-06-10T00:00:00.000Z",
			course: "67c7de0070211804ea1d4bb1",
			students: [],
			mentor: null,
			createdAt: "2025-03-26T08:05:49.926Z",
			updatedAt: "2025-03-26T08:05:49.926Z",
			__v: 0,
		},
		{
			_id: "67e3b5a1825c502d22102116",
			name: "Batch 1 - Full Stack Development",
			description: "Weekday learning batch",
			batchWeekType: "Mon-Fri",
			startDate: "2025-03-10T00:00:00.000Z",
			endDate: "2025-06-10T00:00:00.000Z",
			course: "67c7de0070211804ea1d4bb1",
			students: [],
			mentor: null,
			createdAt: "2025-03-26T08:06:58.000Z",
			updatedAt: "2025-03-26T08:06:58.000Z",
			__v: 0,
		},
		{
			_id: "67e3b64a825c502d2210211b",
			name: "Batch 1 - Full Stack Development",
			description: "Weekday learning batch",
			batchWeekType: "Weekend",
			startDate: "2025-03-10T00:00:00.000Z",
			endDate: "2025-06-10T00:00:00.000Z",
			course: "67c7de0070211804ea1d4bb1",
			students: [],
			mentor: null,
			createdAt: "2025-03-26T08:09:46.505Z",
			updatedAt: "2025-03-26T08:09:46.505Z",
			__v: 0,
		},
		{
			_id: "67e53340116c918cca685fc7",
			name: "Batch1",
			description: "Description",
			time: "10Am - 12PM",
			batchWeekType: "Mon-Fri",
			startDate: "2025-03-21T00:00:00.000Z",
			endDate: "2025-04-11T00:00:00.000Z",
			course: "67e25df2234eb66c5851afd9",
			students: [],
			mentor: null,
			createdAt: "2025-03-27T11:15:12.996Z",
			updatedAt: "2025-03-27T11:15:12.996Z",
			__v: 0,
		},
		{
			_id: "67e8fef1b0b345736e17cd84",
			name: "Jeremy",
			description: "asda",
			time: "10Am - 12PM",
			batchWeekType: "Mon-Fri",
			startDate: "2025-03-05T00:00:00.000Z",
			endDate: "2025-03-29T00:00:00.000Z",
			course: "67e252b262f4a0908f2ac04a",
			students: [],
			mentor: null,
			createdAt: "2025-03-30T08:21:05.180Z",
			updatedAt: "2025-03-30T08:21:05.180Z",
			__v: 0,
		},
		{
			_id: "67e95c9c94cdb4d942c84604",
			name: "NewBatchmost",
			description: "this is the best batchc",
			time: "10AM - 12PM",
			batchWeekType: "Mon-Fri",
			startDate: "2025-04-05T00:00:00.000Z",
			endDate: "2025-05-16T00:00:00.000Z",
			course: "67e52c01116c918cca685efd",
			students: [],
			mentor: "67e65dceeeb386331e0be64c",
			createdAt: "2025-03-30T15:00:44.052Z",
			updatedAt: "2025-03-30T15:21:48.718Z",
			__v: 0,
		},
		{
			_id: "67ea495db198c2116433eef3",
			name: "Admin User",
			description: "adaca",
			time: "10Am - 12PM",
			batchWeekType: "Weekend",
			startDate: "2025-03-03T00:00:00.000Z",
			endDate: "2025-04-05T00:00:00.000Z",
			course: "67e52c01116c918cca685efd",
			students: [],
			mentor: null,
			createdAt: "2025-03-31T07:50:53.744Z",
			updatedAt: "2025-03-31T07:50:53.744Z",
			__v: 0,
		},
	];
};
export const getBatchesByCourse = async (id: string) => {
	try {
		const response = await apiClient.get(`/batches/${id}`);
		return response.data;
	} catch (error) {
		console.error(error);
	}
};

export const createBatch = async (data: BatchProps) => {
	const response = await apiClient.post("/batches", data);
	return response.data;
};

export const assignStudentsToBatch = async (data: {
	batchId: string;
	studentIds: string[];
}) => {
	return (await apiClient.put(`/batches/assign-students`, data)).data;
};

export const assignMentorToBatch = async (data: {
	batchId: string;
	mentorId: string;
}) => {
	return (await apiClient.put(`/batches/assign-mentor`, data)).data;
};
