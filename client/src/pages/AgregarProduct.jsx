import axios from 'axios';
import { useForm } from '../hooks/useForm';
import { Outlet } from 'react-router';
import { useState } from 'react';


function AgregarProduct() {
    const { formState, onInputChange, onResetForm, title, description, price } = useForm({
        title: '',
        description: '',
        price: ''
    })

    const [products, setProducts] = useState(null)
    const getProduct = () => {
        axios.get('http://127.0.0.1:8000/api/productos/')
            .then(response => setProducts(response.data.product))
            .catch(error => console.error(error));
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(formState)

        axios.post('http://127.0.0.1:8000/api/productos/', formState)
            .then(response => getProduct())
            .catch(error => console.error(error));
        onResetForm();
        
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
                    <button type="submit">Create</button>
                </form>
            </div>
            <Outlet context={[products, getProduct]}/>
        </>
    );
}

export default AgregarProduct
