import React from "react";
import classnames from "classnames";
import Icon from "../Icon/icon";

export interface SwitchProps {
    autoFocus?: boolean;
    checked?: boolean;
    checkedChildren?: React.ReactNode;
    className?: string;
    defaultChecked?: boolean;
    disabled?: boolean;
    loading?: boolean;
    size?: "small" | "default";
    unCheckedChildren?: React.ReactNode;
    onChange?: (checked?:boolean, event?: Event) => void;
    onClick?: (checked?:boolean, event?: Event) => void;
    style?: React.CSSProperties;
    prefixCls?: string;
}

const Switch: React.FC<SwitchProps> = (props) => {

    const {
        prefixCls = "jh-switch", checked, disabled, size, style,
        checkedChildren,  unCheckedChildren, defaultChecked, loading
    } = props;

    const switchClassName = classnames({
        [`${prefixCls}`]: true,
        [`${prefixCls}-checked`]: !!checked || defaultChecked,
        [`${prefixCls}-disabled`]: !!disabled,
        [`${prefixCls}-${size}`]: size
    })

    const _onChange = (ev) => {

        props?.onChange?.(!checked, ev);
    }
    const LoadingIcon = <Icon icon="spinner" />
    return (
        <button 
            type="button" 
            role="switch" 
            className={switchClassName}
            style={style}
            onClick={ (ev) => _onChange(ev) }
            disabled={disabled}
        >
            <div className={
                classnames({
                    [`${prefixCls}-handle`]: true,
                    [`${prefixCls}-handle-small`]: size,
                    [`${prefixCls}-handle-checked`]: !!checked || defaultChecked
                })
            }>
                <div className={`${prefixCls}-loading`}>
                    {
                       loading ? LoadingIcon : ""
                    }
                </div>
            </div>
            <span className={classnames({
                [`${prefixCls}-inner`]: true,
                [`${prefixCls}-inner-checked`]: !!checked || defaultChecked
            })}>
                {
                    (checked || defaultChecked) ? checkedChildren : unCheckedChildren
                }
            </span>
        </button>
    )
}

export default Switch;