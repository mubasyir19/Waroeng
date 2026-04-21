import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { CircleCheckBig } from "lucide-react";
import { formatPrice } from "@/helpers/formatPrice";
import { useOrderById } from "@/hooks/useOrder";
import { formatDate } from "@/helpers/formatDate";
import { usePaymentByOrderId } from "@/hooks/usePayment";

interface ReceiptOrderProps {
  orderSuccess: string;
  openReceipt: boolean;
  onOpenChangeReceipt: (openReceipt: boolean) => void;
}

export default function ReceiptOrder({
  orderSuccess,
  openReceipt,
  onOpenChangeReceipt,
}: ReceiptOrderProps) {
  const { order } = useOrderById(orderSuccess);
  const { payment } = usePaymentByOrderId(order?.id as string);

  return (
    <Dialog open={openReceipt} onOpenChange={onOpenChangeReceipt}>
      <DialogHeader>
        <DialogTitle></DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>
      <DialogContent className="w-1/4">
        <div className="">
          <div className="flex items-center justify-center">
            <CircleCheckBig className="size-12 text-center text-green-500" />
          </div>
          <h3 className="mt-2 text-center text-2xl font-semibold text-white">
            Pembayaran Berhasil
          </h3>
          <hr className="my-3 w-full border border-gray-600" />
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <p className="text-base font-medium text-white">Tanggal</p>
              <p className="text-base font-medium text-white">
                {formatDate(order?.createdAt as string)}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-base font-medium text-white">Kode Transaksi</p>
              <p className="text-base font-medium text-white">
                {order?.receipt_code}
              </p>
            </div>
          </div>
          <hr className="my-3 w-full border border-gray-600" />
          <div className="grid gap-2">
            {order?.orderItems.map((ordr, i) => (
              <div key={i} className="flex items-center justify-between">
                <p className="text-base text-white">
                  {ordr.product?.name} x{ordr.quantity}
                </p>
                <p className="text-base text-white">
                  {formatPrice(ordr.price)}
                </p>
              </div>
            ))}
            <div className="mt-5 flex items-center justify-between">
              <p className="text-base text-white">SubTotal</p>
              <p className="text-base text-white">
                {formatPrice(order?.totalPrice as number)}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-base font-medium text-white">Total</p>
              <p className="text-base font-medium text-white">
                {formatPrice(order?.totalPrice as number)}
              </p>
            </div>
          </div>
          <hr className="my-3 w-full border border-gray-600" />
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <p className="text-base text-white">Metode</p>
              <p className="text-base text-white">{payment?.method}</p>
            </div>
            {payment?.method === "CASH" && (
              <>
                <div className="flex items-center justify-between">
                  <p className="text-base text-white">Bayar</p>
                  <p className="text-base text-white">
                    {formatPrice(payment?.paidAmount as number)}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-base text-white">Kembalian</p>
                  <p className="text-base text-white">
                    {formatPrice(payment?.change as number)}
                  </p>
                </div>
              </>
            )}
            {payment?.method === "TRANSFER_BANK" && (
              <>
                <div className="flex items-center justify-between">
                  <p className="text-base text-white">Bank</p>
                  <p className="text-base text-white">{payment?.provider}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-base text-white">No. Reference</p>
                  <p className="text-base text-white">{payment?.referenceNo}</p>
                </div>
              </>
            )}
            {payment?.method === "E_WALLET" && (
              <>
                <div className="flex items-center justify-between">
                  <p className="text-base text-white">E-Wallet</p>
                  <p className="text-base text-white">{payment?.provider}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-base text-white">No. Reference</p>
                  <p className="text-base text-white">{payment?.referenceNo}</p>
                </div>
              </>
            )}
            <div className="flex items-center justify-between">
              <p className="text-base text-white">Kode Transaksi</p>
              <p className="text-base text-white">{order?.receipt_code}</p>
            </div>
          </div>
          <button className="bg-primary mt-5 w-full rounded-lg px-4 py-1.5 text-center font-medium text-white">
            Cetak Struk
          </button>
          <div className="mt-5 flex items-center justify-center">
            <button
              onClick={() => onOpenChangeReceipt(false)}
              className="text-text-light cursor-pointer text-center text-sm focus:outline-none"
            >
              Tutup
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
