import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../store/actions/index';
import { bindActionCreators } from 'redux';

import Input from './../components/input';

class Rule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "",
    }
  }

  handleFilterChange(value) {
    this.setState({
      selected: value,
    })
    this.props.onChangeLabel(this.props.filters[value], this.props.groupId, this.props.ruleId);
    if(document.querySelector(`.value-${this.props.ruleId}`)) {
      document.querySelector(`.value-${this.props.ruleId}`)[0].selected
    }
  }

  renderLabel() {
    return this.props.filters.map((el, index) => {
      if (this.props.groups.condition === 'RANGE' && this.props.groupId === 'mother') {
        if (el.input === "text") {
          return (
            <option
              key={el.label}
              value={index}
            >
              {el.label}
            </option>
          )
        }
      } else if (this.props.groups.groups[this.props.groupId] && this.props.groups.groups[this.props.groupId].condition === 'RANGE') {
        if (el.input === "text") {
          return (
            <option
              key={el.label}
              value={index}
            >
              {el.label}
            </option>
          )
        }
      } else {
        if (el.input === "select") {
          return (
            <option
              key={el.label}
              value={index}
            >
              {el.label}
            </option>
          )
        }
      }
    }
    );
  }

  renderOperator() {
    return this.props.operators.map(el =>
      <option
        key={el.value}
        value={el.value}
      >
        {el.display}
      </option>
    );
  }

  render() {
    return (
      <div className="ruleHolder">
        <div className="rule">
          <select
            className={`label-${this.props.ruleId}`}
            onChange={ (event) => this.handleFilterChange(event.target.value)}
            defaultValue={this.state.selected}
          >
          <option disabled value=""> -- Select label -- </option>
            {this.renderLabel()}
          </select>

          <select
            defaultValue=""
            onChange={(event) => this.props.onChangeOperator(event.target.value, this.props.groupId, this.props.ruleId)}
          >
            <option disabled value=""> -- Select operator -- </option>
            {this.renderOperator()}
          </select>

          {
            this.props.filters.length > 0 && this.state.selected != "" &&
            <Input
              obj={this.props.filters[this.state.selected]}
              changeValue={this.props.onChangeValue}
              groupId={this.props.groupId}
              ruleId={this.props.ruleId}
            />
          }

          <button type="button" className="removeBtn" onClick={ () => this.props.onRemoveRule(this.props.groupId, this.props.ruleId)}>
            remove
          </button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    filters: state.filters,
    operators: state.operators,
    groups: state.groups,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeLabel: (label, groupId, ruleId) => dispatch(actions.changeLabel(label, groupId, ruleId)),
    onChangeOperator: (operator, groupId, ruleId) => dispatch(actions.changeOperator(operator, groupId, ruleId)),
    onChangeValue: (value, groupId, ruleId) => dispatch(actions.changeValue(value, groupId, ruleId)),
    onRemoveRule: (groupId, ruleId) => dispatch(actions.removeRule(groupId, ruleId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Rule);
