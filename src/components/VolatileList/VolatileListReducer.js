import Types from "../../lib/ScopeTypes";

export const actions = Types("VOLATILE_LIST", {
  updateList: "UPDATE_LIST",
  updateLoading: "UPDATE_LOADING"
});

const initialState = {
  list: [],
  isLoading: true
};

const VolatileListReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.updateList:
      return { ...state, list: action.list };
    case actions.updateLoading:
      return { ...state, isLoading: action.isLoading };
    default:
      return { ...state };
  }
};

export default VolatileListReducer;
