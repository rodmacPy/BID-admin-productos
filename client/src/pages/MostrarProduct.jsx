import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom';


export const MostrarProduct = () => {
    const [products, getProduct] = useOutletContext()

    useEffect(() => {
        getProduct()
        console.log('hola')
    }, [])
    const eliminarProducto = (id) => {
        axios.delete('http://127.0.0.1:8000/api/productos/' + id)
            .then(response => getProduct())
            .catch(error => console.error(error));
        
    }
    return (
        <div className='products'>
            <h1>All Products</h1>
            {products && products.map(product => (
                <div className='product-container' key={product._id}>
                    <Link to={'/' + product._id}>{product.title}</Link>
                    <div>
                        <Link className='btn green' key={product._id} to={'/' + product._id + '/edit'} >Editar</Link>
                        <button className='btn' onClick={() => eliminarProducto(product._id)}>Eliminar</button>

                    </div>
                </div>
            ))}
        </div>
    )
}
