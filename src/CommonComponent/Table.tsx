"use client";
import { customTableStyles } from "@/Components/Admin/Batches/BatchesList";
import React from "react";
import DataTable, { TableColumn } from "react-data-table-component";

export interface ReusableDataTableProps<T> {
	data: T[];
	columns: TableColumn<T>[];
	loading?: boolean;
	pagination?: boolean;
	striped?: boolean;
	fixedHeader?: boolean;
	fixedHeaderScrollHeight?: string;
	noDataComponent?: React.ReactNode;
	onRowClicked?: (row: T, e: React.MouseEvent) => void;
	className?: string;
	persistTableHead?: boolean;
	highlightOnHover?: boolean;
	pointerOnHover?: boolean;
	dense?: boolean;
	showSerialNo?: boolean;
}

const ReusableDataTable = <T extends object>({
	data,
	columns,
	loading = false,
	pagination = true,
	striped = true,
	fixedHeader = false,
	fixedHeaderScrollHeight,
	noDataComponent = "No records found.",
	onRowClicked,
	className,
	persistTableHead = false,
	highlightOnHover = false,
	pointerOnHover = false,
	dense = false,
	showSerialNo = true,
}: ReusableDataTableProps<T>) => {
	type RowType = T & (typeof showSerialNo extends true ? { srNo: number } : {});

	// Add serial number column
	const serialColumn: TableColumn<RowType> = {
		name: "Sr. No",
		selector: (row: any) => row.srNo,
		width: "80px",
	};

	const dataWithSrNo = showSerialNo
		? (data.map((item, index) => ({
				...item,
				srNo: index + 1,
		  })) as RowType[])
		: (data as RowType[]);

	const finalColumns = showSerialNo
		? [serialColumn, ...(columns as TableColumn<RowType>[])]
		: (columns as TableColumn<RowType>[]);

	return (
		<DataTable
			columns={finalColumns}
			data={dataWithSrNo}
			progressPending={loading}
			pagination={pagination}
			striped={striped}
			fixedHeader={fixedHeader}
			fixedHeaderScrollHeight={fixedHeaderScrollHeight}
			noDataComponent={noDataComponent}
			onRowClicked={onRowClicked}
			className={className}
			persistTableHead={persistTableHead}
			highlightOnHover={highlightOnHover}
			pointerOnHover={pointerOnHover}
			dense={dense}
			customStyles={customTableStyles}
		/>
	);
};

export default ReusableDataTable;
