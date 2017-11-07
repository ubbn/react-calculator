import React from 'react';
import { Button } from 'react-bootstrap'

const CalculatorButton = (props) => {
  let { style, size, label, className } = props
  style = !!style ? style : 'secondary'
  size = !!size ? size : 'large'
  className = !!className ? className : 'col-xs-4'

  return (
    <Button 
      bsStyle={style} 
      bsSize={size} 
      className={className}
      onClick={props.onClick}
    >
      {label}
    </Button>
  );
}

export default CalculatorButton;