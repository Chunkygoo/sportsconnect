import Image from "next/image";
import type { galleryItemType } from "../../types/GalleryItem";
import DetailModal from "./DetailModal";

export default function GalleryItem({
  datum,
  setAllUnis,
  mine,
}: galleryItemType) {
  const display = datum && (
    <div className="flex w-[95%] flex-wrap">
      <div className="w-full rounded-lg p-1 shadow-xl md:p-2">
        <Image
          width={500}
          height={300}
          alt="university image"
          className="block rounded-lg object-cover object-center"
          src={datum.backgroundImage}
          blurDataURL={datum.blurredBackgroundImage}
          placeholder="blur"
        />
        <span className="flex text-[10px] sm:text-sm">
          <span className="mx-auto italic">{datum.name}</span>
        </span>
      </div>
    </div>
  );

  return (
    <DetailModal
      display={display}
      uni={datum}
      setAllUnis={setAllUnis}
      mine={mine}
    />
  );
}
