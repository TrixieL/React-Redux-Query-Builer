import React from 'react';

class Input extends React.Component {

  renderValue() {
    let input = null;
    let k;

    switch(this.props.obj.input) {
      case "select":
        return input = (
          <select className={`value-${this.props.ruleId}`} defaultValue="" onChange={(event) => this.props.changeValue(event.target.value, this.props.groupId, this.props.ruleId)}>
            <option value=""> -- Select value -- </option>
            { this.props.obj.values.map(option =>
              {
                k = Object.keys(option);
                return (
                    <option
                      key={option[k]}
                      value={k}
                    >
                      {option[k]}
                    </option>
                )
              }
            )}
            </select>
        )

        break;
      case "text":
        return input = (
          <input
            type="number"
            onChange = {(event) => this.props.changeValue(event.target.value, this.props.groupId, this.props.ruleId)}>
          </input>
        )
        break;
      default:
      return input = <input type="number" onChange = {(event) => this.props.changeValue(event.target.value, this.props.groupId, this.props.ruleId)} ></input>
      break;
    }
  }
  render() {
    return (
      <React.Fragment>
        {this.renderValue()}
      </React.Fragment>
    );
    }
  }

export default Input;
