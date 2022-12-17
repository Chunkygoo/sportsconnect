import type { MutableRefObject } from "react";

export default function listenForOutsideClick(
  listening: boolean,
  setListening: React.Dispatch<React.SetStateAction<boolean>>,
  ref: MutableRefObject<HTMLElement | null>,
  clickedOutsideCallback: () => void
) {
  return () => {
    if (listening) return;
    if (!ref.current || !ref) return;
    setListening(true);
    document.addEventListener(`click`, (evt) => {
      if (evt.target instanceof Node && ref?.current?.contains(evt.target))
        return;
      clickedOutsideCallback();
    });
  };
}
