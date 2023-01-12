import { Fragment, useEffect, useState } from "react";
import type { detailModalType } from "../../types/detailModal";
import Content from "./Content";

export default function DetailModal({
  display,
  uni,
  setAllUnis,
  myInterested,
}: detailModalType) {
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setShowModal(false);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Fragment>
      {display && (
        <span
          className="w-1/3 hover:cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          {display}
        </span>
      )}
      {showModal ? (
        <>
          <div
            className="fixed top-0 left-0 z-[200] flex h-screen  w-screen  items-center justify-center bg-[#00000066]"
            onClick={() => {
              setShowModal(false);
            }}
          >
            <div
              className="relative -mt-5 h-[78vw] w-[90%] rounded-md sm:h-[60vw] lg:h-[50vw] xl:h-[40vw] 2xl:h-[30vw]"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Content
                uni={uni}
                onClose={() => setShowModal(false)}
                setAllUnis={setAllUnis}
                myInterested={myInterested}
              />
            </div>
          </div>
        </>
      ) : null}
    </Fragment>
  );
}
