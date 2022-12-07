import { DebounceInput } from "react-debounce-input";
import type { inputType } from "../../types/input";

export default function Input({
  isDisabled,
  label,
  name,
  type,
  value,
  isTextarea = false,
  onChange,
}: inputType) {
  return (
    <div className={"relative z-0 mb-8 w-full" + (isTextarea ? " h-full" : "")}>
      <DebounceInput
        disabled={isDisabled ? isDisabled : false}
        debounceTimeout={1000}
        value={value || ""}
        onChange={onChange}
        id={name}
        type={type}
        placeholder=" "
        element={isTextarea ? "textarea" : undefined}
        className={
          "w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent focus:border-black focus:outline-none focus:ring-0" +
          (isTextarea ? " block h-full p-1" : " mt-0 block px-0 pt-3 pb-2")
        }
      />
      <label
        htmlFor={name}
        className="-z-1 origin-0 absolute top-3 left-0 text-gray-500 duration-300"
      >
        {label}
      </label>
    </div>
  );
}
