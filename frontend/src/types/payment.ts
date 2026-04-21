export interface PaymentForm {
  orderId: string;
  method: "CASH" | "QRIS" | "TRANSFER_BANK" | "E_WALLET";
  provider: string;
  amount: number;
  paidAmount?: number;
  change?: number;
  referenceNo?: string;
  note?: string;
  status: "PENDING" | "SUCCESS" | "FAILED" | "EXPIRED" | "REFUNDED";
}

export interface PaymentData {
  id: string;
  orderId: string;
  method: "CASH" | "QRIS" | "TRANSFER_BANK" | "E_WALLET";
  provider?: string;
  amount: number;
  paidAmount?: number;
  change?: number;
  referenceNo?: string;
  note?: string;
  status?: string;
  createdAt: string;
  updatedAt: string;
}
