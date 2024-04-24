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
    <tr className='text-lg'>
        <th className=' block w-14 bg-gray-200 p-2'>tag</th>
          {Array.from({length:cols}, (_, index)=>(
            index<cols-1?<th className='m-5 bg-gray-200 p-2'>{index+1}</th>:<th className='m-5 bg-gray-200 p-2' >dmd</th>
          ))}
          <th className='bg-gray-200 p-2'>controle</th>
    </tr>
  )
}
const makeBody = ():JSX.Element =>{
  return(
    <>
    {rows.map((el:Row)=>{
      return(
        <tr>
          <td className='w-12 text-lg font-extrabold'>{el.tag}</td>
          {Array.from({length:cols}, (_, index)=>(
            <td className=''><input className='text-lg w-16 p-1  h-full flex justify-center items-center'
             type="number" value={el.data[index]}onChange={(e)=> setRows(editValue(parseInt(e.target.value),rows,el, index))}/></td>
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
      <div className="-translate-y-60 w-full flex flex-col justify-center items-center ">
        <div className='flex w-1/2 justify-center z-20 mb-10'>
          <button className='w-48 outline-0 shadow-lg mx-2.5 bg-gray-300 border-none font-bold text-white'
            onClick={()=>addCol()}>add column</button>
          <button className='w-48 shadow-lg mx-2.5 bg-gray-300 border-none font-bold text-white'
            onClick={()=>addRow()}>add rows</button>
        </div>
        <table className='mb-14'
         border={1}>
          {makeHead()}
          {makeBody()}
        </table>
        <button className='bg-purple-600 w-52 text-white'
          onClick={()=>optimize(rows)}>optimize</button>
        <div className='w-full relative mt-10' >
          <div className='absolute top-0 left-0 w-full flex justify-start flex-col items-start'>
          <label className='block   text-2xl font-bold text-purple-500 '>Resultats</label>
          <label className='block text-xl font-semibold'>Solution de base</label>
          {cout? <p>teny kely manazave ny resulta azo ...</p>:''}
          <p className='mt-10 p-2 text-gray-100 text-3xl font-bold bg-green-500 rounded'>{cout?`Z = ${cout}`:''}</p>
          </div>
          
        </div>
        
        </div>
    </div>
  )
}

export default App
