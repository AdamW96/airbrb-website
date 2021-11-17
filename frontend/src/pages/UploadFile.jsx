import React, { useState } from 'react';
import fetchFunc from '../services/fetchService'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types'
import {
  Card,
  CardContent,
  Grid,
} from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function UploadFile (props) {
  const { setShowAlert } = props
  const showAlertMsg = (type, content) => {
    setShowAlert({ alertType: type, alertContent: content })
  }
  const history = useHistory()
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);
  const [jsonfiles, setFiles] = useState(null);
  const [state, setState] = useState(true);
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
    function onReaderLoad (event) {
      const obj = JSON.parse(event.target.result);
      if (obj.title === '') {
        showAlertMsg('error', 'Sorry, the title should not be empty')
        setState(false)
      } else if (obj.address.city === '' || obj.address.country === '' || obj.address.postcode === '' || obj.address.state === '' || obj.address.street === '') {
        showAlertMsg('error', 'Please upload the full address')
      } else if (obj.price === '') {
        showAlertMsg('error', 'Sorry, the price should not be empty')
        setState(false)
      } else if (obj.thumbnail === '') {
        showAlertMsg('error', 'Sorry, the thumbnail should not be empty')
        setState(false)
      } else (setFiles(obj));
    }
    const fileReader = new FileReader();
    fileReader.onload = onReaderLoad;
    fileReader.readAsText(event.target.files[0], 'UTF-8');
  };
  const handleSubmission = () => {
    if (state) {
      fetchFunc('/listings/new', 'POST', jsonfiles)
        .then((response) => {
          if (response.status !== 200) {
            return
          }
          history.push('/hosted')
        })
    } else { showAlertMsg('error', 'You should fill in all the correct info before uploading') }
  };

  const classes = useStyles();

  return (
    <Grid container justifyContent='center' style={{ marginTop: 100 }}>
      <Card className={classes.root}>
      <CardContent>
        <div style={{ marginTop: 100 }}>
          <input type="file" name="file" onChange={changeHandler} />
          { isSelected
            ? (
            <div>
              <p>⬛{'  '}The details of this file is:</p>
              <p>➡{'  '}Filename: { selectedFile.name }</p>
              <p>➡{'  '}Filetype: { selectedFile.type }</p>
              <p>➡{'  '}Size in bytes: { selectedFile.size }</p>
              <p>
                ➡{'  '}LastModifiedDate:{' '}
                { selectedFile.lastModifiedDate.toLocaleDateString() }
              </p>
            </div>)
            : (
            <p>Select a file for uploading</p>)
          }
          <div>
            <button onClick={() => { handleSubmission() }}>Submit</button>
          </div>
        </div>
      </CardContent>
      </Card>
    </Grid>
  )
}

UploadFile.propTypes = {
  setShowAlert: PropTypes.any,
}
