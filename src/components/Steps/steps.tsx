import React from "react";
import RCSteps from "rc-steps";
import omit from 'rc-util/lib/omit';
import classnames from "classnames";
import Icon from "../Icon/icon";
import "rc-steps/assets/index.css";
export interface StepsProps {
    type?:"default" | "navigation";
    direction?: "horizontal" | "vertical";
    current?: number;
    initial?: number;
    size?: 'default' | 'small';
    labelPlacement?: 'horizontal' | 'vertical';
    status?: "error" | "process" | "finish" | "wait";
    icons?: {finish?:React.ReactNode, error?: React.ReactNode}
    onChange?: (current: number) => void;
    className?: string;
    percent?: number;
    style?: React.CSSProperties;
}
export interface StepProps {
    title?: React.ReactNode;
    subTitle?: React.ReactNode;
    description?: React.ReactNode;
    icon?: React.ReactNode;
    status?: "error" | "process" | "finish" | "wait";
    tailContent?: React.ReactNode;
    disabled?: boolean;
    className?: string;
    style?: React.ReactNode;
}
interface StepsType extends React.FC<StepsProps> {
    Step: React.ComponentClass<any>
    // Step: React.ClassicComponentClass<any>;
}

const Steps: StepsType = (props) => {

    const prefixCls = "jh-steps";
    const { 
        style, className, direction = "horizontal", type="default", initial = 0,
        current = 0, size="small", labelPlacement = "horizontal", status = "wait",
        onChange = () => {}, children
     } = props;
     const icons = {
        finish: <Icon icon={"check-circle"} theme="primary" className={`${prefixCls}-finish-icon`}  />,
        error: <Icon icon={"check"} theme="primary"  className={`${prefixCls}-error-icon`} />
     }
     const stepsClassName = classnames(
         className,
     )
    return (
        <RCSteps
            type={type} 
            icons={icons}
            style={style}
            className={stepsClassName}
            initial={initial}
            direction={direction}
            current={current}
            size={size}
            labelPlacement={labelPlacement}
            status={status}
            onChange={  (current) => onChange!(current) }
        >
            {
                children
            }
        </RCSteps>
    )
}


Steps.Step = RCSteps.Step;

export default Steps;