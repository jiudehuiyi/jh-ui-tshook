import React,{ createContext } from "react";
import classnames from "classnames";

type TAlign = "top" | "middle" | "bottom";
type TJustify = 'start' | 'end' | 'center' | 'space-around' | 'space-between';


interface IRow {
    align:TAlign,
    gutter:number,
    justify:TJustify,
    wrap:boolean,
    className:string,
    style:React.CSSProperties,
}
export const RowContext = createContext<any>( null );

const Row:React.FC< Partial<IRow> > = ( props )=>{


    const { 
            gutter=0,className,style,align="top",justify="top",
            wrap=true,children,
     } = props;
    const classes = classnames("jh-row",className,{
        [`jh-${align}`]:true,
        [`jh-${justify}`]:true,
        [`jh-wrap`]:wrap,
    })
    return (

        <RowContext.Provider value={{ gutter }}>
            <div 
                style={{ ...style }}
                className={ classes }
            >
                {
                    children
                }
            </div>
        </RowContext.Provider>
        
    )
}

Row.displayName = "Row";
export default Row;
