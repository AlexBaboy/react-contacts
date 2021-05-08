import { NATIONALITIES_HUMAN_NAME } from "../../constants/nationalities";

export const contactsFilteredSelector = (state) => {
  if (state?.toolkit?.debouncedFilterData) {
    return state?.toolkit?.contactsInitial.filter((contact) => {
      return (
        contact?.location?.city
          .toLowerCase()
          .includes(state?.toolkit?.debouncedFilterData.toLowerCase()) ||
        contact?.location?.country
          .toLowerCase()
          .includes(state?.toolkit?.debouncedFilterData.toLowerCase()) ||
        NATIONALITIES_HUMAN_NAME[contact?.nat]
          ?.toLowerCase()
          .includes(state?.toolkit?.debouncedFilterData.toLowerCase())
      );
    });
  } else {
    return state?.toolkit?.contactsInitial;
  }
};
