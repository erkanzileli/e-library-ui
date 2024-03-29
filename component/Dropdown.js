import React from 'react'
import { Item, Picker, Label } from 'native-base'
import PropTypes from 'prop-types'

class Dropdown extends React.Component {

  handleChanged = value => {
    this.props.onChange(value)
  }

  render() {
    const { options, label, value } = this.props
    return <Item picker>
      <Label> {label} </Label>
      <Picker
        mode='dropdown'
        onValueChange={this.handleChanged}
        selectedValue={value}
      >
        {
          options.map(option => <Picker.Item label={option.label} value={option.value} key={option.value} />)
        }
      </Picker>
    </Item>
  }
}

Dropdown.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])
    })
  ).isRequired,
  onChange: PropTypes.func
}

Dropdown.defaultProps = {
  value: undefined,
  onChange: () => { }
}

export default Dropdown
