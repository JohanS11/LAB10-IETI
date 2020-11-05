import React, {Component} from 'react';
import './TodoApp.css';
import {TodoList} from "./TodoList";
import 'react-datepicker/dist/react-datepicker.css';
import moment from "moment";
import Dialog from './Dialog';
import FilterDialog from './FilterDialog';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import SearchIcon from '@material-ui/icons/Search';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import axios from 'axios';


export class TodoApp extends Component {

    constructor(props) {
        super(props);
        this.state = {items: [], fileUrl : '',file : '',
                            text: '', status: '', dueDate: moment(), responsiblename:'',responsiblemail:'',isOpen:false,isOpenFilter:false,filtering:false};
        this.state.itemsFiltered = [{status:"",dueDate: moment(),responsible:""}];
        this.state.itemsShow = [];

    }

    render() {

        return (
                 
            <div className="App">
                <TodoList todoList={this.state.items}/>     
                <Dialog 
                handleTextChange = {this.handleTextChange}
                handleStatusChange = {this.handleStatusChange}
                handleDateChange = {this.handleDateChange}
                handleRespNameChange = {this.handleRespNameChange}
                handleRespEmailChange = {this.handleRespEmailChange}
                handleSubmit = {this.handleSubmit}
                handleInputChange= {this.handleInputChange}
                handleOpen = {this.handleOpen}
                open = {this.state.isOpen}
                state = {this.state}> 
                </Dialog>

                <Fab aria-label='Add' onClick={() => this.handleOpen()} color='primary' style = {{right: '-45%'}}>  
                    <AddIcon/>   
                </Fab>                  
            </div>
        );
    }

    handleInputChange = (e) => {
        console.log("file");
        console.log(e.target.files[0]);
        this.setState({
            file: e.target.files[0],
            fileUrl : e.target.files[0].name
        });                
    }

    handleOpen = ()=>{
        this.setState({
            isOpen : !this.state.isOpen
        });
    }

    handleTextChange = (e) => {
        this.setState({
            text: e.target.value
        });
    }

    handleStatusChange = (e)=> {
        this.setState({
            status: e.target.value
        });
    }

    handleDateChange = (date) =>{
        this.setState({
            dueDate: date
        });
    }

    handleRespNameChange = (resp) =>{
        this.setState({
            responsiblename: resp.target.value
        });
    }

    handleRespEmailChange = (resp) =>{
        this.setState({
            responsiblemail: resp.target.value
        });
    }


    handleSubmit = (e) => {
        console.log(this.state);
        e.preventDefault();
        if (!this.state.text.length || !this.state.status.length || !this.state.dueDate || !this.state.responsiblemail.length ){
            alert("Debe llenar todos los campos");
            return;}

        
        const newItem = {
            description : this.state.text,
            status: this.state.status,
            dueDate: this.state.dueDate,
            responsible : {
                name : this.state.responsiblename,
                email : this.state.responsiblemail
            },
            fileUrl : "http://localhost:8080/api/files/"+ this.state.fileUrl
        };
        let that = this;
        let data = new FormData();
        data.append('file', this.state.file);
        console.log(data);  
        let url = "http://localhost:8080/api/files";
        axios.post(url, data)
            .then(function (response) {
                console.log("file uploaded!", data);
                that.addTask(newItem);
        })
        .catch(function (error) {
            console.log("File upload failed", error);
        });
         

     
        

        this.setState(prevState => ({
            items: prevState.items.concat(newItem),
            text: '',
            status: '',
            dueDate: null,
            responsible : {
                name : '',
                email : ''
            },
            fileUrl : '',
            file : ''
        }));
        this.handleOpen();
        
    }

    componentDidMount() {
        
        axios.get('http://localhost:8080/api/todo', 
        ).then(response => { 
            console.log(response.data);
            this.setState({
                items: response.data
            });
         })
         .catch(e => {    
            console.log(e);             
            alert("An error has ocurred");

         });            
    }

        addTask = (task) => {
            axios.post('http://localhost:8080/api/todo', 
            task,
            ).then(response => { 
                this.componentDidMount();
             })
             .catch(error => {    
                console.log(error)
                alert("An error has occurred!");
             });        
    }
}
