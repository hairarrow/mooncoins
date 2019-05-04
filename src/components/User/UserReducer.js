import Types from "../../lib/ScopeTypes";

export const actions = Types("USER", {
  setLoading: "SET_LOADING",
  setId: "SET_ID",
  updateNotifications: "UPDATE_NOTIFICATIONS",
  anonymousLogin: "ANONYMOUS_LOGIN"
});

const initialState = {
  isLoading: null,
  isAnonymous: null,
  userId: null,
  receiveNotifications: null
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.setLoading:
      return { ...state, isLoading: action.isLoading };
    case actions.setId:
      return { ...state, userId: action.userId };
    case actions.anonymousLogin:
      return { ...state, isAnonymous: action.isAnonymous };
    default:
      return { ...state };
  }
};

export default UserReducer;
