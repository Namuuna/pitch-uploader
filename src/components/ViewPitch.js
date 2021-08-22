import React, {Component} from 'react'
import axios from 'axios'
import { DropzoneArea } from 'material-ui-dropzone';
import { Button } from '@material-ui/core';
import Image from '../uploads/Receipt/0.png'
import loadImages from './LoadImages'


class ViewPitch extends Component {
    constructor(props) {
        super(props);
        this.state={ files: [], images: [] };
        this.convertToArray = this.convertToArray.bind(this);
        this.handleClick = this.handleClick.bind(this);
      }

    componentWillMount() {
        axios.get("http://localhost:8080/query", {params: {action: ""}
        }).then(response => {
            var array = this.convertToArray(response.data)
            console.log(response.data)
            this.setState({
                files: array,
            });
        }).catch(error => {
            console.log(error.response)
        });     
    }

    convertToArray(data) {
        var temp = data.split('\r\n');
        temp = temp.filter(i => i);
        return temp
    }

    handleClick(file) {
        //get image source path
        // axios.get("http://localhost:8080/query", {params: {action: file}
        // }).then(response => {
        //     // var array = this.convertToArray(response.data)
        //     console.log(response.data)
        //     // this.setState({
        //     //     files: array,
        //     // });
        //     // console.log(this.state.files);
        //     const images=loadImages()
        //     this.setState({
        //         images: images
        //     })
        //     console.log(this.state.images);
        // }).catch(error => {
        //     console.log(error.response)
        // });     
        const images = loadImages()
        this.setState({
            images: images
        });
    }

    render() {
        return(
            <div>
                <ul>
                {this.state.files.map(
                    (item, index) => 
                    <li key={item} onClick={() => this.handleClick(item)}>{item}</li>
                )}
                </ul>    
                {/* <img id="image" src={Image} height={100} width={100} /> */}
                { this.state.images.map(({id, src, title, description}) => <img key={id} src={src} title={title} alt={description} />)}
            </div>
        );
    }
}

export default ViewPitch