import React from 'react';
import { Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

function createMarkup(string) {
  return {__html: string};
}

const CalcButton = (props) => {
  const { style, size, label, className, onClick } = props

  return (
    <Button 
      bsStyle={style} 
      bsSize={size} 
      className={className}
      onClick={onClick}
      dangerouslySetInnerHTML={createMarkup(label)}
    >
    </Button>
  );
}

CalcButton.propTypes = {
  className: PropTypes.string,
  label: PropTypes.any.isRequired,
  style: PropTypes.string,
  size: PropTypes.string,
  onClick: PropTypes.func
}

CalcButton.defaultProps = {
  style: 'secondary',
  size: 'large',
  className: 'col-xs-4'
}

export default CalcButton;