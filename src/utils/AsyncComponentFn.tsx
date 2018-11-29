import React,{ Component } from 'react';

interface Props {}

interface State {
    component: null;
}

export default (importComponent: any) =>
    class AsyncComponent extends Component<Props, State> {

        constructor(props: Props) {
            super(props);

            this.state = {
                component: null,
            };
        }

        async componentDidMount() {
            const { default: component } = await importComponent();

            this.setState({
                component: component
            });
        }

        renderGreeting = (Elem: React.ComponentClass<any>, props: Props) => <Elem {...props}/>;

        render() {
            const C = this.state.component;
            return C
                ? this.renderGreeting(C, this.props)
                : null;
        }

    }
