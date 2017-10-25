import React from 'react';
import CreateReactClass from 'create-react-class'
import Display from '.Display'

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
