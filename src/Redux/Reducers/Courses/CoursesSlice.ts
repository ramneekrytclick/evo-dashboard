// src/redux/slices/courseSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CourseState {
	courses: any[];
	loaded: boolean;
}

const initialState: CourseState = {
	courses: [],
	loaded: false,
};

const courseSlice = createSlice({
	name: "courses",
	initialState,
	reducers: {
		setCourses: (state, action: PayloadAction<any[]>) => {
			state.courses = action.payload;
			state.loaded = true;
		},
		clearCourses: (state) => {
			state.courses = [];
			state.loaded = false;
		},
	},
});

export const { setCourses, clearCourses } = courseSlice.actions;
export default courseSlice.reducer;
