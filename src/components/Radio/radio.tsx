import React from "react";
import classnames from "classnames";

export interface RadioInterface {

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

    index?: string
    buttonStyle?: string;
    _onClickRadio?:(index: string | undefined) => {},
    defaultValue?: any;
    _value?: any;
    _disabled?: boolean;
    _name?: string;
    _selected?: boolean;
    _onChange?: (ev: React.SyntheticEvent | undefined) => void;
}

const Radio: React.FC<RadioInterface> = (props) => {


    const {
        prefixCls = "jh-radio", children, name, id, defaultChecked = false, style,
        className ,checked, disabled = false, autoFocus = false, onChange = () =>{} ,
        index, buttonStyle, _onClickRadio, defaultValue, value,
        _disabled, _name, _selected
    } = props;
    let _defaultChecked = ( defaultValue && value && defaultValue === value );

    const classNames  = classnames( 
            className,
           {
            [`${prefixCls}-defaultChecked`]: _defaultChecked || !!defaultChecked,
            [`${prefixCls}-checked`]: _selected || _defaultChecked || !!checked,
            [`${prefixCls}-disabled`]: _disabled || !!disabled,
            [`${prefixCls}-autoFocus`]: !!autoFocus,
            [`${prefixCls}-${buttonStyle}`]: !!buttonStyle
           }

         );
    return (
        <label 
            key={index} 
            className={`${prefixCls}-wrapper`}
            onClick = { () => _onClickRadio!(index) }
        >
            <span  
                className={classNames}             
            >
                <input 
                    type="radio"
                    name={_name || name}
                    id={id}
                    defaultChecked={ _defaultChecked || defaultChecked}
                    checked={_selected || checked}
                    disabled={ _disabled || disabled}
                    autoFocus={autoFocus}
                    // onChange={ (ev) => onChange(ev, { value: children, checked: !checked,disabled ,defaultChecked}) }
                    onChange={ (ev: React.SyntheticEvent) => props._onChange!(ev) }
                    style={ style }
                    className={ classnames({
                        [`${prefixCls}-input-disable`]: _disabled || !!disabled
                    }) }
                />
            </span>
            <span className={ classnames({
                [`${prefixCls}-text`]: true,
                [`${prefixCls}-text-disable`]: _disabled || !!disabled
            }) }>
                {
                    children
                }
            </span>
        </label>
    )
}

Radio.displayName = "Radio";

export default Radio;