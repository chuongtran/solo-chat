import { STOP_APPLICATION, ADD_MESSAGE, UPDATE_MESSAGE } from './constants';

export function stopApplication() {
  return { type: STOP_APPLICATION };
}
export function addMessage(message) {
  return { type: ADD_MESSAGE, message };
}
export function updateMessage(messageId, content) {
  return { type: UPDATE_MESSAGE, messageId, content };
}
