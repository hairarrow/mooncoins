import React, { useCallback } from "react";
import { useMappedState } from "redux-react-hook";
import VolatileListView from "./VolatileListView";

export default function VolatileListContainer() {
  const mapState = useCallback(
    ({ VolatileList: { list, isLoading } }) => ({ list, isLoading }),
    []
  );

  const { list, isLoading } = useMappedState(mapState);

  return <VolatileListView isLoading={isLoading} list={list} />;
}
