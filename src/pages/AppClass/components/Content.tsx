import React, { Component } from 'react';

interface Props {
    propsText: string;
}

interface State {
    stateText: number;
}

class Content extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { stateText: 123 };
    }

    render() {
        return (
            <p>{this.props.propsText}{this.state.stateText}</p>
        );
    }
}

export default Content;
