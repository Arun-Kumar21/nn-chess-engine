export function fenToBoard(fen: string) {
    const rows = fen.split(" ")[0].split("/");
    return rows.map(row =>
        row
            .replace(/[1-8]/g, match => ".".repeat(Number(match)))
            .split("")
    );
}

export function boardToFen(board: string[][]): string {
    return board.map(row => {
        let fenRow = "";
        let emptyCount = 0;
        
        for (const cell of row) {
            if (cell === ".") {
                emptyCount++;
            } else {
                if (emptyCount > 0) {
                    fenRow += emptyCount.toString();
                    emptyCount = 0;
                }
                fenRow += cell;
            }
        }
        
        if (emptyCount > 0) {
            fenRow += emptyCount.toString();
        }
        
        return fenRow;
    }).join("/");
}

