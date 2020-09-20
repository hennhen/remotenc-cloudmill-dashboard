import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

type CircleProps = {
  color: string;
};

const useStyles = makeStyles({
  root: {
    height: 50,
    width: 50,
    backgroundColor: ({ color }: CircleProps) => color,
    borderRadius: '50%',
    marginRight: 15
  }
});

const Circle = (props: CircleProps) => {
  const classes = useStyles(props);
  return <div className={classes.root}></div>;
};

export { Circle };
