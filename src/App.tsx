import { useState } from 'react'
import './App.css'
import './styles/outstyle.css'
import { Item, Row } from './types';
import { AlgoBase, coutTotal } from './algobase';
import Hero from './pages/hero/hero';
const tags = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
function App() {
  const [cout, setCout] = useState(0)
  const [items, setItems]= useState<Item[]>([])
  const [cols, setCols] = useState(1)
  const [rows, setRows] = useState<Row[]>([{
    tag: '#',
    length: cols,
    data: Array.from({length: cols}).fill(0),
    isEditable: false
  } ])
  const addRow = ()=>{
    const data:number[] = Array.from({length: cols}).fill(0)
    const newrows:Row ={
      tag: rows.length == 1? tags[0]: tags[rows.length-1],
      length: cols,
      data: data,
      isEditable: false
    } 
    const lastRow = rows[rows.length-1]
    rows.length<2?
      setRows([newrows, lastRow]):
      setRows([...rows.slice(0,-1), newrows, lastRow])
  }  
  const addCol = ()=>{
    for (const key in rows) {
      rows[key].data = [...rows[key].data, 0]
    }
    setCols(cols+1)
  }

  const optimize = (rows:Row[])=>{
    const a = JSON.parse(JSON.stringify(rows))
    const result = AlgoBase(a)
    setItems(result)
    setCout(coutTotal(result))
  }
const editValue = (value:number,allRow:Row[] ,row:Row, indexData:number):Row[]=>{ 
  const updatedRows = allRow.map((el:Row)=>{
    if(el === row){
      el.data[indexData]=value
    }
    return el
  })
  return updatedRows
}
const makeHead = ():JSX.Element=>{
  return(
    <tr>
        <th>tag</th>
          {Array.from({length:cols}, (_, index)=>(
            index<cols-1?<th>{index+1}</th>:<th>dmd</th>
          ))}
          <th>controle</th>
    </tr>
  )
}
const makeBody = ():JSX.Element =>{
  return(
    <>
    {rows.map((el:Row)=>{
      return(
        <tr>
          <td>{el.tag}</td>
          {Array.from({length:cols}, (_, index)=>(
            <td><input type="number" value={el.data[index]}onChange={(e)=> setRows(editValue(parseInt(e.target.value),rows,el, index))}/></td>
          ))}
          <td><button>{el.isEditable?'edit':'change'}</button></td>
        </tr>
      )
    })}
    </>
  )
}
  

  return (
    <div>
      <Hero/>
      <button onClick={()=>addCol()}>add column</button>
      <button onClick={()=>addRow()}>add rows</button>
      <table border={1}>
        {makeHead()}
        {makeBody()}
      </table>
      <button onClick={()=>optimize(rows)}>optimize</button>

      <label>solution de base {cout?cout:0}</label>
    </div>
  )
}

export default App
