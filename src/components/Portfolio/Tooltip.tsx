import { useState } from "react";
import type { tooltipType } from "../../types/tooltip";

export default function Tooltip({
  description,
  initialMessage,
  transitionedMessage,
  hoverColor,
}: tooltipType) {
  const [message, setMessage] = useState(initialMessage);
  return (
    <span
      className={`group relative inline-block w-full text-blue-500 hover:${
        hoverColor ? hoverColor : "text-red-500"
      } mx-auto duration-300`}
      onClick={() => {
        if (!transitionedMessage) return;
        setMessage(transitionedMessage);
        setTimeout(() => {
          setMessage(initialMessage);
        }, 4000);
      }}
    >
      {description}
      <div
        className="w-35 absolute -left-3 -top-2 hidden 
      -translate-y-full rounded-lg bg-gray-700 py-2 px-[4px] text-center text-sm 
      text-white after:absolute after:left-1/2 after:top-[100%] after:-translate-x-1/2 
      after:border-8 after:border-x-transparent after:border-b-transparent after:border-t-gray-700 
      after:content-[''] group-hover:flex"
      >
        {message}
      </div>
    </span>
  );
}
