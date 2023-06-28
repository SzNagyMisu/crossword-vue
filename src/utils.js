const findIndexesByNr = (nr, table) => {
    for (let rowIdx = 0; rowIdx < table.length; rowIdx++) {
        for (let colIdx = 0; colIdx < table[0].length; colIdx++) {
            if (table[rowIdx][colIdx].nr === +nr) {
                return {rowIdx, colIdx};
            }
        }
    }
};

export const findHorizontalWord = (nr, table) => {
    let { rowIdx, colIdx } = findIndexesByNr(nr, table);
    let letters = "";
    while (table[rowIdx][colIdx] && !table[rowIdx][colIdx].isBlack) {
        letters += table[rowIdx][colIdx].value || "_";
        colIdx++;
    }
    return letters;
};

export const findVerticalWord = (nr, table) => {
    let { rowIdx, colIdx } = findIndexesByNr(nr, table);
    let letters = "";
    while (table[rowIdx] && !table[rowIdx][colIdx].isBlack) {
        letters += table[rowIdx][colIdx].value || "_";
        rowIdx++;
    }
    return letters;
};
