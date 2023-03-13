import React from "react";
import { Action, PaginationDispatch, PaginationState } from "./types";

const initialShownItems = [
  {
    __typename: "Monster",
    index: "aboleth",
    name: "Aboleth",
    image: "/api/images/monsters/aboleth.png",
    xp: 5900,
    size: "LARGE",
    type: "ABERRATION",
    hit_points: 135,
    armor_class: [
      {
        __typename: "MonsterArmorClass",
        value: 17,
      },
    ],
  },
];

const initialPaginationState: PaginationState = {
  resultsTotal: 334,
  filteredList: null,
  currentPage: 1,
  entriesPerPage: 24,
  numberOfPages: 1,
  shownItems: initialShownItems,
};

const reducer = (state: PaginationState, action: Action): PaginationState => {
  switch (action.type) {
    case "setResultsTotal":
      return {
        ...state,
        resultsTotal: action.payload,
      };
    case "setNumberOfPages":
      return {
        ...state,
        numberOfPages: action.payload,
      };
    case "setEntriesPerPage":
      return {
        ...state,
        entriesPerPage: action.payload,
      };
    case "setCurrentPage":
      return {
        ...state,
        currentPage: action.payload,
      };
    case "setShownItems":
      return {
        ...state,
        shownItems: action.payload,
      };
    default:
      throw new Error("Error - pagination action not recognised");
  }
};

const PaginationContext = React.createContext<PaginationState | undefined>(
  initialPaginationState
);

const PaginationDispatchContext = React.createContext<
  PaginationDispatch | undefined
>(undefined);

export const PaginationProvider = ({ children }: any) => {
  const [state, dispatch] = React.useReducer(reducer, initialPaginationState);

  return (
    <PaginationContext.Provider value={state}>
      <PaginationDispatchContext.Provider value={dispatch}>
        {children}
      </PaginationDispatchContext.Provider>
    </PaginationContext.Provider>
  );
};

export const usePagination = (): PaginationState => {
  const context = React.useContext(PaginationContext);
  if (context === undefined) {
    throw new Error("usePagination must be used within a Provider");
  }
  return context;
};

export const usePaginationDispatch = (): PaginationDispatch => {
  const context = React.useContext(PaginationDispatchContext);
  if (context === undefined) {
    throw new Error("usePaginationDispatch must be used within a Provider");
  }
  return context;
};
