import React, { useState, FC } from 'react';

interface AddItemModalProps {
  isOpen: boolean;
  //   onClose: () => void;
  onSave: (itemName: string) => void;
  category: string | null;
}

const AddItemModal: FC<AddItemModalProps> = ({
  isOpen,
  //   onClose,
  onSave,
  category,
}) => {
  const [itemName, setItemName] = useState<string>('');

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(itemName);
    setItemName('');
  };

  return (
    <div className="add-modal-overlay">
      <div className="add-modal-content">
        <h2>선택한 아이템 상품명을 </h2>
        <h2>정확하게 입력해주세요!</h2>
        <label>
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="ex) 자라 회색 맨투맨 24년도 봄 구매"
          />
        </label>

        <div className="add-modal-actions">
          {/* <button onClick={onClose}>취소</button> */}
          <button onClick={handleSave}>확인</button>
        </div>
      </div>
    </div>
  );
};

export default AddItemModal;
