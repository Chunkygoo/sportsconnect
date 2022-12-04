import React, { useState } from 'react';

export default function Tooltip({
  description,
  extraInformation,
  initialMessage,
  transitionedMessage,
  hoverColor,
}) {
  const [message, setMessage] = useState(initialMessage);
  return (
    <span
      className={`w-full group relative inline-block text-blue-500 hover:${
        hoverColor ? hoverColor : 'text-red-500'
      } duration-300 mx-auto`}
      onClick={() => {
        setMessage(transitionedMessage);
        setTimeout(() => {
          setMessage(initialMessage);
        }, 4000);
      }}
    >
      {description}
      <div
        className="absolute hidden group-hover:flex -left-3 -top-2 
      -translate-y-full w-35 py-2 px-[4px] bg-gray-700 rounded-lg text-center 
      text-white text-sm after:content-[''] after:absolute after:left-1/2 
      after:top-[100%] after:-translate-x-1/2 after:border-8 after:border-x-transparent 
      after:border-b-transparent after:border-t-gray-700"
      >
        {message ? message : extraInformation}
      </div>
    </span>
  );
}
