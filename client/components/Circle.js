import React from 'react';
import PropTypes from 'prop-types';
import { rem } from 'polished';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    height: rem('50px'),
    width: rem('50px'),
    backgroundColor: ({ color }) => color,
    borderRadius: '50%',
    marginRight: rem('15px')
  }
});

const Circle = (props) => {
  const classes = useStyles(props);
  return <div className={classes.root}></div>;
};

Circle.propTypes = {
  color: PropTypes.string.isRequired
};

export default Circle;
