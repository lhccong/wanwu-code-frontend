import React, { useState } from 'react';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import UploadModal from '@/pages/user/Message/components/AvatarModal';
import { css } from '@emotion/css';

type AvatarViewProps = {
  avatar: string;
  onSave: (newAvatar: string) => void;
};
const AvatarView: React.FC<AvatarViewProps> = ({ avatar, onSave }) => {
  const avatarClass = css`
    position: relative;
    margin: 0 auto;
    width: 160px;
    height: 160px;
    border-radius: 50%;
    box-shadow: 0 0 4px #ccc;

    .uploadIcon {
      position: absolute;
      top: 0;
      right: 10px;
      padding: 0.5rem;
      font-size: 1.4rem;
      background: rgba(222, 221, 221, 0.7);
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-radius: 50%;
    }

    .mask {
      position: absolute;
      background: rgba(0, 0, 0, 0.4);
      cursor: pointer;
      opacity: 0;
      transition: opacity 0.4s;

      &:hover {
        opacity: 1;
      }

      i {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -1rem;
        margin-left: -1rem;
        color: #d6d6d6;
        font-size: 2rem;
      }
    }

    img,
    .mask {
      width: 100%;
      max-width: 180px;
      height: 100%;
      overflow: hidden;
      border-radius: 50%;
    }
  `;
  const [visible, setVisible] = useState(false);

  function modalOpen() {
    setVisible(true);
  }

  return (
    <>
      <div className={avatarClass} onClick={modalOpen}>
        <UploadOutlined className="uploadIcon" />
        <div className="mask">
          <PlusOutlined style={{ fontSize: 40, margin: 60, color: 'white' }} />
        </div>
        <img src={avatar} />
      </div>
      <UploadModal
        visible={visible}
        onCancel={() => {
          setVisible(false);
        }}
        onSave={onSave}
      />
    </>
  );
};

export default AvatarView;
