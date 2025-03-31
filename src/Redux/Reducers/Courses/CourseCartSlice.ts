// store/Reducers/CourseCartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CourseItem {
	_id: string;
	title: string;
	discountedPrice: number;
	realPrice: number;
	photo?: string | null;
}

interface CourseCartState {
	courseCartData: CourseItem[];
}

const initialState: CourseCartState = {
	courseCartData: [],
};

const CourseCartSlice = createSlice({
	name: "courseCart",
	initialState,
	reducers: {
		addToCourseCart: (state, action: PayloadAction<CourseItem>) => {
			const exists = state.courseCartData.find(
				(course) => course._id === action.payload._id
			);
			if (!exists) {
				console.log("Adding Course to Cart");

				state.courseCartData.push(action.payload);
			}
		},
		removeFromCourseCart: (state, action: PayloadAction<string>) => {
			state.courseCartData = state.courseCartData.filter(
				(course) => course._id !== action.payload
			);
		},
		clearCourseCart: (state) => {
			state.courseCartData = [];
		},
	},
});

export const { addToCourseCart, removeFromCourseCart, clearCourseCart } =
	CourseCartSlice.actions;
export default CourseCartSlice.reducer;
