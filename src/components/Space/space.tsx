import React from "react";
import classnames from "classnames";

type TAlign = "start" | "end" | "center" | "baseline";
type TDirection = "vertical" | "horizontal";
type TSize = "small" | "middle" | "large";
interface ISpaceProp  {
    align:TAlign,
    direction:TDirection,
    size:TSize | number,
    split:React.ReactNode,
    wrap:boolean,
    className:string,
    style:React.CSSProperties
}
interface IMarginRight{
    marginRight:string,
    marginBottom?:string,
}
interface IMarginBottom {
    marginBottom:string
}



const Space:React.FC< Partial<ISpaceProp> > = (props)=>{

    const { align,direction="horizontal",size="small",split,wrap=false,className,style,children } = props;
    const classes = classnames("jh-space",className,{
        [`jh-space-${direction}`]:true,
        [`jh-space-${size}`]:true,
        [`jh-space-${align}`]:true,
        [`jh-space-wrap`]: wrap && direction === "horizontal"
    })

    const renderChildren = ()=>{
        return React.Children.map( props.children,(child,index)=>{
            let childElement = child;
            let sizeType = typeof parseInt(size as any,10);
            let spaceItemStyle = {};
            if( sizeType === "number" ) {
                if( direction === "horizontal" ) {
                    ( spaceItemStyle as  IMarginRight)["marginRight"] = size + "px";
                    ( spaceItemStyle as  IMarginRight)["marginBottom"] = wrap ? 8 + "px":"0px";
                }else if( direction === "vertical" ){
                    ( spaceItemStyle as IMarginBottom )["marginBottom"] = size + "px";
                }else {
                    console.error("size property only exist 'horizontal' or 'vertical' ");
                }
            }else {
                console.error("size support only string or number ");
            }
            if( childElement ) {
                return React.cloneElement(
                    childElement as any,
                    { className:`jh-space-item jh-space-${size}`,style:spaceItemStyle}
                )
            }else {
                console.error("Space component must exist children");
            }

        } );
    }
    return (
        <div
            style={{ ...style }}
            className={ classes }
        >
            {
               split ? renderChildren()!.map( (item,index)=>{
                    return (
                        <div key={index}>
                            {item}
                            {
                               direction==="horizontal" ? (
                                <span className={`jh-space-split-${size}`}>{split}</span>
                               ) :(
                                   <div  className={`jh-space-split-vertical-${size}`} >{split}</div>
                               )
                            }
                            
                        </div>
                    )
                } ) : renderChildren()
            }
            {/* {
                renderChildren()
            } */}
        </div>
    )
}

Space.displayName = "Space";
export default Space;