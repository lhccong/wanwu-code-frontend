import {Card, Col, List, message, Row, Select, Tabs, Tag} from 'antd';
import React, {useEffect, useState} from 'react';
import UserCard from "@/pages/Home/components/UserCard";
import {CheckOutlined, TagsOutlined} from "@ant-design/icons";
import TabPane = Tabs.TabPane;
import {getAllTagsUsingGET} from "@/services/user/userTagController";

type UserListProps = {
  loading: boolean;
  dataList: API.UserVO[];
  changePage: (pageNum: number) => void;
  pageNum: number;
  total: number;
  afterDoFollow: (user: API.UserVO) => void;
  selectedTags: string[];
  changeTags: (selectedTags: string[]) => void;
}

const UserList: React.FC<UserListProps> = ({loading, dataList,changePage, pageNum,
                                             total,afterDoFollow, selectedTags, changeTags}) => {
  const [currentTab, setCurrentTab] = useState('0');
  const [allCategory, setAllCategory] = useState<API.UserTagCategoryVo[]>([])
  const [options, setOptions] = useState<any[]>([]);

  //初始化获取标签信息
  useEffect(() => {
    getAllTagsUsingGET().then((res) => {
        setAllCategory(res.data as any);
        if (res.data){
          setCurrentTab(res.data[0].id as any);
        }
        // setTagsLoading(false);
        const tmp: any[] = [];
        res?.data?.forEach((category: API.UserTagCategoryVo) => {
          if (category.tags){
            category.tags.forEach(tag => tmp.push({value: tag.name}));

          }
        });
        setOptions(tmp);
    })
  },[])

  const handleTagClose = (removeTag: string) => {
    changeTags(selectedTags.filter(tag => tag !== removeTag));
  }

  const addTagToParam = (tag: string) => {
    if(selectedTags && selectedTags.length && selectedTags.length >= 10){
      message.error('至多选择10个标签');
    } else {
      changeTags([...selectedTags, tag]);
    }
  }

  return (<>
    <Row justify="space-around" align="middle" style={{marginBottom: 8}}>
      <Col flex='80px'>
        <div style={{fontSize: 14}}>
          <TagsOutlined/>
          <span style={{marginLeft: 8}}>标签</span>
        </div>
      </Col>
      <Col flex='auto'>
        <Select
          mode="multiple"
          showSearch={false}
          value={selectedTags}
          style={{width: '100%'}}
          options={options}
          dropdownStyle={{padding: 12}}
          tagRender={(tag)=>{
            return (
              <Tag closable={true} onClose={()=>{handleTagClose(tag.value)}} style={{ marginRight: 3 }}>
                {tag.value}
              </Tag>
            )
          }}
          dropdownRender={()=>
            <Tabs
              tabPosition='left'
              onChange={(activeKey)=>setCurrentTab(activeKey)}
              activeKey={String(currentTab)}
            >
              {
                allCategory.map((category) =>
                  <TabPane key={category.id} tab={category.name}>
                    {category.tags?.map(tag =>
                      selectedTags?.includes(tag?.name as string) ?
                        <Tag
                          style={{cursor: 'pointer'}}
                          color='#f50' key={tag.id}
                          onClick={()=>handleTagClose(tag.name as string)}
                        >
                          {tag.name}<CheckOutlined/>
                        </Tag> :
                        <Tag
                          style={{cursor: 'pointer'}}
                          key={tag.id}
                          onClick={()=>{addTagToParam(tag.name as string)}}
                        >
                          {tag.name}
                        </Tag>
                    )}
                  </TabPane>
                )
              }
            </Tabs>
          }
        />
      </Col>
    </Row>

    <List
      loading={loading}
      grid={{ gutter: 16, column: 2 }}
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: (page) => {
          changePage(page);
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          })
        },
        showSizeChanger: false,
        showQuickJumper: true,
        current: pageNum,
        pageSize: 10,
        total,
      }}
      dataSource={dataList}
      renderItem={user =>
        <Card hoverable style={{margin: '0 8px 8px 0'}}>
          <UserCard data={user} afterFollow={user => afterDoFollow(user)}/>
        </Card>
      }
    />
  </>)
}

export default UserList;
