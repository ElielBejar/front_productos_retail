"use client";

import { createProductService } from "@/app/services/ProductService";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from "@mui/material";
import { useEffect, useState } from "react";

function ProductDialog({ categorias, proveedores, open, handleClose, onProductCreate }) {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [stockActual, setStockActual] = useState("");
    const [precioActual, setPrecioActual] = useState("");
    const [categoriaId, setCategoriaId] = useState(1);
    const [categoriaNombre, setCategoriaNombre] = useState("");
    const [proveedorId, setProveedorId] = useState(1);
    const [proveedorNombre, setProveedorNombre] = useState("");
    const [subProductos, setSubProductos] = useState([]);

    const resetStates = () => {
        setNombre("");
        setDescripcion("");
        setStockActual("");
        setPrecioActual("");
        setCategoriaId(categorias[0].id);
        setProveedorId(proveedores[0].id);
        setSubProductos([]);
    };

    useEffect(() => {
        // Verificar si las categorías están disponibles y establecer el nombre inicial
        if (categorias && categorias.length > 0) {
            setCategoriaId(categorias[0].id);
            setCategoriaNombre(categorias[0].nombre);
        }
    }, [categorias]);

    useEffect(() => {
        // Verificar si las categorías están disponibles y establecer el nombre inicial
        if (proveedores && proveedores.length > 0) {
            setProveedorId(proveedores[0].id);
            setProveedorNombre(proveedores[0].nombre);
        }
    }, [proveedores]);

    const handleSave = async () => {
        let response = await createProductService({
            nombre,
            descripcion,
            stockActual,
            precioActual,
            categoriaId,
            proveedorId,
            subProductos
        });

        if (response.ok) {
            resetStates();
            onProductCreate();
            handleClose();
        } else {
            alert("Error al crear el producto");
        }
    };

    const handleCancel = () => {
        resetStates();
        handleClose();
    }


    return (
        <>
            <Dialog open={open}>
                <DialogTitle>Crear producto</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                    <TextField
                        label="Descripcion"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    />
                    <TextField
                        label="Stock"
                        value={stockActual}
                        onChange={(e) => setStockActual(e.target.value)}
                    />
                    <TextField
                        label="Precio"
                        value={precioActual}
                        onChange={(e) => setPrecioActual(e.target.value)}
                    />
                    <InputLabel id="select-label">Categoría</InputLabel>
                    <Select
                        labelId="select-label"
                        value={categoriaNombre}
                        onChange={(e) => setCategoriaNombre(e.target.value)}
                    >
                        {categorias?.map((categoria) => (
                            <MenuItem key={categoria.id} value={categoria.id}>
                                {categoria.nombre}
                            </MenuItem>
                        ))}
                    </Select>
                    <InputLabel id="select-label2">Proveedor</InputLabel>
                    <Select
                        labelId="select-label2"
                        value={proveedorNombre}
                        onChange={(e) => setProveedorNombre(e.target.value)}
                    >
                        {proveedores?.map((proveedor) => (
                            <MenuItem key={proveedor.id} value={proveedor.id}>
                                {proveedor.nombre}
                            </MenuItem>
                        ))}
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="error" onClick={handleCancel}>
                        Cancelar
                    </Button>
                    <Button variant="contained" onClick={handleSave}>
                        Guardar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default ProductDialog;