import React from 'react'
import CreateReactClass from 'create-react-class'
import ReactPoint from 'react-point'

export default CalculatorKey = CreateReactClass ({
  render() {
    const { onPress, className, ...props } = this.props

    return (
      <ReactPoint onPoint={onPress}>
        <button className={`calculator-key ${className}`} {...props}/>
      </ReactPoint>
    )
  }
})