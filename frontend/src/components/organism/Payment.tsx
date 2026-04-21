import { formatPrice } from "@/helpers/formatPrice";
import { useOrderById } from "@/hooks/useOrder";
import { useCompletePayment } from "@/hooks/usePayment";
import { PaymentForm } from "@/types/payment";
import { Banknote, Landmark, QrCode, Smartphone } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

interface PaymentProps {
  orderId: string;
  onCancel: () => void;
  onSuccess: (orderId: string) => void;
}

export default function Payment({
  orderId,
  onCancel,
  onSuccess,
}: PaymentProps) {
  const { handleCompletePayment, loading } = useCompletePayment();
  const { order } = useOrderById(orderId);

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentForm["method"]>("CASH");
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState<PaymentForm>({
    orderId: "",
    method: "CASH",
    provider: "",
    amount: order?.totalPrice ?? 0,
    paidAmount: 0,
    change: 0,
    referenceNo: "",
    note: "",
    status: "PENDING",
  });

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: ["amount", "paidAmount", "change"].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedForm: PaymentForm = {
      ...form,
      amount: order?.totalPrice ?? 0,
      orderId,
      method: paymentMethod,
      provider:
        paymentMethod === "CASH"
          ? "CASHIER"
          : paymentMethod === "QRIS"
            ? "QRIS Indonesia"
            : paymentMethod === "TRANSFER_BANK"
              ? form.provider || "BANK"
              : "E-WALLET",
      status: "SUCCESS",
      change:
        paymentMethod === "CASH"
          ? (form.paidAmount ?? 0) - (order?.totalPrice ?? 0)
          : 0,
    };

    try {
      await handleCompletePayment(orderId, updatedForm);
      toast.success("Pembayaran selesai");
      if (typeof onSuccess === "function") {
        onSuccess(orderId);
      }
    } catch (error) {
      toast.error("Pembayaran gagal");
    }
  };

  return (
    <div
      className={`bg-background absolute top-0 right-0 h-screen w-1/2 border-r-2 border-gray-700 p-6 transition-all duration-700 ease-in-out ${visible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
    >
      <h3 className="text-xl font-semibold text-white">Pembayaran</h3>
      <p className="text-text-light mt-2 text-sm font-medium">
        4 Payment method available
      </p>
      <hr className="my-4 border border-gray-700" />
      <h3 className="text-lg font-semibold text-white">Metode Pembayaran</h3>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {[
          { key: "CASH", label: "Cash", icon: Banknote },
          { key: "QRIS", label: "QRIS", icon: QrCode },
          { key: "TRANSFER_BANK", label: "Transfer", icon: Landmark },
          { key: "E_WALLET", label: "E-Wallet", icon: Smartphone },
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => setPaymentMethod(key as PaymentForm["method"])}
            className={`rounded-lg border-2 px-4 py-2.5 ${
              paymentMethod === key ? "border-white" : "border-gray-700"
            }`}
          >
            <Icon
              className={`mx-auto size-7 ${
                paymentMethod === key ? "text-white" : "text-text-light"
              }`}
            />
            <p
              className={`mt-1 text-center text-base font-medium ${
                paymentMethod === key ? "text-white" : "text-text-light"
              }`}
            >
              {label}
            </p>
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-6">
        {paymentMethod === "CASH" && (
          <div className="">
            <div className="flex items-center justify-between">
              <p className="text-text-light text-sm">Total Bayar</p>
              <p className="text-base font-medium text-white">
                {formatPrice(order?.totalPrice ?? 0)}
              </p>
            </div>
            <div className="my-2">
              <label className="text-text-light text-sm">Uang Diterima</label>
              <input
                type="number"
                name="paidAmount"
                value={form.paidAmount === 0 ? "" : form.paidAmount} // izinkan kosong
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    paidAmount:
                      e.target.value === "" ? 0 : Number(e.target.value),
                  }))
                }
                placeholder="Masukkan Nominal"
                className="mt-1.5 w-full rounded-md bg-gray-800 px-3 py-2 text-sm text-gray-200 placeholder-gray-500 outline-none"
              />
            </div>
            <div className="flex justify-between text-green-400">
              <span>Kembalian:</span>
              <span>
                {form.paidAmount === 0
                  ? 0
                  : formatPrice(
                      (form.paidAmount ?? 0) - (order?.totalPrice ?? 0),
                    )}
                {/* {formatPrice((form.paidAmount ?? 0) - (order?.totalPrice ?? 0))} */}
              </span>
            </div>
            {/* <div className="mt-10 flex items-stretch gap-4">
              <button
                onClick={onCancel}
                className="border-primary text-primary w-full cursor-pointer rounded-md border bg-transparent py-1.5 text-center font-medium"
              >
                Cancel
              </button>
              <button className="bg-primary/80 hover:bg-primary w-full cursor-pointer rounded-md py-1.5 text-center font-medium text-white">
                Selesaikan Pembayaran
              </button>
            </div> */}
          </div>
        )}
        {paymentMethod === "QRIS" && (
          <div className="">
            <p className="text-white">Silakan scan qrcode berikut</p>
            <div className="mt-2">
              <Image
                src={`/images/dummy-qr.png`}
                width={300}
                height={300}
                alt="dummy-qr"
                className="mx-auto size-52"
              />
            </div>
            <p className="text-primary mt-2 text-xs">
              *QR tersebut masih dummy, silakan lanjut
            </p>
          </div>
        )}
        {paymentMethod === "TRANSFER_BANK" && (
          <div>
            <div className="mt-2">
              <label className="text-text-light text-sm">Bank Tujuan:</label>
              <select
                name="provider"
                value={form.provider}
                onChange={handleChange}
                className="bg-background mt-1.5 w-full rounded-md border border-gray-700 px-4 py-2 text-white outline-none"
              >
                <option value="">Pilih Bank</option>
                <option value="BCA">BCA</option>
                <option value="BRI">BRI</option>
                <option value="Mandiri">Mandiri</option>
                <option value="BSI">BSI</option>
              </select>
            </div>

            <div className="mt-2">
              <label className="text-text-light text-sm">Nomor Referensi</label>
              <input
                type="text"
                name="referenceNo"
                value={form.referenceNo ?? ""}
                onChange={handleChange}
                placeholder="Masukkan nomor referensi"
                className="mt-1.5 w-full rounded-md bg-gray-800 px-3 py-2 text-sm text-gray-200 placeholder-gray-500 outline-none"
              />
            </div>
          </div>
        )}
        {paymentMethod === "E_WALLET" && (
          <div>
            <div className="mt-2">
              <label className="text-text-light text-sm">Pilih E-Wallet:</label>
              <select
                name="provider"
                value={form.provider}
                onChange={handleChange}
                className="bg-background mt-1.5 w-full rounded-md border border-gray-700 px-4 py-2 text-white outline-none"
              >
                <option value="">Pilih</option>
                <option value="Gopay">Gopay</option>
                <option value="OVO">OVO</option>
                <option value="Dana">Dana</option>
                <option value="ShopeePay">ShopeePay</option>
              </select>
            </div>

            <div className="mt-2">
              <label className="text-text-light text-sm">
                Nomor HP Customer:
              </label>
              <input
                type="text"
                name="note"
                value={form.note ?? ""}
                onChange={handleChange}
                placeholder="Masukkan nomor hp"
                className="mt-1.5 w-full rounded-md bg-gray-800 px-3 py-2 text-sm text-gray-200 placeholder-gray-500 outline-none"
              />
            </div>
          </div>
        )}
        <div className="mt-10 flex items-stretch gap-4">
          <button
            onClick={onCancel}
            className="border-primary text-primary w-full cursor-pointer rounded-md border bg-transparent py-1.5 text-center font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-primary/80 hover:bg-primary w-full cursor-pointer rounded-md py-1.5 text-center font-medium text-white"
          >
            {loading ? "Memproses..." : "Selesaikan Pembayaran"}
          </button>
        </div>
      </form>
    </div>
  );
}
