import React from "react";
import RcRate from "rc-rate";
import "rc-rate/assets/index.css";

export interface RateProps {
    prefixCls?: string;
    allowClear?: boolean;
    allowHalf?: boolean;
    autoFocus?: boolean;
    character?: React.ReactNode | (() => React.ReactNode);
    className?: string;
    count?: number;
    defaultValue?: number;
    disabled?: boolean;
    style?: React.CSSProperties;
    tooltips?: string[];
    value?: number;
    onBlur?: () => void;
    onChange?: (value?: number) => void;
    onFocus?: () => {};
    onHoverChange?: (value: number) => void;
    onKeyDown?: (event: React.KeyboardEvent) => void;
}

const Rate: React.FC<RateProps> = (props) => {

    const {
        prefixCls = "jh-rate", count = 5, allowClear = true, allowHalf = false,
        character, className, style, defaultValue, disabled, onChange, onHoverChange	
    } = props;
    return (
        <div>
            <RcRate
                count={count}
                allowClear={allowClear}
                allowHalf={allowHalf}
                character={character}
                className={className}
                style={style}
                defaultValue={defaultValue}
                disabled={disabled}
                onChange={onChange}
                onHoverChange={onHoverChange}
            />
        </div>
    )
}
export default Rate;