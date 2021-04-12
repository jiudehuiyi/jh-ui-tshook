import React from "react";
import { ProgressGradient, ProgressProps, StringGradients } from "./progress";
import { validProgress, getSuccessPercent } from "./util";

export interface LineProps extends ProgressProps {
    prefixCls?: string;
    direction?: string;
    children?: React.ReactNode;
}
const presetPrimaryColors = {blue:"#1890FF" };

export const sortGradient = (gradients: StringGradients) => {
    let tempArr: any[] = [];
    Object.keys(gradients).forEach( key => {
        const formattedKey = parseFloat(key.replace(/%/g, ""));
        if(!!isNaN(formattedKey)) {
            tempArr.push({
                key: formattedKey,
                value: gradients[key]
            });
        }
    } ); 
    tempArr = tempArr.sort( (a, b) => a.key - b.key );
    return tempArr.map( (key, value) => `${value} ${key}%` ).join(", ");
};

const handleGradient = (strokeColor: ProgressGradient, direction: string) => {
    const {
        from = presetPrimaryColors.blue,
        to = presetPrimaryColors.blue,
        ...rest
    } = strokeColor;
    if( Object.keys(rest).length !== 0 ) {
        const sortedGradients = sortGradient( rest as StringGradients );
        return { backgroundImage: `linear-gradient(${direction} ${sortedGradients})`  }
    }
    return { backgroundImage: `linear-gradient(${direction}, ${from}, ${to})` };
};

const Line: React.FC<LineProps> = (props) => {


    const {
        prefixCls = "jh-progress", children, trailColor, percent, strokeWidth,
        size = "default", strokeLinecap, strokeColor, success, direction = "to right"
    } = props;
    const backgroundProps = strokeColor && typeof strokeColor !== "string" ? 
    handleGradient(strokeColor, direction)
    :{ backgroundColor: strokeColor }
    const trailStyle = trailColor ? {
        backgroundColor: trailColor
    } : undefined;

    const percentStyle = {
        width: `${validProgress(percent)}%`,
        height: strokeWidth || ( size === "default" ? 8 : 6 ),
        borderRadius: strokeLinecap === "square" ? 0 : "",
        ...backgroundProps, 
    } as React.CSSProperties;

    const successPercent = getSuccessPercent(props);
    const successPercentStyle = {
        width: `${validProgress(successPercent)}%`,
        height: strokeWidth || ( size === "default" ? 8 : 6 ),
        borderRadius: strokeLinecap === "square" ? 0 : "",
        backgroundColor:strokeColor || success?.strokeColor
    } as React.CSSProperties;

    const successSegment = successPercent !== undefined ? (
        <div className={`${prefixCls}-success-bg`} style={successPercentStyle} />
    ) : null
    return (
        <div>
            <div className={`${prefixCls}-outer`}>
                <div className={`${prefixCls}-inner`} style={ trailStyle }>
                    <div className={`${prefixCls}-bg`} style={percentStyle}>
                        {
                            successSegment
                        }
                    </div>
                </div>
            </div>
            {
                children
            }
        </div>
    )
}
export default Line;