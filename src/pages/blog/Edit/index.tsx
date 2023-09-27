import { Button, Card, Descriptions, message, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams, history, useModel } from 'umi';
import { MdEditor } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import { ApartmentOutlined } from '@ant-design/icons';
import {
  editPostUsingPOST,
  getPostVOByIdUsingGET,
  publishMyPostUsingPOST,
  updatePostUsingPOST,
} from '@/services/user/postController';

const editorId = 'my-editor';

const EditNote: React.FC = () => {
  const params = useParams();
  const articleId = BigInt(params.id);
  const { initialState } = useModel('@@initialState');
  const currentUser = initialState?.currentUser;
  const [loading, setLoading] = useState(true);
  const [articleContent, setArticleContent] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [summary, setSummary] = useState<string>('');
  const [status, setStatus] = useState(0);

  //首先查询当前用户是不是文章作者，是的话返回标题和摘要，然后再根据id查询文章内容；否的话进行跳转
  useEffect(() => {
    //1.检查是否登录了
    if (!currentUser) {
      message.error('请先登录');
      history.push('/user/login?redirect=' + encodeURIComponent(window.location.href));
      return;
    }

    //2.获取文章基本信息
    getPostVOByIdUsingGET({ id: articleId }).then((res) => {
      if (currentUser?.id === res.data?.userId) {
        setTitle(res.data?.title as string);
        setArticleContent(res.data?.content as string);
        setSummary(res.data?.synopsis as string);
        setStatus(res.data?.postStatus as number);
        setLoading(false);
      } else {
        message.error('你无权编辑本文章！');
        history.push('/');
      }
    });
  }, []);

  const saveContent = async () => {
    // @ts-ignore
    const param: API.PostUpdateRequest = {
      id: BigInt(params.id).toString(),
      content: articleContent,
    };
    const res = await editPostUsingPOST(param);
    if (res.data) {
      message.success('保存成功！');
    }
  };
  const publish = async () => {
    const res = await publishMyPostUsingPOST({ postId: BigInt(params.id).toString() });
    if (res.data) {
      message.success('发布成功！');
      setStatus(2);
      history.push('/blog');
    }
  };

  return (
    <Card
      style={{ width: 1180, margin: '0 auto' }}
      title={
        loading ? (
          <Skeleton paragraph={false} />
        ) : (
          <>
            编辑文章 / <a href={`/note/${articleId}`}> {title}</a>
          </>
        )
      }
      loading={loading}
    >
      <Card
        style={{
          borderRadius: 0,
          marginBottom: 16,
          borderLeft: '4px solid rgb(194,194,194)',
          backgroundColor: 'rgb(250, 250,250)',
        }}
        bodyStyle={{ padding: '4px 8px' }}
      >
        <div style={{ margin: '4px' }}>
          <Descriptions column={1} style={{}}>
            <Descriptions.Item
              label={
                <p style={{ margin: 0 }}>
                  <ApartmentOutlined style={{ marginRight: 8 }} />
                  摘要
                </p>
              }
              style={{ paddingBottom: 0 }}
            >
              {summary}
            </Descriptions.Item>
          </Descriptions>
        </div>
      </Card>

      {!loading && (
        <MdEditor
          style={{ height: 600 }}
          modelValue={articleContent}
          editorId={editorId}
          toolbarsExclude={['save', 'htmlPreview', 'github']}
          onChange={(content) => {
            setArticleContent(content);
          }}
        />
      )}
      <div style={{ marginTop: 16, float: 'right' }}>
        {status !== 2 && (
          <Button onClick={publish} type={'default'}>
            发布
          </Button>
        )}
        <Button style={{ marginLeft: 16 }} type="primary" onClick={saveContent}>
          保存
        </Button>
      </div>
    </Card>
  );
};

export default EditNote;
