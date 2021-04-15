import React from "react";

interface OptionInterface {
    label?: string;
    value?: string;
    disabled?: boolean;
}

export interface CheckboxGroupProps {
    defaultValue?: boolean[];
    disabled?: boolean;
    name?: string;
    option?: string[] | OptionInterface;
    value?: boolean[];
    onChange?: (ev?: React.SyntheticEvent, checkedValue?: any) => void;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = (props) => {


    const renderChildren = (props: any) => {
        const {
            children, defaultValue, disabled, value
        } = props;
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<any>;

            const displayName = childElement?.type?.displayName;
            const {
                name, 
            } = props;
            if( displayName === "Checkbox" ) {
                return React.cloneElement(childElement, {
                    key: index,
                    name: name,
                    _defaultValue: defaultValue?.[index],
                    _disabled: disabled,
                    _value: value?.[index],
                    onChange: props.onChange
                })
            }else {
                console.error("Check-Group Component child element must be Checkbox");
            }

        });

    }
    return (
        <div>
            {
                renderChildren(props)
            }
        </div>
    )

}

export default CheckboxGroup;

