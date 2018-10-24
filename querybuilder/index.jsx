import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import App from './containers/app';
import reducer from './store/reducers/mainReducer';

const store = createStore(reducer, applyMiddleware(thunk));

const RenderQueryBuilder = () => {
  render(<Provider store={store}>
    <App/>
  </Provider>, document.getElementById('content'),);
};

RenderQueryBuilder();

// this is for trying to export as a package ->

// const RenderQueryBuilder = () => {
//   render(<QueryBuilder endpoint="/navigation/available_query_filters/" />,
//     document.getElementById('content'));
// };
//
// RenderQueryBuilder();
//
//
// const QueryBuilder = (props) => (
//   <Provider store={store}>
//     <App url={props.endpoint} />
//   </Provider>
// );
//
// export default QueryBuilder;
