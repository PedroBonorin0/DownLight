'use client';

import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement>{
  text: string;
  color?: 'red' | 'green';
}

export function Button({text, color, ...rest}: Props) {
  function getFinalColor() {
    if(!color)
      return '#1e81b0';

    if(color === 'green')
      return '#74C17E';

    if(color === 'red')
      return '#B06161';
  };

  return (
    <button
      className={`bg-[${getFinalColor()}]`}
      {...rest}
    >{text}</button>
  )
}