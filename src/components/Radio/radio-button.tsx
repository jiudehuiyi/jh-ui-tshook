import React from "react";
import classnames from "classnames";

export interface RadioButtonProps{
    prefixCls?: string;
    checked?: boolean;
    defaultChecked?: boolean;
    autoFocus?: boolean;
    disabled?: boolean;
    value?: any;
    children?: string | React.ReactNode;
    name?: string;
    id?: string,
    className?: string;
    style?: React.CSSProperties;
    onChange?: (ev: React.SyntheticEvent, value: any ) => void;

    index?: string;
    buttonStyle?: string;
    _onClickRadio?: (index: string | undefined) => void;
    defaultValue?: any;
    _value?: any;
    _disabled?: boolean;
    _name?: string;
    _selected?:boolean;
    _onChange?: (ev: React.SyntheticEvent) => void; 
    _size?: "small" | "default" | "large";
}

const RadioButton: React.FC<RadioButtonProps> = (props) => {

    const {
        prefixCls = "jh-radio-button", checked, disabled, className, style,
        children, name, id, defaultChecked, autoFocus, onChange = () =>{},

        index, buttonStyle, _onClickRadio, defaultValue, value, _disabled,
        _name, _selected, _size="default"
    } = props;
    let _defaultChecked = ( defaultValue && value && defaultValue === value );
    const labelClassNames = classnames(className,{
        [`${prefixCls}-wrapper`]: true,
        [`${prefixCls}-wrapper-checked`]: _selected || _defaultChecked || !!checked,
        [`${prefixCls}-wrapper-disabled`]: _disabled || !!disabled,
        [`${prefixCls}-${_size}`]: !!_size,
    });
    const inputWrapperClassNames = classnames({
        [`${prefixCls}`]: true,
        [`${prefixCls}-checked`]: _selected || _defaultChecked || !!checked,
        [`${prefixCls}-disabled`]: _disabled || !!disabled,
        [`${prefixCls}-${buttonStyle}`]: !!buttonStyle,

    })
    const textClassNames  = classnames({
        [`${prefixCls}-text`]: true,
        [`${prefixCls}-text-checked`]:_selected || _defaultChecked || !!checked,
        [`${prefixCls}-text-disabled`]: _disabled || !!disabled,
        [`${prefixCls}-text-${buttonStyle}`]: !!buttonStyle
    })
    console.log("_size", _size)
    return (
        <label
            className={ labelClassNames }
            style={style}
            key={index}
            onClick = { () => _onClickRadio!(index) }

        >
            <span className={inputWrapperClassNames}>
                <input 
                    type="radio"
                    name={ _name || name}
                    id={id}
                    defaultChecked={ _defaultChecked || defaultChecked}
                    checked={ _selected || checked}
                    disabled={ _disabled || disabled}
                    autoFocus={autoFocus}
                    onChange={ (ev: React.SyntheticEvent) => props._onChange!(ev) }
                    style={ style }
                    className={ classnames({
                        [`${prefixCls}-input`]: true,
                        [`${prefixCls}-input-disabled`]: _disabled || !!disabled
                    }) }
                />
            </span>
            <span
                className={
                    textClassNames
                }
            >
                {children}
            </span>
        </label>
    )
}



RadioButton.displayName = "RadioButton";
export default RadioButton;
