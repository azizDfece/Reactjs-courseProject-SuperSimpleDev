import { Product } from "./Product"


export function ProductsGrid({ products, loadCart }) {
    return (
        <div className="products-grid">

            {products ? products.map((product) => {


                return (
                    <Product key={product.id} product={product} loadCart={loadCart} />
                )
            }) : <>lodaing</>}




        </div>
    )
} 