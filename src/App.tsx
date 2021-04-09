import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import {  fas } from '@fortawesome/free-solid-svg-icons'


import Button from "./components/Button/button";
import Icon from "./components/Icon/icon";
import Menu from "./components/Menu/menu";
import Item from "./components/Menu/components/item";
import SubMenu from "./components/Menu/components/subMenu";
import Alert from "./components/Alert/alert";

import Row from "./components/Grid/Row";
import Col from "./components/Grid/Col";
import Grid from "./components/Grid/grid";
import Divider from "./components/Divider/divider";
import Space from "./components/Space/space";

import Breadcrumb from "./components/Breadcrumb/breadcrumb";
import BreadcrumbItem from "./components/Breadcrumb/BreadcrumbItem";
import PageHeader from "./components/PageHeader/page-header";
library.add( fas );//添加所有种类的图标(不用一个个的进行引入)

function App() {

 
  const routes = [
    {
      path: 'index',
      breadcrumbName: 'First-level Menu',
    },
    {
      path: 'first',
      breadcrumbName: 'Second-level Menu',
    },
    {
      path: 'second',
      breadcrumbName: 'Third-level Menu',
    },
  ];

  return (
    <div className="App">
       
      <Button>原始按钮</Button>
      <PageHeader  title="PageHeader" subTitle={"subTitle"} tags={"tags"} extra={[<span>111</span>,<span>2222</span>]} ghost={true} breadcrumb={{ "routes":routes }}  ></PageHeader>
      <Breadcrumb  routes={[
          {
            path: 'search/products',
            breadcrumbName: '搜索'
          },
          {
            path: 'goods-details',
            breadcrumbName: '商品详情'
          },
        ]}>
        <BreadcrumbItem>1111</BreadcrumbItem>
        <BreadcrumbItem>222</BreadcrumbItem>
        <BreadcrumbItem>333</BreadcrumbItem>
      </Breadcrumb>
      <Icon 
        icon='coffee' 
        theme="primary"
      />
      <Row gutter={10}>
        <Col span={8} >1111</Col>
        <Col span={8} pull={3}>222</Col>
        <Col span={8}>333</Col>
      </Row>
      <Grid.Row>
        <Grid.Col>1111</Grid.Col>
        <Grid.Col>1111</Grid.Col>
        <Grid.Col>1111</Grid.Col>

      </Grid.Row>
      <Divider orientation="left">Text</Divider>
      <Divider orientation="right">Text</Divider>

      <Divider dashed={true}>
      </Divider>

      <Space 
        direction="vertical"
        // size="large"
        // size={100}
        wrap={true}
        split={ "|" }
      >
        <Button btnType="primary">space1</Button>
        <Button btnType="primary">space2</Button>
        <Button btnType="primary">space3</Button>
        <Button btnType="primary">space4</Button>
        <Button btnType="primary">space1</Button>
        <Button btnType="primary">space2</Button>
        <Button btnType="primary">space3</Button>
        <Button btnType="primary">space4</Button>
        <Button btnType="primary">space1</Button>
        <Button btnType="primary">space2</Button>
        <Button btnType="primary">space3</Button>
        <Button btnType="primary">space4</Button>
      </Space>

      {/* <Menu 
        mode="vertical"  
        // mode="horizontal"
        style={{ width:"200px" }} 
        defaultOpenKeys={ ["0","1"] }
        openKeys={ ["0","2"] }
        defaultSelectedKeys="0-1"
      >
        <SubMenu title="title1" key="2222">
          <Item key={"1"} >1111</Item>
          <Item danger={true} key={"2"}>2222</Item>
          <Item disabled={true} key={"3"}>3333</Item>
        </SubMenu>

        <SubMenu title="title2">
          <Item key={"1"} >444</Item>
          <Item danger={true} key={"2"}>5555</Item>
          <Item disabled={true} key={"3"}>6666</Item>
        </SubMenu>

        <SubMenu title="title3">
          <Item key={"1"} >777</Item>
          <Item danger={true} key={"2"}>888</Item>
          <Item disabled={true} key={"3"}>999</Item>
        </SubMenu>
      </Menu> */}

      <Alert  message="message"  closable={true} onClose={ ()=>console.log(22222) } closeText="closeText"  description="Error Description Error Description Error Description Error Description"/>
      <Alert type="success"  message="message" closeText="closeText"  description="Error Description Error Description Error Description Error Description" />
      <Alert type="info" message={"info" } loopMessage={[ "aaa","bbb" ]} />
      <Alert type="error" message="message" />

     <Button btnType="default" size="small" danger={true} disabled={true}  shape="circle">default</Button>
     <Button btnType="primary" size="middle" danger={true} disabled={true} shape="round"  >primary</Button>
     <Button btnType="dashed" size="large">dashed</Button>
     <Button btnType="text">text</Button>
     <Button btnType="ghost">ghost</Button>
     <Button btnType="link">link</Button>

    </div>
  );
}

export default App;
