
import './HomePage.css'
import { products } from '../../../starting-code/data/products'
import { Header } from '../../components/Header'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { ProductsGrid } from './ProductsGrid'
export function HomePage({ cart }) {
    let [products, setProducts] = useState([])


    useEffect(() => {
        axios.get('/api/products').then((d) => {
            setProducts(d.data)

        })


    }, [])


    return (
        <>
            <title>Ecommerce Project</title>

            <Header cart={cart} />

            <div className="home-page">
                <ProductsGrid products={products}></ProductsGrid>
            </div>

        </>
    )
}
