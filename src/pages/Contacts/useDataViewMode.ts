import { useEffect, useState } from "react";
import { DATA_VIEW_MODES } from "./constants";

const getInitialDataViewMode = () => {
  return localStorage.getItem("dataViewMode") || DATA_VIEW_MODES.TABLE;
};

export const useDataViewMode = () => {
  const [dataViewMode, setDataViewMode] = useState<string>(
    getInitialDataViewMode
  );

  useEffect(() => {
    localStorage.setItem("dataViewMode", JSON.stringify(dataViewMode));

    return () => {};
  }, [dataViewMode]);

  return [dataViewMode, setDataViewMode] as const;
};
