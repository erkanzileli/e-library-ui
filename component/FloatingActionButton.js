import React from 'react'
import { Icon } from 'native-base';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types'

function FloatingActionButton({ icon, onPress }) {
    return <TouchableOpacity
        style={{
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.2)',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            width: 50,
            bottom: 25,
            right: 20,
            height: 50,
            backgroundColor: '#fff',
            borderRadius: 100,
        }}
        onPress={() => onPress()}
    >
        {icon}
    </TouchableOpacity>
}

FloatingActionButton.propTypes = {
    onPress: PropTypes.func
}

FloatingActionButton.defaultProps = {
    onPress: () => { }
}

export default FloatingActionButton