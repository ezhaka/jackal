namespace JackalFieldGenerator

type Direction =
    | Top = 0b00000001
    | TopRight = 0b00000010
    | Right = 0b00000100
    | BottomRight = 0b00001000
    | Bottom = 0b00010000
    | BottomLeft = 0b00100000
    | Left = 0b01000000
    | TopLeft = 0b10000000

type CellType = 
    | Empty = 1
    | Arrow = 2
    | Horse = 3
    | Water = 4

type CellContent = {
    Type: CellType
    Direction: Direction option
}

type Cell = {
    Id: int
    Content: CellContent
    Coords: int[]
}
