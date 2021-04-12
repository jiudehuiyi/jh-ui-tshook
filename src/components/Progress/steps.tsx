import React from "react";
import classnames from "classnames";
import { ProgressProps, ProgressSize } from "./progress";

export interface StepsProps extends ProgressProps {
    steps: number;
    size?: ProgressSize;
    strokeColor?: string;
    trailColor?: string;
}

const Dashboard:React.FC<StepsProps> = (props) => {
    const { 
        prefixCls="jh-progress", children, steps, percent = 0,
        size = "default", strokeColor, trailColor, strokeWidth = 8
     } = props;

     const current = Math.round( steps * (percent / 100) );
     const stepWidth = size === "small" ? 2 : 14;
     const styledSteps = [];
     for(let i = 0; i < steps; i++){
         styledSteps.push(
             <div
                key={i}
                className={
                    classnames(
                        `${prefixCls}-steps-item`,
                        {[`${prefixCls}-steps-item-active`]: i <= current - 1}
                        )
                }
                style={{
                    backgroundColor: i <= current - 1 ?  strokeColor : trailColor,
                    width: stepWidth,
                    height: strokeWidth
                }}
             >

             </div>
         );
     }

    return (
        <div className={`${prefixCls}-steps-outer`}>
            {styledSteps}
            {children}
        </div>
    )
}

export default Dashboard;