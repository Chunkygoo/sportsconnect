export default function listenForOutsideClick(
  listening: boolean,
  setListening: React.Dispatch<React.SetStateAction<boolean>>,
  ref: any,
  clickedOutsideCallback: () => void
) {
  return () => {
    if (listening) return;
    if (!ref.current || !ref) return;
    setListening(true);
    document.addEventListener(`click`, (evt) => {
      if (ref?.current?.contains(evt.target)) return;
      clickedOutsideCallback();
    });
  };
}
