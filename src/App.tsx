import React from 'react';

import Button from "./components/Button/button";

function App() {
  return (
    <div className="App">
      <Button>原始按钮</Button>
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
