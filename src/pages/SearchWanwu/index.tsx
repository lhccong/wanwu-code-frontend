import type { TabsProps} from 'antd';
import {Card, notification, Tabs} from 'antd';
import React, {useEffect, useState} from 'react';
import Search from "antd/es/input/Search";
import {StringUtils} from "@/utils";
import {FrownOutlined} from "@ant-design/icons";
import {useHistory, useLocation} from 'umi';
import {searchAllUsingPOST} from "@/services/user/searchController";
import CsdnList from "@/pages/SearchWanwu/components/CsdnList";
import CnBlogList from "@/pages/SearchWanwu/components/CnBlogList";

const SearchPage: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const urlSearchParams = new URLSearchParams(location.search);
  const [type, setType] = useState(()=>{
    return urlSearchParams.get('type') || 'csdn';
  });
  const [keyword, setKeyword] = useState(()=>{
    return urlSearchParams.get('keyword') || '';
  });
  const [pageNum, setPageNum] = useState(()=>{
    return Number(urlSearchParams.get('pageNum')) || 1;
  });
  const [tags, setTags] = useState<string[]>(()=>{
    return urlSearchParams.getAll('tags') || [];
  });

  const [blogList, setBlogList] = useState<API.PostVO[]>([]);
  const [userList, setUserList] = useState<API.UserVO[]>([]);
  const [csdnBlogList, setCsdnBlogList] = useState<Search.CsdnBlog[]>([]);
  const [cnBlogList, setCnBlogList] = useState<Search.CnBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(1);
  const [api, contextHolder] = notification.useNotification();

  const setData = (type: string, data: API.PostVO[] | API.UserVO[] | Search.CsdnBlog[] | Search.CnBlog[])=>{
    switch (type) {
      case 'blog': setBlogList(data as API.PostVO[]);break;
      case 'user': setUserList(data as API.UserVO[]);break;
      case 'csdn': setCsdnBlogList(data as Search.CsdnBlog[]);break;
      case 'cnBlog': setCnBlogList(data as Search.CnBlog[]);break;
    }
  }

  //监听路径参数变化
  useEffect(()=>{
    const params: Search.SearchRequest = {
      type: urlSearchParams.get('type') || 'blog',
      keyword: urlSearchParams.get('keyword') || '',
      current: Number(urlSearchParams.get('pageNum')) || 1,
      tags: urlSearchParams.getAll('tags') || []
    };
    setType(params.type);
    setKeyword(params.keyword);
    setPageNum(params.pageNum);
    setTags(params.tags || []);
    if(StringUtils.isNotEmpty(params.keyword) ||
      (params.type === 'blog' || params.type === 'user') && params.tags && params.tags.length > 0){
      setLoading(true);
      searchAllUsingPOST(params).then(res => {
        if(res.code === 0 && res.data){
          const {records, total} = res.data.pageData;
          setData(params.type, records);
          setTotal(total);
          setLoading(false);
          if(records.length === 0 && params.type === 'cnblog'){
            api.open({
              message: '未查询到信息',
              description:
                '博客园做了反爬虫处理，未查询到结果大概率是后端查询的cookie过期了',
              icon: <FrownOutlined style={{ color: '#108ee9' }} />,
            });
          }
        }
      })
    }
  }, [location.search])

  function onSearch(value: string) {
    setKeyword(value);
    const params = new URLSearchParams({
      type,
      keyword: value,
      pageSize: pageNum.toString(),
    });
    tags.forEach(tag => params.append('tags', tag));
    //将搜索参数拼接到query上
    history.push(`search?${params.toString()}`);
  }

  const appendPageNumQuery = (pageNum: number) => {
    setPageNum(pageNum);
    const params = new URLSearchParams({
      type,
      keyword,
      pageNum: pageNum.toString(),
    });
    tags.forEach(tag => params.append('tags', tag));
    //添加pageNum参数
    history.push(`search?${params.toString()}`);
  }

  const appendTagsQuery = (selectedTags: string[]) => {
    setTags(selectedTags);
    const params = new URLSearchParams({
      type,
      keyword,
      pageNum: pageNum.toString(),
    });
    selectedTags.forEach(tag => params.append('tags', tag));
    //将搜索标签拼接到path上
    history.push(`search?${params.toString()}`);
  }

  const onTypeChange = (key: string) => {
    setType(key);
    setTags([]);
    const params = new URLSearchParams({
      type: key,
      keyword,
    });
    //将搜索类别拼接到path上
    history.push(`search?${params.toString()}`);
  };

  const items: TabsProps['items'] = [
    // {
    //   key: 'blog',
    //   label: `博客`,
    //   children: <BlogList
    //     dataList={blogList} pageNum={pageNum} total={total} loading={loading} selectedTags={tags}
    //     updateArticle={(id, isLiked, likeCount, isStared, starCount)=>{
    //       setBlogList(blogList.map(tmp => tmp.id === id ?
    //         {...tmp, isLiked, likeCount, isStared, starCount} : tmp))
    //     }}
    //     changePage={(pageNum)=>appendPageNumQuery(pageNum)}
    //     changeTags={(selectedTags)=>appendTagsQuery(selectedTags)}
    //   />,
    // },
    // {
    //   key: 'user',
    //   label: `用户`,
    //   children: <UserList
    //     dataList={userList} pageNum={pageNum} total={total} loading={loading}  selectedTags={tags}
    //     afterDoFollow={user =>
    //       setUserList(userList.map(result =>
    //         result.uid === user.uid ? {
    //           ...result,
    //           fans: result.isFollow ? result.fans - 1 : result.fans + 1,
    //           isFollow: !result.isFollow,
    //         } : result))
    //     }
    //     changePage={(pageNum)=>appendPageNumQuery(pageNum)}
    //     changeTags={(selectedTags)=>appendTagsQuery(selectedTags)}
    //   />,
    // },
    {
      key: 'csdn',
      label: 'CSDN',
      children: <CsdnList
        loading={loading} dataList={csdnBlogList}
        changePage={(pageNum)=>appendPageNumQuery(pageNum)}
      /> ,
    },
    {
      key: 'cnblog',
      label: '博客园',
      children: <CnBlogList
        loading={loading} dataList={cnBlogList} total={total}
        changePage={(pageNum)=>appendPageNumQuery(pageNum)}
      />,
    }
  ];

  return (
    <>
      {contextHolder}
      <Card style={{margin: '19px auto 32px auto', width: '50%',borderRadius:8}}>
        <Search
          size='large'
          defaultValue={keyword}
          onChange={(e)=>{
            setKeyword(e.target.value)
          }}
          placeholder="试试搜索"
          onSearch={onSearch}
        />
      </Card>
      <Card style={{width: 980, margin: '0 auto',borderRadius:8}}>
        <div style={{margin: '0 auto', width: '96%'}}>
          <Tabs
            defaultActiveKey={type}
            onChange={onTypeChange}
            items={items}
          />
        </div>
      </Card>
    </>
  );
};

export default SearchPage;
