import React, { useContext } from "react";
import classnames from "classnames";

import { MenuContext,MenuContextProps } from "../menu";

export interface ItemProps{
    danger:boolean,
    disabled:boolean,
    icon:React.ReactNode,
    key:any,
    title:string,
    className:string,
    style:React.CSSProperties,
    index:string,

}


const Item:React.FC< Partial<ItemProps> > = (props)=>{

   
    const {
        danger,disabled,icon,key,title,className,style,index,children
    } = props;
    const context = useContext<MenuContextProps>( MenuContext );
    const classes = classnames("menu-item",className,{
        [`menu-item-danger`]:danger,
        [`menu-item-disabled`]:disabled,
        [`menu-item-active`]:index ===  context.index,
        // [`menu-item-selected`]: index ===  context.selectedKeys || index === context.defaultSelectedKeys, 
    })
   
    const handleClick = (ev:React.MouseEvent)=>{
        if( !disabled  ) {
            context?.onClick!( { item:children,key:index!,domEvent:ev } );
        }
    }

    return (
        <li 
            key={key} 
            className={classes} 
            style={{  ...style }}
            onClick={ (ev:React.MouseEvent)=>handleClick(ev) }
        >
            {icon}
            {
                children
            }
        </li>
    )

}

Item.defaultProps = {
    danger:false,
    disabled:false
}
Item.displayName = "MenuItem";

export default Item;
