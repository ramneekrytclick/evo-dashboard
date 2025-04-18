"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToggleSidebar } from "@/Redux/Reducers/Layout/LayoutSlice";

const SidebarToggleClient = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setToggleSidebar(true));
		return () => {
			dispatch(setToggleSidebar(false));
		};
	}, [dispatch]);

	return null; // no UI
};

export default SidebarToggleClient;
