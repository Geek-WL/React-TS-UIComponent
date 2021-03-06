import React , { useState, createContext } from "react";
import classNames from "classnames";
import {MenuItemProps} from "./menuItem";

type MenuMode = 'horizontal' | 'vertical';
type SelectCallback = (selectedIndex: string) => void;
export interface MenuProps {
  defaultIndex?: string;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallback;
  defaultOpenSubmenus?: string[];
}

interface IMenuContext {
  index: string;
  onSelect?: SelectCallback;
  mode?: MenuMode;
  defaultOpenSubmenus?: string[];
}

export const MenuContext =  createContext<IMenuContext>({index:'0'});

const Menu: React.FC<MenuProps> = (props) => {
  const { className, mode, style, children, defaultIndex, onSelect, defaultOpenSubmenus } = props;
  const [currentActive, setCurrentActive] = useState(defaultIndex);
  const classes = classNames('wl-menu', className, {
    'menu-vertical': mode === 'vertical',
    // 'menu-horizontal': mode === 'horizontal'
    'menu-horizontal': mode !== 'vertical'
  });
  const handleClick = (index: string) => {
    setCurrentActive(index);
    if(onSelect) {
      onSelect(index);
    }
  };
  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : '0',
    onSelect: handleClick,
    mode,
    defaultOpenSubmenus,
  };
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const {displayName} = childElement.type;
      if(displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, {
          index: index.toString()
        })
      } else {
        // console.error('Warning: Menu has a child which is not a MenuItem component')
        console.error('警告：Menu下的子组件必须是一个MenuItem组件')
      }
    })
  };
  return (
    <ul className={classes} style={style} data-testid='test-menu'>
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
};
Menu.defaultProps = {
  mode: 'horizontal',
  defaultIndex: '0',
  defaultOpenSubmenus: []
};

export default Menu;
