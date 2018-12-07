import React from 'react'
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types'

function FloatingActionButton({ icon, onPress, style }) {
    return <TouchableOpacity
        style={{
            ...style, 
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.2)',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            width: 50,
            height: 50,
            top: 25,
            left: 350,
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