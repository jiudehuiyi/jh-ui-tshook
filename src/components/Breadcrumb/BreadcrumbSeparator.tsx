import * as React from "react";

interface BreadcrumbSeparatorInterface extends React.FC{
    _JH_BREADCRUMB_SEPARATOR: boolean;
}

const BreadcrumbSeparator:BreadcrumbSeparatorInterface = ({children}) => {

    return (
       <span> {children || "/"} </span>
    )
}
BreadcrumbSeparator._JH_BREADCRUMB_SEPARATOR = true;
export default BreadcrumbSeparator;
