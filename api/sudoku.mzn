include "alldifferent.mzn";
array[int,int] of int: board;
set of int: PuzzleRange = index_set_1of2(board);
int: N = max(PuzzleRange);
int: S = floor(sqrt(N));

constraint assert(index_set_2of2(board) = PuzzleRange, "The board should be a square array"); 
constraint assert(S * S == N, "The board size should be a square of a natural number");
constraint assert(min(board) = 0, "The board should contain at least one empty space and no negative values");
constraint assert(max(board) <= N, "The board shouldn't contain values bigger than the board size");


array[1..N,1..N] of var 1..N: puzzle;

constraint forall([alldifferent(puzzle[r,1..N]) | r in PuzzleRange]);
constraint forall([alldifferent(puzzle[1..N,c]) | c in PuzzleRange]);

constraint forall([
alldifferent(
puzzle[((i-1)*S + 1)..i*S,((j-1)*S + 1)..j*S]) | i in 1..S, j in 1..S]);

constraint 
forall([
count([board[r,1..N][i] != 0 | i in PuzzleRange]) == 
count([board[r,1..N][i] == puzzle[r,1..N][i] | i in PuzzleRange])
| r in PuzzleRange ]);


solve satisfy;