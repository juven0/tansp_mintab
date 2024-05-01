import { Edge, Node } from 'reactflow'
import { Item, Row } from '../types'


export const AlgoBase = (rw:Row[]):Item[]=>{
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
                indexDmd:indeMin,
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

export const makeGrapheNode = (items: Item[]):Node[]=>{
    let curentPosX1:number = 0
    let curentPosX2:number = 0
    const cot:number = 500/items.length
    let nodes:Node[]= []
    items.map((el:Item)=>{
        if(nodes.find(item=>item.data.label == el.tag) == undefined){
            const newNode:Node = {
                id: el.tag,
                type: 'custom',
               
                data: {
                    label: el.tag
                },
                position:{
                    x: curentPosX1,
                    y: 40
                }
            }
            nodes = [...nodes, newNode]
            curentPosX1 +=cot
        }
        if(nodes.find(item=>item.data.label == el.indexDmd)== undefined){
            const newNode:Node = {
                id: el.indexDmd.toString(),
                type: 'custom',
                data: {
                    label: el.indexDmd.toString()
                },
                position:{
                    x: curentPosX2,
                    y:200
                }
            }
            nodes = [...nodes, newNode]
            curentPosX2 +=cot
        }        
    })
    return nodes
}

export const makeGraphEdge = (items :Item[]):Edge[]=>{
    let edges:Edge[]= []
    items.map((el:Item)=>{
        const newEdges:Edge =  { id: el.tag+el.indexDmd, source: el.tag, target: el.indexDmd.toString(), animated: true }
        edges = [...edges, newEdges]
    })
    return edges
}