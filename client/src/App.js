import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios'
import EditForm from './components/editForm';

axios.defaults.baseURL = "http://localhost:8000/"

function App() {
  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [formData, setFormData] = useState({
    name : "",
    email : "",
    mobile : "",
  })
  const [formDataEdit, setFormDataEdit] = useState({
    name : "",
    email : "",
    mobile : ""
  })
  const [dataList, setDataList] = useState([])
  const handleOnChange = (e) => {
    const {value, name} = e.target;
    setFormData((prev)=>{
      return{ ...prev, [name] : value }
    })
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    const data = await axios.post('/create', formData)
    getFetchData();
    console.log(data)
    if(data.data.success){
      setAddSection(false)
      alert(data.data.message)
    }
  }
  const getFetchData = async()=>{
    const data = await axios.get('/')
    console.log(data)
    if(data.data.success){
      setDataList(data.data.data)
    }
  }
  useEffect(()=>{
    getFetchData()
  },[])
  const handleDelete = async(id)=>{
    const data = await axios.delete('/delete/'+id)
    if(data.data.success){
      getFetchData();
      alert(data.data.message);
    }
  }
  const handleEditOnChange = async(e) => {
    const {value, name} = e.target;
    console.log(name)
    console.log(value)
    setFormDataEdit((prev)=>{
      return{...prev, [name] : value }
    })
  }
  const handleEdit = (el) => {
    setFormDataEdit(el)
    setEditSection(true)
  }
  const handleUpdate = async(e)=>{
    e.preventDefault();
    const data = await axios.put('/update',formDataEdit)
    getFetchData();
    if(data.data.success){
      setEditSection(false)
      alert(data.data.message);
    }
  }
  return (
    <>
      <div className = "container">
      <button className = "btn btn-add" onClick={()=>setAddSection(true)}>Add</button>
        {addSection&&(
        <EditForm
          handleOnChange = {handleOnChange}
          handleSubmit = {handleSubmit}
          handleClose = {()=>setAddSection(false)}
          rest = {formData}
        />
        )}
        {editSection&&(
          <EditForm
          handleOnChange = {handleEditOnChange}
          handleSubmit = {handleUpdate}
          handleClose = {()=>setEditSection(false)}
          rest = {formDataEdit}
        />
        )}
        <div className='tableContainer'>
        {dataList[0]?(
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  dataList.map((el)=>{
                    return(
                      <tr>
                      <td>{el.name}</td>
                      <td>{el.email}</td>
                      <td>{el.mobile}</td>
                      <td>
                      <button className='btn btn-edit' onClick={()=>handleEdit(el)}>Edit</button>
                      <button className='btn btn-delete' onClick = {()=>handleDelete(el._id)}>Delete</button>
                      </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
            ):(<></>)}
            <div>
            {!dataList[0]?(
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody></tbody>
              </table>
            ):(<></>)}
            {!dataList[0]?(
              <p id = "emptyTable">No Data</p>
            ):(<></>)}
            </div>
        </div>
      </div>
    </>
  );
}

export default App;
