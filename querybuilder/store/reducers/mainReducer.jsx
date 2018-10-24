import * as actionTypes from './../actions/actionTypes';
import { immutableCopy } from './../../../utils/immutable';

const initialState = {
  groups: {
    condition: "AND",
    rules: {},
    groups: {},
    id: "mother",
  },
  filters: [],
  operators: [
    {
      display: "=",
      value: "equal"
    },
    {
      display: "!=",
      value: "not_equal"
    },
    {
      display: ">",
      value: "greater_than"
    },
    {
      display: ">=",
      value: "greater_than_equal"
    },
    {
      display: "<",
      value: "less_than"
    },
    {
      display: "<=",
      value: "less_than_equal"
    },
  ],
  query: {},
  showConfirm: false,
}

const getJson = (state, action) => {
  return {
    ...state,
    filters: action.filters
  }
}

const addGroup = (state, action) => {
  // console.log('state.groups', state.groups);
  let groups = immutableCopy(state.groups);
  groups.groups[action.id] = action.group;
  return {
    ...state,
    groups,
    showConfirm: false
  }
}

const removeGroup = (state, action) => {
  // console.log('removed', action.id);
  let groups = immutableCopy(state.groups);
  delete groups.groups[action.id];
  return {
    ...state,
    groups,
    showConfirm: false
  }
}

const toggleCondition = (state, action) => {
  let groups = immutableCopy(state.groups);
  if(action.id === "mother") {
    groups.condition = action.value;
  } else {
    groups.groups[action.id].condition = action.value;
  }
  return {
    ...state,
    groups,
    showConfirm: false
  }
}

const showConfirm = (state, action) => {
  return {
    ...state,
    showConfirm: true,
  }
}

const changeLabel = (state, action) => {
  // console.log('id', action.label.id);
  let groups = immutableCopy(state.groups);
  if(action.groupId === "mother") {
    groups.rules[action.ruleId].label = action.label;
    groups.rules[action.ruleId].value = "";
  } else {
    groups.groups[action.groupId].rules[action.ruleId].label = action.label;
    groups.groups[action.groupId].rules[action.ruleId].value = "";
  }
  return {
    ...state,
    groups,
    showConfirm: false
  }
}

const changeOperator = (state, action) => {
  let groups = immutableCopy(state.groups);
  if(action.groupId === "mother") {
    groups.rules[action.ruleId].operator = action.operator;
  } else {
    groups.groups[action.groupId].rules[action.ruleId].operator = action.operator;
  }
  return {
    ...state,
    groups,
    showConfirm: false
  }
}

const changeValue = (state, action) => {
  let groups = immutableCopy(state.groups);
  if(action.groupId === "mother") {
    groups.rules[action.ruleId].value = action.value;
  } else {
    groups.groups[action.groupId].rules[action.ruleId].value = action.value;
  }
  return {
    ...state,
    groups,
    showConfirm: false
  }
}

const addRule = (state, action) => {
  let groups = immutableCopy(state.groups);
  if(action.groupId === "mother") {
    groups.rules[action.ruleId] = action.rule;
  } else {
    groups.groups[action.groupId].rules[action.ruleId] = action.rule;
  }
  return {
    ...state,
    groups,
    showConfirm: false
  }
}

const removeRule = (state, action) => {
  let groups = immutableCopy(state.groups);
  if(action.groupId == "mother") {
    delete groups.rules[action.ruleId];
  }
  else {
    delete groups.groups[action.groupId].rules[action.ruleId];
  }
  return {
    ...state,
    groups,
    showConfirm: false
  }
}

const resetRules = (state, action) => {
  let groups = immutableCopy(state.groups);
  if(action.groupId == "mother") {
    groups.rules = {}
  }
  else {
    groups.groups[action.groupId].rules = {}
  }
  return {
    ...state,
    groups
  }
}

export default function (state = initialState, action) {
  switch(action.type) {
    case actionTypes.GET_JSON:
      return getJson(state, action);
    case actionTypes.ADD_GROUP:
      return addGroup(state, action);
    case actionTypes.REMOVE_GROUP:
      return removeGroup(state, action);
    case actionTypes.TOGGLE_CONDITION:
      return toggleCondition(state, action);
    case actionTypes.SHOW_CONFIRM:
      return showConfirm(state, action);
    case actionTypes.CHANGE_LABEL:
      return changeLabel(state, action);
    case actionTypes.CHANGE_OPERATOR:
      return changeOperator(state, action);
    case actionTypes.CHANGE_VALUE:
      return changeValue(state, action);
    case actionTypes.ADD_RULE:
      return addRule(state, action);
    case actionTypes.REMOVE_RULE:
      return removeRule(state, action);
    case actionTypes.RESET_RULES:
      return resetRules(state, action);
    default:
      return state;
  }
}
