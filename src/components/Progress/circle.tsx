import React from "react";
import { Circle as RCCircle } from 'rc-progress';
import classnames from "classnames";
import { validProgress, getSuccessPercent } from "./util";
import { ProgressProps } from "./progress";

const presetPrimaryColors = {
    blue: "#1890FF",
    green: "green"
}

export interface CircleProps extends ProgressProps {
    prefixCls?: string;
    children?: React.ReactNode;
    progressStatus?: string;
}
function getPercentage({ percent, success, successPercent }: CircleProps) {
    const ptg = validProgress(percent);
    const realSuccessPercent = getSuccessPercent({ success, successPercent });
    if (!realSuccessPercent) {
      return ptg;
    }
    return [
      validProgress(realSuccessPercent),
      validProgress(ptg - validProgress(realSuccessPercent)),
    ];
  }
const getStrokeColor = ({success, strokeColor, successPercent}: CircleProps) => {
    const color = strokeColor || null;
    const realSuccessPercent = getSuccessPercent({success, successPercent});
    if(!realSuccessPercent) return color;

    return [ presetPrimaryColors.blue, color ];
};

const Circle: React.FC<CircleProps> = (props) => {
    const {
        prefixCls = "jh-progress", 
        width,
        strokeWidth,
        trailColor,
        strokeLinecap,
        gapPosition,
        gapDegree,
        type,
        children,
    } = props;
    const circleSize = width || 120;
    const circleStyle = {
      width: circleSize,
      height: circleSize,
      fontSize: circleSize * 0.15 + 6,
    } as React.CSSProperties;
    const circleWidth = strokeWidth || 6;
  const gapPos = gapPosition || (type === 'dashboard' && 'bottom') || 'top';
  const getGapDegree = () => {
    // Support gapDeg = 0 when type = 'dashboard'
    if (gapDegree || gapDegree === 0) {
      return gapDegree;
    }
    if (type === 'dashboard') {
      return 75;
    }
    return undefined;
  };
    const strokeColor = getStrokeColor(props) as string | string[] | object;
    const isGradient = Object.prototype.toString.call(strokeColor) === "[object Object]"
    const wrapperClassName = classnames(`${prefixCls}-inner`, {
        [`${prefixCls}-circle-gradient`]: isGradient
    });

    return (
        <div 
            className={wrapperClassName} 
        >
            <RCCircle
                 percent={getPercentage(props)}
                 strokeWidth={circleWidth}
                 trailWidth={circleWidth}
                 strokeColor={strokeColor}
                 strokeLinecap={strokeLinecap}
                 trailColor={trailColor}
                 prefixCls={prefixCls}
                 gapDegree={getGapDegree()}
                 gapPosition={gapPos}
            />
            {children}
        </div>
    )
}

export default Circle;