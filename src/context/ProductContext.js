// src/context/ProductContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]); // Almacena los productos actuales
  const [filteredProducts, setFilteredProducts] = useState([]); // Productos filtrados por búsqueda
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Para manejar errores
  const [currentPage, setCurrentPage] = useState(1); // Página actual para la paginación
  const [totalPages, setTotalPages] = useState(1); // Total de páginas
  const [message, setMessage] = useState(''); // Mensaje de éxito o error
  const [categories, setCategories] = useState([]); // Nueva variable para categorías
  

  // Función para cargar productos con paginación
  const fetchProducts = async (page = 1) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/products?page=${page}&limit=9`);
      console.log(response.data);
      const { products, totalPages, currentPage } = response.data;

      setProducts(products);
      setFilteredProducts(products);
      setTotalPages(totalPages);
      setCurrentPage(currentPage);
    } catch (err) {
      setError('Error al cargar los productos');
    } finally {
      setLoading(false);
    }
  };

  // Cargar categorías
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products/categories');
      setCategories(response.data.categories); // Guardar las categorías obtenidas
    } catch (err) {
      setError('Error al cargar las categorías');
    }
  };

  // Función para agregar un nuevo producto
  const addProduct = async (productData) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/products', productData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return { success: true }; // Devuelve un objeto que indica éxito
  } catch (err) {
    console.error(err); // Imprime el error en la consola
    return { success: false }; // Devuelve un objeto que indica fallo
    }
  };

  // Función para subir productos a través de un archivo JSON
  const uploadProductsFromJson = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post('http://localhost:5000/api/products/upload-json', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message);
      fetchProducts(currentPage); // Recargar productos después de la carga masiva
    } catch (err) {
      console.error(err); // Imprime el error en la consola para depurar
      throw new Error('Error al cargar los productos desde JSON'); // Lanza un error para manejarlo en el componente
    }
  };

  useEffect(() => {
    fetchProducts(currentPage); // Carga productos cuando el componente se monta o cambia la página
    fetchCategories();
  }, [currentPage]);

  // Función para filtrar productos con base en el término de búsqueda
  const searchProducts = (query) => {
    const result = products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(result);
  };

  // Funciones para la paginación
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(prevPage => prevPage - 1);
  };

  return (
    <ProductContext.Provider
      value={{
        products: filteredProducts,
        loading,
        error,
        currentPage,
        totalPages,
        searchProducts,
        fetchProducts,
        handleNextPage,
        handlePrevPage,
        addProduct,
        uploadProductsFromJson,
        categories, // Pasar las categorías al contexto
        message
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  return useContext(ProductContext);
};
