import React from 'react';
interface ModalProps {
  isOpen: boolean;
  isClosing: boolean;
  children: React.ReactNode;
  onClose: (e: React.MouseEvent<HTMLDivElement>) => void;
}
const LogMarkerModal = ({
  isOpen,
  children,
  isClosing,
  onClose,
}: ModalProps) => {
  if (!isOpen) return null; // 모달이 열리지 않았을 때는 아무것도 렌더링하지 않음

  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div
          className={`modal-content ${isClosing ? 'closing' : ''}`}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default LogMarkerModal;
