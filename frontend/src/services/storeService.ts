import { StoreForm } from "@/types/store";
import { API_URL } from "@/utils/config";

export const findStoreService = async () => {
  try {
    const res = await fetch(`${API_URL}/store/current`, {
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to get data store");
    }

    return data;
  } catch (error) {
    throw new Error((error as Error).message || "Something went wrong");
  }
};
export const addStoreService = async (input: StoreForm) => {
  try {
    const res = await fetch(`${API_URL}/store/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to add data store");
    }

    return data;
  } catch (error) {
    throw new Error((error as Error).message || "Something went wrong");
  }
};

export const updateStoreService = async (id: string, input: StoreForm) => {
  try {
    const res = await fetch(`${API_URL}/store/edit/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to update data store");
    }

    return data;
  } catch (error) {
    throw new Error((error as Error).message || "Something went wrong");
  }
};
