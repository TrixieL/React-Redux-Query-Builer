import * as actionTypes from './actionTypes';
import { immutableCopy } from './../../../utils/immutable';

// AXIOS HEADERS
const request = axios.create({
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});
request.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
request.defaults.xsrfCookieName = 'csrftoken';

// GET REQUEST
const jsonRequest = url => request.get(`${url}`);

export const getJson = (url) => {
  return (dispatch) => {
    return jsonRequest(url)
      .then((response) => {
        dispatch({
          type: actionTypes.GET_JSON,
          filters: response.data.filters
        })
      })
  }
}
// POST REQUEST
const postJson = data => request.post('/catalog/product-label/create/', data);

export const generateQuery = (stateGroups) => {
  let groups = immutableCopy(stateGroups);
  // console.log(state.groups);
  let query = {
    condition: groups.condition,
    rules: []
  }
  for (let key in groups.rules) {
    let rule = {
      field: groups.rules[key].label.id,
      id: groups.rules[key].label.id,
      operator: groups.rules[key].operator,
      readonly: true,
      value: groups.rules[key].value,
    }
    query.rules.push(rule);
  }
  for (let groupId in groups.groups) {
    let group = groups.groups[groupId];
    delete group.id;
    let arr = [];
    for (let ruleId in group.rules) {
      let rule = {
        field: group.rules[ruleId].label.id,
        id: group.rules[ruleId].label.id,
        operator: group.rules[ruleId].operator,
        readonly: true,
        value: group.rules[ruleId].value,
      }
      arr.push(rule);
    }
    group.rules = arr;
    query.rules.push(group);
  }
  return (dispatch) => {
    console.log('query', query);
    return postJson(query)
      .then((response) => {
        dispatch(showConfirm());
      })
  }
}

// GROUP ACTIONS
export const addGroup = (id, group) => {
  return {
    type: actionTypes.ADD_GROUP,
    id,
    group
  }
}

export const removeGroup = (id) => {
  return {
    type: actionTypes.REMOVE_GROUP,
    id
  }
}

export const toggleCondition = (id, value) => {
  return {
    type: actionTypes.TOGGLE_CONDITION,
    id,
    value
  };
}

export const showConfirm = () => {
  return {
    type: actionTypes.SHOW_CONFIRM,
  };
}


// RULE ACTIONS
export const changeLabel = (label, groupId, ruleId) => {
  return {
    type: actionTypes.CHANGE_LABEL,
    label,
    groupId,
    ruleId
  };
}

export const changeOperator = (operator, groupId, ruleId) => {
  return {
    type: actionTypes.CHANGE_OPERATOR,
    operator,
    groupId,
    ruleId
  };
}

export const changeValue = (value, groupId, ruleId) => {
  return {
    type: actionTypes.CHANGE_VALUE,
    value,
    groupId,
    ruleId
  };
}

export const addRule = (groupId, ruleId, rule) => {
  return {
    type: actionTypes.ADD_RULE,
    groupId,
    ruleId,
    rule
  }
}

export const removeRule = (groupId, ruleId) => {
  return {
    type: actionTypes.REMOVE_RULE,
    groupId,
    ruleId
  }
}

export const resetRules = (groupId) => {
  return {
    type: actionTypes.RESET_RULES,
    groupId
  }
}
