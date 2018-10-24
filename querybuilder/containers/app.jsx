import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from './../store/actions/index';
import Mother from './mother';

import './../style.scss';

class App extends Component {

  componentDidMount() {
    this.props.onGetJson('/catalog/product-label/filters/');
    // this.props.onGetJson(this.props.url); // this is for exporting as a package
  }

  handleGenerateQuery() {
    this.props.onGenerateQuery(this.props.groups);
    this.props.onShowConfirm();
  }

  render() {
    return (
      <div className="queryBuilder">
        <Mother
          groupId="mother"
        />
        <button type="button" className="generateBtn" onClick={() => this.handleGenerateQuery()}>
          Generate and Post Query
        </button>
        {
          this.props.showConfirm &&
          <span>
            <span className="confirm">
              Query is posted!
            </span>
            <span className="confirm note">
              <b>Note:</b> click the Generate button again to re-apply any new changes.
            </span>
          </span>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    groups: state.groups,
    showConfirm: state.showConfirm,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetJson: (url) => dispatch(actions.getJson(url)),
    onGenerateQuery: (groups) => dispatch(actions.generateQuery(groups)),
    onShowConfirm: () => dispatch(actions.showConfirm()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
