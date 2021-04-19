import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';

const Basic = () => (
    <div>
        <Formik
            initialValues={{
                email: '',
                password: '',
                age: ""
            }}
            validate={values => {
                let errors = {};
                if (!values.email) {
                    errors.email = 'Required';
                }
                else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                    errors.email = 'Invalid email address';
                }
                else if(!values.age) {
                    errors.age = "Required";
                }
                else if(isNaN(Number(values.age))) {
                    errors.age = "Must be a number..."
                }
                return errors;
            }}
            onSubmit={(values, {setSubmitting}) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
            }}
        >
            {({isSubmitting}) => (
                <Form>
                    <Field type="email" name="email"/>
                    <ErrorMessage name="email" component="div"/>
                    <Field type="password" name="password"/>
                    <ErrorMessage name="password" component="div"/>
                    <Field type="text" name="age"/>
                    <ErrorMessage name="age" component="div"/>
                    <button type="submit" disabled={isSubmitting}>
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    </div>
);

export default Basic;