import { useState } from "react";


export type SudokuT = {
    board: number[][]
};
const N = 3;
const rows_N = Array.from({ length: N }, (_, index) => index);

type CellT = {
    id: number
};

const cell_id = (br: number, bc: number, sr: number, sc: number) => (br * N + sr) * N * N + (bc * N + sc);

export function SudokuBoard({ sudoku, update_cell }: { sudoku: SudokuT, update_cell: (r: number, c: number, v: number) => void }) {
    const [clickedCell, setClickedCell] = useState<CellT>({
        id: -1
    });

    const isClicked = (cell_id: number) => clickedCell.id == cell_id;


    return (
        <table className="main">
            <thead>
                <tr>
                    <th colSpan={N}>
                        <h1>Sudoku</h1>
                    </th>
                </tr>
            </thead>
            <tbody>
                {rows_N.map(br =>
                    <tr key={`${br}`}>
                        {rows_N.map(bc =>
                            <td key={`${br}-${bc}`}>
                                <table className="sub">
                                    <tbody>
                                        {rows_N.map(sr =>
                                            <tr key={`sr${sr}`}>
                                                {rows_N.map(sc =>
                                                    <td key={`r${br * N + sr}-c${bc * N + sc}`} className={`cell${isClicked(cell_id(br, bc, sr, sc)) ? " clicked" : ""}`}
                                                        onBlur={_ => setClickedCell({ id: -1 })}
                                                        onClick={_ => setClickedCell({ id: cell_id(br, bc, sr, sc) })}>
                                                        <input type="number"
                                                            value={sudoku.board[br * N + sr][bc * N + sc].toString()}
                                                            onChange={e => update_cell(br * N + sr, bc * N + sc, +e.target.value)}
                                                            min={1}
                                                            max={9}></input>
                                                    </td>)}
                                            </tr>)}
                                    </tbody>
                                </table>
                            </td>)}
                    </tr>)}
            </tbody>
            <tfoot>
                <tr>
                    <th colSpan={N}>
                        ----------
                    </th>
                </tr>
            </tfoot>
        </table>
    );
}