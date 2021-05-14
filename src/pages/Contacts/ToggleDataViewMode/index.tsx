import ViewListIcon from "@material-ui/icons/ViewList";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { SetStateAction, useCallback } from "react";
import { DATA_VIEW_MODES } from "../constants";
import React from "react";
import { Dispatch } from "react";

interface ToggleDataViewModeProps {
  dataViewMode: string | Dispatch<SetStateAction<string>>;
  setDataViewMode: Dispatch<SetStateAction<string>>;
}

export const ToggleDataViewMode: React.FC<ToggleDataViewModeProps> = ({
  dataViewMode,
  setDataViewMode,
}) => {
  const handleChange = useCallback(
    (_, nextView: string) => {
      setDataViewMode(nextView);
    },
    [setDataViewMode]
  );

  return (
    <ToggleButtonGroup
      orientation="horizontal"
      value={dataViewMode}
      exclusive
      onChange={handleChange}
    >
      <ToggleButton
        aria-label={DATA_VIEW_MODES.GRID}
        value={DATA_VIEW_MODES.GRID}
        data-testid="toggle-view-mode-grid"
      >
        <ViewListIcon />
      </ToggleButton>
      <ToggleButton
        aria-label={DATA_VIEW_MODES.TABLE}
        value={DATA_VIEW_MODES.TABLE}
        data-testid="toggle-view-mode-table"
      >
        <ViewModuleIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
