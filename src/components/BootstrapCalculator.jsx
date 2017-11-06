import React from 'react';
import CButton from './CalculatorButton'

class BootstrapCalculator extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="container p-t-1">
          <h1 className="display-3 text-xs-center m-b-2">React Calculator</h1>
          <div className="col-xl-6 col-xl-offset-3 col-md-6 col-md-offset-3 p-x-2 p-y-2 col-xs-12 bg-primary">
            <div className="input-group input-group-lg col-xs-12 p-a-0"> 
              <input className="form-control text-xs-right" disabled type="text"/>
            </div>
            <div className="col-xs-8 p-a-0 m-t-2">
              <CButton label={'CE'} style={'danger'}/>  
              <CButton label={'sqrt'}/> 
              <CButton label={'x^2'}/>
            </div>
            <div className="col-xs-4 p-r-0 m-t-2">
              <CButton label={'÷'} className={'col-xs-12'}/>
            </div>
            <div className="col-xs-8 p-a-0">
              <CButton label={7} />
              <CButton label={8} />
              <CButton label={9} />
              <CButton label={4} />
              <CButton label={5} />
              <CButton label={6} />
              <CButton label={1} />
              <CButton label={2} />
              <CButton label={3} />
              <CButton label={0} />
              <CButton label={'.'} />
              <CButton label={'%'} />
            </div>
            <div className="col-xs-4 p-r-0">
              <CButton label={'*'} className={'col-xs-12'}/>
              <CButton label={'-'} className={'col-xs-12'}/>
              <CButton label={'+'} className={'col-xs-12'}/>
              <CButton label={'='} className={'col-xs-12'} style={'success'}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BootstrapCalculator;