export function findMenuById(id: string) {
  for (const kategori of daftarMenu) {
    const menu = kategori.menu.find((m) => m.id === id);
    if (menu) {
      return menu;
    }
  }
  return null; // kalau tidak ditemukan
}

export const daftarMenu = [
  {
    kategori: "Makanan",
    menu: [
      {
        id: "1",
        namaMenu: "Indomie Rebus",
        hargaMenu: 8000,
        isAvailable: true,
        gambarMenu: "https://source.unsplash.com/random/400x300/?indomie",
      },
      {
        id: "2",
        namaMenu: "Indomie Goreng",
        hargaMenu: 9000,
        isAvailable: true,
        gambarMenu: "https://source.unsplash.com/random/400x300/?gorengan",
      },
      {
        id: "3",
        namaMenu: "Roti Bakar Coklat Keju",
        hargaMenu: 15000,
        isAvailable: true,
        gambarMenu: "https://source.unsplash.com/random/400x300/?roti",
      },
      {
        id: "4",
        namaMenu: "Nasi Goreng Spesial",
        hargaMenu: 20000,
        isAvailable: false,
        gambarMenu: "https://source.unsplash.com/random/400x300/?nasigoreng",
      },
      {
        id: "5",
        namaMenu: "Mie Ayam",
        hargaMenu: 18000,
        isAvailable: true,
        gambarMenu: "https://source.unsplash.com/random/400x300/?mie",
      },
      {
        id: "6",
        namaMenu: "Gorengan (Per Biji)",
        hargaMenu: 2000,
        isAvailable: true,
        gambarMenu: "https://source.unsplash.com/random/400x300/?gorengan",
      },
      {
        id: "7",
        namaMenu: "Kentang Goreng",
        hargaMenu: 12000,
        isAvailable: true,
        gambarMenu: "https://source.unsplash.com/random/400x300/?kentang",
      },
      {
        id: "8",
        namaMenu: "Indomie Kuah Soto",
        hargaMenu: 9000,
        isAvailable: true,
        gambarMenu: "https://source.unsplash.com/random/400x300/?indomiesoto",
      },
      {
        id: "9",
        namaMenu: "Telur Setengah Matang",
        hargaMenu: 7000,
        isAvailable: true,
        gambarMenu: "https://source.unsplash.com/random/400x300/?telur",
      },
      {
        id: "10",
        namaMenu: "Mie Dok Dok",
        hargaMenu: 14000,
        isAvailable: false,
        gambarMenu: "https://source.unsplash.com/random/400x300/?mie",
      },
    ],
  },
  {
    kategori: "Minuman",
    menu: [
      {
        id: "11",
        namaMenu: "Kopi Hitam Panas",
        hargaMenu: 5000,
        isAvailable: true,
        gambarMenu: "https://source.unsplash.com/random/400x300/?kopi",
      },
      {
        id: "12",
        namaMenu: "Es Kopi Susu",
        hargaMenu: 12000,
        isAvailable: false,
        gambarMenu: "https://source.unsplash.com/random/400x300/?eskopi",
      },
      {
        id: "13",
        namaMenu: "Teh Panas Manis",
        hargaMenu: 5000,
        isAvailable: true,
        gambarMenu: "https://source.unsplash.com/random/400x300/?teh",
      },
      {
        id: "14",
        namaMenu: "Es Teh Manis",
        hargaMenu: 6000,
        isAvailable: true,
        gambarMenu: "https://source.unsplash.com/random/400x300/?esteh",
      },
      {
        id: "15",
        namaMenu: "Kopi Susu Panas",
        hargaMenu: 10000,
        isAvailable: true,
        gambarMenu: "https://source.unsplash.com/random/400x300/?kopisusu",
      },
      {
        id: "16",
        namaMenu: "Es Jeruk",
        hargaMenu: 8000,
        isAvailable: true,
        gambarMenu: "https://source.unsplash.com/random/400x300/?esjeruk",
      },
      {
        id: "17",
        namaMenu: "Jus Alpukat",
        hargaMenu: 15000,
        isAvailable: false,
        gambarMenu: "https://source.unsplash.com/random/400x300/?jusalpukat",
      },
      {
        id: "18",
        namaMenu: "Susu Jahe",
        hargaMenu: 9000,
        isAvailable: true,
        gambarMenu: "https://source.unsplash.com/random/400x300/?susu",
      },
      {
        id: "19",
        namaMenu: "Es Coklat",
        hargaMenu: 10000,
        isAvailable: true,
        gambarMenu: "https://source.unsplash.com/random/400x300/?escoklat",
      },
      {
        id: "20",
        namaMenu: "Es Milo",
        hargaMenu: 11000,
        isAvailable: true,
        gambarMenu: "https://source.unsplash.com/random/400x300/?milo",
      },
    ],
  },
];
