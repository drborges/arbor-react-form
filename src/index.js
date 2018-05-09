import React from "react";

const bindProps = (target, props) => {
  const mapping = {
    radio: {
      checked: target.value === props.value,
      onChange: e => {
        target.value = e.target.value;
        props.onChange && props.onChange(e);
      }
    },
    checkbox: {
      checked: target.value,
      onChange: e => {
        target.value = e.target.checked;
        props.onChange && props.onChange(e);
      }
    },
    default: {
      value: target.value,
      onChange: e => {
        target.value = e.target.value;
        props.onChange && props.onChange(e);
      }
    }
  }

  return mapping[props.type] || mapping.default
}

const Control = ({ children, target }) => {
  const controls = ["input", "select", "textarea"]

  return React.Children.map(children, child => {
    if (!child || !controls.includes(child.type)) {
      return child;
    }

    return React.cloneElement(child, bindProps(target, child.props));
  });
};

export default {
  Control,
};
