import React from 'react';
import { DebounceInput } from 'react-debounce-input';

export default function Textarea({
  label,
  name,
  isDisabled,
  type = 'text',
  ...rest
}) {
  return (
    <div className="relative z-0 w-full h-full mb-8">
      <DebounceInput
        disabled={isDisabled}
        debounceTimeout={1000}
        element="textarea"
        {...rest}
        id={name}
        type={type}
        placeholder=" "
        className="block w-full p-1 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200 h-full"
      />
      <label
        htmlFor={name}
        className="absolute duration-300 top-0 -z-1 origin-0 text-gray-500"
      >
        {label}
      </label>
    </div>
  );
}
