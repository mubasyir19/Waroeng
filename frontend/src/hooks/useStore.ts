import {
  addStoreService,
  findStoreService,
  updateStoreService,
} from "@/services/storeService";
import { Store, StoreForm } from "@/types/store";
import { useEffect, useState } from "react";

export function useFindStore() {
  const [dataStore, setDataStore] = useState<Store | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);

      try {
        const res = await findStoreService();

        if (res.code !== "SUCCESS")
          throw new Error("Failed to fetch data store");

        setDataStore(res.data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return { dataStore, isLoading, error };
}

export function useAddStore() {
  const [dataStore, setDataStore] = useState<Store | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddData = async (input: StoreForm) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await addStoreService(input);
      setDataStore(res.data);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleAddData, dataStore, isLoading, error };
}

export function useEditStore() {
  const [dataStore, setDataStore] = useState<Store | null>(null);
  const [isLoadingEdit, setIsLoadingEdit] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleEditData = async (id: string, input: StoreForm) => {
    setIsLoadingEdit(true);
    setError(null);
    try {
      const res = await updateStoreService(id, input);
      setDataStore(res.data);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoadingEdit(false);
    }
  };

  return { handleEditData, dataStore, isLoadingEdit, error };
}
