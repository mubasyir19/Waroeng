// import { daftarMenu } from "@/helpers/listMenu";
import React from "react";
import ProductManagementCard from "./ProductManagementCard";
import { useFetchProductByCategory } from "@/hooks/useProduct";
import { API_URL } from "@/utils/config";
import { Product } from "@/types/product";

interface ListManageProductProps {
  category: string;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
}

export default function ListManageProduct({
  category,
  onEditProduct,
  onDeleteProduct,
}: ListManageProductProps) {
  const { products } = useFetchProductByCategory(category);

  return (
    <>
      {/* {selectedCategory?.menu.map((menu, i) => ( */}
      {products?.map((menu, i) => (
        <ProductManagementCard
          key={i}
          // imageLink="/images/menu1.png"
          imageLink={`${API_URL}${menu.imageUrl}`}
          name={menu.name}
          price={Number(menu.price)}
          stock={Number(menu.stock)}
          unitId={menu.unitId}
          // onEditClick={() => onEditProduct()}
          onEditClick={() =>
            onEditProduct({
              id: menu.id,
              name: menu.name,
              price: menu.price,
              stock: menu.stock,
              imageUrl: menu.imageUrl,
              unitId: menu.unitId,
              categoryId: menu.categoryId,
            })
          }
          onDeleteClick={() => onDeleteProduct(menu.id)}
        />
      ))}
    </>
  );
}
