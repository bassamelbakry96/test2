import { useRef, useState, useEffect, useContext} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import {Link} from 'react-router-dom';
import close from '../assets/close2.svg';
import '../Signup/Register.css';
import './Login.css';
import axios from "axios";
import PulseLoader from 'react-spinners/PulseLoader';
import success from '../assets/sucess.svg'
import useAuth from "../hooks/useAuth";
// import StatusContext from "../Context/StatusProvider";
import { useDispatch } from "react-redux";
import {login} from '../features/UserSlice'

const Login = (props) => {
    
    const {setAuth} = useAuth();
    // const {setstatus} = useContext(StatusContext);

    const userRef = useRef();
    const errRef = useRef();

    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [errMsg, seterrMsg] = useState("");
    const [Success, setSuccess] = useState(false);

    const [posts, setPosts] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loginmsg, setloginmsg] = useState(null);
    
    const settheloginmessage =(response)=>{
        if(!response.data.code){
            setloginmsg(response.data.message);
        } else if(response.data.code == 200){
            setloginmsg(response.data.message);
        } else if(response.data.code == 400){
            setloginmsg(response.data.message)
        } else if(response.data.code == 401){
            setloginmsg(response.data.message)
        } else if(response.data.code == 404){
            setloginmsg(response.data.message)
        } else if(response.data.code == 422){
            setloginmsg(response.data.message)
        }else{
            setloginmsg("else Login Failed")
        }
    }

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        seterrMsg("");
    }, [email, password]);

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const values = { email, password };
        let response = null;
        setLoading(true);
        setloginmsg('');
        try {
            response = await axios.post('/API/Auth/Login', values);
            console.log(JSON.stringify(response?.data));
            const token = response?.data?.data.access_token;
            dispatch(login({
                email: email,
                password: password,
                token: token,
                loggedin: true,
            }));
            setAuth({ email, password, token });
            settheloginmessage(response); // Use response.status here
            setLoading(false);
            setSuccess(true);
        } catch (err) {
            seterrMsg(err.message);
            errRef.current.focus();
        } finally {
            
        }
    };
    
    return (
        <>
                {Success ? (
                <section>
                    <div className="container d-flex justify-content-center align-items-center">
                        <div className="row">
                            <div className="col-12 col-md-12 text-center">
                                <Link to="/" >
                                    <img src={success} alt="" />
                                </Link>
                                <p className="mt-4">{loginmsg}</p>
                                <button className="btn mt-2 mb-2 btn--border" onClick={props.onClose}>ok</button>
                            </div>
                        </div>
                    </div>
                </section>):(
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
                                                <h1 className="title mx-auto">Sign in to your Account</h1>
                                            </div>
                                        </div>
                                        <form onSubmit={handleSubmit} className="ms-4 me-4">
                                            <label htmlFor="email">
                                                Email:
                                            </label>
                                            <input
                                                placeholder="Type your email"
                                                className="form-control mt-2"
                                                type="text"
                                                id="email"
                                                ref={userRef}
                                                autoComplete="off"
                                                required
                                                onChange={(e) => setemail(e.target.value)}
                                                value={email}/>
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
                                                value={password}/>
                                            <div className="row">
                                                <div className="col-12 d-flex justify-content-between align-items-center">
                                                    <div className="form-check">
                                                        <input 
                                                            className="form-check-input mt-3" 
                                                            type="checkbox" 
                                                            value="" 
                                                            id="defaultCheck1"
                                                        />
                                                        <label 
                                                            className="form-check-label mt-3" 
                                                            htmlFor="defaultCheck1">
                                                            &nbsp; Remember Me
                                                        </label>
                                                    </div>        
                                                    <div className="mt-3" >
                                                        <Link onClick={() => props.setcurrentPage("forgotpass")} className="forgot">Forgot Password?</Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="btn submit mt-3" disabled={false   ? true : false}>{loading ? <PulseLoader className='mt-1' size='16' color='white'/>:
                                            "Sign In"}</button>
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
            
            )}
        </>
               
    )
}

export default Login