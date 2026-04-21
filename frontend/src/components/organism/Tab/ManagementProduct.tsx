"use client";

import CategoryTabs from "@/components/molecules/CategoryTabs";
import ListManageProduct from "@/components/molecules/ListManageProduct";
import { Plus, Settings2 } from "lucide-react";
import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import Image from "next/image";
import { Product, ProductForm } from "@/types/product";
import { useFetchUnit } from "@/hooks/useUnit";
import { useCategory } from "@/hooks/useCategory";
import {
  useAddProduct,
  useDeleteProduct,
  useEditProduct,
} from "@/hooks/useProduct";
import { API_URL } from "@/utils/config";

export default function ManagementProduct() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editImageFile, setEditImageFile] = useState<File | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [deletingProductId, setDeletingProductId] = useState<string>("");

  const { dataUnit } = useFetchUnit();
  const { category, fetchCategory } = useCategory();
  const { handleAddProduct } = useAddProduct();
  const { handleSaveEditProduct } = useEditProduct();
  const { handleDeleteProduct } = useDeleteProduct();

  const [formData, setFormData] = useState<ProductForm>({
    name: "",
    price: 0,
    stock: 0,
    imageUrl: null,
    categoryId: "",
    unitId: "",
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      setFormData((prev) => ({ ...prev, imageUrl: null }));
      setImagePreview(null);
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("File harus berupa gambar");
      e.target.value = ""; // Reset input
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast.error("Ukuran file maksimal 5MB");
      e.target.value = ""; // Reset input
      return;
    }

    // set image to state
    setFormData((prev) => ({ ...prev, imageUrl: file }));

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setImagePreview(event.target.result as string);
      }
    };
    reader.onerror = () => {
      toast.error("Gagal membaca file");
    };
    reader.readAsDataURL(file);
  };

  const handleEditChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      setEditImageFile(null);
      setImagePreview(editingProduct?.imageUrl || null);
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("File harus berupa gambar");
      e.target.value = "";
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast.error("Ukuran file maksimal 5MB");
      e.target.value = "";
      return;
    }

    setEditImageFile(file);

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setImagePreview(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const dataForm = new FormData();
      dataForm.append("name", formData.name);
      dataForm.append("price", formData.price.toString());
      dataForm.append("stock", formData.stock.toString());
      dataForm.append("categoryId", formData.categoryId);
      dataForm.append("unitId", formData.unitId);

      // Append file dengan field name 'imageUrl'
      if (formData.imageUrl instanceof File) {
        dataForm.append("imageUrl", formData.imageUrl);
      }

      await handleAddProduct(dataForm);

      toast.success("Berhasil tambah produk");
      setOpen(false);

      setFormData({
        name: "",
        price: 0,
        stock: 0,
        categoryId: "",
        unitId: "",
        imageUrl: "", // atau null tergantung tipe kamu
      });
    } catch (error) {
      toast.error(`Gagal: ${(error as Error).message}`);
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setOpenEditDialog(true);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const editFormData = new FormData();
      editFormData.append("name", editingProduct?.name ?? "");
      editFormData.append("price", editingProduct?.price.toString() ?? "");
      editFormData.append("stock", editingProduct?.stock.toString() ?? "");
      editFormData.append("categoryId", editingProduct?.categoryId ?? "");
      editFormData.append("unitId", editingProduct?.unitId ?? "");

      // Handle image: jika ada file baru, gunakan file baru
      if (editImageFile) {
        editFormData.append("imageUrl", editImageFile);
      } else if (editingProduct?.imageUrl) {
        // Jika tidak ada file baru, tapi ada image existing, append URL-nya
        editFormData.append("imageUrl", editingProduct.imageUrl);
      }

      await handleSaveEditProduct(editingProduct?.id ?? "", editFormData);

      setRefreshKey((prev) => prev + 1);

      setOpenEditDialog(false);
      setEditingProduct(null);
      setImagePreview(null);
      setEditImageFile(null);

      toast.success("Berhasil edit menu");
    } catch (error) {
      toast.error(`Gagal: ${(error as Error).message}`);
    }
  };

  const handleDeleteDialog = (productId: string) => {
    setDeletingProductId(productId);
    setOpenDeleteDialog(true);
  };

  const handleDeletingProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!deletingProductId) {
        toast.error("Id menu tidak ditemukan");
        return;
      }

      await handleDeleteProduct(deletingProductId as string);

      setOpenDeleteDialog(false);
      toast.success("Berhasil hapus menu");
    } catch (error) {
      toast.error(`Gagal: ${(error as Error).message}`);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-start justify-between p-6">
        <h2 className="text-xl font-semibold text-white">
          Products Management
        </h2>
        <button className="flex cursor-pointer items-center gap-2 rounded-lg border-2 border-gray-600 px-4 py-3.5">
          <Settings2 className="size-5 text-white" />
          <span className="text-sm font-semibold text-white">
            Manage Categories
          </span>
        </button>
      </div>
      <div className="mt-4">
        <div className="px-6">
          <CategoryTabs
            selected={selectedCategory}
            onSelect={(category) => {
              setSelectedCategory(category);
              setFormData((prev) => ({ ...prev, categoryId: category }));
            }}
          />
        </div>
      </div>
      <div className="no-scrollbar grid grid-cols-3 gap-4 overflow-y-auto p-6">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button
              className="border-primary flex h-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-transparent p-4 transition focus:outline-none"
              aria-label="Tambah produk"
            >
              <Plus className="text-primary text-xl" />
              <span className="text-primary mt-2 text-base font-semibold">
                Tambah Menu Baru
              </span>
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] md:max-w-1/2">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-white">
                Tambah Menu
              </DialogTitle>
              <DialogDescription>
                Silakan isi form dibawah ini.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="grid gap-4 py-2">
              <div className="grid grid-cols-2 gap-3">
                <div className="">
                  <label className="text-sm text-white">Nama Menu</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFormData((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    placeholder="Masukkan nomor referensi"
                    className="border-primary mt-1.5 w-full rounded-md border bg-gray-800 px-3 py-2 text-sm text-gray-200 placeholder-gray-500 outline-none"
                  />
                </div>
                <div className="">
                  <label className="text-sm text-white">Pilih Kategori:</label>
                  <select
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      const value = e.target.value;
                      setFormData((prev) => ({
                        ...prev,
                        categoryId: value,
                      }));
                      setSelectedCategory(value);
                    }}
                    className="bg-background mt-1.5 w-full rounded-md border border-gray-700 px-4 py-2 text-white outline-none"
                  >
                    <option value="" disabled>
                      Pilih kategori
                    </option>
                    {category?.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="">
                  <label className="text-sm text-white">
                    Pilih Unit/Satuan:
                  </label>
                  <select
                    name="unitId"
                    value={formData.unitId}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      setFormData((prev) => ({
                        ...prev,
                        unitId: e.target.value,
                      }));
                    }}
                    className="bg-background mt-1.5 w-full rounded-md border border-gray-700 px-4 py-2 text-white outline-none"
                  >
                    <option value="" disabled>
                      Pilih Unit
                    </option>
                    {dataUnit?.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="">
                  <label className="text-sm text-white">
                    Tentukan Harga Menu
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price === 0 ? "" : formData.price}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFormData((prev) => ({
                        ...prev,
                        price:
                          e.target.value === "" ? 0 : Number(e.target.value),
                      }));
                    }}
                    placeholder="Masukkan harga"
                    className="border-primary mt-1.5 w-full rounded-md border bg-gray-800 px-3 py-2 text-sm text-gray-200 placeholder-gray-500 outline-none"
                  />
                </div>
                <div className="">
                  <label className="text-sm text-white">Jumlah Stok Menu</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock === 0 ? "" : formData.stock}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFormData((prev) => ({
                        ...prev,
                        stock:
                          e.target.value === "" ? 0 : Number(e.target.value),
                      }));
                    }}
                    placeholder="Masukkan stok menu"
                    className="border-primary mt-1.5 w-full rounded-md border bg-gray-800 px-3 py-2 text-sm text-gray-200 placeholder-gray-500 outline-none"
                  />
                </div>
                <div className="">
                  <label className="text-sm text-white">Gambar Menu</label>
                  <input
                    type="file"
                    id="imageUrl"
                    name="imageUrl"
                    onChange={handleChangeImage}
                    placeholder="Masukkan stok menu"
                    className="mt-1.5 w-full rounded-md bg-gray-800 px-3 py-2 text-sm text-gray-200 placeholder-gray-500 outline-none"
                  />
                </div>
                {imagePreview && (
                  <Image
                    src={imagePreview}
                    width={200}
                    height={100}
                    alt="Preview"
                    className="mt-2 h-40 w-40 object-cover"
                  />
                )}
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <button
                    type="button"
                    className="rounded-md border border-gray-600 px-3 py-2 text-sm text-gray-300 hover:bg-gray-800"
                  >
                    Cancel
                  </button>
                </DialogClose>
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary/80 rounded-md px-3 py-2 text-sm font-semibold text-white"
                >
                  Save
                </button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        <ListManageProduct
          key={refreshKey}
          category={selectedCategory}
          onEditProduct={handleEditProduct}
          onDeleteProduct={handleDeleteDialog}
        />
        <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
          <DialogContent className="sm:max-w-[425px] md:max-w-1/2">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-white">
                Edit Menu
              </DialogTitle>
              <DialogDescription>
                Edit informasi menu. Klik simpan ketika sudah selesai.
              </DialogDescription>
            </DialogHeader>

            {/* <div className="grid gap-4 py-4">
            {editingProduct && (
              <>
                <div className="space-y-2">
                  <label htmlFor="edit-name" className="text-sm font-medium text-white">
                    Nama Menu
                  </label>
                  <input
                    id="edit-name"
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct(prev => 
                      prev ? {...prev, name: e.target.value} : null
                    )}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-black"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="edit-price" className="text-sm font-medium text-white">
                    Harga
                  </label>
                  <input
                    id="edit-price"
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct(prev => 
                      prev ? {...prev, price: Number(e.target.value)} : null
                    )}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-black"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="edit-stock" className="text-sm font-medium text-white">
                    Stok
                  </label>
                  <input
                    id="edit-stock"
                    type="number"
                    value={editingProduct.stock}
                    onChange={(e) => setEditingProduct(prev => 
                      prev ? {...prev, stock: Number(e.target.value)} : null
                    )}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-black"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="edit-unit" className="text-sm font-medium text-white">
                    Unit
                  </label>
                  <select
                    id="edit-unit"
                    value={editingProduct.unitId}
                    onChange={(e) => setEditingProduct(prev => 
                      prev ? {...prev, unitId: e.target.value} : null
                    )}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-black"
                  >
                    <option value="">Pilih Unit</option>
                    {dataUnit?.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}
          </div> */}
            <div className="">
              {editingProduct && (
                <form onSubmit={handleSaveEdit} className="grid gap-4 py-2">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="">
                      <label className="text-sm text-white">Nama Menu</label>
                      <input
                        type="text"
                        name="name"
                        value={editingProduct.name || ""}
                        onChange={(e) =>
                          setEditingProduct((prev) =>
                            prev ? { ...prev, name: e.target.value } : prev,
                          )
                        }
                        placeholder="Masukkan nomor referensi"
                        className="border-primary mt-1.5 w-full rounded-md border bg-gray-800 px-3 py-2 text-sm text-gray-200 placeholder-gray-500 outline-none"
                      />
                    </div>
                    <div className="">
                      <label className="text-sm text-white">
                        Pilih Kategori:
                      </label>
                      <select
                        name="categoryId"
                        value={editingProduct.categoryId || ""}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                          setEditingProduct((prev) =>
                            prev
                              ? { ...prev, categoryId: e.target.value }
                              : prev,
                          );
                        }}
                        className="bg-background mt-1.5 w-full rounded-md border border-gray-700 px-4 py-2 text-white outline-none"
                      >
                        <option value="" disabled>
                          Pilih kategori
                        </option>
                        {category?.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="">
                      <label className="text-sm text-white">
                        Pilih Unit/Satuan:
                      </label>
                      <select
                        name="unitId"
                        value={editingProduct.unitId || ""}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                          setEditingProduct((prev) =>
                            prev ? { ...prev, unitId: e.target.value } : prev,
                          );
                        }}
                        className="bg-background mt-1.5 w-full rounded-md border border-gray-700 px-4 py-2 text-white outline-none"
                      >
                        <option value="" disabled>
                          Pilih Unit
                        </option>
                        {dataUnit?.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="">
                      <label className="text-sm text-white">
                        Tentukan Harga Menu
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={editingProduct.price || ""}
                        onChange={(e) =>
                          setEditingProduct((prev) =>
                            prev
                              ? { ...prev, price: Number(e.target.value) }
                              : prev,
                          )
                        }
                        placeholder="Masukkan harga"
                        className="border-primary mt-1.5 w-full rounded-md border bg-gray-800 px-3 py-2 text-sm text-gray-200 placeholder-gray-500 outline-none"
                      />
                    </div>
                    <div className="">
                      <label className="text-sm text-white">
                        Jumlah Stok Menu
                      </label>
                      <input
                        type="number"
                        name="stock"
                        value={editingProduct.stock || ""}
                        onChange={(e) =>
                          setEditingProduct((prev) =>
                            prev
                              ? { ...prev, stock: Number(e.target.value) }
                              : prev,
                          )
                        }
                        placeholder="Masukkan stok menu"
                        className="border-primary mt-1.5 w-full rounded-md border bg-gray-800 px-3 py-2 text-sm text-gray-200 placeholder-gray-500 outline-none"
                      />
                    </div>
                    <div className="">
                      <label className="text-sm text-white">Gambar Menu</label>
                      <input
                        type="file"
                        id="imageUrl"
                        name="imageUrl"
                        onChange={handleEditChangeImage}
                        accept="image/*"
                        placeholder="Masukkan stok menu"
                        className="mt-1.5 w-full rounded-md bg-gray-800 px-3 py-2 text-sm text-gray-200 placeholder-gray-500 outline-none"
                      />
                    </div>
                    {/* {editingProduct.imageUrl && (
                      <Image
                        src={`${API_URL}${editingProduct.imageUrl}`}
                        width={200}
                        height={100}
                        alt="Preview"
                        className="mt-2 h-40 w-40 object-cover"
                      />
                    )} */}
                    <div className="col-span-2">
                      {imagePreview ? (
                        // Preview gambar baru atau existing yang sudah di-load
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-white">
                            {editImageFile
                              ? "Preview Gambar Baru"
                              : "Gambar Saat Ini"}
                          </label>
                          <Image
                            src={imagePreview}
                            width={200}
                            height={100}
                            alt="Preview"
                            className="h-40 w-40 rounded-md object-cover"
                          />
                        </div>
                      ) : editingProduct.imageUrl ? (
                        // Tampilkan gambar existing jika ada
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-white">
                            Gambar Saat Ini
                          </label>
                          <Image
                            src={`${API_URL}${editingProduct.imageUrl}`}
                            width={200}
                            height={100}
                            alt="Current product"
                            className="h-40 w-40 rounded-md object-cover"
                          />
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <button
                        type="button"
                        className="rounded-md border border-gray-600 px-3 py-2 text-sm text-gray-300 hover:bg-gray-800"
                      >
                        Batal
                      </button>
                    </DialogClose>
                    <button
                      type="submit"
                      className="bg-primary hover:bg-primary/80 rounded-md px-3 py-2 text-sm font-semibold text-white"
                    >
                      Simpan Perubahan
                    </button>
                  </DialogFooter>
                </form>
              )}
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-white">Konfirmasi Hapus</DialogTitle>
              <DialogDescription className="text-text-light">
                Apakah kamu yakin ingin hapus produk ini?
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="flex justify-end gap-2">
              <DialogClose asChild>
                <button
                  type="button"
                  className="rounded-md border border-gray-600 px-3 py-2 text-sm text-gray-300 hover:bg-gray-800"
                >
                  Batal
                </button>
              </DialogClose>
              <button
                type="button"
                onClick={handleDeletingProduct}
                className="bg-primary hover:bg-primary/80 rounded-md px-3 py-2 text-sm font-semibold text-white"
              >
                Hapus
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
