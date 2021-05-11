import { NATIONALITIES_HUMAN_NAME } from "../../constants/nationalities";

export const contactsFilteredSelector = (state) => {
  console.log("4 contactsFilteredSelector!");
  if (state?.toolkit?.debouncedFilterData) {
    return state?.toolkit?.list.filter((contact) => {
      return (
        contact?.location?.city
          .toLowerCase()
          .includes(state?.toolkit?.debouncedFilterData) ||
        contact?.location?.country
          .toLowerCase()
          .includes(state?.toolkit?.debouncedFilterData) ||
        NATIONALITIES_HUMAN_NAME[contact?.nat]
          ?.toLowerCase()
          .includes(state?.toolkit?.debouncedFilterData)
      );
    });
  } else {
    return state?.toolkit?.list;
  }
};

export const getCurrentContacts = (state) => {
  const contactsFiltered = contactsFilteredSelector(state);
  const indexOfLastContact =
    state.toolkit.currentPage * state.toolkit.contactsPerPage;
  const indexOfFirstContact =
    indexOfLastContact - state.toolkit.contactsPerPage;
  return contactsFiltered.slice(indexOfFirstContact, indexOfLastContact);
};
