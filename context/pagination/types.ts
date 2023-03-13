import { monstersData } from "types/monsters";

export type PaginationState = {
  resultsTotal: number;
  filteredList: any;
  currentPage: number;
  entriesPerPage: number;
  numberOfPages: number;
  shownItems: monstersData[];
};

export type Action =
  | { type: "setResultsTotal"; payload: number }
  | { type: "setNumberOfPages"; payload: number }
  | { type: "setEntriesPerPage"; payload: number }
  | { type: "setCurrentPage"; payload: number }
  | { type: "setShownItems"; payload: monstersData[] };

export type PaginationDispatch = (action: Action) => void;
