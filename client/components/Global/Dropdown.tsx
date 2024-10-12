import React, { useState } from "react";

interface DropdownProps {
  list: string[];
}

const Dropdown = (props: DropdownProps) => {
  const { list } = props;
  const [view, setView] = useState(false);

  return (
    <>
      <ul
        onClick={() => {
          setView(!view);
        }}
        style={{ cursor: "pointer", listStyle: "none", padding: 0 }}
      >
        {/* 클릭하면 view 상태를 반전시키고, 아이콘 표시 */}
        {view ? "⌃" : "⌄"} 클릭해서 리스트 열기 - 반가워요, nickname 님!
      </ul>
      {/* view가 true일 때만 리스트 항목들을 렌더링 */}
      {view && (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {list.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Dropdown;
