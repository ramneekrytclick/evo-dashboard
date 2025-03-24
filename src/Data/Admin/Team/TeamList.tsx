import SVG from "@/CommonComponent/SVG";
import { TeamListType } from "@/Types/Team.type";
import Link from "next/link";
import { TableColumn } from "react-data-table-component";
import { Badge, Button, FormGroup, Input } from "reactstrap";

export const userNavData = [
	{ id: 1, icon: "user", title: "Personal info" },
	{ id: 2, icon: "chain-broken", title: "Connect bank account" },
	{ id: 3, icon: "group", title: "Inquiries" },
	{ id: 4, icon: "group", title: "Completed " },
];
