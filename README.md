# arbor-react-form

Provides form related functionality to Arbor React apps.

# Getting Started

A simple Form...

```jsx
import React, { Component } from "react";
import Arbor, { connect } from "arbor-react";
import { Form } from "arbor-react-form";

const store = new Arbor({
  form: {
    todo: { value: "Hello world" }
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
