"use client";

import useDebounce from "@/app/hooks/useDebounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Search() {
  const paramSearch = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const doSearch = useDebounce((trem) => {
    const params = new URLSearchParams(paramSearch);
    if (trem) {
      params.set("query", trem);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 1000);
  const handleSearch = (trem) => {
    doSearch(trem);
  };
  return (
    <div>
      <input
        onChange={(e) => handleSearch(e.target.value)}
        type="text"
        placeholder="Search..."
        className="bg-[#27292F] border border-[#CCCCCC]/20 py-1 px-2 rounded-md"
        defaultValue={paramSearch.get("query")?.toString()}
      />
    </div>
  );
}
