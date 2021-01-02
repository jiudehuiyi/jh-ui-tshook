import React,{ useState,useContext } from "react";
import classnames from "classnames";

import Icon from "../../Icon/icon";
import {ItemProps} from "./item";
import { MenuContext,MenuContextProps } from "../menu";

export interface SubMenuClick {
    key:string,
    domEvent:React.MouseEventHandler
}

export interface SubMenuProps{
    index:string,
    className:string,
    style:React.CSSProperties,
    disabled:boolean,
    icon:React.ReactNode,
    key:string,
    popupClassName:string,
    popupOffset:[number,number],
    title:React.ReactNode,
    onTitleClick( clickObj:SubMenuClick ):void
}

const SubMenu:React.FC< Partial<SubMenuProps> > = ( props )=>{

    const {
        index,title,className,style
    } = props;
    const context = useContext<MenuContextProps>( MenuContext );
    const defaultOpenKeys = context.defaultOpenKeys as Array<string>;
    const openKeys = context.openKeys as Array<string>;
    const defaultIsOpened =  ( openKeys || defaultOpenKeys).includes(index!);
    const [menuOpen,setMenuOpen] = useState( defaultIsOpened );
    console.log( context )
    const classes = classnames("menu-item subMenu-item",className);

    const renderChildren = ()=>{
        const subMenuClasses = classnames("sub-menu",{
            "menu-open":menuOpen,
        })
        const childComponent = React.Children.map( props.children,(child,i)=>{
            const childElement = child as React.FunctionComponentElement<ItemProps>;
            if( childElement?.type?.displayName === "MenuItem"  ) {
                return React.cloneElement( childElement,{
                    index:`${index}-${i}`,
                } );
            }else {
                console.error( "Warning : SubMenu has a child with MenuItem" );
            }
        } );
        return (
            <ul className={subMenuClasses} >
                { childComponent }
            </ul>
        )

    }
    const handleClick = ()=>{
        setMenuOpen( !menuOpen );  
        context.onOpenChange!(openKeys || defaultOpenKeys);    
    }
    return (
       <li className={classes} key={index}  style={ { ...style } }>
           <div className="subMenu-title"  onClick={  ()=>handleClick()  }>
               { title }
               <Icon icon="angle-down" className={ classnames("arrow-icon",{
                   "reverse-arrow":menuOpen
               }) } />
           </div>
            {
                renderChildren()
            }

       </li>
    )

}

SubMenu.displayName = "SubMenu";
export default SubMenu;
