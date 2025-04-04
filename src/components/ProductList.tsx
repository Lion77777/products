import { ChangeEvent } from "react"
import { Link } from "react-router-dom";
import { Product } from "../App";


type ProductsProps = {
    products: Product[],
    handleSelect: (e: ChangeEvent<HTMLSelectElement>) => void
    handleFavourite: (id: string, index: number) => void
    handleDelete: (id: string) => void
}

export const ProductList = (props: ProductsProps) => {
    const { products, handleSelect, handleFavourite, handleDelete } = props;

    return (
        <>
            <h1 className="mb-5">Products</h1>
            <div className="d-flex justify-content-between text-start mb-5">
                <Link className="btn btn-outline-primary" to="/create">Create New Product</Link>
                <select className="form-select" onChange={handleSelect}>
                    <option value="All">All Products</option>
                    <option value="Favourites">Favourites</option>
                </select>
            </div>
            <div className="card-deck d-flex justify-content-center gap-3">
                {products.map((product, index) => {
                    return (
                        <div className="card p4 shadow-lg rounded-2xl h-64 ">

                            <Link to={`/product/${product.id}`} className="text-decoration-none text-dark card-body d-flex justify-content-between flex-column">

                                <img src={product['image']} alt="" className="card-img-top" />
                                <h5 className="card-title">{product['title']}</h5>
                                <p className="card-text text-truncate">{product['description']}</p>
                                <p className="card-text center fw-bold fs-3">{product['price']}$</p>
                            </Link>

                            <div className="align-self-bottom card-buttons justify-content-around d-flex">
                                <button type="button" className="btn btn-primary align-center " onClick={() => handleFavourite(product['id'], index)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hand-thumbs-up-fill" viewBox="0 0 16 16">
                                        <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a10 10 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733q.086.18.138.363c.077.27.113.567.113.856s-.036.586-.113.856c-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.2 3.2 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.8 4.8 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z" />
                                    </svg>
                                </button>
                                <Link className="btn btn-warning mx-1"
                                    to={`/edit/${product.id}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z" />
                                    </svg>
                                </Link>
                                <button type="button" className="btn btn-danger align-center" onClick={() => handleDelete(product['id'])}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                    </svg>
                                </button>

                            </div>
                        </div>
                    )
                })}
            </div>
        </>

    )
}