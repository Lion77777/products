import { ChangeEvent } from "react";
import { Link } from "react-router-dom"

type ProductPros = {
    handleImageCreating: (e: ChangeEvent<HTMLInputElement>) => void
    setTitle: (title: string) => void
    setPrice: (price: string) => void
    setDescription: (description: string) => void
    handleSave: () => void
    isSaving: boolean
    title: string
    price: string
    description: string
}

export const ProductCreate = (props: ProductPros) => {
    const { handleImageCreating, setTitle, setPrice, setDescription, handleSave, isSaving, title, price, description } = props;

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
                                    onChange={handleImageCreating}
                                    type="file"
                                    id="image"
                                    name="image"
                                />
                            </div>
                            <div className="form-group mb-3 text-start">
                                <label htmlFor="name">Title</label>
                                <input className="form-control"
                                    onChange={(event) => { setTitle(event.target.value) }}
                                    value={title}
                                    type="text"
                                    id="name"
                                    name="name"
                                />
                            </div>
                            <div className="form-group mb-3 text-start">
                                <label htmlFor="price">Price</label>
                                <input className="form-control"
                                    onChange={(event) => { setPrice(event.target.value) }}
                                    value={price}
                                    type="number"
                                    id="price"
                                    name="price"
                                />
                            </div>
                            <div className="form-group mb-3 text-start">
                                <label htmlFor="description">Description</label>
                                <textarea className="form-control"
                                    value={description}
                                    onChange={(event) => { setDescription(event.target.value) }}
                                    id="description"
                                    name="description"
                                ></textarea>
                            </div>
                            <button className="btn btn-outline-primary mt-3"
                                disabled={isSaving}
                                onClick={handleSave}
                                type="button"
                            >
                                Add Product
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}