"use client";

import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

function ProductsTable({ handleEdit, data }) {
    const columns = [
        { field: "id", headeName: "ID", width: 90 },
        {
            field: "nombre",
            headerName: "Nombre",
            width: 150,
        },
        {
            field: "descripcion",
            headerName: "Descripcion",
            width: 150,
        },
        {
            field: "stockActual",
            headerName: "Stock",
            width: 160,
            // valueGetter: (value, row) => `${row.firstName || ""}.${row.lastName}`.toLowerCase(),
        },
        {
            field: "precioActual",
            headerName: "Precio",
            width: 160,
            // valueGetter: (value, row) => `${row.firstName || ""}.${row.lastName}`.toLowerCase(),
        },
        {
            field: "nombreCategoria",
            headerName: "Categoria",
            width: 160,
            // valueGetter: (value, row) => `${row.firstName || ""}.${row.lastName}`.toLowerCase(),
        },
        {
            field: "nombreProveedor",
            headerName: "Proveedor",
            width: 160,
            // valueGetter: (value, row) => `${row.firstName || ""}.${row.lastName}`.toLowerCase(),
        }
    ];

    return (
        <Box padding={1} sx={{ height: 400, width: 590 }}>
            <DataGrid
                rows={data}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                rowSelection
                onRowClick={(data) => {
                    console.log(data.row)
                    handleEdit(data.row)
                }}
            />
        </Box>
    );
}

export default ProductsTable;