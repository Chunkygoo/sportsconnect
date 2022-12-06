import axios from "axios";
import useTranslation from "next-translate/useTranslation";
import { Fragment, useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { toast } from "react-toastify";
import { trpc } from "../../utils/trpc";
import { canvasPreview } from "./canvasPreview";

export default function CropImage({ setLoading, display, imageKey }) {
  const { t } = useTranslation();
  const [imgSrc, setImgSrc] = useState("");
  const [imageName, setImageName] = useState("");
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState(null);
  const [completedCrop, setCompletedCrop] = useState(null);
  const [error, setError] = useState(null);
  const [imageType, setImageType] = useState("");
  const [showModal, setShowModal] = useState(false);
  const utils = trpc.useContext();

  useEffect(() => {
    if (
      completedCrop?.width &&
      completedCrop?.height &&
      imgRef.current &&
      previewCanvasRef.current
    ) {
      canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop);
    }
  }, [completedCrop]);

  let reset = () => {
    setImgSrc("");
    setImageName("");
    imgRef.current = null;
    previewCanvasRef.current = null;
    setCrop(null);
    setCompletedCrop(null);
    setError(null);
    setImageType("");
  };

  const { data } = trpc.image.getPreSignedURLForWrite.useQuery(
    { fileType: encodeURIComponent(imageType) },
    {
      onError() {
        toast.error("An error occured while uploading your image", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      },
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

  let sendProfilePhoto = async () => {
    let uploadBlob = async (blob) => {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", blob, imageName);
      const file = formData.get("file");
      if (!file) {
        return null;
      }
      await utils.image.getPreSignedURLForWrite.invalidate();
      const { uploadUrl, key } = data;
      if (imageKey) await deleteS3Object({ key: imageKey }); // delete if exists
      let res = await axios.put(uploadUrl, file); // upload to s3
      if (res.status === 200) {
        await updateImageMetaData({
          key: key,
        });
      }
      setLoading(false);
    };
    if (completedCrop) {
      previewCanvasRef.current.toBlob((blob) => {
        uploadBlob(blob);
      }, imageType);
    } else {
      let blob = await fetch(imgSrc).then((r) => r.blob());
      uploadBlob(blob);
    }
  };

  let onSelectFile = (e) => {
    setImgSrc(null);
    setError("");
    if (e.target.files && e.target.files.length > 0) {
      if (!e.target.files[0].name.match(/\.(jpg|jpeg|png|gif)$/)) {
        setError("Select a valid image file");
        return;
      }
      if (e.target.files[0].size > 5000000) {
        // file size greater than 5mb
        setError("File size must be < 5 Mb");
        return;
      }
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
      setImageName(e.target.files[0].name);
      setImageType(e.target.files[0].type);
    }
  };

  let description = (
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
                <div className="fborder-0 relative flex w-full flex-col rounded-lg bg-white shadow-lg outline-none focus:outline-none">
                  <div className="relative flex-auto p-6">
                    <span className="my-4 text-lg leading-relaxed text-slate-500">
                      {description}
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-b border-t border-solid border-slate-200 p-3 text-xs sm:text-base">
                    <div className="mr-1 p-3">{t("portfolio:crop_image")}</div>
                    <div>
                      <button
                        className="mr-4 mr-1 mb-1 rounded bg-emerald-500 px-4 py-1 text-xs font-bold text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600 sm:text-sm"
                        type="button"
                        onClick={() => {
                          reset();
                          setShowModal(false);
                        }}
                      >
                        {t("portfolio:cancel")}
                      </button>
                      <button
                        className="mr-1 mb-1 rounded bg-blue-500 px-4 py-1 text-xs font-bold text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-blue-600 sm:text-sm"
                        type="button"
                        onClick={() => {
                          sendProfilePhoto();
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
