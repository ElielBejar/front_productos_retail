"use client";

import { deleteProductService, updateProductService } from "@/app/services/ProductService";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    TextField,
    useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";

function ProductCard({ product, onProductUpdate }) {
    const [nombre, setNombre] = useState();
    const [descripcion, setDescripcion] = useState();
    const [stockActual, setStockActual] = useState();
    const [precioActual, setPrecioActual] = useState();
    const [editing, setEditing] = useState(false);

    const handleEdit = () => {
        setEditing(true);
    };

    const handleSave = async () => {
        let response = await updateProductService({
            id: product.id,
            nombre: nombre,
            descripcion: descripcion,
            stockActual: stockActual,
            precioActual: precioActual,
            categoriaId: product.categoriaId,
            proveedorId: product.proveedorId,
            subProductos: []
        });

        if (response.ok) {
            onProductUpdate();
            setEditing(false);
        } else {
            alert("Error");
        }
    };

    const handleCancel = () => {
        setEditing(false);
    };

    const handleDelete = async () => {
        let response = await deleteProductService(product.id);

        if (response.ok) {
            onProductUpdate();
        } else {
            alert('Error al eliminar producto')
        }

    };

    useEffect(() => {
        setNombre(product.nombre);
        setDescripcion(product.descripcion);
        setStockActual(product.stockActual);
        setPrecioActual(product.precioActual);
    }, [product]);

    return (
        <>
            <Card>
                <CardContent>
                    <TextField
                        disabled={!editing}
                        label="Nombre "
                        value={nombre || ""}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                    <TextField
                        disabled={!editing}
                        label="Descripcion "
                        value={descripcion || ""}
                        onChange={(e) => setDescripcion(e.target.value)}
                    />
                    <TextField
                        disabled={!editing}
                        label="Precio "
                        value={precioActual || ""}
                        onChange={(e) => setPrecioActual(e.target.value)}
                    />
                    <TextField
                        disabled={!editing}
                        label="Stock "
                        value={stockActual || ""}
                        onChange={(e) => setStockActual(e.target.value)}
                    />
                </CardContent>
                <CardActions>
                    <Button
                        variant="contained"
                        color={editing ? "success" : "info"}
                        onClick={editing ? handleSave : handleEdit}
                    >
                        {editing ? "Guardar" : "Editar"}
                    </Button>
                    <Button
                        variant="contained"
                        color={editing ? "info" : "error"}
                        onClick={editing ? handleCancel : handleDelete}
                    >
                        {editing ? "Cancelar" : "Borrar"}
                    </Button>
                </CardActions>
            </Card>
        </>
    );
}

export default ProductCard;