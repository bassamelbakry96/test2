import { useRef, useState, useEffect, useContext} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import {Link} from 'react-router-dom';
import close from '../assets/close2.svg';
import AuthContext from '../Context/AuthProvider';
import '../Signup/Register.css';
import './Login.css';
import PulseLoader from 'react-spinners/PulseLoader';
import axios from "axios";

const Forgot_password = (props) => {
    
    const {setAuth} = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [email, setemail] = useState("");
    const [errMsg, seterrMsg] = useState("");
    const [Success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const [otp, setotp] = useState(null);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        seterrMsg("");
    }, [email]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try{
            const response =  await axios.post('/API/Auth/ForgetPassword', {email});
            console.log(JSON.stringify(response?.data));
            console.log(response);
            setSuccess(true);
        }
        catch (err){
            if(!err?.response){
                seterrMsg("No Server Response");
            } 
            // else if(err.response?.status === 400){
            //     seterrMsg("Missing email")
            // }
            // else if(err.response?.status === 401){
            //     seterrMsg("Unauthorized")
            // }
            // else{
            //     seterrMsg("Login Failed");
            // }
            // errMsg.current.focus();
        }
        setLoading(false);

    }

    const handleOtp = async ()=>{
        e.preventDefault();
        setLoading(true);
        try {
            const otpresponse = await axios.post('/API/Auth/Verify', {otp});
            console.log(otpresponse);
        } catch (err) {
            console.error('Error during request:', err);
        } finally {
            setLoading(false);
            setotp('');
        }

    }
    return (
        <>
        {
            Success
            ?
            (
                <section className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-12">
                            {/**onSubmit={handleOTP} */}
                            <form onSubmit={handleOtp}>
                                <h3 className="otp-header1 text-center fw-bold lh-base">OTP Verification</h3>
                                <h6 className="otp-header2 text-center fw-semibold lh-base">{`Hi there`}</h6>
                                <p className="otp-paragraph text-center fw-medium lh-base">{`Please type in the Verification code that was send to you at your account`}</p>
                                <div>
                                    <input type="number" 
                                        className="form-control otp-input text-center" 
                                        id="otpInput" 
                                        placeholder="XXXXXX" 
                                        aria-label="otp" 
                                        name='otp'
                                        value={otp} 
                                        onChange={(e) => setotp(e.target.value)}/>
                                </div>
                                <button className="btn submit mt-2 mb-2 btn--border">{loading ? <PulseLoader className='mt-1' size='16' color='white'/>:
                                "Submit"}</button>
                            </form>
                        </div>
                    </div>
                </section>
            )
            :
            (
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
                                                value={email}
                                            />
                                            {/* <div className="mt-3" >
                                                <Link onClick={() => props.setcurrentPage("newpass")} className="forgot">newpass</Link>
                                            </div> */}
                                            <button className="btn submit mt-4">{loading ? <PulseLoader className='mt-1' size='16' color='white'/>:
                                            "Submit"}</button>
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
            )
        }
        </>
               
    )
}

export default Forgot_password