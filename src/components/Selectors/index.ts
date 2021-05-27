import { NATIONALITIES_HUMAN_NAME } from "../../constants/nationalities";
import { RootState } from "../../store";
import { Contact } from "../../Interfaces/Contact";
import { createSelector } from "reselect";

export const contactsFilteredSelector = createSelector(
  (state: RootState) => state.toolkit.list,
  (state) => state.toolkit.debouncedFilterData,
  (list, debouncedData) =>
    debouncedData
      ? list.filter((contact: Contact) => {
          return (
            contact.location.city.toLowerCase().includes(debouncedData) ||
            contact.location.country.toLowerCase().includes(debouncedData) ||
            NATIONALITIES_HUMAN_NAME[contact.nat].toLowerCase().includes(debouncedData)
          );
        })
      : list
);


export const getCurrentContacts = createSelector(
    (state: RootState) => contactsFilteredSelector(state),
    (state) => state.toolkit.currentPage * state.toolkit.contactsPerPage,
    (state) => state.toolkit.currentPage * state.toolkit.contactsPerPage - state.toolkit.contactsPerPage,
    (contactsFiltered, indexOfLastContact, indexOfFirstContact) =>
        contactsFiltered.slice(indexOfFirstContact, indexOfLastContact)
)