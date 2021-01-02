import React,{ createContext,useState } from "react";
import classnames from "classnames";

import { ItemProps } from "./components/item";

export type MenuMode = "vertical" | "horizontal";
export type MenuTheme = "light" | "dark";
export type MenuTriggerSubMenuAction = "hover" | "click";

export interface MenuClick {
    item:string | React.ReactNode,
    key:string,
    domEvent:React.MouseEvent
}
export interface MenuDeselect {
    item:string,
    key:string,
    keyPath:string,
    selectedKeys:string,
    domEvent:React.MouseEvent
}
export interface MenuSelect {
    item:string,
    key:string,
    keyPath:string,
    selectedKeys:string,
    domEvent:React.MouseEvent
}
export interface MenuProps  {
    defaultIndex:string,
    defaultOpenKeys:Array<string>,
    defaultSelectedKeys:string,
    expandIcon:React.ReactNode,
    inlineCollapsed:boolean,
    inlineIndent:number,
    mode:MenuMode,
    multiple:boolean,
    openKeys:Array<string>,
    overflowedIndicator:React.ReactNode,
    selectable:boolean,
    selectedKeys:string,
    style:React.CSSProperties,
    subMenuCloseDelay:number,
    subMenuOpenDelay:number,
    theme:MenuTheme,
    triggerSubMenuAction:MenuTriggerSubMenuAction,
    className:string,
    onClick(clickObj:MenuClick):void,
    onDeselect(deselectObj:MenuDeselect):void,
    openChange(openKeys:Array<string>):void,
    onSelect(selectObj:MenuSelect):void,

}

export interface MenuContextProps {
    index?:string,
    onClick?:(clickObj:MenuClick)=>void,
    onOpenChange?:(openKeys:Array<string>)=>void,
    defaultOpenKeys?:Array<string>,
    openKeys?:Array<string>
    defaultSelectedKeys?:string,
    selectedKeys?:string,

}

export const MenuContext = createContext<MenuContextProps>({ index:"0" });

const Menu:React.FC< Partial<MenuProps> > = (props)=>{

    
    const {
        className,style,defaultIndex,mode,defaultOpenKeys,defaultSelectedKeys,openKeys,selectedKeys,
        openChange,theme
    } = props;
    const [ currentIndex,setCurrentIndex ] = useState( defaultIndex );
   
    const handleClick = (item:MenuClick)=>{
        setCurrentIndex( item?.key );
    }
    const onOpenChange = (openKeys:Array<string>)=>{
        openChange!(openKeys);
    }
   
    const passMenuContext:MenuContextProps = {
        index:currentIndex??"0",
        onClick:handleClick,
        defaultSelectedKeys:defaultSelectedKeys,
        selectedKeys:selectedKeys,

        defaultOpenKeys:defaultOpenKeys,
        openKeys:openKeys,
        onOpenChange:onOpenChange
    }
    const renderChildren = ()=>{
        return React.Children.map( props.children,(child,index)=>{
            const childElement = child as React.FunctionComponentElement<ItemProps>;
            const displayName = childElement?.type?.displayName;
            if( displayName === "MenuItem" || displayName === "SubMenu" ) {
                return React.cloneElement( childElement,{ index:index.toString() } );
            }else {
                console.error("Warning:Menu has a child which MenuItem or SubMenu");
            }
        } );
    }

    

    const classes = classnames("menu",className,{
        "menu-vertical":mode === "vertical",
        "menu-horizontal":mode === "horizontal",
        [`theme-${theme}`]:true,
    });

    return (
        <ul  
            className={classes}
            style={{ ...style }}
        >
            <MenuContext.Provider value={ passMenuContext }>
                {
                    renderChildren()
                }
            </MenuContext.Provider>
             
        </ul>
    )
}



Menu.defaultProps = {
    inlineIndent:24,
    mode:"vertical",
    multiple:false,
    selectable:true,
    subMenuCloseDelay:0.1,
    subMenuOpenDelay:0,
    theme:"light",
    triggerSubMenuAction:"hover",
    defaultIndex:"0"
}




export default Menu;
