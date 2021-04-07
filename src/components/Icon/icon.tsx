import React from "react";
import { FontAwesomeIcon,FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import classnames from "classnames";

export type ThemeProps = "primary" | "secondary" | "success" | "info" | "warning" | "danger" | "light"|"dark";
//FontAwesomeIconProps内置部分属性类型
export interface IconProps extends FontAwesomeIconProps {
    theme?:ThemeProps;
   
}

const Icon:React.FC<IconProps> = (props)=>{

    const { className,theme,...restProps } = props;
    const classes = classnames(
            "icon",
            className,
            {
                [`icon-${theme}`] : theme    
            }
        )
    return (
            <FontAwesomeIcon 
                className={ classes }  
                {...restProps} 
            />
        )
}
Icon.displayName = "Icon";
export default Icon;






  
