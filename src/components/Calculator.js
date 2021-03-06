import React from 'react';

import CalcButton from './Button'
import Display from './Display'

const CalculatorOperations = {
  '+': (valueA, valueB) => valueA + valueB,
  '-': (valueA, valueB) => valueA - valueB,
  '*': (valueA, valueB) => valueA * valueB,
  '/': (valueA, valueB) => valueA / valueB,
  '=': (valueA, valueB) => valueB
}

class BootstrapCalculator extends React.Component {
  state = {
    value: null,
    valueStr: '0',
    operator: null,
    waitingForOperand: false
  }

  clear() {
    this.setState({
      value: null,
      valueStr: '0',
      operator: null
    })
  }

  // delete a last char
  clearLastChar() {
    const { valueStr } = this.state

    this.setState({
      valueStr: valueStr.substring(0, valueStr.length - 1) || '0'
    })
  }

  inputPercent() {
    const { valueStr } = this.state
    const value = parseFloat(valueStr)

    if (value === 0)
      return

    this.setState({
      valueStr: String(value / 100),
      waitingForOperand: true
    })
  }

  square(){
    const { valueStr } = this.state
    const value = parseFloat(valueStr)

    this.setState({
      valueStr: String(value * value),
      waitingForOperand: true
    })    
  }

  squareRoot(){
    const { valueStr } = this.state
    const value = parseFloat(valueStr)

    this.setState({
      valueStr: String(Math.sqrt(value)),
      waitingForOperand: true
    })    
  }

  inputDot() {
    const { valueStr } = this.state

    if (!(/\./).test(valueStr)) {
      this.setState({
        valueStr: valueStr + '.',
        waitingForOperand: false
      })
    }
  }

  inputDigit(digit) {
    const { valueStr, waitingForOperand } = this.state

    if (waitingForOperand) {
      this.setState({
        valueStr: String(digit),
        waitingForOperand: false
      })
    } else {
      this.setState({
        valueStr: valueStr === '0' ? String(digit) : valueStr + digit
      })
    }
  }  

  // do calculation
  performOperation(nextOperator) {
    const { value, valueStr, operator } = this.state
    const inputValue = parseFloat(valueStr)

    if (value == null) {
      this.setState({
        value: inputValue
      })
    } else if (operator) {
      const currentValue = value || 0
      const newValue = CalculatorOperations[operator](currentValue, inputValue)

      this.setState({
        value: newValue,
        valueStr: String(newValue)
      })
    }

    this.setState({
      waitingForOperand: true,
      operator: nextOperator
    })
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  // key-down handler
  handleKeyDown = (event) => {
    let { key } = event

    let fnKeys = event.keyCode > 111 && event.keyCode < 124
    if (event.ctrlKey || event.metaKey || fnKeys)
      return

    if (key === 'Enter')
      key = '='

    if ((/\d/).test(key)) {
      this.inputDigit(parseInt(key, 10))
    } else if (key in CalculatorOperations) {
      this.performOperation(key)
    } else if (key === '.') {
      this.inputDot()
    } else if (key === '%') {
      this.inputPercent()
    } else if (key === 'Backspace') {
      event.preventDefault()
      this.clearLastChar()
    } else if (key === 'Clear') {
      event.preventDefault()
      this.clear()
    }
  }    

  render() {
    return (
      <div className="container-fluid">
        <div className="container p-t-1">
          <h2 className="text-xs-center m-b-2">React Calculator</h2>
          <div className="col-xl-6 col-xl-offset-3 col-md-6 col-md-offset-3 p-x-2 p-y-2 col-xs-12 bg-primary">
            <div className="input-group input-group-lg col-xs-12 p-a-0"> 
              <Display value={this.state.valueStr}/>
            </div>
            <div className="col-xs-8 p-a-0 m-t-2">
              <CalcButton label={'CE'} style={'danger'} onClick={() => this.clear()}/>  
              <CalcButton label={'&#8730;'} onClick={()=> this.squareRoot()}>{3}</CalcButton>
              <CalcButton label={'x<sup>2</sup>'} onClick={()=> this.square()}/>
            </div>
            <div className="col-xs-4 p-r-0 m-t-2">
              <CalcButton label={'÷'} className={'col-xs-12'} onClick={() => this.performOperation('/')}/>
            </div>
            <div className="col-xs-8 p-a-0">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(d => 
                <CalcButton label={d} onClick={()=> this.inputDigit(d)}/>
              )}
              <CalcButton label={'&middot;'} onClick={()=> this.inputDot()} />
              <CalcButton label={'%'} onClick={()=> this.inputPercent()}/>
            </div>
            <div className="col-xs-4 p-r-0">
              <CalcButton label={'*'} className={'col-xs-12'} onClick={() => this.performOperation('*')}/>
              <CalcButton label={'-'} className={'col-xs-12'} onClick={() => this.performOperation('-')}/>
              <CalcButton label={'+'} className={'col-xs-12'} onClick={() => this.performOperation('+')}/>
              <CalcButton label={'='} className={'col-xs-12'} style={'success'} onClick={() => this.performOperation('=')}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BootstrapCalculator;