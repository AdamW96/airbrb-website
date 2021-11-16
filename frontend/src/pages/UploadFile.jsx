import React, { useState } from 'react';
import fetchFunc from '../services/fetchService'
import { useHistory } from 'react-router-dom'

export default function UploadFile () {
  const history = useHistory()
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);
  const [jsonfiles, setFiles] = useState(null);
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
    function onReaderLoad (event) {
      console.log(event.target.result);
      const obj = JSON.parse(event.target.result);
      setFiles(obj);
      console.log(obj);
    }
    const fileReader = new FileReader();
    fileReader.onload = onReaderLoad;
    fileReader.readAsText(event.target.files[0], 'UTF-8');
    console.log(fileReader);
  };
  const handleSubmission = () => {
    fetchFunc('/listings/new', 'POST', jsonfiles)
      .then((response) => {
        if (response.status !== 200) {
          return
        }
        history.push('/hosted')
      })
  };

  return (
   <div style={{ marginTop: 100 }}>
      <input type="file" name="file" onChange={changeHandler} />
      { isSelected
        ? (
        <div>
          <p>Filename: { selectedFile.name }</p>
          <p>Filetype: { selectedFile.type }</p>
          <p>Size in bytes: { selectedFile.size }</p>
          <p>
            lastModifiedDate:{' '}
            { selectedFile.lastModifiedDate.toLocaleDateString() }
          </p>
        </div>)
        : (
        <p>Select a file to show details</p>)
      }
      <div>
        <button onClick={() => { handleSubmission() }}>Submit</button>
      </div>
    </div>
  )
}
