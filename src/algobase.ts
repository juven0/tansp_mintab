import { Item, Row } from './types'

export const AlgoBase = (rw:Row[]):Item[]=>{
    console.log("ao")
    let items:Item[] =[]
    let stk:number[] = []
    const dmd:number[] = JSON.parse(JSON.stringify(rw[rw.length-1].data))
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
                quantiter:stk[index]<=dmd[indeMin]?stk[index]:dmd[indeMin],
            }
            items = [...items, newItem]
            const hstk = stk[index]
            stk[index] = stk[index]>=dmd[indeMin]?stk[index]-dmd[indeMin]:0
            dmd[indeMin] = hstk<=dmd[indeMin]?dmd[indeMin]-hstk:0
            if(dmd[indeMin] == 0){
                for (let i = 0; i<rw.length-1; i++){
                    rw[i].data[indeMin]= Infinity
                }
            }
            rw[index].data[indeMin] = Infinity
           
        }
    }
    console.log(items)
    return items
}

export const coutTotal = (items:Item[]):number=>{
    let res = 0
    items.map((el:Item)=>{
        res+= el.quantiter*el.valueTag
    })
    return res
}

const minili = (arr:number[]):number=>{
    let indexMin = 0
    let min = arr[0]
    for (let i=0; i<arr.length-1; i++){
        if(arr[i]<min && isFinite(arr[i])){
            min = arr[i]
            indexMin = i
        }
    }
    return indexMin
}