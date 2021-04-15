import React, { useState } from "react";
import classnames from "classnames";
import RcCheckbox from "rc-checkbox";

interface CheckboxProps {
    prefixCls?: string;
    defaultChecked?: boolean;
    checked?: boolean | undefined;
    disabled?: boolean;
    indeterminate?: boolean;
    autoFocus?: boolean;
    onChange?: (ev:React.SyntheticEvent, checkedValue: any) =>  void;
    className?: string;
    name?: string;
    style?: React.CSSProperties;
    label?: string | React.ReactNode;
    children?: React.ReactNode;

    key?: number;
    _defaultValue?: boolean;
    _disabled?: boolean;
    _value?: boolean[];
}

const Checkbox: React.FC<CheckboxProps> = (props) => {

    const [_checked, _setChecked] = useState( props.checked || false );
    const {
        prefixCls = "jh-checkbox", label, children, className, style,
        defaultChecked = false, checked , onChange = () => {},
        disabled = false,
        key, name, _defaultValue, _disabled, _value
    } = props;
    const checkboxWrapperClassnames = classnames({
        [`${prefixCls}-wrapper`]: true,
        [`${prefixCls}-wrapper-checked`]: !!checked,
        [`${prefixCls}-wrapper-disabled`]: _disabled || disabled,
    })
    const checkboxClassName = classnames({
        className,
        [`${prefixCls}`]: true,
        [`${prefixCls}-checked`]: !!checked,
        [`${prefixCls}-disabled`]:_disabled || disabled,

    })
    const _onChange = (ev: any, _checked:any) => {
        _setChecked(!_checked);
        if( props.onChange ) {
            props?.onChange!(ev, _checked);
        }
    }
   
    return (
        <label
            className={checkboxWrapperClassnames}
            key={key}
        >
            <RcCheckbox 
                className={checkboxClassName}
                style={style}
                defaultChecked={ _defaultValue || defaultChecked}
                checked={ _checked}
                onChange = { (ev) => _onChange(ev, _checked) }
                disabled={disabled}
                name={name}
            />
           <span className={`${prefixCls}-text`}>
                {
                    label && <span>{label}</span>
                }
                {
                    children && <span>{children}</span>
                }
           </span>
        </label>
    )
}


Checkbox.displayName = "Checkbox";
export default Checkbox;