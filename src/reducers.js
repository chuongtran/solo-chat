import { fromJS } from 'immutable';
import { STOP_APPLICATION, ADD_MESSAGE, UPDATE_MESSAGE } from './constants';

import Immutable from 'immutable';
const initialState = Immutable.fromJS({
    applicationStopped: false,
    messages: []
});

const MainReducer = (state = initialState, action) => {
  const messages = state.get('messages').toJS();
  switch (action.type) {
    case STOP_APPLICATION:
      return state
              .set('applicationStopped', true);
    case ADD_MESSAGE:
      messages.push(action.message);
      return state
              .set('messages', fromJS(messages));
    case UPDATE_MESSAGE:
      messages.forEach(mess => {
        if (mess.id === action.messageId) {
          mess.content = action.content;
        }
      });
      return state
              .set('messages', fromJS(messages));

    default: return state;
  }
};

export default MainReducer;