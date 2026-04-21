import { completePayment, getDetailPayment } from "@/services/paymentService";
import { PaymentData, PaymentForm } from "@/types/payment";
import { useEffect, useState } from "react";

export function useCompletePayment() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleCompletePayment = async (orderId: string, input: PaymentForm) => {
    setLoading(true);
    setError(null);

    try {
      const res = await completePayment(orderId, input);
      setData(res);

      return res;
    } catch (error) {
      const msg = (error as Error).message;
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  };

  return { handleCompletePayment, data, loading, error };
}

export function usePaymentByOrderId(orderId: string) {
  const [payment, setPayment] = useState<PaymentData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId) {
      setPayment(null);
      return;
    }

    async function fetchPayment() {
      setLoading(true);
      setError(null);
      try {
        const res = await getDetailPayment(orderId);

        if (res?.code !== "SUCCESS") {
          throw new Error(res?.message || "Failed to fetch payment details");
        }

        if (res.data === null) {
          throw new Error(`No payment record found for order: ${orderId}`);
        }

        setPayment(res.data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchPayment();
  }, [orderId]);

  return { payment, loading, error };
}
