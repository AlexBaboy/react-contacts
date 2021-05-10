import { NATIONALITIES_HUMAN_NAME } from "../../constants/nationalities";

export const contactsFilteredSelector = (state) => {
  if (state?.toolkit?.debouncedFilterData) {
    return state?.toolkit?.contactsInitial.filter((contact) => {
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
    return state?.toolkit?.contactsInitial;
  }
};

export const getIndexOfLastContact = (state) => {
  if (state?.currentPage && state?.contactsPerPage)
    return state?.currentPage * state?.contactsPerPage;
};

export const getIndexOfFirstContact = (state) => {
  const indexOfLastContact = getIndexOfLastContact(state);
  if (indexOfLastContact && state?.contactsPerPage)
    return indexOfLastContact - state?.contactsPerPage;
};

export const getCurrentContacts = (state) => {
  const contactsFiltered = contactsFilteredSelector(state);
  const indexOfFirstContact = getIndexOfFirstContact(state);
  const indexOfLastContact = getIndexOfLastContact(state);
  console.log("indexOfFirstContact", indexOfFirstContact);
  console.log("indexOfLastContact", indexOfLastContact);
  return contactsFiltered.slice(indexOfFirstContact, indexOfLastContact);
};
