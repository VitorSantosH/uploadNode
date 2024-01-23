import React, { useState, useEffect } from "react";
import Global from './styles/Global'
import { Content, Container } from "./styles";
import Upload from "./components/Upload";
import FileList from "./components/fileList";
import { uniqueId } from "lodash";
import filesize from 'filesize';
import api from "./services/api";
import baseUrl from './services/config';


function App() {



  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [imgsUpadas, setimgsUpadas] = useState([]);

  useEffect(()=> {
    api.get("posts")
      .then(res => {
        console.log(res)
        setUploadedFiles(res.data.map(file => {
          const obj = {
            file,
            id: file._id, 
            name: file.key,
            readableSize: filesize(file.size),
            progress: 100,
            preview: file.url,
            url: file.url,
            error: false,
            uploaded: true,
            deletado: false
          }

          return obj
        }))
      })
      .catch(err => {
        console.log(err)
      })

  }, [])

  function handleUpload(files) {


    var uploaded = files.map(file => ({

      file: file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: (URL.createObjectURL(file)),
      progress: 0,
      uploaded: false,
      error: false,
      url: null,
      deletado: false

    }))

    setUploadedFiles(uploadedFiles.concat(uploaded));




  };



  processUpload();


  function processUpload() {


    uploadedFiles.map(uploadedFile => {

      if (uploadedFile === null) {
        return
      }
      if (uploadedFile.uploaded == true) {

        return;
      } else {

        var data = new FormData();
        data.append('file', uploadedFile.file, uploadedFile.name);
        var progress
        api.post('/posts', data, {

          onUploadProgress: e => {

            progress = parseInt(Math.round((e.loaded * 100) / e.total));



            updateFile(uploadedFile.id, {
              progress,
            }
            )

          }
        }).then(response => {
          setUploadedFiles(uploadedFiles.map(file => {
            console.log(response.data._id)
            if (file.key === uploadedFile.key) {
              return { ...file, uploaded: true, url: `${response.data.url}`, progress: 100 }
            }

          }))
        }).catch(err => {
          console.log(err)
          return err
        })



      }

      return uploadedFile.uploaded = true;
    })



  }




  function updateFile(id, data) {
    setUploadedFiles(uploadedFiles.map(uploadedFile => {
      return id == uploadedFile.id ? { ...uploadedFile, ...data, } : uploadedFile
    }))

  }



  const deleteFile = (name) => {

    api.delete(`/posts/${name}`).then(res => {

      setUploadedFiles(uploadedFiles.map(file => {
        if (file.name === name) {
          return { ...file, deletado: true }
        }
        return file
      }))

    }).catch(err => {
      console.log(err)
    })

  }



  return (

    <Container>
      <Content>
        <Upload onUpload={e => handleUpload(e)} />
        {!!uploadedFiles.length && <FileList files={uploadedFiles} deleteFile={deleteFile} />}
      </Content>
      <Global />
    </Container>
  );
}

export default App;
