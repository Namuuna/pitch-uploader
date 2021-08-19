import React, {Component} from 'react'
import axios from 'axios'
import { DropzoneArea } from 'material-ui-dropzone';
import { Button } from '@material-ui/core';


class ViewPitch extends Component {
    constructor(props) {
        super(props);
        this.state={ files: [], selectedFile: null };
        this.convertToArray = this.convertToArray.bind(this);
        this.handleClick = this.handleClick.bind(this);
      }

    componentWillMount() {
        axios.get("http://localhost:8080/query", {params: {action: 'query'}
        }).then(response => {
            var array = this.convertToArray(response.data)
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
        console.log(file);
    }

    render() {
        return(
            <div class="centered">
                <ul>
                {this.state.files.map(item => (
                    <li key={item} onClick={{item} => this.handleClick(item)}>{item}</li>
                ))}
                </ul>
            </div>
        );
    }
}

export default ViewPitch