import React, { createRef, useState } from 'react';
import type { UploadProps } from 'antd';
import { Button, Col, Divider, message, Modal, Row, Upload } from 'antd';
//裁剪功能的库
import type { ReactCropperElement } from 'react-cropper';
import Cropper from 'react-cropper';
import {
  MinusOutlined,
  PlusOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  UploadOutlined,
} from '@ant-design/icons';

// @ts-ignore
import { v4 as UUID } from 'uuid';
import { css } from '@emotion/css';
import { uploadAvatar } from '@/services/thirdService/api';
import { policyUsingGET } from '@/services/user/ossController';
import 'cropperjs/dist/cropper.css';
export type Props = {
  visible: boolean;
  onCancel: () => void;
  onSave: (newAvatar: string) => void;
};

const UploadModal: React.FC<Props> = ({ visible, onCancel, onSave }) => {
  const previewImage = css`
    position: absolute;
    top: 50%;
    transform: translate(50%, -50%);
    width: 180px;
    height: 180px;
    border-radius: 50%;
    box-shadow: 0 0 4px #ccc;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  `;

  const [image, setImage] = useState('#');
  const cropperRef = createRef<ReactCropperElement>();

  const props: UploadProps = {
    beforeUpload: (file) => {
      const ext = file.name.substring(file.name.lastIndexOf('.'));
      if (ext === '.jpg' || ext === '.png') {
        const reader = new FileReader();
        // 把Array Buffer转化为blob 如果是base64不需要
        // 转化为base64以进行预览
        reader.readAsDataURL(file);
        reader.onload = () => {
          setImage(reader.result as any);
        };
      } else {
        message.error('请上传JPG或PNG格式的图片！');
      }
      return false;
    },
    showUploadList: false,
  };

  const save = async () => {
    // const res = await policyUsingGET();
    if (cropperRef.current?.cropper.getCroppedCanvas()) {
      cropperRef.current?.cropper.getCroppedCanvas().toBlob((blob) => {
        if (!blob) {
          message.error('请先选择图片！');
          return;
        }
        const formData = new FormData();
        // formData.append('token', res.data?.token as string);
        // formData.append('key', res.data?.dir + '/' + UUID() + '.jpg');
        // 创建一个带有正确文件后缀的新文件名
        const fileName = Date.now()+".jpeg";
        // 创建一个新的 File 对象，并设置文件名
        const file = new File([blob], fileName);
        formData.append('file', file);
        const tokenName = localStorage.getItem('tokenName');
        const tokenValue = localStorage.getItem('tokenValue');
        const headers = {
          'Content-Type': 'application/x-www-form-urlencoded',
        };
        if (tokenName && tokenValue) {
          headers[tokenName] = tokenValue;
        }
        uploadAvatar(formData, {
          contentType: false,
          processData: false,
          headers: headers,
          withCredentials: false,
        }).then((response) => {
          // //修改currentUser里的avatar
          onSave( response.data.data);
          //
          message.success('上传成功');
          onCancel?.();
        });
      }, 'image/jpeg');
    } else {
      message.error('请先选择图片！');
    }
  };

  const zoom = (ratio: number) => {
    cropperRef.current?.cropper.zoom(ratio);
  };
  const rotate = (degree: number) => {
    cropperRef.current?.cropper.rotate(degree);
  };

  return (
    <Modal title="修改头像" width={800} open={visible} onCancel={() => onCancel?.()} footer={[]}>
      <Divider />
      <Row>
        <Col xs={24} md={12} style={{ height: '350px' }}>
          <Cropper
            className="cropper-bg"
            ref={cropperRef}
            dragMode="move"
            aspectRatio={1}
            style={{ height: 350, width: 376 }}
            src={image}
            viewMode={1}
            minCropBoxHeight={100}
            minCropBoxWidth={100}
            autoCropArea={1}
            background={false}
            preview=".img-preview"
          />
        </Col>
        <Col xs={24} md={12} style={{ height: '350px' }}>
          <div className={previewImage}>
            <div
              className="img-preview"
              style={{ overflow: 'hidden', width: '100%', height: '100%' }}
            />
          </div>
        </Col>
      </Row>
      <br />
      <Row gutter={24}>
        <Col span={4}>
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>选择图片</Button>
          </Upload>
        </Col>
        <Col span={2}>
          <Button onClick={() => zoom(0.1)} icon={<PlusOutlined />} />
        </Col>
        <Col span={2}>
          <Button onClick={() => zoom(-0.1)} icon={<MinusOutlined />} />
        </Col>
        <Col span={2}>
          <Button
            onClick={() => {
              rotate(90);
            }}
            icon={<RotateRightOutlined />}
          />
        </Col>
        <Col span={2}>
          <Button
            onClick={() => {
              rotate(-90);
            }}
            icon={<RotateLeftOutlined />}
          />
        </Col>
        <Col span={12}>
          <Button onClick={save} style={{ position: 'absolute', left: '40%' }}>
            保存
          </Button>
        </Col>
      </Row>
    </Modal>
  );
};

export default UploadModal;
