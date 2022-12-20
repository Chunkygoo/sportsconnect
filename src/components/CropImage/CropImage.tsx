import axios from "axios";
import useTranslation from "next-translate/useTranslation";
import { Fragment, useEffect, useRef, useState, type ChangeEvent } from "react";
import { AiOutlineClose } from "react-icons/ai";
import ReactCrop, { type PercentCrop, type PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { toast } from "react-toastify";
import type { cropImageType } from "../../types/cropImage";
import { trpc } from "../../utils/trpc";
import { canvasCrop } from "./canvasCrop";

export default function CropImage({
  setLoading,
  display,
  imageKey,
}: cropImageType) {
  const { t } = useTranslation();
  const [imgSrc, setImgSrc] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const imgRef = useRef(null);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [crop, setCrop] = useState<PercentCrop | undefined>(undefined);
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const utils = trpc.useContext();

  useEffect(() => {
    if (
      completedCrop &&
      completedCrop?.width &&
      completedCrop?.height &&
      imgRef.current &&
      previewCanvasRef.current
    ) {
      canvasCrop({
        image: imgRef.current,
        canvas: previewCanvasRef.current,
        crop: completedCrop,
      });
    }
  }, [completedCrop]);

  const reset = () => {
    setImgSrc("");
    imgRef.current = null;
    previewCanvasRef.current = null;
    setCrop(undefined);
    setCompletedCrop(null);
    setError("");
  };

  const { refetch: uploadImage } = trpc.image.getPreSignedURLForWrite.useQuery(
    { fileType: encodeURIComponent(image?.type || "") },
    {
      async onSuccess({ uploadUrl, key }) {
        setLoading(true);
        if (imageKey) await deleteS3Object({ key: imageKey }); // delete if exists
        const res = await axios.put(uploadUrl, image); // upload to s3
        if (res.status === 200) {
          await updateImageMetaData({
            key: key,
          });
        }
        setLoading(false);
      },
      onError() {
        toast.error("An error occured while uploading your image", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      },
      enabled: false,
    }
  );

  const { mutateAsync: updateImageMetaData } =
    trpc.image.updateImageMetaData.useMutation({
      onError() {
        toast.error("An error occured while uploading your image", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      },
      onSettled() {
        utils.userInfo.getCurrentUserInfo.invalidate();
      },
    });

  const { mutateAsync: deleteS3Object } = trpc.image.deleteS3Object.useMutation(
    {
      onError() {
        toast.error("An error occured while deleting your image", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      },
      onSettled() {
        utils.userInfo.getCurrentUserInfo.invalidate();
      },
    }
  );

  const handleUploadImage = async () => {
    // if there is a cropped image, we use that
    if (completedCrop && previewCanvasRef.current) {
      previewCanvasRef.current.toBlob((blob: Blob | null) => {
        if (!blob || !image) return;
        const _image = new File([blob], image.name, {
          type: image.type,
        });
        setImage(_image);
      }, image?.type);
    }
    uploadImage();
  };

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    setImgSrc("");
    setError("");
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    if (!file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      setError("Select a valid image file");
      return;
    }
    if (file.size > 5000000) {
      setError("File size must be < 5 Mb");
      return;
    }
    // Makes crop preview update between images.
    setCrop(undefined);
    const reader = new FileReader();
    reader.addEventListener("load", () =>
      setImgSrc(reader?.result?.toString() || "")
    );
    reader.readAsDataURL(e.target.files[0]);
    setImage(e.target.files[0]);
  };

  const description = (
    <div>
      {error && (
        <span className="text-md flex justify-between text-red-700 ">
          {error}
          <AiOutlineClose
            onClick={() => setError("")}
            className="mt-1 hover:cursor-pointer"
          />
        </span>
      )}
      {!(completedCrop || imgSrc) && (
        <input
          aria-label="file input"
          className="mb-2 block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none"
          type="file"
          accept="image/*"
          onChange={onSelectFile}
        />
      )}
      <span>
        <ReactCrop
          crop={crop}
          onChange={(_, percentCrop) => setCrop(percentCrop)}
          onComplete={(c) => setCompletedCrop(c)}
          className="max-h-96"
        >
          {imgSrc && (
            // eslint-disable-next-line @next/next/no-img-element
            <img ref={imgRef} src={imgSrc} alt="uploaded photo" />
          )}
        </ReactCrop>
      </span>
      <span className="hidden">
        <canvas ref={previewCanvasRef} />
      </span>
    </div>
  );

  return (
    <Fragment>
      {display && (
        <button
          className="text-blue-800"
          type="button"
          onClick={() => setShowModal(true)}
        >
          {display}
        </button>
      )}
      {showModal ? (
        <>
          <div
            className="fixed top-0 bottom-0 left-0 right-0 z-[200] flex items-center justify-center bg-[#00000066]"
            onClick={() => {
              setShowModal(false);
              reset();
            }}
          >
            <div className="fixed inset-0 z-50 m-8 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
              <div
                className="relative my-6 mx-auto w-auto max-w-3xl"
                onClick={(e) => {
                  // do not close modal if anything inside modal content is clicked
                  e.stopPropagation();
                }}
              >
                <div className="fborder-0 relative flex h-[80%] w-full flex-col rounded-lg bg-white shadow-lg outline-none focus:outline-none">
                  <div className="relative flex-auto p-6">
                    <span className="my-4 text-lg leading-relaxed text-slate-500">
                      {description}
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-b border-t border-solid border-slate-200 p-3 text-xs sm:text-base">
                    <div className="m-auto mr-1 p-2">
                      {t("portfolio:crop_image")}
                    </div>
                    <div className="mt-1 mb-1">
                      <button
                        className="mr-4 rounded bg-emerald-500 px-4 py-1 text-xs font-bold text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600 sm:text-sm"
                        type="button"
                        onClick={() => {
                          reset();
                          setShowModal(false);
                        }}
                      >
                        {t("portfolio:cancel")}
                      </button>
                      <button
                        className="mr-1 rounded bg-blue-500 px-4 py-1 text-xs font-bold text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-blue-600 sm:text-sm"
                        type="button"
                        onClick={() => {
                          handleUploadImage();
                          setShowModal(false);
                        }}
                        disabled={!completedCrop && !imgSrc}
                      >
                        {t("portfolio:upload")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </Fragment>
  );
}
