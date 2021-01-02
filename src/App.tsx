import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import {  fas } from '@fortawesome/free-solid-svg-icons'


import Button from "./components/Button/button";
import Icon from "./components/Icon/icon";
import Menu from "./components/Menu/menu";
import Item from "./components/Menu/components/item";
import SubMenu from "./components/Menu/components/subMenu";
library.add( fas );//添加所有种类的图标(不用一个个的进行引入)

function App() {
  return (
    <div className="App">
       
      <Button>原始按钮</Button>
      <Icon 
        icon='coffee' 
        theme="primary"
      />
      

      <Menu 
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
      </Menu>
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
