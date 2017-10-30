import React from 'react';
import CreateReactClass from 'create-react-class'
import Display from './Display'
import Key from './Key'

const CalculatorOperations = {
  '+': (valueA, valueB) => valueA + valueB,
  '-': (valueA, valueB) => valueA - valueB,
  '*': (valueA, valueB) => valueA * valueB,
  '/': (valueA, valueB) => valueA / valueB,
  '=': (valueA, valueB) => valueB
}

class Calculator extends React.Component {
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

  clearDisplayValue() {
    this.setState({
      valueStr: '0'
    })
  }

  // delete a last char
  clearLastChar() {
    const { displayValue } = this.state

    this.setState({
      displayValue: displayValue.substring(0, displayValue.length - 1) || '0'
    })
  }

  toggleSign() {
    const { displayValue } = this.state

    this.setState({
      displayValue: displayValue.charAt(0) === '-' ? displayValue.substr(1) : '-' + displayValue
    })
  }

  inputPercent() {
    const { displayValue } = this.state
    const value = parseFloat(displayValue)

    if (value === 0)
      return

    this.setState({
      displayValue: String(value / 100)
    })
  }

  inputDot() {
    const { displayValue } = this.state

    if (!(/\./).test(displayValue)) {
      this.setState({
        displayValue: displayValue + '.',
        waitingForOperand: false
      })
    }
  }

  inputDigit(digit) {
    const { displayValue, waitingForOperand } = this.state

    if (waitingForOperand) {
      this.setState({
        displayValue: String(digit),
        waitingForOperand: false
      })
    } else {
      this.setState({
        displayValue: displayValue === '0' ? String(digit) : displayValue + digit
      })
    }
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
    const clearDisplay = displayValue !== '0'
    const clearText = clearDisplay ? 'C' : 'AC'
    
    return (
      <div className='calculator'>
        <Display value={displayValue}>
          <div className='calculator-keypad'>
            <div className="input-keys">
              <div className="function-keys">
                <Key className="key-clear" onPress={() => clearDisplay ? this.clearDisplayValue() : this.clear()}>{clearText}</Key>
                <Key className="key-sign" onPress={() => this.toggleSign()}>±</Key>
                <Key className="key-percent" onPress={() => this.inputPercent()}>%</Key>
              </div>
              <div className="digit-keys">
                <Key className="key-0" onPress={() => this.inputDigit(0)}>0</Key>
                <Key className="key-dot" onPress={() => this.inputDot()}>●</Key>
                <Key className="key-1" onPress={() => this.inputDigit(1)}>1</Key>
                <Key className="key-2" onPress={() => this.inputDigit(2)}>2</Key>
                <Key className="key-3" onPress={() => this.inputDigit(3)}>3</Key>
                <Key className="key-4" onPress={() => this.inputDigit(4)}>4</Key>
                <Key className="key-5" onPress={() => this.inputDigit(5)}>5</Key>
                <Key className="key-6" onPress={() => this.inputDigit(6)}>6</Key>
                <Key className="key-7" onPress={() => this.inputDigit(7)}>7</Key>
                <Key className="key-8" onPress={() => this.inputDigit(8)}>8</Key>
                <Key className="key-9" onPress={() => this.inputDigit(9)}>9</Key>
              </div>              
            </div>
            <div className="operator-keys">
              <Key className="key-divide" onPress={() => this.performOperation('/')}>÷</Key>
              <Key className="key-multiply" onPress={() => this.performOperation('*')}>×</Key>
              <Key className="key-subtract" onPress={() => this.performOperation('-')}>−</Key>
              <Key className="key-add" onPress={() => this.performOperation('+')}>+</Key>
              <Key className="key-equals" onPress={() => this.performOperation('=')}>=</Key>
              </div>
          </div>
        </Display>
      </div>
    )
  }
}

export default Calculator