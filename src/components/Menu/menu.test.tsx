import React from "react";
import { render, RenderResult,fireEvent,cleanup,wait } from "@testing-library/react";

import Menu, {MenuProps} from "./menu";
import MenuItem from "./menuItem";
import SubMenu from "./subMenu";

const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test',
};

const testVerticalProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical',
};

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled={true}>disabled</MenuItem>
      <MenuItem>abc</MenuItem>
      <SubMenu title='dropdown'>
        <MenuItem>
          drop1
        </MenuItem>
      </SubMenu>
    </Menu>
  )
};
const createStyleFile = () => {
  const cssFile: string = `
    .wl-submenu {
      display: none;
    }
    .wl-submenu.menu-opened {
      display: block;
    }
  `;
  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = cssFile;
  return style;
};


let wrapper: RenderResult,menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement;
describe('测试menu和menu-item组件', () => {
  // beforeEach: 在执行每个it之前都会执行传入的函数
  beforeEach(() => {
    wrapper = render(generateMenu(testProps));
    wrapper.container.append(createStyleFile());
    menuElement = wrapper.getByTestId('test-menu');
    activeElement = wrapper.getByText('active');
    disabledElement = wrapper.getByText('disabled')
  });
  it('应该渲染正确的menu和menu-item组件并携带正确的props', function () {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass('wl-menu test');
    // expect(menuElement.getElementsByTagName('li').length).toEqual(3);
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4);
    expect(activeElement).toHaveClass('menu-item is-active');
    expect(disabledElement).toHaveClass('menu-item is-disabled');
  });
  it('点击menu-item之后能否正确的更改活跃的index和执行相应的回调', function () {
    const thirdItem = wrapper.getByText('abc');
    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass('is-active');
    expect(activeElement).not.toHaveClass('is-active');
    expect(testProps.onSelect).toHaveBeenCalledWith('2');
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass('is-active');
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1');
  });
  it('传入mode为vertical时能否正确的展示', function () {
    cleanup();
    const wrapper = render(generateMenu(testVerticalProps));
    const menuElement = wrapper.getByTestId('test-menu');
    expect(menuElement).toHaveClass('menu-vertical');
  });
  it('当鼠标hover时 submenu应该展示',  async () => {
    expect(wrapper.queryByText('drop1')).not.toBeVisible();
    const dropdownElement = wrapper.getByText('dropdown');
    fireEvent.mouseEnter(dropdownElement);
    await wait(() => {
      expect(wrapper.queryByText('drop1')).toBeVisible();
    });
    fireEvent.click(wrapper.getByText('drop1'));
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0');
    fireEvent.mouseLeave(dropdownElement);
    await wait(() => {
      expect(wrapper.queryByText('drop1')).toBeVisible();
    });
  });
});
