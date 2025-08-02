export interface Product {
	id: number;
	name: string;
	price: number;
	imageUri: string;
	createdAt: string;
}

export interface ProductContextType {
	products: Product[];
	maxProducts: number;
	addProduct: (product: Omit<Product, "id">) => boolean;
	deleteProduct: (id: number) => void;
	canAddProduct: () => boolean;
	getRemainingSlots: () => number;
}

export type ProductAction =
	| { type: "ADD_PRODUCT"; payload: Product }
	| { type: "DELETE_PRODUCT"; payload: number }
	| { type: "UPDATE_PRODUCT"; payload: Product };

export interface ProductState {
	products: Product[];
	maxProducts: number;
}
