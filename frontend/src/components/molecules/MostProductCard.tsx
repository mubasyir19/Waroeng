import Image from "next/image";
import React from "react";
import { API_URL } from "@/utils/config";

interface MostProductCardProps {
  productName: string;
  imageProduct: string;
  totalOrdered: number;
}

export default function MostProductCard({
  imageProduct,
  productName,
  totalOrdered,
}: MostProductCardProps) {
  return (
    <div className="flex items-center gap-4">
      <Image
        src={`${API_URL}${imageProduct}` || "/images/menu1.png"}
        alt="menu"
        width={56}
        height={56}
        className="size-14 rounded-full"
      />
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-200">{productName}</span>
        <span className="mt-1 text-xs text-gray-400">
          {totalOrdered} kali dipesan
        </span>
      </div>
    </div>
  );
}
