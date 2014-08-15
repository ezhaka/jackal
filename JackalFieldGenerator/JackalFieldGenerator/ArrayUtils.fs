namespace JackalFieldGenerator

module ArrayUtils =
    let reshapeTo2D shape (list: _ list) = 
        let width = fst shape
        Array2D.init width (snd shape) (fun x y -> list.[y * width + x]) 

    let reshapeTo1D (array2d: _[,]) = 
        [ for x in array2d do yield x ]

    let shuffleList (list: _ list) =
        let filteri func (list: _ list) =
            [ for indx in [0 .. (list.Length - 1)] -> if func indx then Some indx else None ]
            |> Seq.filter (fun indx -> indx.IsSome)
            |> Seq.map (fun indx -> list.[indx.Value])
            |> List.ofSeq

        let rec shuffle (list: _ list) =
            seq {
                match list with
                | [el] -> yield el 
                | _ -> 
                    let rnd = new System.Random()
                    let indx = rnd.Next(0, list.Length)
                    yield list.[indx]
                    yield! shuffle (list |> filteri (fun i -> i <> indx)) 
            }

        shuffle list |> List.ofSeq
