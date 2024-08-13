import { useRef, useState, useEffect, useContext} from "react";
import axios from '../api/axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import logo from '../assets/logo.png';
import Rec from '../assets/bg.png';
import {Link} from 'react-router-dom';
import close from '../assets/close2.svg';
import AuthContext from '../Context/AuthProvider';
import '../Signup/Register.css';
import './Login.css';


const LOGIN_URL ='/login';

const New_pass = (props) => {
    
    const {setAuth} = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [password, setpassword] = useState();
    const [confirmpass, setconfirmpass] = useState();
    const [errMsg, seterrMsg] = useState("");
    const [Success, setSuccess] = useState(false);

    // useEffect(() => {
        
    // }, []);

    // useEffect(() => {
    //     seterrMsg("");
    // }, [password, confirmpass]);

    const handleSubmit = async (e) => {
        // e.preventDefault();
        // try{
        //     const response = axios.post(LOGIN_URL, 
        //         // {'email':email , "password"}
        //         JSON.stringify({email, password}),
        //         {
        //             headers: {'Content-Type': 'application/json'},
        //             withCredentials: true
        //         }
        //     );
        //     console.log(JSON.stringify(response?.data));
        //     console.log(response);
        //     const token =response?.data?.token;
        //     setAuth({email, password, token});
        //     setemail("");
        //     setpassword("");
        //     setSuccess(true);
        // }
        // catch (err){
        //     if(!err?.response){
        //         seterrMsg("No Server Response");
        //     } 
        //     else if(err.response?.status === 400){
        //         seterrMsg("Missing email or Password")
        //     }
        //     else if(err.response?.status === 401){
        //         seterrMsg("Unauthorized")
        //     }
        //     else{
        //         seterrMsg("Login Failed");
        //     }
        //     errMsg.current.focus();
        // }
    }
    return (
        <>
                <div className="">
                    <section className="container-fluid reg-bg-con">
                        <div className="row vh-100">
                            <div className="col-md-12 col-sm-12">
                                <div className="form-container-log">
                                    <div className="inner">
                                        <div className="close-btn-container">
                                            <Link to="/" className='no-underline-close'><img src={close} onClick={props.onClose}/>
                                            </Link> 
                                        </div>
                                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                                        <div className="row">
                                            <div className="col-12 d-flex justify-content-between align-items-center">
                                                <h1 className="title mx-auto">Enter your Account</h1>
                                            </div>
                                        </div>
                                        <form onSubmit={handleSubmit} className="ms-4 me-4">
                                            <label htmlFor="password">
                                                Password:
                                            </label>
                                            <input
                                                placeholder="********"
                                                className="form-control mt-2"
                                                type="password"
                                                id="password"
                                                required
                                                onChange={(e) => setpassword(e.target.value)}
                                                value={password}
                                            />
                                            <label htmlFor="confirm password">
                                                Password:
                                            </label>
                                            <input
                                                placeholder="********"
                                                className="form-control mt-2"
                                                type="password"
                                                id="password"
                                                required
                                                onChange={(e) => setconfirmpass(e.target.value)}
                                                value={confirmpass}
                                            />
                    
                                            <button className="btn submit mt-4">Submit</button>
                                            {/**!validemail || !validpassword */}
                                            <p className="line mt-2">
                                                Don't have an Account?&nbsp;
                                                <span className="line">
                                                    <Link onClick={() => props.setcurrentPage("register")}>Sign Up</Link>
                                                </span>
                                            </p>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            
        </>
               
    )
}

export default New_pass