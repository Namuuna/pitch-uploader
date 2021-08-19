import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CenteredTabs from './views/View';

class App extends Component {
   render() {
      return (
        <div className="container">
          <CenteredTabs />
        </div>
      )
    }
}
   

  export default App