import React from "react";

class DebugInfo extends React.PureComponent {
    constructor(props) {
        super(props);
        this.name = props.name;

        this.state = {
            lastMessages: [],
        };
        this.addMessage = this.addMessage.bind(this);
    }

    addMessage(msg) {
        const lastMessages = this.state.lastMessages;

        if (lastMessages.length > 100) {
            lastMessages.shift();
            lastMessages.push(msg);
        }

        this.setState({
            lastMessages: lastMessages
        });
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.addMessage(nextProps.message);
    }

    render() {
        const messagesElements = [];

        for (let i = 0; i < this.state.lastMessages.length; ++i) {
            messagesElements.push(
                <li key={i}>
                    {i}
                </li>
            );
        }

        return (
            <div>
                <article className="message is-info">
                    <div className="message-header">
                        {"Debug messages"}
                        <button
                            className={"delete"}
                            onClick={() => {this.props.minimizeElement(this.name)}}
                        />
                    </div>
                </article>
                <div className="field">
                    <ol>
                        {messagesElements}
                    </ol>
                    <div className="is-divider-horizontal"/>
                </div>
            </div>
        );
    }
}

export default DebugInfo;
