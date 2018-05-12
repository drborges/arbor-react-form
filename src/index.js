import React from "react"

const bindProps = (node, validate, props) => {
  const mapping = {
    radio: {
      checked: node.value === props.value,
      onChange: e => {
        node.value = e.target.value
        props.onChange && props.onChange(e)
      }
    },
    checkbox: {
      checked: node.value,
      onChange: e => {
        node.value = e.target.checked
        props.onChange && props.onChange(e)
      }
    },
    default: {
      value: node.value,
      onChange: e => {
        node.value = e.target.value
        props.onChange && props.onChange(e)
      }
    }
  }

  const inputProps = mapping[props.type] || mapping.default

  if (validate) {
    const handler = inputProps[validate]
    inputProps[validate] = (e) => {
      handler && handler(e)
      node.valid = e.target.checkValidity()
      node.message = e.target.validationMessage
    }
  }

  return inputProps
}

class Control extends React.PureComponent {
  componentDidMount() {
    const target = this.props.target
    target.$reset = target.$reset || (() => {
      target.$mutate(target => {
        target.value = ""
        target.valid = undefined
        target.message = undefined
      })
    })
  }

  render() {
    const { children, target, validate } = this.props
    const controls = ["input", "select", "textarea"]

    return React.Children.map(children, child => {
      if (!child || !controls.includes(child.type)) {
        return child
      }

      return React.cloneElement(child, bindProps(target, validate, child.props))
    })
  }
}

export default {
  Control,
}
