import React from "react";

function Error(props) {
    return (
        <section className={"hero is-medium is-danger is-bold is-fullheight"}>
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

export default Error;