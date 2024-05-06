export type Row ={
    tag: string
    length: number
    data: number[]
    isEditable: boolean | false
}

export type Item = {
    tag: string
    indexDmd:number
    valueTag: number
    quantiter:number
}

export type PotentialNode = {
    node: string
    value:number
}