import {NATIONALITIES_HUMAN_NAME} from "../../constants/nationalities";

export const contactsFilteredSelector = (state) => {

    if( state?.toolkit?.filterData ) {
        return state?.toolkit?.contactsInitial.filter((contact) => {
            return (
                contact?.location?.city
                    .toLowerCase()
                    .includes(state?.toolkit?.filterData.toLowerCase()) ||
                contact?.location?.country
                    .toLowerCase()
                    .includes(state?.toolkit?.filterData.toLowerCase()) ||
                NATIONALITIES_HUMAN_NAME[contact?.nat]
                    ?.toLowerCase()
                    .includes(state?.toolkit?.filterData.toLowerCase())
            );
        });
    } else {
        return state?.toolkit?.contactsInitial;
    }
}