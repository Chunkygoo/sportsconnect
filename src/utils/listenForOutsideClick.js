export default function listenForOutsideClick(
  listening,
  setListening,
  ref,
  clickedOutsideCallback
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
