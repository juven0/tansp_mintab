import { memo } from "react"
import { Handle, Position } from "reactflow"


const CustomNode = ({
    data, 
    isConnectable,
    targetPosition = Position.Top,
    sourcePosition = Position.Bottom
})=>{
    return(
        <>
            <Handle 
                type='target'
                position={targetPosition}
                isConnectable ={isConnectable}
            />
            <label >{data.label}</label>
            <Handle
                type='source'
                position={sourcePosition}
                isConnectable={isConnectable}
            />
        </>
    )
}

export default memo(CustomNode)