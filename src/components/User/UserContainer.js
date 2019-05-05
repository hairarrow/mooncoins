import React, { useCallback } from "react";
import { useMappedState, useDispatch } from "redux-react-hook";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "../../firebase";
import { actions } from "./UserReducer";
import { Button, Switch } from "antd";

export default function UserContainer() {
  const mapState = useCallback(
    ({ User: { isAnonymous, receiveNotifications, userId } }) => ({
      isAnonymous,
      receiveNotifications,
      userId
    }),
    []
  );

  const { isAnonymous, receiveNotifications, userId } = useMappedState(
    mapState
  );

  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: () => false
    }
  };

  const dispatch = useDispatch();

  const handleLogOut = () => dispatch({ type: actions.logOut });

  const toggleNotification = useCallback(
    receiveNotifications =>
      firebase.functions().httpsCallable("user-updateNotification")({
        userId,
        receiveNotifications
      }),
    [userId]
  );

  return isAnonymous ? (
    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
  ) : (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div style={{ color: "#fff" }}>
        <Switch checked={receiveNotifications} onChange={toggleNotification} />
        <span
          role="button"
          onClick={() => toggleNotification()}
          style={{ fontWeight: 600, paddingLeft: 16, paddingRight: 24 }}
        >
          Email Updates
        </span>
      </div>
      <Button onClick={handleLogOut}>Sign Out</Button>
    </div>
  );
}
