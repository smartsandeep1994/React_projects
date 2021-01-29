import React from 'react';
import './Home.css';
import logo from '../logo.svg';
import SVG from '../_logo/the-godfather.svg';
import Godfather from '../Godfather.jpg';
import axios from 'axios';

var sectionStyle = {
    width: "100%",
    height: "450px",
    backgroundImage: "url(" + { Godfather } + ")"
};

// let args = [];

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arrs :[],
            singleArr:'',
            colleagues:[]
        };
    }
    
    componentDidMount(){
        let url1 = 'https://react-backend-get-data.herokuapp.com/users/get_data';
        let url2 = 'http://localhost:5000/users/get_data';
        axios.get(url1)
        .then((result)=>{
            console.log(result.data);
            console.log(result.data[0]);
            this.setState({arrs: result.data});
            this.setState({singleArr: result.data[0]});
            // this.setState({ colleagues:result.data[0].colleagues });
            window.onload = function(){
                var btn1 = document.getElementById("btn1");
                btn1.classList.add("active");
            }
        })
        .catch(err=>{
            console.log(err);
        })      
    }
    handleClick(id){
        
        //remove all active classes from class btn
        var x, i;
        x = document.querySelectorAll(".btn");
        for (i = 0; i < x.length; i++) {
            x[i].classList.remove("active");
        }

        // add class active on the clicked specific id
        var btn = document.getElementById(id);
        console.log(btn);
        btn.classList.add("active");

        //set the state on specific button click
        console.log(id);
        var str = id.substring(3);
        str = str -1;
        console.log(str);
        this.setState({singleArr: this.state.arrs[str]});
    }
    render(){
        console.log(this.state.arrs);
        let singleArr = this.state.singleArr;
        // console.log(this.state.arrs[0]);
        return (
            <div>
                <div className="bg" style={ sectionStyle }>
    
                </div>
    
                <div className="bg2"></div>
    
                <div className="sidebar">
                    <div className="wrapper">
                        <img src={SVG} className="image-logo" alt="logo" />
                        <br/><br/><br/><br/><br/><br/>
                        <div className="vertical-menu">
                            <div id="app">
                                <ul style={{marginLeft:'-40px'}}>
                                    {
                                        this.state.arrs && this.state.arrs.map(arr=>(
                                            <li id={arr.id} key={arr.id} className="btn" onClick={() => {this.handleClick(arr.id)}}>
                                                {arr.name}
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
    
                <div className="right_bar">
                    <div id="app2">
                        {singleArr && 
                            <li id={singleArr.content} style={{listStyleType:'none'}}>
                                <span className="left" style={{paddingRight:'40px'}}>
                                    <img  src={`/assets/_images/Profile_pics/${singleArr.image}`} style={{maxWidth:'200px', border:'1px solid #fff', borderRadius:'3%'}}  />
                                </span>
                                <span className="right">
                                    <div style={{fontSize:'37px', color:'#fff'}}>{singleArr.name}</div>
                                    <div style={{fontSize:'25px', color:'#fff', marginTop:'30px'}} className="animate-box"> 
                                        <div className="progress-wrap">
                                            Popularity
                                            <span>{singleArr.popularity}</span>
                                        </div>
                                    </div>
                                    <div className="biography"> 
                                        <h2>Biography</h2>
                                        <p style={{fontSize:'18px', color:'#a9a9a9', fontWeight:500}}>{singleArr.biography}</p>
                                    </div>
                                </span>
                            </li>
                        }
                    </div>
                </div>
            </div>
        );
    }
};

export default Home;