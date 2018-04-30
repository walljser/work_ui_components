import PropTypes from 'prop-types';

const FieldPropType = {
  // the value of Field
  value: PropTypes.any,
  // call this function when the value changes
  onChange: PropTypes.func.isRequired,
  // the field's name
  fieldName: PropTypes.string.isRequired,

  errorMessage: PropTypes.string
}

export default FieldPropType
