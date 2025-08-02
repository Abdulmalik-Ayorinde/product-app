import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product, ProductContextType, ProductAction, ProductState } from '../types/Product';

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const initialState: ProductState = {
    products: [],
    maxProducts: 5,
};

const productReducer = (state: ProductState, action: ProductAction): ProductState => {
    switch (action.type) {
        case 'ADD_PRODUCT':
            return {
                ...state,
                products: [...state.products, action.payload],
            };
        case 'DELETE_PRODUCT':
            return {
                ...state,
                products: state.products.filter(product => product.id !== action.payload),
            };
        case 'UPDATE_PRODUCT':
            return {
                ...state,
                products: state.products.map(product =>
                    product.id === action.payload.id ? action.payload : product
                ),
            };
        default:
            return state;
    }
};

interface ProductProviderProps {
    children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(productReducer, initialState);

    const addProduct = (product: Omit<Product, 'id'>): boolean => {
        if (state.products.length >= state.maxProducts) {
            return false;
        }
        const newProduct: Product = { ...product, id: Date.now() };
        dispatch({ type: 'ADD_PRODUCT', payload: newProduct });
        return true;
    };

    const deleteProduct = (id: number): void => {
        dispatch({ type: 'DELETE_PRODUCT', payload: id });
    };

    const canAddProduct = (): boolean => {
        return state.products.length < state.maxProducts;
    };

    const getRemainingSlots = (): number => {
        return state.maxProducts - state.products.length;
    };

    const value: ProductContextType = {
        products: state.products,
        maxProducts: state.maxProducts,
        addProduct,
        deleteProduct,
        canAddProduct,
        getRemainingSlots,
    };

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = (): ProductContextType => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
};