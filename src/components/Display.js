import React from 'react'

class Display extends React.Component {
  render() {
    const { value } = this.props

    const language = navigator.language || 'en-US'
    let formattedValue = parseFloat(value).toLocaleString(language, {
      useGrouping: true,
      maximumFractionDigits: 10
    })

    const match = value.match(/\.\d*?(0*)$/)

    if (match)
      formattedValue += (/[1-9]/).test(match[0]) ? match[1] : match[0]

    return (
      <input 
        className="form-control text-xs-right" 
        style={{fontSize: 30}}
        type="text" disabled 
        value={formattedValue}/>
    )
  }
}

export default Display
