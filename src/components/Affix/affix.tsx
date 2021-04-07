import React from "react";
// import classnames from "classnames";
import ResizeObserver from "rc-resize-observer";
interface IAffixProps {
    className:string,
    style:React.CSSProperties,
    offsetBottom:number,
    offsetTop:number,
    target:()=> Window | HTMLElement | null,
    onChange:()=>any,
}

const Affix:React.FC< Partial<IAffixProps> > = (props)=>{

    
    const  lazyUpdatePosition= ()=>{

    }
    const {
        className,style,
    } = props;


    return (
        <div
            style={{ ...style }}
        >
            <ResizeObserver
                onResize={() => {
                        console.log('resized!');
                        }}
                    >
                <textarea />
            </ResizeObserver>
 
        </div>
    )
}

export default Affix;