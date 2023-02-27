import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';

export const MostrarDetalles = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const [products, setProducts] = useState(null)

    const getProduct = () => {
        axios.get('http://127.0.0.1:8000/api/productos/' + id)
            .then(response => setProducts(response.data.product))
            .catch(error => console.error(error));
    }
    useEffect(() => {
        getProduct()
    }, [])

    const eliminarProducto = (id) => {
        axios.delete('http://127.0.0.1:8000/api/productos/' + id)
            .catch(error => console.error(error));
        navigate('/products')
    }
    return (
        <div>
            <h3>Detalles del Producto</h3>
            {products &&
                <>
                    <h3>{products.title}</h3>
                    <p>{products.price}</p>
                    <p>{products.description}</p>
                    <button onClick={() => eliminarProducto(products._id)}>Eliminar Producto</button>
                </>
            }
        </div>
    )
}
