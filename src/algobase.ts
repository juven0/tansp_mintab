import { Item, Row } from './types'

export const AlgoBase = (rw:Row[]):Item[]=>{
    console.log("ao")
    let items:Item[] =[]
    let stk:number[] = []
    const dmd:Row = rw[rw.length-1]
    rw.map((el:Row)=>{
        stk = [...stk, el.data[el.data.length-1]]
    })

    for (let index = 0; index<rw.length-1; index++){
        while (stk[index]>0) {
           const indeMin = minili(rw[index].data)
            const newItem:Item = {
                tag: rw[index].tag,
                indexDmd:index,
                valueTag: rw[index].data[indeMin],
                quantiter:stk[index]<=dmd.data[indeMin]?stk[index]:dmd.data[indeMin],
            }
            items = [...items, newItem]
            stk[index] = stk[index]>=dmd.data[indeMin]?stk[index]-dmd.data[indeMin]:0
            dmd.data[indeMin] = stk[index]>=dmd.data[indeMin]?0:(dmd.data[indeMin]-stk[index])
            rw[index].data[indeMin] = Infinity
        }
    }
    return items
}

const minili = (arr:number[]):number=>{
    let indexMin = 0
    let min = arr[0]
    for (let i=0; i<arr.length-1; i++){
        if(arr[i]<min){
            min = arr[i]
            indexMin = i
        }
    }
    return indexMin
}