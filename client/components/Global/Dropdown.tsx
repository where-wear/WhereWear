import React, { useEffect, useState } from 'react';

interface DropdownProps {
  list: string[];
  onSelect: (selectedItem: string | number) => void;
  title: string | number;
}

const Dropdown = (props: DropdownProps) => {
  const { list } = props;
  const [view, setView] = useState(false);
  const [nowselect, setSelect] = useState<string | number>(props.title);

  return (
    <>
      <label className="recommend-drop-down-label">
        <ul
          onClick={() => {
            setView(!view);
          }}
          style={{ cursor: 'pointer', listStyle: 'none', padding: 0 }}
          className="test-drop-down"
        >
          {/* 클릭하면 view 상태를 반전시키고, 아이콘 표시 */}
          <div className="rkdskarn">{nowselect}</div>
          <div className="ghktkfvy">{view ? '︿' : '﹀'}</div>
        </ul>
      </label>

      {/* view가 true일 때만 리스트 항목들을 렌더링 */}
      {view && (
        <div className="dropdown-list-ul-container">
          <ul
            style={{ listStyle: 'none', padding: 0 }}
            className="dropdown-list-ul"
          >
            {list.map((item, index) => (
              <li key={index}>
                <div
                  onClick={() => {
                    setSelect(item);
                    setView(false);
                    props.onSelect(item);
                  }}
                  className="marker"
                >
                  {item}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Dropdown;
