import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Product } from "../App"

type ProductProps = {
    products: Product[]
}

export const ProductShow = (props: ProductProps) => {
    let { products } = props
    const [product, setProduct] = useState<Product[]>([]);
    const { id } = useParams();

    useEffect(() => {
        if (products.length > 0) {
            let filteredProduct = products.filter(product => product.id == id);
            setProduct(filteredProduct)
        }
    }, [products, id])

    return (
        <>
            <div className="form-header mb-3 text-start">
                <Link className="btn btn-outline-info float-right" to="/">View All Products</Link>
            </div>
            <div className="card p4 shadow-lg rounded-2xl m-auto">
                <div className="card-body d-flex justify-content-between flex-column">
                    {product.map(product => {
                        return (
                            <>
                                <img src={product['image']} alt="" className="card-img-top" />
                                <h5 className="card-title">{product['title']}</h5>
                                <p className="">{product['description']}</p>
                                <p className="card-text center fw-bold fs-3">{product['price']}$</p>
                            </>
                        )
                    })}
                </div>
                <div className="align-self-bottom card-buttons justify-content-around d-flex">
                    <Link className="btn btn-warning mx-1"
                        to={`/edit/${id}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z" />
                        </svg>
                    </Link>
                </div>
            </div>
        </>
    )
}