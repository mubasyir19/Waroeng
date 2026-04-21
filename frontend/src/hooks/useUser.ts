import { login, logout, userProfile } from "@/services/userService";
import { FormLogin, UserData } from "@/types/user";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useLoginUser() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const actionLogin = async (input: FormLogin) => {
    setLoading(true);
    setError(null);

    try {
      const response = await login(input);
      setData(response.data);
      return response;
    } catch (error) {
      setError((error as Error).message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setError(null);
    setData(null);
    setLoading(false);
  };

  return { actionLogin, data, loading, error, reset };
}

export function useGetProfile() {
  const [dataUser, setDataUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getProfile() {
      setLoading(true);
      setError(null);

      try {
        const res = await userProfile();
        setDataUser(res.data);
        return;
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    }

    getProfile();
  }, []);

  return { dataUser, loading, error };
}

export function useLogoutUser() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogout = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await logout();
      router.push("/login");
      return res;
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return { handleLogout, loading, error };
}
