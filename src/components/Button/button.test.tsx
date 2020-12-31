import React from "react";
import { render,fireEvent } from "@testing-library/react"

import Button,{ButtonProps} from "./button";


const defaultProps:ButtonProps = {
    onClick:jest.fn()
}
const primaryProps:ButtonProps = {
    btnType:"primary",
    onClick:jest.fn()
}
const dashedProps:ButtonProps = {
    btnType:"dashed",
    onClick:jest.fn()
}
const ghostProps:ButtonProps = {
    btnType:"ghost",
    onClick:jest.fn()
}
const linkProps:ButtonProps = {
    btnType:"link",
    onClick:jest.fn()
}
const textProps:ButtonProps = {
    btnType:"text",
    onClick:jest.fn()
}
const disabledProps:ButtonProps = {
    disabled:true,
}

describe("test Button Component",()=>{

    it("should render button component with default props",()=>{
        const wrapper = render( <Button {...defaultProps}>default-btn</Button> );
        const element = wrapper.getByText("default-btn") as HTMLButtonElement;
        expect(element).toBeInTheDocument();
        expect(element.tagName).toEqual("BUTTON");
        expect(element).toHaveClass("btn btn-default");
        expect(element.disabled).toBeFalsy();
        fireEvent.click(element);
        expect(defaultProps.onClick).toHaveBeenCalled();
    })

    it("should render button component with primary props",()=>{
        const wrapper = render( <Button {...primaryProps}>primary-btn</Button> )  ;
        const element = wrapper.getByText("primary-btn") as HTMLButtonElement;
        expect(element).toBeInTheDocument();
        expect(element).toHaveClass("btn btn-primary ");
        fireEvent.click(element);
        expect( primaryProps.onClick).toHaveBeenCalled();
    })

    it("should render button component with dashed props",()=>{
        const wrapper = render( <Button {...dashedProps}>dashed-btn</Button> );
        const element = wrapper.getByText("dashed-btn") as HTMLButtonElement;
        expect(element).toBeInTheDocument();
        expect(element).toHaveClass("btn btn-dashed");
        fireEvent.click(element);
        expect( dashedProps.onClick ).toHaveBeenCalled();
    })
    it("should render button component with ghost",()=>{
        const wrapper = render( <Button {...ghostProps}>ghost-btn</Button> );
        const element = wrapper.getByText( "ghost-btn" ) as HTMLButtonElement;
        expect(element).toBeInTheDocument();
        expect(element).toHaveClass("btn btn-ghost")
        fireEvent.click(element);
        expect( ghostProps.onClick ).toHaveBeenCalled();
    })
    it("should render button component with link",()=>{
        const wrapper = render( <Button {...linkProps}>link-btn</Button> );
        const element = wrapper.getByText("link-btn") as HTMLButtonElement;
        expect(element).toBeInTheDocument();
        expect(element).toHaveClass("btn btn-link");
        fireEvent.click(element);
        expect(linkProps.onClick).toHaveBeenCalled();
    })
    it("should render button component with text",()=>{
        const wrapper = render(<Button {...textProps}>text-btn</Button>);
        const element = wrapper.getByText("text-btn") as HTMLButtonElement;
        expect(element).toBeInTheDocument();
        expect(element).toHaveClass("btn btn-text")
        fireEvent.click(element);
        expect(textProps.onClick).toHaveBeenCalled();
    })
    it("should render button component with disabled props",()=>{
        const wrapper = render(<Button {...disabledProps}>disabled-prop</Button>)
        const element = wrapper.getByText("disabled-prop") as HTMLButtonElement;
        expect(element).toBeInTheDocument();
        expect(element.disabled).toBeTruthy();
    })
})


