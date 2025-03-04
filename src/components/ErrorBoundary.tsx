import React from "react";

export class ErrorBoundary extends React.Component<React.PropsWithChildren, { hasError: boolean, error: Error | null }> {
    constructor(props: React.PropsWithChildren) {
        super(props);
        this.state = {hasError: false, error: null};
    }

    static getDerivedStateFromError(error: Error) {
        return {hasError: true, error: error};
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <p className="text-red-500">123 {this.state.error?.message}</p>
            );
        }
        return this.props.children;
    }
}
