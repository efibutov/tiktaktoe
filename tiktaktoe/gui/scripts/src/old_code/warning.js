import React from "react";

function Warning(props) {
    return (
        <section className={"hero is-medium is-dark is-bold is-fullheight"}>
            <div className={"hero-body"}>
                <div className={"container"}>
                    <h1 className={"title"}>
                        {props.title}
                    </h1>
                    <h2 className={"subtitle"}>
                        {props.subtitle}
                    </h2>
                </div>
            </div>
        </section>
    );
}

export default Warning;