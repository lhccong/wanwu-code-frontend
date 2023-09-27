import {List} from 'antd';
import React, {useEffect, useState} from 'react';
import Article from "@/pages/Home/components/Article";
import { listPostVOByPageUsingPOST} from "@/services/user/postController";
import {useModel} from "@@/plugin-model/useModel";

export type UserArticleCardProps = {
  userId: number;
  selectType: number;
}

const UserArticleCard: React.FC<UserArticleCardProps> = ({userId, selectType}) => {
  const [articles, setArticles] = useState<API.PostVO[]>([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 3;
  const [total, setTotal] = useState(0);
  const { initialState } = useModel('@@initialState');
  const currentUser = initialState?.currentUser;
  const fetchUserArticles = async (page: number) => {
    const param: API.PostQueryRequest = {
      postStatus: selectType==4?null as any :selectType,
      current: page,
      pageSize,
      sortOrder:"desc",
      sortField:"updateTime",
      userId
    }
    if (currentUser?.id!==userId){
      param.postStatus = 2;
    }
    const res = await listPostVOByPageUsingPOST(param);
    if(res.code === 0){
      setArticles(res?.data?.records as API.PostVO[]);
      setTotal(res?.data?.total as number);
      setLoading(false);
    }
    return res;
  }

  //监听selectType
  useEffect(() => {
    fetchUserArticles(1);
  }, [selectType]);

  return (
    <List
      itemLayout="vertical"
      size="large"
      loading={loading}
      pagination={{
        onChange: (page) => {
          setLoading(true);
          fetchUserArticles(page);
        },
        pageSize,
        total
      }}
      dataSource={articles}
      renderItem={(article) => (
        <Article
          data={{ ...article }}
          type="user"
          updateInfo={(id, hasThumb, thumbNum, hasFavour, favourNum) => {
            setArticles(
              articles.map((tmp) =>
                tmp.id === id ? { ...tmp, hasThumb, thumbNum, hasFavour, favourNum } : tmp,
              ),
            );
          }}
        />

        // <Article data={{...article}} type='user'/>
      )}
    />
  );
};

export default UserArticleCard;
