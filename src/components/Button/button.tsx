import React from "react";
import classNames from "classnames";
// export enum ButtonSize{
//   Xlarge = 'xl',
//   Large = 'lg',
//   Small = 'sm',
//   Xsmall = 'xs',
// }
// export enum ButtonType {
//   Primary = 'primary',
//   Default = 'default',
//   Danger = 'danger',
//   Warning = 'warning',
//   Success = 'success',
//   Info = 'info',
//   Dark = 'dark',
//   Link = 'link'
// }
export type ButtonSize = 'xl'|'lg'|'sm'|'xs';
export type ButtonType ='primary'|'default'|'danger'|'warning'|'success'|'info'|'dark'|'link';


interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  btnType?: ButtonType;
  children?: React.ReactNode;
  href?: string;
}

// button组件的事件
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
// a标签组件的事件
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>

// Partial函数：把所有属性变成可选属性
export type ButtonProps =  Partial<NativeButtonProps & AnchorButtonProps>
const Button: React.FC<ButtonProps> = (props) => {
  const {
    btnType,
    className,
    disabled,
    size,
    children,
    href,
    ...restProps
  } = props;
  const classes = classNames('btn', className, {
    [`btn-${btnType}`] : btnType,
    [`btn-${size}`] : size,
    'disabled': (btnType === 'link') && disabled
  });
  if (btnType === 'link' && href) {
    return (
      <a className={classes}
         href={href}
         {...restProps}>
        {children}
      </a>
    )
  } else {
    return (
      <button className={classes}
              disabled={disabled}
              {...restProps}>
        {children}
      </button>
    )
  }
};
Button.defaultProps = {
  disabled: false,
  btnType: 'default',
  size: 'lg'
};


export default Button;
