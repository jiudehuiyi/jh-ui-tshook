import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import {  fas,faCoffee } from '@fortawesome/free-solid-svg-icons'


import Button from "./components/Button/button";
import Icon from "./components/Icon/icon";

library.add( fas );//添加所有种类的图标(不用一个个的进行引入)

function App() {
  return (
    <div className="App">
       
      <Button>原始按钮</Button>
      <Icon 
        icon='coffee' 
        theme="primary"
      />
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
