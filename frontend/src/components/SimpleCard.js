import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
//import './SimpleCard.css';


export class SimpleCard extends React.Component {
   
    render(){

        const useStyles = {
            root: {
              width: "50%",
              margin : "auto",
              backgroundColor : 'black'

            },
            color: {
                color : "red"
            },
            bullet: {
              display: "inline-block",
              margin: "0 2px",
              transform: "scale(0.8)"
            },
            title: {
                fontSize: 14,
                color : "red"
            },
            pos: {
                color:"red",
              marginBottom: 12
            }
          }
        const classes = useStyles;
        return (
        <Card style = {classes.root}>
            <CardContent style={classes.color}>
                <Typography
                    style={classes.title}
                    color="textSecondary"
                    gutterBottom
                >
                    <h2> Task name:  {this.props.tareaN} </h2>
               
                </Typography>
                <Typography style={classes.pos} color="textSecondary">
                    <h3> Prority: {this.props.priority} </h3>
                </Typography>
                <Typography variant="body2" component="p">
                    <p> Date :{this.props.date} </p>
                </Typography>
            </CardContent>
        </Card>
        );
    }
}