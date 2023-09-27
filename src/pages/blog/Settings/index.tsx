import React, { useRef } from 'react';
import Step1 from '@/pages/blog/Create/components/Step1';
import { Button, Card } from 'antd';
import { useParams } from 'umi';

const ArticleSettings: React.FC = () => {
  const params = useParams();
  const articleId = BigInt(params.id);
  const childRef = useRef(null);

  return (
    <Card style={{ width: 980, margin: '0 auto' }}>
      <Step1 ref={childRef} articleId={articleId as any} />
      <Button
        onClick={() => {
          // @ts-ignore
          childRef.current?.updateSettings();
        }}
        type="primary"
        style={{ float: 'right' }}
      >
        提交修改
      </Button>
    </Card>
  );
};

export default ArticleSettings;
