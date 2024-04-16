from fastapi import FastAPI
from pydantic import BaseModel, Field
from minizinc import Instance, Model, Solver
import asyncio
from fastapi.middleware.cors import CORSMiddleware



class SudokuPuzzle(BaseModel):
    board: list[list[int]] = Field()

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/solve")
def root(sudoku: SudokuPuzzle):
    for j, row in enumerate(sudoku.board):
        for i, c in enumerate(row):
            print(c, end= " | " if i == 2 or i == 5 else "   ")
        print()
        if j == 2 or j == 5:
            print("---" * 11)

    model = Model("./sudoku.mzn")
    solver = Solver.lookup("gecode")
    inst = Instance(solver, model)
    inst['board'] = sudoku.board
    sudoku.board = inst.solve()['puzzle']
    return sudoku
