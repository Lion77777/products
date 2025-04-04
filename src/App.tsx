import { ChangeEvent, useEffect, useState } from 'react'
import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ProductList } from './components/ProductList'
import { ProductCreate } from './components/ProductCreate'
import axios from 'axios'
import Swal from 'sweetalert2'
import { v1 } from 'uuid'
import { ProductShow } from './components/ProductShow'
import { ProductEdit } from './components/ProductEdit'

export type Product = {
  id: string,
  title: string,
  description: string,
  price: number,
  image: string,
  preview: string
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [image, setImage] = useState<string>('');
  const [preview, setPreview] = useState<string>('');
  const [favourites, setFavourites] = useState<Product[]>([]);

  const handleImageCreating = (e: React.ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files?.[0]

    if (!file) return;

    setImage(URL.createObjectURL(file));
  };

  useEffect(() => {
    fetchProductList()
  }, [])

  const fetchProductList = () => {
    axios.get('/products')
      .then((response) => {
        setProducts(response.data)
        setAllProducts(response.data);


      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleSave = () => {
    let prevProducts = products;
    try {
      setIsSaving(true);

      const products: Product = {
        id: v1(),
        title,
        price: Number(price),
        description,
        image: String(image),
        preview
      };

      setProducts([...prevProducts, products])
      setAllProducts([...prevProducts, products])

      Swal.fire({
        icon: "success",
        title: "Product saved locally!",
        showConfirmButton: false,
        timer: 1500,
      });

      setTitle("");
      setDescription("");
      setPrice("");
      setImage('');
      setPreview('');
    } catch (error) {
      console.error("Error saving product:", error);

      Swal.fire({
        icon: "error",
        title: "Failed to save product!",
        text: "Please try again.",
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setIsSaving(false);
    }
  }


  const handleFavourite = (productId: string, index: number) => {
    if (favourites.length > 0) {
      const updatedFavourites = favourites.filter(favourite => {
        return favourite.id != productId
      });

      setFavourites([...updatedFavourites, products[index]]);
    } else {
      setFavourites([...favourites, products[index]]);
    }
  }

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === 'Favourites') {
      setProducts(favourites);
    } else {
      setProducts(allProducts)
    }
  }

  const handleDelete = (productId: string) => {
    const newProducts = products.filter(product => product.id != productId);

    setProducts(newProducts);
    setAllProducts(newProducts);

    const updateFavourites = favourites.filter(favourite => favourite.id !== productId)

    setFavourites(updateFavourites);
  }

  return (
    <Router>
      <Routes>
        <Route path="/"
          element={
            <ProductList
              products={products}
              handleSelect={handleSelect}
              handleFavourite={handleFavourite}
              handleDelete={handleDelete}
            />
          }
        />
        <Route path="/create"
          element={
            <ProductCreate
              handleImageCreating={handleImageCreating}
              setTitle={setTitle}
              setPrice={setPrice}
              setDescription={setDescription}
              handleSave={handleSave}
              isSaving={isSaving}
              title={title}
              price={price}
              description={description}
            />
          }
        />
        <Route path="/product/:id" element={<ProductShow products={products} />} />
        <Route path="/edit/:id"
          element={
            <ProductEdit
              products={products}
              setAllProducts={setAllProducts}
              favourites={favourites}
              setTitle={setTitle}
              setPrice={setPrice}
              setDescription={setDescription}
              setProducts={setProducts}
              setPreview={setPreview}
              setFavourites={setFavourites}
              allProducts={allProducts}
            />
          }
        />
      </Routes>
    </Router>
  )
}

export default App
