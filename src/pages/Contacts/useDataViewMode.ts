import { useEffect, useState } from "react";
import { DATA_VIEW_MODES } from "./constants";

const getInitialDataViewMode = () => {
  return (
    (JSON.parse(
      <string>localStorage.getItem("dataViewMode")
    ) as typeof DATA_VIEW_MODES) || DATA_VIEW_MODES.TABLE
  );
};

export const useDataViewMode = () => {
  const [dataViewMode, setDataViewMode] = useState(getInitialDataViewMode);

  useEffect(() => {
    localStorage.setItem("dataViewMode", dataViewMode.toString());

    return () => {};
  }, [dataViewMode]);

  return [dataViewMode, setDataViewMode];
};
