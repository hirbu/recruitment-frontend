import Pagination from "@/interfaces/Pagination";
import View from "@/interfaces/View";
import { useState } from "react";

function extractPageNumber(stringUrl: string): number | undefined {
  const url = new URL("http://example.com" + stringUrl);
  const searchParams = new URLSearchParams(url.search);
  return parseInt(searchParams.get("page") || "") || undefined;
}

export function usePagination(): [
  Pagination,
  (view: View) => void,
  (page: number) => void,
] {
  const [pagination, setPagination] = useState<Pagination>({
    current: 1,
  });

  const updatePaginationWithView = (view: View): void => {
    setPagination({
      current: extractPageNumber(view["@id"])!,
      first: extractPageNumber(view.first),
      last: extractPageNumber(view.last),
      previous: view.previous ? extractPageNumber(view.previous) : undefined,
      next: view.next ? extractPageNumber(view.next) : undefined,
    });
  };

  const updateCurrentPage = (page: number): void => {
    setPagination({
      ...pagination,
      current: page,
    });
  };

  return [pagination, updatePaginationWithView, updateCurrentPage];
}
