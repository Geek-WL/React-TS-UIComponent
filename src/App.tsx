import React, {useState} from 'react';
import Button from "./components/Button/button";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";
import Icon from "./components/Icon/icon";
import {library} from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'

import Transition from "./components/Transition/transition";

library.add(fas);

function App() {
  const [show, setShow] = useState(false);
  return (
    <div className="App" style={{padding: '20px'}}>
      <div className="button">
        <h2 style={{marginRight: '20px'}}>Button</h2>
        <Button btnType='default' style={{marginRight: '20px'}}>default</Button>
        <Button btnType='dark' style={{marginRight: '20px'}}>dark</Button>
        <Button btnType='info' style={{marginRight: '20px'}}>info</Button>
        <Button btnType='primary' style={{marginRight: '20px'}}>primary</Button>
        <Button btnType='danger' style={{marginRight: '20px'}}>danger</Button>
        <Button btnType='warning' style={{marginRight: '20px'}}>warning</Button>
        <Button btnType='success' style={{marginRight: '20px'}}>success</Button>
        <Button btnType='primary' size='xs' style={{marginRight: '20px'}}>primary-xsmall</Button>
        <Button btnType='primary' size='sm' style={{marginRight: '20px'}}>primary-small</Button>
        <Button btnType='primary' size='lg' style={{marginRight: '20px'}}>primary-large</Button>
        <Button btnType='primary' size='xl' style={{marginRight: '20px'}}>primary-xlarge</Button>
        <Button btnType='primary' disabled={true} style={{marginRight: '20px'}}>disabled</Button>
        <Button btnType='link' href='#' style={{marginRight: '20px'}}>Button-link</Button>
        <Button btnType='link' href='#' disabled={true} style={{marginRight: '20px'}}>disabled-link</Button>
      </div>
      <hr/>
      <div className="menu">
        <h2>Menu</h2>
        <div>
          <Menu defaultIndex={'2'}>
            <MenuItem>我是你爹</MenuItem>
            <MenuItem disabled={true}>我是你爹</MenuItem>
            <MenuItem>我是你爹</MenuItem>
            <MenuItem>我是你爹</MenuItem>
            <SubMenu title={'二级菜单'}>
              <MenuItem>我是你爹</MenuItem>
            </SubMenu>
          </Menu>
          <Menu mode='vertical' defaultOpenSubmenus={['4']}>
            <MenuItem>我是你爹</MenuItem>
            <MenuItem disabled={true}>我是你爹</MenuItem>
            <MenuItem>我是你爹</MenuItem>
            <MenuItem>我是你爹</MenuItem>
            <SubMenu title={'二级菜单'}>
              <MenuItem>我是你爹</MenuItem>
              <MenuItem>我是你爹</MenuItem>
            </SubMenu>
          </Menu>
        </div>
      </div>
      <div className="transition">
        <h2>Transition</h2>
        <Button onClick={e => setShow(!show)} style={{marginBottom:'10px'}}>{!show?'显示':'隐藏'}</Button>
        <Transition in={show} timeout={2000} animation={"zoom-in-bottom"} wrapper={true}>
          <Button btnType='primary' style={{marginBottom:'10px'}}>zoom-in-bottom</Button>
        </Transition>
        <Transition in={show} timeout={2000} animation={"zoom-in-left"} wrapper={true}>
          <Button style={{marginBottom:'10px'}} btnType='primary'>zoom-in-bottom</Button>
        </Transition>
        <Transition in={show} timeout={2000} animation={"zoom-in-right"} wrapper={true}>
          <Button style={{marginBottom:'10px'}} btnType='primary'>zoom-in-bottom</Button>
        </Transition>
        <Transition in={show} timeout={2000} animation={"zoom-in-top"} wrapper={true}>
          <Button style={{marginBottom:'10px'}} btnType='primary'>zoom-in-bottom</Button>
        </Transition>
      </div>
      <div className="icon">
      <Icon icon='coffee' theme={'primary'} size={'10x'}/>
      <Icon icon='coffee' theme={'primary'} size={'10x'}/>
      <Icon icon='coffee' theme={'primary'} size={'10x'}/>
      <Icon icon='angle-down' theme={'primary'} size={'10x'}/>
      <Icon icon='coffee' theme={'danger'} size={'10x'}/>
    </div>
    </div>
  );
}

export default App;
