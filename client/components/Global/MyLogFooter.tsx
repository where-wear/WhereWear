'useclient';
import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react';
interface LikeFooterPropsType {
  logId: number;
  token: string | null;
}
const MyLogFooter = (props: LikeFooterPropsType) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  //로그 삭제  api
  const DeleteLogHandler = async () => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/log/${props.logId}/delete`,
        {
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        }
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  // 모달 열기/닫기
  const handleDeleteClick = () => {
    console.log(isDeleteModalOpen);
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  // 모달 바깥 클릭 시 닫기
  const handleOutsideClick = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <div className="footer-box">
        <div>
          <div>
            <ul>
              <li>
                <div>
                  <img src={'/image/upLoadIcon.svg'} className="footer-icon" />
                </div>
              </li>
              <li></li>
              <li className="addLog-li"></li>

              <li>
                <div
                  onClick={handleDeleteClick}
                  className="delete-modal-wrapper-container"
                >
                  {/* 삭제 확인 모달 */}
                  {isDeleteModalOpen && (
                    <div
                      className="delete-modal-wrapper"
                      onClick={handleOutsideClick}
                    >
                      <div
                        className="delete-modal-content"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div onClick={DeleteLogHandler}>삭제</div>
                      </div>
                    </div>
                  )}
                  <img
                    src={'/image/menuIcon.svg'}
                    className="footer-icon-menu"
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyLogFooter;
