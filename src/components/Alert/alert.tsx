import React,{ useState,useCallback } from "react";
import classnames from "classnames";
import Icon from "../Icon/icon";
import TextLoop from 'react-text-loop';

type typeEnum = "success" | "info" | "warning" | "error";

interface IAlertProps {
    action:React.ReactNode,
    afterClose:()=>void,
    closable:boolean,
    closeText:React.ReactNode | string,
    description:React.ReactNode | string,
    icon:React.ReactNode,
    message:React.ReactNode | string,
    showIcon:boolean,
    type:typeEnum,
    onClose:( e:React.MouseEvent )=>void,
    loopMessage:Array<string>,
    style:React.CSSProperties,
    className:string,
}
enum IconType  {
    "success"="check-circle",
    "info"="exclamation-circle",
    "warning"="exclamation-circle",
    "error"="window-close"
}
enum IconColor {
    "success"="#52C41A",
    "info"="#1890FF",
    "warning"="#FAAD14",
    "error"="#FF4D4F"
}

const Alert:React.FC< Omit<Partial<IAlertProps>,"message"> & { message:string | React.ReactNode } > = (props)=>{


    const [ closed,setClosed ] = useState<boolean>(false);

    const closeComponent = useCallback((e:React.MouseEvent)=>{
        setClosed( true );
        const onClose = props.onClose;
        ( onClose! as React.MouseEventHandler )?.( e );
        const afterClose = props.afterClose;
        afterClose?.();
    },[])

    const renderLoopMessage = (loopMessage:Array<string | undefined>)=>{
        return loopMessage.map( (item:string | undefined,index:number)=>{
            return (
                <div key={ index }>
                    {
                        item
                    }
                </div>
            )
        } );
    }

    const { 
        className,style,message,type="warning",
        closable, description,showIcon,closeText,
        loopMessage=[],
    } = props;
    const renderLoopMessageData = renderLoopMessage(loopMessage);
    const classes = classnames( "jh-alert",className,{
        [`jh-${type}`]:true,
    } )
    if( !!closed ) return null;
    return  ( 
        <div
            className={ classes }
            style={{ ...style }}
        >  
            {
                !!closable &&
                (
                    
                closeText 
                ? <div 
                    className="jh-alert-closable"
                    onClick={ ( e )=>closeComponent(e) }
                >{closeText}</div> 
                :<div 
                    className="jh-alert-closable"
                    onClick={ ( e )=>closeComponent(e) }
                >
                    <Icon  icon="times" />
                </div>
                )
            }
            {
                !!showIcon && 
                <Icon  icon={ IconType[type] }  style={{ color:IconColor[type] }}/> 
            }
            <div>
            </div>
            <div>
                
                {
                     renderLoopMessageData.length > 0 
                     ? (
                         <TextLoop mask>
                             {
                                 renderLoopMessageData.map( (item)=>{
                                     return item
                                 } )
                             }
                         </TextLoop>
                     )
                     :message                   
                }
            </div>
            <div>
                {
                    description
                }
            </div>
        </div>
    )
}

Alert.displayName = "Alert";
export default Alert;
