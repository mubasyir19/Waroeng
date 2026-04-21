"use client";

import CategoryTabs from "@/components/molecules/CategoryTabs";
import ListMenu from "@/components/molecules/ListMenu";
import FormOrder from "@/components/organism/FormOrder";
import Payment from "@/components/organism/Payment";
import ReceiptOrder from "@/components/organism/ReceiptOrder";
import { getTodayDate } from "@/helpers/getToday";
import { useDeleteOrder } from "@/hooks/useOrder";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [continuePayment, setContinuePayment] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [resetFormOrderSignal, setResetFormOrderSignal] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState<boolean>(false);
  const [successfulOrderId, setSuccessfulOrderId] = useState<string | null>(
    null,
  );
  const [isProcessingPayment, setIsProcessingPayment] =
    useState<boolean>(false);
  const { deleteOrder } = useDeleteOrder();

  useEffect(() => {
    const savedOrderId = localStorage.getItem("currentOrderId");
    if (savedOrderId) {
      setOrderId(savedOrderId);
      setContinuePayment(true);
    }
  }, []);

  const handleProceed = async (id: string) => {
    setOrderId(id);
    localStorage.setItem("currentOrderId", id);

    await new Promise((resolve) => setTimeout(resolve, 500));

    setContinuePayment(true);
    setIsProcessingPayment(false);
  };

  const handleCancelProceed = (idOrder: string) => {
    deleteOrder(idOrder);
    setContinuePayment(false);
    setOrderId(null);
    localStorage.removeItem("currentOrderId");
  };

  // dipanggil saat payment sukses
  const handlePaymentSuccess = (successOrderId: string) => {
    setContinuePayment(false);
    setSuccessfulOrderId(successOrderId);
    localStorage.removeItem("currentOrderId");
    setShowSuccessDialog(true);

    // toggle signal agar FormOrder ter reset
    setResetFormOrderSignal((s) => !s);
  };

  return (
    <div className="flex h-screen flex-row">
      <div className="bg-surface relative flex h-screen w-4/6 flex-col p-6">
        <div className="flex items-center justify-between">
          <div className="">
            <h3 className="text-2xl font-semibold text-white">
              Warung Warungan
            </h3>
            <p className="mt-1 text-base text-white">{getTodayDate()}</p>
          </div>
          <div className="">
            <form>
              <div className="border-text-secondary bg-secondary text-color-text-secondary flex w-full max-w-md items-center rounded-lg border px-3 py-2">
                <Search className="text-text-secondary mr-2 size-4" />
                <input
                  type="text"
                  placeholder="Search for food, coffee, etc.."
                  className="text-text-secondary placeholder-text-secondary flex-1 bg-transparent text-sm outline-none"
                />
              </div>
            </form>
          </div>
        </div>
        <div className="mt-4">
          <CategoryTabs
            selected={selectedCategory}
            onSelect={(category) => setSelectedCategory(category)}
          />
        </div>
        {selectedCategory ? (
          <ListMenu category={selectedCategory} />
        ) : (
          <p className="text-base font-medium text-red-500">
            Terjadi masalah dengan koneksi server.
          </p>
        )}
        {continuePayment && orderId && (
          <Payment
            orderId={orderId}
            onCancel={() => handleCancelProceed(orderId)}
            onSuccess={() => handlePaymentSuccess(orderId)}
          />
        )}
      </div>
      <div className="bg-background h-screen w-2/6 p-6">
        <FormOrder
          onProceed={(orderId) => handleProceed(orderId)}
          resetSignal={resetFormOrderSignal}
          isProcessing={isProcessingPayment}
        />
      </div>
      <ReceiptOrder
        openReceipt={showSuccessDialog}
        // onOpenChangeReceipt={setShowSuccessDialog}
        onOpenChangeReceipt={(open) => {
          setShowSuccessDialog(open);
          if (!open) {
            // Reset successfulOrderId ketika dialog ditutup
            setSuccessfulOrderId(null);
          }
        }}
        orderSuccess={successfulOrderId as string}
      />
    </div>
  );
}
