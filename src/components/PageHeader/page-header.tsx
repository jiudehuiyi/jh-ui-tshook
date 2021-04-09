import React, {useState, } from "react";
import classnames from "classnames";
import ResizeObserver from "rc-resize-observer";

import Breadcrumb, { BreadcrumbProps } from "../Breadcrumb/breadcrumb";
import Icon from "../Icon/icon";
interface PageHeaderProps {
    prefixCls: string;
    avatar: any;
    backIcon: React.ReactNode | boolean | string;
    breadcrumb:  BreadcrumbProps;
    breadcrumbRender: (props: any, originBreadcrumb: any) => React.ReactNode;
    extra: React.ReactNode;
    footer: React.ReactNode;
    ghost: boolean;
    subTitle: React.ReactNode;
    tags: any;
    title: React.ReactNode;
    className: string;
    style: React.CSSProperties;
    onBack: () => void;
}
interface PageHeaderInterface extends React.FC<Partial<PageHeaderProps>>{
}

const renderBreadcrumb = (breadcrumb:BreadcrumbProps) => <Breadcrumb {...breadcrumb} />
const getBackIcon = (props: Partial<PageHeaderProps>, direction:string="ltr") => {
    if(props.backIcon !== void 0) {
        if( React.isValidElement(props.backIcon) ) {
            return props.backIcon
        }else {
            console.log("33333")
            return <Icon icon={props.backIcon as any} size="lg" theme="primary" />
        }
    }
    return direction === "rtl" ? <Icon icon={"angle-left"} size="lg" theme="primary" /> : <Icon icon={"angle-right"} size="lg" theme="primary" /> 
};
const renderBack = (
    prefixCls: string,
    backIcon?: React.ReactNode,
    onBack?: (e: React.MouseEvent<HTMLElement>) => void
) =>{
    if(!backIcon) return null;

    const onAncestor = (e: React.MouseEvent<HTMLDivElement>) => {
        onBack?.(e);
    };
    return (
        <div
            className={`${prefixCls}-back`}
            onClick={ (e) => onAncestor(e) }
        >
            {
                backIcon
            }
        </div>
    )
};
const renderTitle = (
    prefixCls: string,
    props: Partial<PageHeaderProps>,
    direction:string="ltr"
) => {
    const { title, subTitle, avatar, tags, extra, onBack } = props;
    const headingPrefixCls = `${prefixCls}-heading`;
    const hasHeading = title || subTitle || extra;
    if(!hasHeading) return null;
    const backIcon = getBackIcon(props, direction);
    const backIconDom = renderBack(prefixCls, backIcon, onBack);
    const hasTitle =  backIconDom || avatar || hasHeading;
    return (
        <div className={headingPrefixCls}>
            {
                hasTitle && (
                    <div className={`${headingPrefixCls}-left`}>
                        {backIconDom}
                        {/* {avatar && <Avatar {...avatar} />} */}
                        {
                            title && (
                                <span
                                    className={`${headingPrefixCls}-title`}
                                    title={typeof title === "string" ? title : undefined}
                                >
                                    {title}
                                </span>
                            )
                        }
                        {
                            subTitle && (
                                <span
                                    className={`${headingPrefixCls}-subTitle`}
                                    title={typeof subTitle === "string" ? subTitle : undefined}
                                >
                                    {
                                        subTitle
                                    }
                                </span>
                            )
                        }
                        {
                            tags && (
                                <span
                                    className={`${headingPrefixCls}-tags`}
                                >
                                    {tags}
                                </span>
                            )
                        }

                    </div>
                )
            }
            {
                extra && <span className={`${headingPrefixCls}-extra`}>{extra}</span>
            }
        </div>
    )
};

const renderChildren = (prefixCls: string, children: React.ReactNode) => {
    return (
        <div className={`${prefixCls}-content`}> 
            {
                children
            }
        </div>
    )
};
const renderFooter = (prefixCls: string, footer: React.ReactNode) => {
    if(footer) {
        return <div className={`${prefixCls}-footer`}>{footer}</div>
    }
    return null;
};
const PageHeader:PageHeaderInterface = (props) => {

    const [compact, updateCompact] = useState(false);

    const onResize = ({width, height}: {width: number, height: number}) => {
        updateCompact(width < 768);
    }
    const {
        prefixCls = "jh-page-header", ghost = true, breadcrumb, breadcrumbRender, footer,
         className ,style, children
    } = props;
    const getDefaultBreadcrumbDom = () => {
        if((breadcrumb as BreadcrumbProps)?.routes) {
            return renderBreadcrumb(breadcrumb as BreadcrumbProps);
        }
        return null;
    };

    const defaultBreadcrumbDom = getDefaultBreadcrumbDom();


    
    const breadcrumbDom = breadcrumbRender?.(props, defaultBreadcrumbDom) || defaultBreadcrumbDom;

    const classNames = classnames(prefixCls, className, {
        [`${prefixCls}-ghost`]: !!ghost,
        [`${prefixCls}-has-breadcrumb`]: !!breadcrumbDom,
        [`${prefixCls}-compact`]: compact,
        [`has-footer`]: !!footer
    } );
    const direction = "rtl";
    return (
        <ResizeObserver 
            onResize={ onResize }
        >
            <div className={classNames} style={style}>
                {breadcrumbDom}
                {renderTitle(prefixCls, props, direction)}
                {children && renderChildren(prefixCls, children)}
                {footer && renderFooter(prefixCls, footer)}
            </div>
        </ResizeObserver>
    )
}
export default PageHeader;
