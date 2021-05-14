import { NATIONALITIES_HUMAN_NAME } from "../../constants/nationalities";
import { RootState } from "../../reduxToolkit";
import { Contact } from "../../Interfaces/Contact";

export const contactsFilteredSelector = (state: RootState) => {
  console.log("4 contactsFilteredSelector!");
  if (state?.toolkit?.debouncedFilterData) {
    return state?.toolkit?.list.filter((contact: Contact) => {
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

export const getCurrentContacts = (state: RootState) => {
  console.log("25 getCurrentContacts");
  const contactsFiltered = contactsFilteredSelector(state);
  const indexOfLastContact =
    state.toolkit.currentPage * state.toolkit.contactsPerPage;
  const indexOfFirstContact =
    indexOfLastContact - state.toolkit.contactsPerPage;
  return contactsFiltered.slice(indexOfFirstContact, indexOfLastContact);
};
