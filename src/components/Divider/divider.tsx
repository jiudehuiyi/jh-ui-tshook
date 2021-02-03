import React from 'react';
import classnames from "classnames";

type tOrientation = "left" | "right" | "center";
type tType = "horizontal" | "vertical";
interface IDividerProps {
    className:string,
    dashed:boolean,
    orientation:tOrientation,
    plain:boolean,
    style:React.CSSProperties,
    type:tType
}


const Divider:React.FC< Partial<IDividerProps> > = ( props )=>{

    const { 
        className,style,type="horizontal",dashed,plain,orientation,children
    } = props;
    const classes = classnames("jh-divider",className,{
        [`jh-divider-${type}`]:true,
        [`jh-divider-with-text`]:!!children,
        [`jh-divider-dashed`]:dashed,
        [`jh-divider-plain`]:plain,
        [`jh-divider-with-text-${orientation}`]:true,
    });
    console.log( children )
    return (
        <div
            className={ classes }
            style={{ ...style }}
        >
            <span className="jh-divider-inner-text">{ children }</span>
        </div>
    )
}

Divider.displayName = "Divider";
export default Divider;