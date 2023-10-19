import React from 'react';
import Meta from "antd/es/card/Meta";
import {Card, List} from 'antd';


type PictureListProps = {
  data: API.Picture[]
};
const PictureList: React.FC<PictureListProps> = (data) => {

  const articles = [{
    title: "1111"
  }, {title: "2222"}]
  return (
    <>
      <List grid={{ gutter: 16, column: 6 }} dataSource={articles}  size="large"
            renderItem={(article) => (
              <Card
                hoverable
                style={{width: 240,borderRadius:8}}
                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"/>}
              >
                <Meta title="Europe Street beat" description={article.title}/>
              </Card>
            )}
      />


    </>
  )
    ;
};

export default PictureList;
