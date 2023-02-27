import axios from 'axios';
import { useForm } from '../hooks/useForm';
import { Outlet, useParams } from 'react-router';
import { useEffect, useState } from 'react';


function EditarProduct() {
    const { id } = useParams();
    const { formState, setFormState, onInputChange, onResetForm, title, description, price } = useForm({
        title: '',
        description: '',
        price: ''
    })
    const getProduct = () => {
        axios.get('http://127.0.0.1:8000/api/productos/' + id)
            .then(response => setFormState(response.data.product))
            .catch(error => console.error(error));
    }

    console.log(formState)
    useEffect(() => {
        getProduct()
    }, [])

    function handleSubmit(event) {
        event.preventDefault();

        axios.put('http://127.0.0.1:8000/api/productos/' + id, formState)
            .then(response => {
                console.log(response.data);
                setFormState(response.data);
            })
            .catch(error => console.error(error));
    }

    return (
        <>
            <div className='container'>
                <h1>Product Manager</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        Title:
                    </label>
                    <input
                        type="text"
                        value={title}
                        name='title'
                        onChange={onInputChange} />

                    <label>
                        Price:
                    </label>
                    <input
                        type="number"
                        value={price}
                        name='price'
                        onChange={onInputChange} />

                    <label>
                        Description:

                    </label>
                    <input
                        name='description'
                        value={description}
                        onChange={onInputChange}
                    />
                    <button type="submit">Editar</button>
                </form>
            </div>
        </>
    );
}

export default EditarProduct
