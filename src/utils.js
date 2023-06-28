const findIndexesByNr = (nr, table) => {
    for (let rowIdx = 0; rowIdx < table.length; rowIdx++) {
        for (let colIdx = 0; colIdx < table[0].length; colIdx++) {
            if (table[rowIdx][colIdx].nr === +nr) {
                return {rowIdx, colIdx};
            }
        }
    }
};

export const findHorizontalWordByNr = (nr, table) => {
    let { rowIdx, colIdx } = findIndexesByNr(nr, table);
    return findHorizontalWord(rowIdx, colIdx, table);
};
const findHorizontalWord = (rowIdx, colIdx, table) => {
    let letters = "";
    while (table[rowIdx][colIdx] && !table[rowIdx][colIdx].isBlack) {
        const cell = table[rowIdx][colIdx];
        letters += cell.value || "_";
        if (cell.turn === "down") return letters + findVerticalWord(rowIdx + 1, colIdx, table);
        colIdx++;
    }
    return letters;
};

export const findVerticalWordByNr = (nr, table) => {
    let { rowIdx, colIdx } = findIndexesByNr(nr, table);
    return findVerticalWord(rowIdx, colIdx, table);
};
const findVerticalWord = (rowIdx, colIdx, table) => {
    let letters = "";
    while (table[rowIdx] && !table[rowIdx][colIdx].isBlack) {
        const cell = table[rowIdx][colIdx];
        letters += cell.value || "_";
        if (cell.turn === "right") return letters + findHorizontalWord(rowIdx, colIdx + 1, table);
        rowIdx++;
    }
    return letters;
};
