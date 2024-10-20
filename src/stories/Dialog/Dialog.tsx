import React from 'react';
import { ReactNode, useState, useRef } from "react";
import "./dialog.css";

export interface DialogProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
  type?: string;
  label?: string;
  // 必要に応じて変化
  // onChange?: (value: boolean) => void;
  children: ReactNode;
}

export const Dialog = ({
  className,
  size = 'medium',
  label,
  type,
  // onChange,
  children
}: DialogProps) => {
  const dialogElement = useRef<HTMLDivElement>(null);
  let setClassName = "dialog p-2 rounded-lg";
  if(className) {
    setClassName += ` ${className}`;
  }
  if(size) {
    setClassName += ` ${size}`;
  }
  const switchAction = () => {
    if(dialogElement.current?.classList.contains("open")) {
      document.body.setAttribute("style","");
      dialogElement.current?.classList.remove("open");
    }else {
      document.body.setAttribute("style","overflow: hidden;");
      dialogElement.current?.classList.add("open");
    }
  }
  return (
    <div className="dialog-box" ref={dialogElement}>
      <button onClick={switchAction} className={type ? type : "" }>{label ? label : "view" }</button>
      <div className="overlay fixed top-0 left-0 bg-stone-900/90"></div>
      <div className={setClassName}>
        <button className="close-btn p-2 rounded-full border border-gray-400 bg-white" onClick={switchAction}>close</button>
        <div className="dialog-inner">
          {children}
        </div>
      </div>
    </div>
  );
};
