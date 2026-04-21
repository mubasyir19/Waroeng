import { getAllUnits, getDetailUnit } from "@/services/unitService";
import { Unit } from "@/types/unit";
import { useEffect, useState } from "react";

export function useFetchUnit() {
  const [dataUnit, setDataUnit] = useState<Unit[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      setError(null);

      try {
        const data = await getAllUnits();

        setDataUnit(data.data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Unexpected error");
        }
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, []);

  return { dataUnit, loading, error };
}

export function useFetchDetailUnit(id: string) {
  const [dataUnit, setDataUnit] = useState<Unit | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      setError(null);

      try {
        const data = await getDetailUnit(id);

        setDataUnit(data.data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Unexpected error");
        }
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, [id]);

  return { dataUnit, loading, error };
}
