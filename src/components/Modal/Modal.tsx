import { Fragment, useState } from "react";

export default function Modal({
  display = "",
  title = "",
  description = "",
  link = <div></div>,
  initialShow = false,
}) {
  const [showModal, setShowModal] = useState(initialShow);
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
                {/*content*/}
                <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex justify-center rounded-t border-b border-solid border-slate-200 p-5">
                    <h3 className="text-3xl font-semibold">{title}</h3>
                  </div>
                  <div className="relative flex-auto p-6">
                    <p className="my-4 text-lg leading-relaxed text-slate-500">
                      {description}
                    </p>
                    {link && (
                      <p className="my-4 text-lg leading-relaxed text-blue-500 underline">
                        {link}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6">
                    <button
                      className="mr-1 mb-1 rounded bg-emerald-500 px-6 py-3 text-sm font-bold text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      OK
                    </button>
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
