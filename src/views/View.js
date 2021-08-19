import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Upload from '../components/Upload';
import ViewPitch from '../components/ViewPitch'
import { TableContainer } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    margin:'auto',
    paddingTop: '10px',
    paddingBottom: '20px',
    width: '50%',
    height:'30%',
  },
});

export default function CenteredTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="UPLOAD" />
        <Tab label="VIEW" />
      </Tabs>
    </Paper>
    {value === 0 && <TableContainer>
      <Upload />
      </TableContainer>}
    {value === 1 && <TableContainer>
    <ViewPitch />
    </TableContainer>}
    </div>
  );
}
