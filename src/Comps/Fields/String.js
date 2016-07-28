import React, { PropTypes } from 'react';
import Widget from '../Views/Widget';
import fromDefaultValue from '../Decorators/fromDefaultValue';
import validator from '../Decorators/validator';

function StringField(props) {
    const val = props.value !== undefined && props.value !== null ?
        String(props.value) :
        props.value;
    return (
        <Widget
            {...props}
            value={val}
        />
    );
}

StringField.propTypes = {
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    schema: PropTypes.shape({
        defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        type: PropTypes.oneOfType([
            PropTypes.oneOf(['string', 'number']),
            PropTypes.arrayOf(
                PropTypes.oneOf(['string', 'number', 'null'])
            )
        ]).isRequired
    }),
    onChange: PropTypes.func.isRequired
};
export { StringField as SimpleStringField };
export default validator(fromDefaultValue(StringField));
