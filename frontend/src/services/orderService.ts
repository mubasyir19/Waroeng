import { API_URL } from "@/utils/config";
import { CheckoutOrder } from "@/types/order";

export const getListOrder = async (currentPage: number, limit: number) => {
  try {
    const res = await fetch(
      `${API_URL}/order?page=${currentPage}&limit=${limit}`,
      {
        credentials: "include",
      },
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed get list order");
    }

    return data;
  } catch (error) {
    throw new Error((error as Error).message || "Something went wrong");
  }
};

export const getDetailOrder = async (id: string) => {
  try {
    const res = await fetch(`${API_URL}/order/${id}`, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed get detail order");
    }

    return data;
  } catch (error) {
    throw new Error((error as Error).message || "Something went wrong");
  }
};

export const checkoutOrder = async (input: CheckoutOrder) => {
  try {
    const res = await fetch(`${API_URL}/order/checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to add data");
    }

    return data;
  } catch (error) {
    throw new Error((error as Error).message || "Something went wrong");
  }
};

export const deleteOrder = async (id: string) => {
  try {
    const res = await fetch(`${API_URL}/order/delete/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to delete data");
    }

    return data;
  } catch (error) {
    throw new Error((error as Error).message || "Something went wrong");
  }
};

export const updateOrderStatus = async (
  id: string,
  status: "PENDING" | "PAID" | "CANCELED",
) => {
  try {
    const res = await fetch(`${API_URL}/order/delete/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(status),
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to update status");
    }

    return data;
  } catch (error) {
    throw new Error((error as Error).message || "Something went wrong");
  }
};

export const getMostOrderedProducts = async () => {
  try {
    const res = await fetch(`${API_URL}/order/mostOrdered`, {
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to get most ordered products");
    }

    return data;
  } catch (error) {
    throw new Error((error as Error).message || "Something went wrong");
  }
};
