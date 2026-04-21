"use client";

import { useEditStore, useFindStore } from "@/hooks/useStore";
import { StoreForm } from "@/types/store";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function StoreTab() {
  const { dataStore, isLoading } = useFindStore();
  const { handleEditData } = useEditStore();

  const [formData, setFormData] = useState<StoreForm>({
    store_name: "",
    address: "",
    phoneNumber: "",
    email: "",
    owner_id: "",
  });

  useEffect(() => {
    if (dataStore) {
      setFormData({
        store_name: dataStore.store_name || "",
        address: dataStore.address || "",
        phoneNumber: dataStore.phoneNumber || "",
        email: dataStore.email || "",
        owner_id: dataStore.owner.name || "",
      });
    }
  }, [dataStore]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const submitData = {
        ...formData,
        owner_id: dataStore?.owner.id as string,
      };

      await handleEditData(dataStore?.id || "", submitData);

      toast.success("Berhasil update data toko");
    } catch (error) {
      toast.error((error as Error).message || "Gagal simpan data");
    }
  };

  if (isLoading)
    return <p className="text-base font-semibold text-white">...Loading</p>;

  return (
    <>
      <div className="p-6">
        <h2 className="text-xl font-semibold text-white">Tentang Toko</h2>
        <form onSubmit={handleSubmit} className="mt-10 grid gap-3">
          <div id="group-input">
            <label className="text-sm text-white">Nama Toko</label>
            <input
              type="text"
              name="store_name"
              value={formData.store_name}
              onChange={handleChange}
              placeholder="Masukkan nama toko"
              className="border-text-light focus:border-primary mt-1.5 w-full rounded-md border bg-gray-800 px-3 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none"
            />
          </div>
          <div id="group-input">
            <label className="text-sm text-white">Owner Toko</label>
            <input
              type="text"
              name="owner"
              value={formData.owner_id}
              onChange={handleChange}
              disabled
              placeholder="Masukkan nama pemilik toko"
              className="border-text-light focus:border-primary mt-1.5 w-full rounded-md border bg-gray-800 px-3 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none disabled:bg-gray-600"
            />
          </div>
          <div id="group-input">
            <label className="text-sm text-white">Email Toko</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Masukkan email toko"
              className="border-text-light focus:border-primary mt-1.5 w-full rounded-md border bg-gray-800 px-3 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none"
            />
          </div>
          <div id="group-input">
            <label className="text-sm text-white">Nomor Telepon</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Masukkan nomor telepon"
              className="border-text-light focus:border-primary mt-1.5 w-full rounded-md border bg-gray-800 px-3 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none"
            />
          </div>
          <div id="group-input">
            <label className="text-sm text-white">Alamat Toko</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Masukkan alamat toko"
              rows={5}
              className="border-text-light focus:border-primary mt-1.5 w-full rounded-md border bg-gray-800 px-3 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none"
            ></textarea>
          </div>
          <div className="">
            <button
              type="submit"
              className="bg-primary hover:bg-primary/80 rounded-md px-3 py-2 text-sm font-semibold text-white"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
