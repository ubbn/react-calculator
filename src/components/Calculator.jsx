import React from 'react';
import CreateReactClass from 'create-react-class'
import Display from '.Display'

const CalculatorOperations = {
  '+': (valueA, valueB) => valueA + valueB,
  '-': (valueA, valueB) => valueA - valueB,
  '*': (valueA, valueB) => valueA * valueB,
  '/': (valueA, valueB) => valueA / valueB,
  '=': (valueA, valueB) => valueB
}

var Calculator = CreateReactClass({
  state = {
    value: null,
    valueStr: '0',
    operator: null,
  }

  clear() {
    this.setState({
      value: null,
      valueStr: '0',
      operator: null
    })
  },

  clearDisplayValue() {
    this.setState({
      valueStr: '0'
    })
  },

  // delete a last char
  clearLastChar() {
    const { displayValue } = this.state

    this.setState({
      displayValue: displayValue.substring(0, displayValue.length - 1) || '0'
    })
  }

  // do calculation
  performOperation(nextOperator) {
    const { value, displayValue, operator } = this.state
    const inputValue = parseFloat(displayValue)

    if (value == null) {
      this.setState({
        value: inputValue
      })
    } else if (operator) {
      const currentValue = value || 0
      const newValue = CalculatorOperations[operator](currentValue, inputValue)

      this.setState({
        value: newValue,
        displayValue: String(newValue)
      })
    }

    this.setState({
      waitingForOperand: true,
      operator: nextOperator
    })
  }

  // key-down handler
  handleKeyDown = (event) => {
    let { key } = event

    if (event.ctrlKey || event.metaKey)
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

      if (this.state.displayValue !== '0') {
        this.clearDisplay()
      } else {
        this.clearAll()
      }
    }
  }  

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
  }  

  render(){
    const { displayValue } = this.state

    return (
      <div className='calculator'>
        <Display value={displayValue}>
          <div className='calculator-keypad'>
            <div className="input-keys">
              <div className="function-keys">
                <CalculatorKey className="key-clear" onPress={() => clearDisplay ? this.clearDisplay() : this.clearAll()}>{clearText}</CalculatorKey>
                <CalculatorKey className="key-sign" onPress={() => this.toggleSign()}>±</CalculatorKey>
                <CalculatorKey className="key-percent" onPress={() => this.inputPercent()}>%</CalculatorKey>
              </div>
            </div>
            <div className="operator-keys">

            </div>
          </div>
        </Display>
      </div>
    )
  }
});
