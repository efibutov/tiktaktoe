import React from "react";

class LoadDataDialog extends React.PureComponent {
    constructor(props) {
        super(props);

        this.title = props.title;
        this.state = {
            isOpen: props.isOpen
        };
        this.onEscape = this.onEscape.bind(this);
    }

    onEscape({keyCode}) {
        if (keyCode === 27) {
            this.props.confirmClosing(false);
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.onEscape);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.onEscape);
    }

    render() {
        const title = this.state.isOpen ? `Close the ${this.title}?` : `Open the ${this.title}?`;

        return (
            <div className="modal is-active">
                <div className="modal-background"/>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">
                            {title}
                        </p>
                        <button
                            className="delete"
                            aria-label="close"
                            onClick={() => this.props.confirmToggle(false)}

                        />
                    </header>
                    <footer className="modal-card-foot">
                        <button
                            className={"button is-danger"}
                            onClick={() => this.props.confirmToggle(true)}
                        >
                            {"Yes"}
                        </button>
                        <button
                            className={"button"}
                            onClick={() => this.props.confirmToggle(false)}
                        >
                            {"Cancel"}
                        </button>
                    </footer>
                </div>
            </div>
        )
    }
}

export default LoadDataDialog;