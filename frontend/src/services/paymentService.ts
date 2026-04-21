import { API_URL } from "@/utils/config";
import { PaymentForm } from "@/types/payment";

export const completePayment = async (orderId: string, input: PaymentForm) => {
  try {
    const res = await fetch(`${API_URL}/payment/order/${orderId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to complete payment");
    }

    return data;
  } catch (error) {
    throw new Error((error as Error).message || "Something went wrong");
  }
};

export const getDetailPayment = async (orderId: string) => {
  try {
    const res = await fetch(`${API_URL}/payment/detail/${orderId}`, {
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed get data");
    }

    return data;
  } catch (error) {
    throw new Error((error as Error).message || "Something went wrong");
  }
};
