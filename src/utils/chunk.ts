import type { searchedUnisType } from "../types/GalleryItem";

export default function chunk(arr: searchedUnisType[], size: number) {
  return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
}
