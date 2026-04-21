import { formatDateTime } from "@/helpers/formatDate";
import { formatPrice } from "@/helpers/formatPrice";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronLeft, ChevronRight, EllipsisVertical } from "lucide-react";
import { OrderReport, PaginationMeta } from "@/types/order";
import { usePagination } from "@/hooks/usePagination";
import ReceiptOrder from "../organism/ReceiptOrder";

interface TableReportProps {
  orderList: OrderReport[];
  meta: PaginationMeta;
}

export default function TableReport({ orderList, meta }: TableReportProps) {
  const { currentPage, goToPage } = usePagination();

  // const [showSuccessDialog, setShowSuccessDialog] = useState<boolean>(false);
  const [openReceipt, setOpenReceipt] = useState<boolean>(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string>("");

  const handlePrevious = () => {
    if (meta.hasPrevPage) {
      goToPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (meta.hasNextPage) {
      goToPage(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    goToPage(page);
  };

  // Generate page numbers untuk pagination
  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(meta.totalPages, startPage + maxVisiblePages - 1);

    // Adjust start page jika end page mencapai batas
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const handleOpenReceipt = (orderId: string) => {
    setSelectedOrderId(orderId);
    setOpenReceipt(true);
  };

  return (
    <>
      <table className="mt-8 w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="pb-3 text-sm font-semibold text-white">Tanggal</th>
            <th className="pb-3 text-sm font-semibold text-white">Customer</th>
            <th className="pb-3 text-sm font-semibold text-white">
              Total Payment
            </th>
            <th className="pb-3 text-sm font-semibold text-white">Status</th>
            <th className="pb-3 text-sm font-semibold text-white"></th>
          </tr>
        </thead>
        <tbody className="h-full overflow-hidden overflow-y-auto">
          {orderList?.length > 0 ? (
            orderList.map((order, i) => (
              <tr key={i} className="">
                <td className="py-5 text-center text-sm text-white">
                  {formatDateTime(order.createdAt)}
                </td>
                <td className="py-5 text-center text-sm text-white">
                  {order.customer}
                </td>
                <td className="py-5 text-center text-sm text-white">
                  {formatPrice(order.totalPrice)}
                </td>
                <td className="py-5 text-center text-sm text-white">
                  <span className="rounded-full bg-emerald-500/30 px-2.5 py-1 text-center text-xs font-medium text-emerald-500">
                    {order.payment.status}
                  </span>
                </td>
                <td className="py-5 text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <EllipsisVertical className="size-4 text-white" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-background">
                      <DropdownMenuItem className="text-center text-sm text-white">
                        Detail
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer text-center text-sm text-white"
                        onClick={() => handleOpenReceipt(order.id)}
                      >
                        Lihat Struk
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={5}
                className="py-8 text-center text-sm text-gray-400"
              >
                Tidak ada data order
              </td>
            </tr>
          )}
        </tbody>
        {/* Pagination Component */}
      </table>
      {orderList?.length > 0 && (
        <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-lg px-4 py-3 sm:flex-row">
          <div className="text-sm text-gray-300">
            Menampilkan {(currentPage - 1) * meta.itemsPerPage + 1} -{" "}
            {Math.min(currentPage * meta.itemsPerPage, meta.totalItems)} dari{" "}
            {meta.totalItems} data
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevious}
              disabled={!meta.hasPrevPage}
              className="flex items-center gap-1 rounded border border-gray-600 px-3 py-2 text-sm text-white transition-colors hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronLeft className="size-4" />
              Previous
            </button>

            <div className="flex items-center gap-1">
              {generatePageNumbers().map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageClick(page)}
                  className={`h-8 w-8 rounded text-sm ${
                    currentPage === page
                      ? "bg-blue-600 text-white"
                      : "border border-gray-600 text-gray-300 hover:bg-gray-700"
                  } transition-colors`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={!meta.hasNextPage}
              className="flex items-center gap-1 rounded border border-gray-600 px-3 py-2 text-sm text-white transition-colors hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      )}
      <ReceiptOrder
        orderSuccess={selectedOrderId}
        openReceipt={openReceipt}
        onOpenChangeReceipt={setOpenReceipt}
      />
    </>
  );
}
