export type ToggleState = {
    categoryList: boolean;
    watchList: boolean;
};

export type ToggleAction =
    | "CATEGORY_LIST"
    | "WATCH_LIST"
    | "RESET";