import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions/index';
import uniqueId from 'uuid/v4';

import Rule from './rule';

class Group extends Component {

  renderAddGroup() {
    let childId = uniqueId();
    let groupObj = {
      rules: {},
      id: childId,
    }
    this.props.onAddGroup(childId, groupObj);
  }

  renderRules() {
    return Object.keys(this.props.groups.groups[this.props.groupId].rules).map(key => {
      return (<Rule
                key={this.props.groups.groups[this.props.groupId].rules[key].id}
                ruleId={this.props.groups.groups[this.props.groupId].rules[key].id}
                groupId={this.props.groupId}
              />)
      })
  }

  renderAddRule() {
    let id = uniqueId();
    let rule = {
      id: id,
      label: {},
      operator: "",
      value: "",
    };
    this.props.onAddRule(this.props.groupId, id, rule);
  }

  handleConditionChange(event) {
    this.props.onSelectCondition(this.props.groupId, event.target.value);
    if (event.target.value === 'RANGE' || this.props.groups.groups[this.props.groupId].condition === 'RANGE') {
        this.props.onResetRules(this.props.groupId);
    }
  }

  render() {
    return (
      <div className="query child">
        <div className="conjuctionHolder">
          <select onChange={(event) => this.handleConditionChange(event) }>
            <option value="AND"> AND </option>
            <option value="OR"> OR </option>
            <option value="RANGE"> RANGE </option>
          </select>
        </div>
        <div className="ruleGroupBtn">
          <button type="button" onClick={ () => this.renderAddRule() }>
            Add rule
          </button>
          <button type="button" className="removeBtn group" onClick={ () => this.props.onRemoveGroup(this.props.groupId) }>
            remove group
          </button>
        </div>
        {this.renderRules()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    groups: state.groups,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onSelectCondition: (groupId, value) => dispatch(actions.toggleCondition(groupId, value)),
    onAddGroup: (groupId, group) => dispatch(actions.addGroup(groupId, group)),
    onRemoveGroup: (groupId) => dispatch(actions.removeGroup(groupId)),
    onAddRule: (groupId, ruleId, rule) => dispatch(actions.addRule(groupId, ruleId, rule)),
    onResetRules: (groupId) => dispatch(actions.resetRules(groupId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Group);
