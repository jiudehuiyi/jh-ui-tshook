import React from "react";
import classnames from "classnames";
import toArray from "rc-util/lib/Children/toArray";

import Menu from "../Menu/menu";
import MenuItem from  "../Menu/components/item";
import BreadcrumbSeparator from "./BreadcrumbSeparator";
import BreadcrumbItem from "./BreadcrumbItem";
import { cloneElement } from "../_util/reactNode";
import devWarning from "../_util/devWarning";

export interface Route {
    path: string;
    breadcrumbName: string;
    children?: Array<any>;
}

export interface BreadcrumbProps {
    prefixCls?: string; 
    routes?: Route[];
    params?: any;
    separator?: React.ReactNode;
    itemRender?: (
        route: Route,
        params: any,
        routes: Array<Route>,
        paths: Array<string>,
    ) => React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
}

interface BreadcrumbInterface extends React.FC<BreadcrumbProps>{
    Item?: typeof BreadcrumbItem;
    Separator?: typeof BreadcrumbSeparator;
}


const getPath = (path: string, params: any) => {
    path = (path || "").replace(/^\//, "");
    Object.keys(params).forEach( key => {
        path = path.replace(`:${key}`, params[key]);
    } );
    return path;    
};
const addChildPath = (paths: string[], childPath: string = '', params: any) => {
    const originalPaths = [...paths];
  const path = getPath(childPath, params);
  if (path) {
    originalPaths.push(path);
  }
  return originalPaths;
}
function getBreadcrumbName(route: Route, params: any) {
    if (!route.breadcrumbName) {
      return null;
    }
    const paramsKeys = Object.keys(params).join('|');
    const name = route.breadcrumbName.replace(
      new RegExp(`:(${paramsKeys})`, 'g'),
      (replacement, key) => params[key] || replacement,
    );
    return name;
  }
function defaultItemRender(route: Route, params: any, routes: Route[], paths: string[]) {
    const isLastItem = routes.indexOf(route) === routes.length - 1;
    const name = getBreadcrumbName(route, params);
    return isLastItem ? <span>{name}</span> : <a href={`#/${paths.join('/')}`}>{name}</a>;
  }


const Breadcrumb: BreadcrumbInterface = ({
    prefixCls="",
    separator = "/",
    style,
    className,
    routes=[],
    children,
    itemRender = defaultItemRender,
    params={},
    ...restProps
}) => {

    let crumbs;
    if( routes?.length > 0 ) {

        const paths: string[] = [];
        crumbs = routes.map( route => {
            const path = getPath(route.path, params);

            if( !!path ) {
                paths.push( path );
            }

            let overlay;
            if( !!route?.children?.length ) {
                overlay = (
                    <Menu>
                        {
                            route.children.map( child => {
                                return (
                                    <MenuItem key={child.path || child.breadcrumbName}>
                                        { itemRender(child, params, routes, addChildPath(paths, child.path, params)) }
                                    </MenuItem>
                                )
                            } )
                        }
                    </Menu>
                )
            }
            return (
                <BreadcrumbItem overlay={ overlay } separator={separator} key={path || route.breadcrumbName}>
                    {itemRender(route, params, routes, paths)}
                </BreadcrumbItem>
            )
        } )
        

    }else if( children ) {
        crumbs = toArray(children).map( (element:any, index) => {
            if( !element ) return element;
            devWarning(
                true,
                'Breadcrumb',
                "Only accepts Breadcrumb.Item and Breadcrumb.Separator as it's children",
              );

              return cloneElement( element, {
                  separator,
                  ey: index,
              } );
        } )
    }else {
        devWarning(
            true,
            'Breadcrumb',
            "must be had routes params or children",
          );
    }



    const breadcrumbClassName = classnames(
        prefixCls,
        className
    ) 

    return (
        <div style={style} className={breadcrumbClassName} {...restProps}>
            {
                crumbs
            }
        </div>
    )
}

Breadcrumb.Item = BreadcrumbItem;
Breadcrumb.Separator = BreadcrumbSeparator;

export default Breadcrumb;