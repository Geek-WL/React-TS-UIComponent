import React from "react";
import {fireEvent, render} from "@testing-library/react";
import Button, {ButtonProps} from "./button";

const defaultProps = {
  onClick: jest.fn()
};

const testProps: ButtonProps = {
  btnType: 'primary',
  size: 'lg',
  className: 'klass'
};

// test('our first react test case', () => {
//   const wrapper = render(<Button>Nice</Button>);
//   const element = wrapper.queryByText('Nice');
//   expect(element).toBeTruthy();
//   expect(element).toBeInTheDocument();
// });

describe('test Button component', () => {
  // test 和 it 一样
  it('should render the correct default button', () => {
    // 1.导入需要测试的Button组件
    // 2.用render方法渲染Button组件到真实的dom上
    // 3.如果渲染成功通过getByText拿到dom
    const wrapper = render(<Button {...defaultProps}>Nice</Button>);
    // const element = wrapper.queryByText('Nice'); // queryByText 与 getByText : 返回值不同
    const element = wrapper.getByText('Nice') as HTMLButtonElement;
    expect(element).toBeInTheDocument(); // 是否渲染成功在document上
    expect(element.tagName).toEqual('BUTTON'); // 是否是button标签
    expect(element).toHaveClass('btn btn-default'); // 是否有对应类名
    expect(element.disabled).toBeFalsy(); // 默认情况disabled属性应为false
    fireEvent.click(element); // 触发onClick事件(jest.fn)
    expect(defaultProps.onClick).toHaveBeenCalled(); // 判断onClick事件(jest.fn)是否调用成功
  });
  it('should render the correct component based on different props', () => {
    const wrapper = render(<Button {...testProps}>Nice</Button>);
    const element = wrapper.getByText('Nice');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('BUTTON');
    expect(element).toHaveClass('btn btn-primary btn-lg klass');
  });
  it('should render a link when btnType equals link and href is provided', () => {
    const wrapper = render(<Button btnType='link' href='#'>Link</Button>);
    const element = wrapper.getByText('Link');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('A');
    expect(element).toHaveClass('btn btn-link');
    expect(element).toHaveAttribute('href', '#');
  });
  const disabledProps = {
    disabled: true,
    onClick: jest.fn()
  };
  it('should render disabled button when disabled set to true', () => {
    const wrapper = render(<Button {...disabledProps}>Nice</Button>);
    const element = wrapper.getByText('Nice') as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('BUTTON');
    expect(element.disabled).toBeTruthy();
    expect(element).toHaveAttribute('disabled');
    fireEvent.click(element);
    expect(disabledProps.onClick).not.toHaveBeenCalled();
  })
});
