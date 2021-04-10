import React from "react";
import RcPagination from "rc-pagination";
import classnames from "classnames";
import Icon from "../Icon/icon";
export interface PaginationProps {
    current?: number;
    defaultCurrent?: number;
    defaultPageSize?: number;
    disabled?: boolean;
    hideOnSinglePage?: boolean;
    itemRender?: (
        page?: number,
        type?: "page" | "prev"  | 'next' | 'jump-prev' | 'jump-next',
        originalElement?: React.ReactNode
    ) => React.ReactNode;
    pageSize?: number;
    pageSizeOptions?: Array<string>;
    responsive?: boolean;
    showLessItems?: boolean;
    showQuickJumper?: boolean | {goButton?: React.ReactNode};
    showSizeChanger?: boolean;
    showTitle?: boolean;
    simple?: boolean;
    size?: "default" | "small";
    total?: number;
    onChange?: (page?: number, pageSize?: number) => void;
    onShowSizeChange?: (current: number, size: number) => void; 
    className?: string;
    style?: React.CSSProperties;
    prefixCls?: string;
    prevIcon?: React.ReactNode;
    nextIcon?: React.ReactNode;
    jumpPrevIcon?: React.ReactNode;
    jumpNextIcon?: React.ReactNode;
    showAngleDouble?: boolean;
    showPrevNextJumpers?:boolean;
    showTotal?: (total: number, origin:[number, number]) => void;
}

const Pagination:React.FC<PaginationProps> = (props) => {

    const {
        prefixCls= "jh-pagination", style, className,
    } = props;

    const getIcons = () => {
        const ellipsis = <span className={`${prefixCls}-item-ellipsis`}>•••</span>
        let prevIcon = (
            <button className={`${prefixCls}-item-link`} type="button">
                {props.prevIcon || <Icon icon="angle-left" />}
            </button>
        )
        let nextIcon = (
            <button className={`${prefixCls}-item-link`} type="button">
                {props.nextIcon || <Icon icon="angle-right" />}
            </button>
        )
        let jumpPrevIcon = (
            <a className={`${prefixCls}-item-link`}>
                <div className={`${prefixCls}-item-container`}>
                    {
                        props.showAngleDouble ? 
                        (
                            props.jumpPrevIcon || <Icon icon="angle-double-left" className={`${prefixCls}-item-link-icon`} />
                        ):(
                            ellipsis
                        )
                    }
                </div>
            </a>
        )
        let jumpNextIcon = (
            <a className={`${prefixCls}-item-link`}>
                <div className={`${prefixCls}-item-container`}>
                    {
                        props.showAngleDouble ? 
                        (
                            props.jumpNextIcon || <Icon icon="angle-double-right" className={`${prefixCls}-item-link-icon`} />
                        ):(
                            ellipsis
                        )
                    }
                </div>
            </a>
        )

        return {
            prevIcon,
            nextIcon,
            jumpPrevIcon,
            jumpNextIcon
        }
        
    }

    const renderPagination = () => {
        const classNames = classnames(
            className,
        )
        const { 
            disabled, defaultCurrent = 1, current, total= 0, defaultPageSize=10,
            pageSize=10,onChange, showSizeChanger, pageSizeOptions=["10", "20","50"],onShowSizeChange,
            hideOnSinglePage=false,showPrevNextJumpers=true,showQuickJumper=false,
            showTotal
         } = props;
        return (
            <RcPagination 
                className={classNames}
                style={style}
                prefixCls={prefixCls}
                defaultCurrent={defaultCurrent}
                current = {current}
                total={total}
                defaultPageSize={defaultPageSize}
                pageSize={pageSize}
                onChange={onChange}
                showSizeChanger={showSizeChanger}
                pageSizeOptions={pageSizeOptions}
                onShowSizeChange={onShowSizeChange}
                hideOnSinglePage={hideOnSinglePage}
                showPrevNextJumpers={showPrevNextJumpers}
                showQuickJumper={showQuickJumper}
                {...getIcons()}
            />
        )
    }


    return (
        <div>
            {
                renderPagination()
            }
        </div>
    )
};
export default Pagination;

