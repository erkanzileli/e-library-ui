import React from 'react'
import { Item, Picker } from 'native-base'
import PropTypes from 'prop-types'

class Dropdown extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: this.props.value
    }
  }

  handleChanged = async (value) => {
    await this.setState({
      value: value
    })
    await this.props.onChange(value)
  }

  render() {
    const { options, label } = this.props
    const { value } = this.state
    return <Item picker>
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
