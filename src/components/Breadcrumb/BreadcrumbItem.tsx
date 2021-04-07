import React from "react";

export interface BreadcrumbProps {
    prefixCls?: string;
    separator?: React.ReactNode;
    href?: string;
    overlay?: any;
    dropdownProps?: any;
    onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLSpanElement>;
    className?: string
}

export interface BreadcrumbInterface extends React.FC<BreadcrumbProps>{
    _JH_BREADCRUMB_ITEM: boolean
}

const BreadcrumbItem: BreadcrumbInterface = ({
    separator = "/",
    children,
    overlay,
    dropdownProps,
    ...restProps
}) => {

    const renderBreadcrumbNode = (breadcrumbItem: React.ReactNode) => {
        //这一块等到有DropDown组件再显示
        // if(overlay){
        //     return (
        //         <DropDown overlay={overlay} placement={"bottomCenter"} {...dropdownProps} >
        //             <span className="overlay-link">
        //                 {breadcrumbItem}
        //                 <DownOutlined />
        //             </span>
        //         </DropDown>
        //     )
        // };

        return breadcrumbItem;
    }

    let link;
    if( "href" in restProps ){
        link = (
            <a className="link" {...restProps}>
                {children}
            </a>
        )
    }else {
        link = (
            <span className="link" {...restProps}>
                {children}
            </span>
        )
    }
    link = renderBreadcrumbNode(link);

   if(children){
       return (
           <span>
               {link}
               {
                   separator && separator !== "" && (
                    <span className="separator">{separator}</span>
                   )
               }
           </span>
       )
   }
   return null;
}

BreadcrumbItem._JH_BREADCRUMB_ITEM = true;
export default BreadcrumbItem;

