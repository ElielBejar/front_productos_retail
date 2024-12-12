const API_URL = "http://localhost:9811";

//obtiene todos los productos
export async function getProductsService() {
    let data = await fetch(`${API_URL}/productos`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            return data;
        });
    return data;
}

//obtiene el producto por id
export async function getProductByIdService(id) {
    let data = await fetch(`${API_URL}/productos/${id}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            return data;
        });
    return data;
}

//obtengo las categorias
export async function getCategoriasService() {
    let data = await fetch(`${API_URL}/productos/categorias`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            return data;
        });
    return data;
}

//obtengo los proveedores
export async function getProveedoresService() {
    let data = await fetch(`${API_URL}/productos/proveedores`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            return data;
        });
    return data;
}

//obtengo el id de categoria
export async function getCategoriaByIdService(id) {
    let data = await fetch(`${API_URL}/productos/categorias/${id}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            return data;
        });
    return data;
}

//obtiene un proveedor por id
export async function getProveedorByIdService(id) {
    let data = await fetch(`${API_URL}/productos/proveedores/${id}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            return data;
        });
    return data;
}


//actualiza el producto
export async function updateProductService(product) {
    let response = await fetch(`${API_URL}/productos/${product.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
    }).then((response) => response);

    return response;
}


//borra el producto
export async function deleteProductService(id) {
    let response = await fetch(`${API_URL}/productos/${id}`, {
        method: "DELETE",
    }).then((response) => response);

    return response;
}


//crea el producto
export async function createProductService(product) {
    let response = await fetch(`${API_URL}/productos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
    });
    console.log(product);
    return response;
}

