import React from "react";
import classnames from "classnames";
import omit from 'rc-util/lib/omit';

import Line from "./line";
import Circle from "./circle";
import Steps from "./steps";
import devWarning from "../_util/devWarning";
import { tuple } from "../_util/type";
import { validProgress, getSuccessPercent } from "./util";
import Icon from "../Icon/icon";
const ProgressTypes = tuple("line", "circle", "dashboard");
export type ProgressType = typeof ProgressTypes[number];
const ProgressStatuses = tuple("normal", "exception", "active", "success");
export type ProgressSize = "default" | "small";
export type StringGradients = { [percentage: string]: string };
type FromToGradients = {from: string, to: string};
export type ProgressGradient = { direction?: string } & (StringGradients | FromToGradients);

export interface SuccessProps {
    percent?: number;
    progress?: number;
    strokeColor?: number;
}

export interface ProgressProps {
    prefixCls?: string;
    className?: string;
    style?: React.CSSProperties;
    type?: ProgressType;
    percent?: number;
    format?: (percent?: number, successPercent?: number) => React.ReactNode;
    status?: typeof ProgressStatuses[number];
    showInfo?: boolean;
    strokeWidth?: number;
    strokeLinecap?: "butt" | "square" | "round";
    strokeColor?: string | ProgressGradient;
    trailColor?: string;
    width?: number;
    success?: SuccessProps;
    gapDegree?: number;
    gapPosition?: "top" | "bottom" | "left" | "right";
    size?: ProgressSize;
    steps?: number;
    successPercent?: number;
    direction?: string;
}

const Progress:React.FC<ProgressProps> = (props) => {

    const {
        prefixCls = "jh-progress", ...restProps
    } = props;

    const getPercentNumber = () => {
        const { percent = 0 } = props;
        const successPercent = getSuccessPercent(props);
        return parseInt(
            successPercent !== void 0 ? successPercent.toString() : percent.toString(),
            10
        );
    }

    const getProgressStatus = () => {
        const { status } = props;
        if( ProgressStatuses.indexOf(status!) < 0 && getPercentNumber() >= 100 ) {
            return "success";
        }
        return status || "normal";
    }
    const renderProgressInfo = (prefixCls: string, progressStatus: typeof ProgressStatuses[number]) =>{
        const { showInfo = true, format, type, percent } = props;
        const successPercent = getSuccessPercent(props);
        if(!showInfo) return null;

        let text;
        const textFormatter = format ||( (percentNumber) => `${percentNumber}%`);
        const isLineType = type === "line";
        if( format || (progressStatus !== "exception" &&  progressStatus !== "success") ){
            text = textFormatter(validProgress(percent), validProgress(successPercent));
        }else if ( progressStatus === "exception" ) {
            text = isLineType ?  <Icon icon="times" />:<Icon icon="times" /> 
        }else if( progressStatus === "success" ) {
            text = isLineType ?  <Icon icon="check" />:<Icon icon="check" /> 
        }
        return (
            <span className={`${prefixCls}-text`} title={typeof text === "string" ? text : undefined}>
                {text}
            </span>
        )
    };
    
    const renderProgress = () => {
        const {
            prefixCls = "jh-progress", className, style, type="line", steps,
            strokeColor, showInfo = true, size = "default", 
        } = props;

        const progressStatus = getProgressStatus();
        const progressInfo = renderProgressInfo(prefixCls, progressStatus);
        let progress;
        if( type === "line" ) {
            progress = steps ? (
                <Steps
                    {...props}
                    prefixCls={prefixCls}
                    steps={steps}
                    strokeColor={typeof strokeColor === "string" ? strokeColor : undefined}
                >
                    {progressInfo}
                </Steps>
            ): (
                <Line prefixCls={prefixCls} {...props}>
                    {progressInfo}
                </Line>
            )
        }else if(type === "circle" || type === "dashboard") {
            progress = (
                <Circle {...props} prefixCls={prefixCls} progressStatus={progressStatus}>
                    {progressInfo}
                </Circle>
            )
        }

        const classString = classnames(
            className,
            {
                [`${prefixCls}-show-info`]: !!showInfo,
                [`${prefixCls}-${size}`]: !!size,
                [`${prefixCls}-status-${progressStatus}`]: true
            }
        )

        return (
            <div
            {...omit(restProps, [
                'status',
                'format',
                'trailColor',
                'strokeWidth',
                'width',
                'gapDegree',
                'gapPosition',
                'strokeLinecap',
                'percent',
                'success',
                'successPercent',
              ])}
                className={classString}
                style={style}
            >
                {progress}
            </div>
        )
    }

    return (
        <div>
            {
                renderProgress()
            }
        </div>
    )
}
export default Progress;
