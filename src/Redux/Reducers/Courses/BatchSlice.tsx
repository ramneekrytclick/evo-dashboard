// src/redux/slices/courseSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BatchState {
	batches: any[];
	loaded: boolean;
}

const initialState: BatchState = {
	batches: [],
	loaded: false,
};

const batchSlice = createSlice({
	name: "batches",
	initialState,
	reducers: {
		setCourses: (state, action: PayloadAction<any[]>) => {
			state.batches = action.payload;
			state.loaded = true;
		},
		clearCourses: (state) => {
			state.batches = [];
			state.loaded = false;
		},
	},
});

export const { setCourses, clearCourses } = batchSlice.actions;
export default batchSlice.reducer;
