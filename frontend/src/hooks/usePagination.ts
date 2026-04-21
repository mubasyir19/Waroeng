import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function usePagination() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const currentPage = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  const createPageURL = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    return `${pathname}?${params.toString()}`;
  };

  const goToPage = (page: number) => {
    router.push(createPageURL(page));
  };

  return { currentPage, limit, goToPage };
}
