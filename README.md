# arbor-react-form

Provides form related functionality to Arbor React apps.

# Getting Started

A simple Form...

```jsx
import React, { Component } from "react";
import Arbor, { connect } from "arbor-react";
import Form from "arbor-react-form";

const store = new Arbor({
  form: {
    todo: { value: "Give arbor-react a shot" }
  }
});

const Form = ({ form }) => {
  return (
    <form>
      <Form.Control target={form.todo}>
        <input type="text" />
      </Form.Control>
    </form>
  );
};

export default connect(store)(Form);
```

Adding form validation:

```jsx
import React, { Component } from "react";
import Arbor, { connect } from "arbor-react";
import Form from "arbor-react-form";

const store = new Arbor({
  form: {
    todo: { value: "Give arbor-react a shot" }
  }
});

const Form = ({ form }) => {
  return (
    <form>
      <Form.Control target={form.todo} validate="onInput">
        <input type="text" minLength={3} required />
      </Form.Control>

      {!form.todo.valid && (
        <span>{form.todo.message}</span>
      )}
    </form>
  );
};

export default connect(store)(Form);
```

Using custom validators:

```jsx
import React, { Component } from "react";
import Arbor, { connect } from "arbor-react";
import Form from "arbor-react-form";

/*
 * Validators return a `Promise` which is either resolved with the input's value
 * if it passes validation, or rejected in case it fails.
 *
 * By returning a Promise, custom validators can be used to perform API validations.
 */
const contains = (substring) => (value, message = `${value} does not contain ${substring}`) =>
  new Promise((resolve, rejected) => {
    if (value.includes(substring)) resolve(value)
    else reject(message)
  })

const store = new Arbor({
  form: {
    email: { value: "" }
  }
});

const Form = ({ form }) => {
  return (
    <form>
      <Form.Control target={form.email} validate="onInput" validators={[ contains("@") ]}>
        <input type="email" required />
      </Form.Control>

      {!form.email.valid && (
        <span>{form.email.message}</span>
      )}
    </form>
  );
};

export default connect(store)(Form);
```
