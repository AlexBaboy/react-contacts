import {NATIONALITIES_HUMAN_NAME} from "../../constants/nationalities";

export const contactsFilteredSelector = (filterData, contactsInitial) => {
    console.log("4 filterData", filterData)
    if( filterData ) {
        return contactsInitial.filter((contact) => {
            return (
                contact?.location?.city
                    .toLowerCase()
                    .includes(filterData.toLowerCase()) ||
                contact?.location?.country
                    .toLowerCase()
                    .includes(filterData.toLowerCase()) ||
                NATIONALITIES_HUMAN_NAME[contact?.nat]
                    ?.toLowerCase()
                    .includes(filterData.toLowerCase())
            );
        });
    } else {
        return contactsInitial;
    }
}