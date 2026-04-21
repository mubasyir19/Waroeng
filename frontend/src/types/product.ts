export interface Product {
  id: string;
  categoryId: string;
  unitId: string;
  name: string;
  price: number;
  stock: number;
  imageUrl: string;
  //   createdAt: "2025-09-27T10:03:48.108Z";
  //   updatedAt: "2025-09-27T10:03:48.108Z";
}

export interface ProductForm {
  name: string;
  price: number;
  stock: number;
  imageUrl: File | string | null;
  categoryId: string;
  unitId: string;
}
