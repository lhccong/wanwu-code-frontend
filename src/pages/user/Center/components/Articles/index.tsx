import React, {useState} from 'react';
import {Card, Col, Row} from "antd";
import UserArticleCard from "@/pages/Home/components/UserArticleCard";
import {useModel} from "umi";
import {css} from "@emotion/css";

type ArticlesProps = {
  targetUser: API.UserVO;
}

const Articles: React.FC<ArticlesProps> = ({targetUser}) => {
  const {initialState} = useModel('@@initialState');
  const currentUser = initialState?.currentUser;
  //用户要查看的是全部？已发布？草稿？
  const [selectType, setSelectType] = useState(4);
  const linkCss = [4, 2, 0].map(selected => {
    return css`
      color: ${selectType === selected ? '#FA541C' : 'rgb(34,34,34)'};

      &:hover {
        color: ${selectType === selected ? '#FA541C' : 'rgb(34,34,34)'};
      }
    `;
  });

  return (
    <div>
      {
        currentUser?.id === targetUser.id &&
        <Card style={{marginBottom:20}} bodyStyle={{padding: '4px 16px 4px 16px', backgroundColor: 'rgb(255,241,240)'}}>
          <Row>
            <Col span={4}>
              <a className={linkCss[0]} onClick={() => setSelectType(4)}>全部</a>
            </Col>
            <Col span={4}>
              <a className={linkCss[1]} onClick={() => setSelectType(2)}>已发布</a>
            </Col>
            <Col span={4}>
              <a className={linkCss[2]} onClick={() => setSelectType(0)}>草稿</a>
            </Col>
            <Col span={4}/>
          </Row>
        </Card>
      }

      <UserArticleCard selectType={selectType} userId={targetUser.id as any}/>
    </div>
  );
};

export default Articles;
