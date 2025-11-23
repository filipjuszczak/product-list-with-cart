import { createPortal } from 'react-dom';

export function Modal({ children }: { children: React.ReactNode }) {
  return <dialog></dialog>;
}

function Backdrop() {
  return <div className="absolute inset-0 bg-black/50"></div>;
}
