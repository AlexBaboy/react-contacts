import ViewListIcon from '@material-ui/icons/ViewList';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import {useCallback} from "react";
import {DATA_VIEW_MODES} from "../constants";
import PropTypes from "prop-types";

export const ToggleDataViewMode = ({dataViewMode, setDataViewMode}) => {

    const handleChange = useCallback((_, nextView) => {
        setDataViewMode(nextView);
    },[setDataViewMode])

    return (
        <ToggleButtonGroup orientation="horizontal" value={dataViewMode} exclusive onChange={handleChange}>
            <ToggleButton
                    aria-label={DATA_VIEW_MODES.GRID}
                    value={DATA_VIEW_MODES.GRID}
                    data-testid='toggle-view-mode-grid'
                >
                <ViewListIcon />
            </ToggleButton>
            <ToggleButton
                    aria-label={DATA_VIEW_MODES.TABLE}
                    value={DATA_VIEW_MODES.TABLE}
                    data-testid='toggle-view-mode-table'
                >
                <ViewModuleIcon />
            </ToggleButton>
        </ToggleButtonGroup>
    )
}

ToggleDataViewMode.propTypes = {
    dataViewMode: PropTypes.oneOf([DATA_VIEW_MODES.TABLE, DATA_VIEW_MODES.GRID]).isRequired,
    setDataViewMode: PropTypes.func.isRequired
}