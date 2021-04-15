import React, { useState } from "react";
import classnames from "classnames";
import devWarning from "../_util/devWarning";

type OptionType = Array<{label?: string | undefined, value?: string |undefined , disabled?: boolean | undefined}>

export interface RadioGroupProps {
    prefixCls?: string;
    buttonStyle?: "outline" | "solid";
    defaultValue?: any;
    disabled?: boolean;
    name?: string;
    options?: string[] | OptionType;
    optionType?: "default" | "button";
    size?: "large" | "default" | "small";
    value?: any;
    onChange?: (ev: React.SyntheticEvent ) => void;
    className?: string;
    children?: any
}

const RadioGroup: React.FC<RadioGroupProps> = (props) => {

    const [selected, setSelected] = useState(-1); 

    const _onClickRadio = (index: string) => {
        if( selected.toString() !== index ) {
            setSelected( parseInt(index, 10 ) );
        }
    }
    const renderChild = (props: RadioGroupProps) => {
        return React.Children.map(props.children, (child, index)=>{
            const childElement = child as React.FunctionComponentElement<any>;

            const displayName = childElement?.type?.displayName;
            if(!childElement) {
                devWarning(
                    true,
                    "RadioGroup",
                    "Component exist not children"
                )
            }
            let _optionValue, _optionLabel, _optionDisabled;
            if(props?.options?.length! > 0) {
                if(Object.prototype.toString.call(props?.options![0]) === "[object Object]") {
                    _optionValue = (props?.options?.[index] as any).value;
                    _optionLabel = (props?.options?.[index] as any).label;
                    _optionDisabled = (props?.options?.[index] as any).value;

                }else {
                    _optionValue = props?.options![index];
                }
            }

            if( displayName === "Radio" ) {
               return React.cloneElement(childElement,{
                   index: index.toString(),
                   buttonStyle: props.buttonStyle || "outline",
                   _onClickRadio:_onClickRadio,
                   defaultValue: props.defaultValue,
                   _value:  _optionValue || (props.value),
                   _onChange: props.onChange || (() => {}),
                    _disabled: _optionDisabled || props.disabled,
                    _name: props.name,
                    _selected: selected === index,
               });
            }else if(displayName === "RadioButton") {
                return React.cloneElement(childElement,{
                    index: index.toString(),
                    buttonStyle: props.buttonStyle || "outline",
                    _onClickRadio:_onClickRadio,
                    defaultValue: props.defaultValue,
                    _value: _optionValue|| props.value,
                   _onChange: props.onChange || (() => {}),
                    _disabled: _optionDisabled || props.disabled,
                    _name: props.name,
                    _selected: selected === index,
                    _size: props.size
                });
            }else {
                console.error("Radio-Group Component child element must be Radio or Radio-button");
            }

        });
    };

    const {
        buttonStyle = "outline", prefixCls = "jh-radio-group"
    } = props;
    const radioGroupClassNames = classnames(
        {
            [`${prefixCls}`]: true,
            [`${prefixCls}-${buttonStyle}`]: !!buttonStyle
        }
    )
    return (
        <div className={radioGroupClassNames}>
            {
                renderChild(props)
            }
        </div>
    )
}
export default RadioGroup;