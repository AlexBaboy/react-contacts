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
            <ToggleButton aria-label="list" value={DATA_VIEW_MODES.GRID}>
                <ViewListIcon />
            </ToggleButton>
            <ToggleButton aria-label="module" value={DATA_VIEW_MODES.TABLE}>
                <ViewModuleIcon />
            </ToggleButton>
        </ToggleButtonGroup>
    )
}

ToggleDataViewMode.propTypes = {
    dataViewMode: PropTypes.oneOf([DATA_VIEW_MODES.TABLE, DATA_VIEW_MODES.GRID]).isRequired,
    setDataViewMode: PropTypes.func.isRequired
}