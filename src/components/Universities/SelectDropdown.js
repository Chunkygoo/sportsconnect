import React, { Fragment, useEffect, useRef, useState } from "react";

// https://www.npmjs.com/package/react-onclickoutside
import listenForOutsideClick from "../../utils/listenForOutsideClick";

export default function SelectDropdown({
  selected,
  setSelected,
  options,
  label,
  className,
  titleClassName,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [showInput, setShowInput] = useState(false);

  const [listening, setListening] = useState(false);
  const [text, setText] = useState("");
  const [searchedResults, setSearchResults] = useState(options);
  const menuRef = useRef(null);
  const inputRef = useRef(null);

  const onOptionClicked = (option) => () => {
    setIsOpen(false);
    setShowInput(false);
    setSelected(option);
  };

  const onSpanClicked = () => {
    setIsOpen(true);
    setShowInput(true);
    setText("");
  };

  useEffect(() => {
    listenForOutsideClick(listening, setListening, menuRef, () => {
      setIsOpen(false);
      setShowInput(false);
    })();
  }, [listening]);

  useEffect(() => {
    if (showInput) {
      inputRef.current.focus();
    }
  }, [showInput]);

  useEffect(() => {
    if (text !== "") {
      const newSearchedResults = [];
      for (const result of options) {
        if (result.label.toLowerCase().includes(text.toLowerCase())) {
          newSearchedResults.push(result);
        }
      }
      setSearchResults(newSearchedResults);
    } else {
      setSearchResults(options);
    }
  }, [options, text]);

  return (
    <Fragment>
      <h1 className={titleClassName}>{label}</h1>
      <div ref={menuRef}>
        <div
          className={
            "rounded-md p-2 outline outline-1 " +
            className +
            " " +
            (isOpen ? "outline-blue-700" : "outline-gray-300")
          }
        >
          <input
            type="text"
            ref={inputRef}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            className={
              (showInput ? "block" : "hidden") +
              " mt-0 w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-0 py-0 focus:border-black focus:outline-none focus:ring-0 "
            }
          />
          <span
            className={
              (showInput ? "hidden" : "block") + " flex justify-between"
            }
            onClick={onSpanClicked}
          >
            <span>
              <div className=" 500:max-w-[16rem] max-w max-w-[12rem] truncate">
                {selected.label}
              </div>
            </span>
            <svg
              className="w- my-auto h-4 text-black"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </span>
        </div>
        {isOpen && (
          <div className={"relative rounded-md shadow-lg " + className}>
            <ul className="absolute left-0 top-2 z-[199] max-h-60 w-full overflow-auto rounded-md bg-white shadow-xl outline outline-1 outline-gray-300">
              {searchedResults.map((option, index) => {
                let selectedClassName =
                  selected.label === option?.label
                    ? "bg-blue-500 text-white"
                    : "";
                return (
                  <li
                    className={
                      "list-none p-2 font-light hover:bg-blue-100 md:text-lg " +
                      selectedClassName
                    }
                    onClick={onOptionClicked(option)}
                    key={index}
                  >
                    {option?.label}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </Fragment>
  );
}
