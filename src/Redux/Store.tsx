// Redux/Store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage

import AuthSlice from "./Reducers/AuthSlice";
import BookmarkSlice from "./Reducers/BookmarkSlice";
import ChatSlice from "./Reducers/ChatSlice";
import FilterReducer from "./Reducers/ECommerce/FilterReducer";
import ProductReducer from "./Reducers/ECommerce/ProductReducer";
import courseCartReducer from "./Reducers/Courses/CourseCartSlice";
import FileManagerSlice from "./Reducers/FileManagerSlice";
import HeaderBookmarkSlice from "./Reducers/Layout/HeaderBookmarkSlice";
import LayoutSlice from "./Reducers/Layout/LayoutSlice";
import LetterBoxSlice from "./Reducers/LetterBoxSlice";
import ProjectSlice from "./Reducers/ProjectSlice";
import SearchResultSlice from "./Reducers/SearchResultSlice";
import TasksSlice from "./Reducers/TasksSlice";
import ThemeCustomizerSlice from "./Reducers/ThemeCustomizerSlice";
import TodoSlice from "./Reducers/TodoSlice";
import courseReducer from "./Reducers/Courses/CoursesSlice";

const rootReducer = combineReducers({
	auth: AuthSlice,
	layout: LayoutSlice,
	headerBookMark: HeaderBookmarkSlice,
	letterbox: LetterBoxSlice,
	fileManager: FileManagerSlice,
	chat: ChatSlice,
	project: ProjectSlice,
	bookmark: BookmarkSlice,
	todos: TodoSlice,
	tasks: TasksSlice,
	product: ProductReducer,
	courseCart: courseCartReducer,
	filter: FilterReducer,
	searchResult: SearchResultSlice,
	themeCustomizer: ThemeCustomizerSlice,
	courses: courseReducer,
});

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["auth", "courseCart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const Store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false, // required for redux-persist
		}),
});

export const persistor = persistStore(Store);

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

export default Store;
