import React, {Component} from 'react'
import axios from 'axios'
import { DropzoneArea } from 'material-ui-dropzone';
import { Button } from '@material-ui/core';


class Upload extends Component {
    constructor(props) {
        super(props);
        this.state={ file: [] };
        this.handleChange = this.handleChange.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
      }

    handleChange(files) {
        this.setState({ 
            file: files[0],
        }); 
    }

    handleUpload(event) {
        event.preventDefault();
        var file_to_upload=this.state.file
        if( typeof file_to_upload === 'undefined' || file_to_upload === null ){
            alert("Input file not specified!")
        } else {
            //upload file to server
            const data = new FormData() 
            data.append('file', file_to_upload)

            console.log(data);

            axios.post("http://localhost:8080/upload", data, {
            }).then(response => {
                console.log(response);
                alert("File successfully uploaded!")               
            }).catch(error => {
                console.log(error.response)
                alert("Error uploading file, try again.")
            });

            this.convertFile(file_to_upload.name)
        }
    }

    convertFile(file) {
        axios.post("http://localhost:8080/convert", {}, { params: {
            file: file
        }}).then(response => {
                console.log(response);       
            }).catch(error => {
                console.log(error.response)
            });
    }

    render() {
        return(
            <div className="drop-zone-class">
                <DropzoneArea
                    onChange={(files) => this.handleChange(files)}
                    filesLimit={1}
                    showPreviews={true}
                    showPreviewsInDropzone={false}
                    useChipsForPreview
                /> <br />
                <Button variant="contained" size="large" color="primary" className="upload-button" onClick={this.handleUpload}>Upload</Button>
            </div>
        )
    }
}

export default Upload