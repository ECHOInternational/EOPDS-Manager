import { InMemoryCache, makeVar } from "@apollo/client";
import { relayStylePagination } from "@apollo/client/utilities";
import i18n from 'i18next';

export const userCurrentLanguage = makeVar(i18n.language);
export const appErrorMessages = makeVar([]);

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        currLang: {
          read () {
            return userCurrentLanguage();
          }
        },
        categories: relayStylePagination(["name","sortDirection","language"]),
      },
    },
  },
});
