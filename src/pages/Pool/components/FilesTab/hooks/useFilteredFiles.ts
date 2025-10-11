import { useMemo } from "react";
import type { File } from "../../../../../types/models";

export function useFilteredFiles(files: File[] | undefined, searchTerm: string) {
  return useMemo(() => {
    if (!files) return [];
    if (!searchTerm) return files;

    const term = searchTerm.toLowerCase();
    return files.filter((file) => {
      const name = file.name?.toLowerCase() ?? "";
      const fn = file.userUploader?.firstName?.toLowerCase() ?? "";
      const ln = file.userUploader?.lastName?.toLowerCase() ?? "";
      return name.includes(term) || fn.includes(term) || ln.includes(term);
    });
  }, [files, searchTerm]);
}
