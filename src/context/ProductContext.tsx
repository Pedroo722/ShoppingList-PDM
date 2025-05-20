import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Product {
    name: string;
    quantity: number;
    bought: boolean;
}

interface ProductContextType {
    products: Product[];
    addProduct: (product: Product) => void;
    updateProductQuantity: (updatedProducts: Product[]) => void;
    removeProductFromPantry: (index: number) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
    const [products, setProducts] = useState<Product[]>([]);

    const addProduct = (product: Product) => {
        setProducts((prevProducts) => [...prevProducts, product]);
    };

    const updateProductQuantity = (updatedProducts: Product[]) => {
        setProducts(updatedProducts);
    };

    const removeProductFromPantry = (index: number) => {
        setProducts((prevProducts) => prevProducts.filter((_, i) => i !== index));
    };

    return (
        <ProductContext.Provider value={{ products, addProduct, updateProductQuantity, removeProductFromPantry }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProductContext = (): ProductContextType => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProductContext must be used within a ProductProvider');
    }
    return context;
};