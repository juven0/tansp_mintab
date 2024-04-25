import { Edge, Node, ReactFlow } from "reactflow"


const Flow = ():JSX.Element=>{
    const nodes:Node[] = []
    const edges:Edge[]=[]
    return(
        <div>
            <ReactFlow
                nodes={nodes}
                edges={edges}
            >

            </ReactFlow>
        </div>
    )
}

export default Flow