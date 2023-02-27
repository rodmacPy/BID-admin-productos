import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import AgregarProduct from '../pages/AgregarProduct'
import EditarProduct from '../pages/EditarProduct'
import { MostrarDetalles } from '../pages/MostrarDetalles'
import { MostrarProduct } from '../pages/MostrarProduct'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AgregarProduct />,
        children: [
            {
                path: '/products',
                element: <MostrarProduct />
            }
        ]
    },
    {
        path: '/:id',
        element: <MostrarDetalles />,
    },
    {
        path: '/:id/edit',
        element: <EditarProduct />,
    }

])
