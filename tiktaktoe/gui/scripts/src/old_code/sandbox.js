import React, {PureComponent} from 'react';

export default class Sandbox extends PureComponent {
    render() {
        const inputStyle = "input is-small";
        return (
            <div>
                <div>
                    <strong className="is-bold">Stage Limits</strong>
                </div>
                <div>
                    <table className="table">
                        <thead>
                        <tr>
                            <th></th>
                            <th>Lower</th>
                            <th>Upper</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th>{"X"}</th>
                            <td>
                                <input
                                    className={inputStyle}
                                    type={"text"}
                                    // value={this.state.step}
                                    // onChange={(e) => this.setStep(e)}
                                />
                            </td>
                            <td>
                                <input
                                    className={inputStyle}
                                    type={"text"}
                                    // value={this.state.step}
                                    // onChange={(e) => this.setStep(e)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>{"Y"}</th>
                            <td>
                                <input
                                    className={inputStyle}
                                    type={"text"}
                                    // value={this.state.step}
                                    // onChange={(e) => this.setStep(e)}
                                />
                            </td>
                            <td>
                                <input
                                    className={inputStyle}
                                    type={"text"}
                                    // value={this.state.step}
                                    // onChange={(e) => this.setStep(e)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>{"Z"}</th>
                            <td>
                                <input
                                    className={inputStyle}
                                    type={"text"}
                                    // value={this.state.step}
                                    // onChange={(e) => this.setStep(e)}
                                />
                            </td>
                            <td>
                                <input
                                    className={inputStyle}
                                    type={"text"}
                                    // value={this.state.step}
                                    // onChange={(e) => this.setStep(e)}
                                />
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
