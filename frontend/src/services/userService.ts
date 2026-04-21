import { API_URL } from "@/utils/config";
import { FormLogin } from "@/types/user";

export const login = async (input: FormLogin) => {
  try {
    const res = await fetch(`${API_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to login");
    }

    return data;
  } catch (error) {
    console.log("error login = ", (error as Error).message);
    throw new Error((error as Error).message || "Something went wrong");
  }
};

export const userProfile = async () => {
  try {
    const res = await fetch(`${API_URL}/user/profile`, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to get user profile");
    }

    return data;
  } catch (error) {
    throw new Error((error as Error).message || "Something went wrong");
  }
};

export const logout = async () => {
  try {
    const res = await fetch(`${API_URL}/user/logout`, {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to logout");
    }

    return data;
  } catch (error) {
    throw new Error((error as Error).message || "Something went wrong");
  }
};
