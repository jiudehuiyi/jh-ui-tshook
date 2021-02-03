import React,{ useContext,useMemo } from "react";
import classnames from "classnames";
import { RowContext } from "./Row";
interface ICol {
    flex:string | number,
    className:string,
    style:React.CSSProperties,
    offset:number,
    order:number,
    pull:number,
    push:number,
    span:number,
    xs:number | object,
    sm:number | object,
    md:number | object,
    lg:number | object,
    xl:number | object,
    xxl:number | object,

}

const Col:React.FC< Partial<ICol> > = ( props )=>{



    const {
        style,className,span,offset = 0,order=0,push=0,pull=0,children
    } = props;
    const classes = classnames("jh-col",className,{
        [`jh-span-${span}`]:true,
        [`jh-offset-${offset}`]:true,
        [`jh-push-${push}`]:true,
        [`jh-pull-${pull}`]:true
    });
    const { gutter } = useContext( RowContext );   
    let colStyle = useMemo( ()=>{
        return gutter! > 0 ?  { paddingLeft:(gutter!)/2,paddingRight:(gutter!)/2,...style } : style;
    },[gutter] );  

    return (
            <div
                className={ classes }
                style={{ ...colStyle,order:order }}
            >
                {
                    children
                }
            </div>
    )
}

Col.displayName = "Col";
export default Col;