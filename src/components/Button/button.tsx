import React,{ useState } from "react";
import classnames from "classnames";

export type ButtonShape = "circle" | "round";
export type ButtonSize = "large" | "middle" | "small";
export type ButtonType = "primary" | "ghost" | "dashed" | "link" | "text" | "default";
export type ButtonHtmlType = "submit" | "button" | "reset";


interface BaseButtonProps {
    className?:string;
    block?:boolean;
    danger?:boolean;
    disabled?:boolean;
    ghost?:boolean;
    href?:string;
    htmlType: ButtonHtmlType;
    icon?:React.ReactNode;
    loading?:boolean | { delay?:number };
    shape?:ButtonShape;
    size?:ButtonSize;
    target?:string;
    btnType?:ButtonType;
    children?:React.ReactNode;
    onClick?:()=>void;
}

//标签类型组合
export type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>;
//button标签组合
export type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
//加Partial的原因是因为AnchorButtonProp和NativeButtonProps是可能发生类型冲突
export type ButtonProps = Partial<AnchorButtonProps & NativeButtonProps>;

const Button:React.FC<ButtonProps> = (props)=>{


    const [clicked,setClicked] = useState<boolean>( false );

    //解构属性
    const {
        className,block,danger,disabled,ghost,href,htmlType,icon,loading,shape,size,
        btnType  ,children,...restProps
    } = props;
    const iconNode = icon ? icon : null;

    //合并类名，为所传得属性调整为相应得样式,
    //prefixCls为定义常规属性，className为外部传入的类名,{}则为传入的props属性需要改变对应的样式
    const prefixCls = "btn";
    const classes = classnames(prefixCls,className,{
        [`btn-${btnType}`]:btnType,
        [`btn-${size}`]:size,
        [`btn-block`]:block,
        [`btn-danger`]:danger,
        [`btn-disabled`]:disabled,
        [`btn-${shape}`]:shape
    })

    const handleClick:React.MouseEventHandler< HTMLButtonElement | HTMLAnchorElement  > = (e)=>{
        //防止fast-click类似于fastclick.js
        let timer
        setClicked( true );
        clearTimeout( timer  );
        timer = window.setTimeout( ()=>setClicked(false),500 );

        const onClick = props.onClick;
        if( onClick ) {
            (onClick as React.MouseEventHandler< HTMLButtonElement | HTMLAnchorElement > )(e);
        }
    }


    //判断是a标签还是button标签
    if(  btnType === "link" && href ) {
        return (
            <a
                className={classes}
                href={href}
                onClick={ (ev)=>handleClick(ev) }
                {...restProps}
            >
                {
                    children
                }
            </a>
        )
    }else {
        return (
            <button
                className={classes}
                disabled={disabled}
                type={ htmlType || "button" }
                onClick={ (ev)=>handleClick(ev) }
                {...restProps}
            >
               {iconNode} {children}
            </button>
        )
    }  
}

Button.defaultProps = {
    disabled:false,
    btnType:"default",
    size:"middle",
    block:false,
    danger:false,
}

export default Button;


//暂缺loading和icon属性