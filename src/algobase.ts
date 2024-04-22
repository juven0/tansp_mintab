import { Item, Row } from './types'

export const AlgoBase = (rows:Row[]):Item[]=>{
    let items:Item[] =[]
    let stk:number[] = []
    const dmd:Row = rows[rows.length-1]
    rows.map((el:Row)=>{
        stk = [...stk, el.data[el.data.length-1]]
    })

    rows.map((el:Row, index:number)=>{
        while (stk[index]>0) {
            const indeMin = minili(el.data)
            const newItem:Item = {
                tag: el.tag,
                indexDmd:index,
                valueTag: el.data[indeMin],
                quantiter:stk[indeMin]>dmd.data[indeMin]?dmd.data[indeMin]:stk[indeMin]
            }
            items = [...items, newItem]
            stk[index] = stk[indeMin]>dmd.data[indeMin]?stk[indeMin]-dmd.data[indeMin]:0
            dmd.data[indeMin] = stk[indeMin]>dmd.data[indeMin]?0:dmd.data[indeMin]-stk[indeMin]
            el.data[indeMin] = Infinity
        }
    })
    return items
}

const minili = (arr:number[]):number=>{
    let indexMin = 0
    let min = 0
    for (let i=0; i<arr.length-2; i++){
        if(arr[i]<min){
            min = arr[i]
            indexMin = i
        }
    }
    return indexMin
}