import { combineReducers } from "redux";
import TodoReducer from "../reducers/todoReducer";

const initialState = {
  todoReducer: "",
};

const appReducer = combineReducers({
  todoList: TodoReducer,
});

const rootReducer = (state, action) => {
  let newState = state;
  return appReducer(newState, action);
};

export default rootReducer;
export { initialState };
