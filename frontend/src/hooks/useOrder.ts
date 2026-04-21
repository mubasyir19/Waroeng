import {
  checkoutOrder,
  deleteOrder,
  getDetailOrder,
  getListOrder,
  getMostOrderedProducts,
} from "@/services/orderService";
import {
  CheckoutOrder,
  MostOrderedProducts,
  Order,
  OrderReportResponse,
} from "@/types/order";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { usePagination } from "./usePagination";

export function useCheckoutOrder() {
  const [data, setData] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleNewCheckout = async (input: CheckoutOrder) => {
    setLoading(true);
    setError(null);
    try {
      const res = await checkoutOrder(input);
      setData(res);
      return res;
    } catch (error) {
      setError((error as Error).message);
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return { handleNewCheckout, data, loading, error };
}

export function useOrderById(id: string) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    async function fetchOrder() {
      setLoading(true);
      setError(null);
      try {
        const res = await getDetailOrder(id);

        if (res.code !== "SUCCESS") throw new Error("Failed to fetch product");

        setOrder(res.data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [id]);

  return { order, loading, error };
}

export function useListOrder() {
  const { currentPage, limit } = usePagination();
  const [listOrder, setListOrder] = useState<OrderReportResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchListOrder() {
      setLoading(true);
      setError(null);
      try {
        const res = await getListOrder(currentPage, limit);

        if (res.code !== "SUCCESS")
          throw new Error("Failed to fetch list order");

        setListOrder(res);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchListOrder();
  }, [currentPage, limit]);

  return { listOrder, loading, error };
}

export function useDeleteOrder() {
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const res = await deleteOrder(id);
      setSuccess(true);
      return res;
    } catch (error) {
      setError((error as Error).message);
      toast.error((error as Error).message);
      throw error; // agar komponen pemanggil masih bisa tangkap error
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteOrder: handleDelete,
    loading,
    error,
    success,
  };
}

export function useMostOrderedProducts() {
  const [mostProducts, setMostProducts] = useState<
    MostOrderedProducts[] | null
  >(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const res = await getMostOrderedProducts();

        if (res.code !== "SUCCESS")
          throw new Error("Failed to fetch most ordered product");

        setMostProducts(res.data);

        return res.data;
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { mostProducts, loading, error };
}
