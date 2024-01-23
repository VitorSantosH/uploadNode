import React from "react";
import { CircularProgressbar } from "react-circular-progressbar"
import { MdCheckCircle, MdError, MdLink } from "react-icons/md"
import api from "../../services/api";


import { Container, FileInfo, Preview } from './style';



const FileList = ({ files, deleteFile }) => {


    return (
        <Container >
            {files.map(uploadedFile => {
                if (uploadedFile.deletado === false) {
                    return (
                        <li key={uploadedFile.id}  >

                            <FileInfo>
                                <Preview src={uploadedFile.preview} />
                                <div>
                                    <strong>{uploadedFile.name}</strong>
                                    <span>
                                        {uploadedFile.readableSize} {" "}
                                        {uploadedFile.uploaded && (
                                            <button onClick={e => deleteFile(uploadedFile.name)}>
                                                Excluir
                                            </button>
                                        )}

                                    </span>
                                </div>
                            </FileInfo>
                            <div>
                                {(uploadedFile.progress < 100) && !uploadedFile.error && (
                                    <CircularProgressbar styles={{
                                        root: { width: 24 },
                                        path: { stroke: '#7159c1' }
                                    }}
                                        strokeWidth={10}
                                        value={uploadedFile.progress}
                                    />
                                )}

                                {uploadedFile.url && (
                                    <a href={uploadedFile.url}
                                        target={'_blank'}
                                        rel="noopener noreferer">
                                        <MdLink
                                            style={{ marginRight: 8 }}
                                            size={24}
                                            color="#222">
                                        </MdLink>
                                    </a>
                                )}

                                {uploadedFile.uploaded && uploadedFile.progress === 100 && (
                                    <MdCheckCircle size={24} color="#78e5d5" />
                                )}

                                {uploadedFile.error && (
                                    <MdError size={24} color="#e57878" />
                                )}


                            </div>
                        </li>
                    )
                }
            })
            }
        </Container >
    )
}



export default FileList; 