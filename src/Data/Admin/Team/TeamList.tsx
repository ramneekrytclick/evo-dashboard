import SVG from "@/CommonComponent/SVG";
import { TeamListType } from "@/Types/Team.type";
import Link from "next/link";
import { TableColumn } from "react-data-table-component";
import { Badge, FormGroup, Input } from "reactstrap";

export const teamListColumns: TableColumn<TeamListType>[] = [
    {
        name: '',
        cell: () => (
            <FormGroup check>
                <Input className="checkbox-primary" type="checkbox" />
            </FormGroup>
        ),
        sortable: false,
        width: '3%',
    },
    {
        name: 'Name',
        selector: (row) => row.name,
        sortable: true,
        cell: (row) => <p>{row.name}</p>,
        width: '25%',
    },
    {
        name: 'Email',
        selector: (row) => row.email,
        sortable: true,
        cell: (row) => <p className="f-light">{row.email}</p>,
        width: '30%',
    },
    {
        name: 'Role',
        selector: (row) => row.role,
        sortable: true,
        cell: (row) => (
            <Badge color="" className={`badge-${row.role === 'Admin' ? 'primary' : 'secondary'}`}>
                {row.role}
            </Badge>
        ),
        width: '15%',
    },
    {
        name: 'Action',
        cell: (row) => (
            <div className="product-action">
                <Link href={`/app/team/edit/${row.name}`}>
                    <SVG iconId="edit-content" />
                </Link>
                <SVG iconId="trash1" />
            </div>
        ),
        sortable: false,
    },
];

export const userNavData = [
    { id: 1, icon: "user", title: "Personal info" },
    { id: 2, icon: "chain-broken", title: "Connect bank account" },
    { id: 3, icon: "group", title: "Inquiries" },
    { id: 4, icon: "group", title: "Completed " }
]