import { createSelector } from 'reselect';

const selectGlobal = () => state => state;
const selectApplicationStopped = () => createSelector(
  selectGlobal(),
  state => (state ? state.get('applicationStopped') : false),
);

const selectMessages = () => createSelector(
  selectGlobal(),
  state => (state ? state.get('messages').toJS() : []),
);
export {
  selectApplicationStopped,
  selectMessages
}