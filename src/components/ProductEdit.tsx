import { ChangeEvent, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Product } from "../App"
import Swal from "sweetalert2"
import axios from "axios"

type ProductPros = {
    products: Product[]
    setTitle: (title: string) => void
    setPrice: (price: string) => void
    setDescription: (description: string) => void
    setPreview: (preview: string) => void
    setAllProducts: (product: Product[]) => void
    setProducts: (product: Product[]) => void
    allProducts: Product[]
    favourites: Product[]
    setFavourites: (favourite: Product[]) => void
}
export const ProductEdit = (props: ProductPros) => {
    const { products, setAllProducts, setProducts, setPrice, setTitle, setDescription, setPreview, allProducts, favourites, setFavourites } = props;
    const [product, setProduct] = useState<Product | null>(null);
    const [image, setImage] = useState<string>('');
    const { id } = useParams();

    useEffect(() => {
        if (products.length > 0) {
            let filteredProduct = products.find(product => product.id == id);

            setProduct(filteredProduct || null)
        }
    }, [products, id])

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        let file = e.target.files?.[0];
        if (!file) {
            return;
        }

        setImage(String(URL.createObjectURL(file)))
    }

    const handleEdit = () => {
        try {
            const updatedProduct: Product = {
                id: product?.id || '',
                title: product?.title || '',
                price: Number(product?.price),
                description: product?.description || '',
                image: image || product?.image || '',
                preview: product?.preview || ''
            };

            axios.patch(`/products/${id}`, updatedProduct)
                .then(function (response) {
                })
                .catch(function (error) {
                    console.log(error);
                });

            const updatedProducts = allProducts.map(product =>
                product.id === updatedProduct.id ? updatedProduct : product
            );

            setAllProducts(updatedProducts);
            setProducts(updatedProducts);

            const updatedFavourites = favourites.map(product => product.id === updatedProduct.id ? updatedProduct : product);

            setFavourites(updatedFavourites);

            Swal.fire({
                icon: "success",
                title: "Product updated successfully!",
                showConfirmButton: false,
                timer: 1500,
            });

            setTitle("");
            setDescription("");
            setPrice("");
            setPreview('');
        } catch (error) {
            console.error("Error updating product:", error);

            Swal.fire({
                icon: "error",
                title: "Failed to update product!",
                text: "Please try again.",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    return (
        <>
            <div className="m-auto">
                <h2 className="text-center mt-5 mb-3">Create New Project</h2>
                <div className="form">
                    <div className="form-header mb-3 text-start">
                        <Link className="btn btn-outline-info float-right" to="/">View All Products</Link>
                    </div>
                    <div className="form-body">
                        <form>
                            <div className="form-group mb-3 text-start">
                                <label htmlFor="image">Upload image</label>
                                <input className="form-control"
                                    onChange={handleImageChange}
                                    type="file"
                                    id="image"
                                    name="image"
                                />
                            </div>
                            <div className="form-group mb-3 text-start">
                                <label htmlFor="name">Title</label>
                                <input className="form-control"
                                    onChange={(event) => {
                                        if (product) {
                                            setProduct({ ...product, title: String(event.target.value) });
                                        }
                                    }}
                                    value={product?.title || ''}
                                    type="text"
                                    id="name"
                                    name="name"
                                />
                            </div>
                            <div className="form-group mb-3 text-start">
                                <label htmlFor="price">Price</label>
                                <input className="form-control"
                                    onChange={(event) => {
                                        if (product) {
                                            setProduct({ ...product, price: Number(event.target.value) });
                                        }
                                    }}
                                    value={product?.price || ''}
                                    type="number"
                                    id="price"
                                    name="price"
                                />
                            </div>
                            <div className="form-group mb-3 text-start">
                                <label htmlFor="description">Description</label>
                                <textarea className="form-control"
                                    value={product?.description || ''}
                                    onChange={(event) => {
                                        if (product) {
                                            setProduct({ ...product, description: String(event.target.value) });
                                        }
                                    }}
                                    id="description"
                                    name="description"
                                    rows={3}
                                ></textarea>
                            </div>
                            <button className="btn btn-outline-primary mt-3"
                                onClick={handleEdit}
                                type="button"
                            >
                                Update Product
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}