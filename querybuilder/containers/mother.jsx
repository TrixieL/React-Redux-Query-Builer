import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions/index';
import uniqueId from 'uuid/v4';

import Rule from './rule';
import Group from './group';

class Mother extends Component {

  renderAddGroup() {
    let childId = uniqueId();
    let groupObj = {
      rules: {},
      id: childId,
      condition: 'AND',
    }
    this.props.onAddGroup(childId, groupObj);
  }

  renderRules() {
    return Object.keys(this.props.groups.rules).map((key) => {
      return (<Rule
                key={this.props.groups.rules[key].id}
                ruleId={this.props.groups.rules[key].id}
                groupId="mother"
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
    if (this.props.groupId === 'mother') {
      if (event.target.value === 'RANGE' || this.props.groups.condition === 'RANGE') {
          this.props.onResetRules(this.props.groupId);
      }
    }
  }

  render() {
    return (
      <div className="query mother">
        <div className="conjuctionHolder">
          <select onChange={(event) => this.handleConditionChange(event)}>
            <option value="AND"> AND </option>
            <option value="OR"> OR </option>
            <option value="RANGE"> RANGE </option>
          </select>
        </div>
        <div className="ruleGroupBtn">
          <button type="button" onClick={ () => this.renderAddRule() }>
            Add rule
          </button>
          <button type="button" onClick={ () => {this.renderAddGroup()} }>
            Add group
          </button>
        </div>
        { this.props.groups.rules &&
          this.renderRules()
        }
        {
          Object.keys(this.props.groups.groups).map(key => {
          return (<Group
                    key={this.props.groups.groups[key].id}
                    groupId={this.props.groups.groups[key].id}
                  />)
          })
        }
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
    onSelectCondition: (id, value) => dispatch(actions.toggleCondition(id, value)),
    onAddGroup: (id, group) => dispatch(actions.addGroup(id, group)),
    onAddRule: (groupId, ruleId, rule) => dispatch(actions.addRule(groupId, ruleId, rule)),
    onResetRules: (groupId) => dispatch(actions.resetRules(groupId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Mother);
