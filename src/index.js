import React from "react"

const validateInput = (input, node, validators) => {
  input.setCustomValidity("")

  const html5valid = input.checkValidity()
  if (!html5valid) {
    node.valid = input.checkValidity()
    node.message = input.validationMessage
    return
  }

  const validations = validators.map(rule => rule(input.value))
  Promise.all(validations)
    .catch(error => input.setCustomValidity(error))
    .then(() => {
      node.valid = input.checkValidity()
      node.message = input.validationMessage
    })
}

const bindProps = (node, validate, validators, element) => {
  const { props, type } = element
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
    select: {
      value: node.value,
      onChange: e => {
        const value = props.multiple ?
          Array.from(e.target.selectedOptions).map(o => o.value) :
          e.target.value

        console.log(">>>> select value", value)

        node.value = value
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

  const inputProps = mapping[type] || mapping.default

  console.log(">>>> type", )

  if (validate) {
    const handler = inputProps[validate]
    inputProps[validate] = (e) => {
      handler && handler(e)
      validateInput(e.target, node, validators)
    }
  }

  return inputProps
}

class Control extends React.PureComponent {
  /**
   * Augments target's API with form related functionality if needed
   */
  componentWillMount() {
    const target = this.props.target

    // Provide a way to reset the corresponding form field arbor node to a prestine
    // state, e.g. empty field with no trace of previous validation attempts.
    target.$reset = target.$reset || (() => {
      target.$mutate(target => {
        target.value = ""
        target.valid = undefined
        target.message = undefined
      })
    })
  }

  render() {
    const { children, target, validate, validators = [] } = this.props
    const controls = ["input", "select", "textarea"]

    return React.Children.map(children, child => {
      if (!child || !controls.includes(child.type)) {
        return child
      }

      return React.cloneElement(child, bindProps(target, validate, validators, child))
    })
  }
}

export default {
  Control,
}
