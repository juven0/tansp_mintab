import { Edge } from "reactflow";
import { Item } from "../types";

const potentiel  = (edges: Edge[])=>{
    let sourceNodes: any[] = [] 
    let targetNodes: any[] = []

    const potentielRef:Edge = edges.sort((a: Edge, b:Edge)=> b.data.value - a.data.value)[0]
    sourceNodes = [...sourceNodes, {source: potentielRef.source, potentiel: 0}]
    let isDone: boolean = false
    let curentpose  = 'source'
    let curentEdge: Edge = potentielRef
    while(isDone){
        const stepEdge = edges.find((el: Edge)=>{
            if(curentpose === 'source' && el.data.checked == false){
                curentpose = 'target'
                return el.target == curentEdge.target 
            }else if(curentpose !== 'source' && el.data.checked == false){
                curentpose = 'source'
                return el.source == curentEdge.source
            }
        })
        if(stepEdge !== undefined){
            const index = edges.indexOf(stepEdge)
            edges[index].data.checked = true
            if(curentpose !== 'source'){
                sourceNodes = [...sourceNodes, {source: stepEdge.source, potentiel: curentEdge.data.value+ stepEdge.data.value}]
            }else{
                targetNodes = [...targetNodes, {target: stepEdge.target, potentiel: curentEdge.data.value - stepEdge.data.value} ]
            }
        }else{
            curentpose = 'source'
            curentEdge = potentielRef
        }
        const endCheck = edges.some((el: Edge)=> el.data.checked === false)
        if(!endCheck){
            isDone = true
        }
    }
}

