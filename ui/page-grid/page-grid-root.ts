import * as stylex from "@stylexjs/stylex";

/**
 * Equal columns on the sheet. Home and the error page share this count.
 */
export const PAGE_GRID_COLUMNS = 12;

export const pageGridStyles = stylex.create({
  root: {
    boxSizing: "border-box",
    display: "grid",
    flexGrow: 1,
    gridTemplateColumns: `repeat(${PAGE_GRID_COLUMNS}, minmax(0, 1fr))`,
    width: "100%",
    minHeight: 0,
  },
});
