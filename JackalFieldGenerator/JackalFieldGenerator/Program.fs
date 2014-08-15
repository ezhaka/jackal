open JackalFieldGenerator
open JackalFieldGenerator.ArrayUtils
open Newtonsoft.Json
open Newtonsoft.Json.Serialization
open System.Linq
open System.Collections.Generic

[<EntryPoint>]
let main argv = 
    let fieldSize = 6, 6;

    let typeCounts = [ 
        ({ Type = CellType.Empty; Direction = None }, 12); 
        ({ Type = CellType.Arrow; Direction = Some Direction.Top }, 1)
        ({ Type = CellType.Arrow; Direction = Some (Direction.TopRight ||| Direction.BottomRight ||| Direction.TopLeft ||| Direction.BottomLeft) }, 1)
        ({ Type = CellType.Horse; Direction = None }, 2)
    ]

    let getCell x y content = 
        { Id = x * (fst fieldSize) + y; Content = content; Coords = [| x; y |]; }

    let fieldWithoutWater = 
        typeCounts 
        |> Seq.collect (fun c -> List.init (snd c) (fun _ -> fst c)) 
        |> List.ofSeq
        |> shuffleList
        |> reshapeTo2D (fst fieldSize - 2, snd fieldSize - 2)

    let fillCoords x y =
        let getWaterCell() = getCell x y { Type = CellType.Water; Direction = None }

        match x, y with
        | 0, _ | _, 0 -> getWaterCell()
        | w, _ when w = fst fieldSize - 1 -> getWaterCell()
        | _, h when h = snd fieldSize - 1 -> getWaterCell()
        | _ -> getCell x y fieldWithoutWater.[x - 1, y - 1]

    let field = Array2D.init (fst fieldSize) (snd fieldSize) fillCoords |> reshapeTo1D

    let settings = new JsonSerializerSettings()
    settings.ContractResolver <- new CamelCasePropertyNamesContractResolver()
    settings.NullValueHandling <- NullValueHandling.Ignore

    let converters = new List<JsonConverter>()
    converters.Add(new OptionConverter())

    settings.Converters <- converters
    printfn "%s" (JsonConvert.SerializeObject(field, Formatting.Indented, settings))

    0 // return an integer exit code

