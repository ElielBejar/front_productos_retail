'use client'

import ProductCard from "@/app/components/products/ProductCard";
import ProductDialog from "@/app/components/products/ProductDialog";
import ProductsTable from "@/app/components/products/ProductsTable";
import { getCategoriasService, getProveedoresService, getCategoriaByIdService, getProductsService, getProveedorByIdService } from "@/app/services/ProductService";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

function PageProducts() {
    const [editedProduct, setEditedProduct] = useState(null)
    const [rows, setRows] = useState([])
    const [dialogOpen, setDialogOpen] = useState(false)
    const [categorias, setCategorias] = useState([])
    const [proveedores, setProveedores] = useState([])

    const getProducts = async () => {
        let data = await getProductsService()
        for (let i = 0; i < data.length; i++) {
            let proveedor = await getProveedorByIdService(data[i].proveedorId);
            let categoria = await getCategoriaByIdService(data[i].categoriaId);
            data[i].nombreProveedor = proveedor.nombre;
            data[i].nombreCategoria = categoria.nombre;
        }
        setEditedProduct(null);
        setRows(data)
    }

    const getCategorias = async () => {
        let data = await getCategoriasService()
        setCategorias(data)
    }

    const getProveedores = async () => {
        let data = await getProveedoresService()
        setProveedores(data)
    }


    const handleEdit = (product) => {
        setEditedProduct(product)
    }

    useEffect(() => {
        console.log('Producto desde page')
        console.log(editedProduct)
    }, [editedProduct])

    useEffect(() => {
        getProducts()
        getCategorias()
        getProveedores()
    }, [])

    return (
        <>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',

            }}>
                <h1>Tabla productos</h1>
                <Button variant="contained" onClick={() => setDialogOpen(true)}>Crear producto</Button>
                <ProductsTable handleEdit={handleEdit} data={rows} ></ProductsTable>

                {editedProduct && <ProductCard product={editedProduct} onProductUpdate={getProducts} />}

                <ProductDialog categorias={categorias} proveedores={proveedores} open={dialogOpen} handleClose={() => setDialogOpen(false)} onProductCreate={getProducts} />

            </div>
        </>

    )
}

export default PageProducts;