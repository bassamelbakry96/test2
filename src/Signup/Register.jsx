import { useRef, useState, useEffect } from "react";
import React from 'react'
import '../index.css';
import { faCheck, faTimes, faInfoCircle, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import 'bootstrap/dist/css/bootstrap.min.css';
import close from '../assets/close2.svg';
import {Link} from 'react-router-dom';
import './Register.css';
import axios from "axios";
import PulseLoader from 'react-spinners/PulseLoader';
import otpicon from '../assets/password.png';
import OtpMessage_Modal from "../Components/OtpMessage_Modal";


const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PHONE_REGEX = /^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/;
// const REGISTER_URL = '/register';

const Register = (props) => {

    const userRef = useRef();
    const errRef = useRef();

    const [Fname, setFname] = useState('');
    const [validFname, setValidFname] = useState(false);
    const [FnameFocus, setFnameFocus] = useState(false);

    const [Lname, setLname] = useState('');
    const [validLname, setValidLname] = useState(false);
    const [LnameFocus, setLnameFocus] = useState(false);

    const [email, setemail] = useState('');
    const [validemail, setValidemail] = useState(false);
    const [emailFocus, setemailFocus] = useState(false);

    const [password, setpassword] = useState('');
    const [validpassword, setValidpassword] = useState(false);
    const [passwordFocus, setpasswordFocus] = useState(false);

    const [password_confirmation, setpassword_confirmation] = useState('');
    const [validconfirmation, setValidconfirmation] = useState(false);
    const [confirmationFocus, setconfirmationFocus] = useState(false);

    const [phone, setphone] = useState('');
    const [validphone, setValidphone] = useState(false);
    const [phoneFocus, setphoneFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const [isChecked, setIsChecked] = useState(false);

    const [loading, setLoading] = useState(false);

    const [otp, setotp] = useState();
    const [otpformsg, setotpformsg] = useState();
    const [usercode, setusercode] = useState();
    const [otpfname, setOtpfname] = useState('');
    const [otpemail, setOtpemail] = useState('');

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidFname(USER_REGEX.test(Fname));
    }, [Fname])

    useEffect(() => {
        setValidLname(USER_REGEX.test(Lname));
    }, [Lname])

    useEffect(() => {
        setValidemail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidpassword(PWD_REGEX.test(password));
        setValidconfirmation(password === password_confirmation);
    }, [password, password_confirmation])

    useEffect(() => {
        setValidphone(PHONE_REGEX.test(phone));
    }, [phone])

    useEffect(() => {
        setErrMsg('');
    }, [Fname, Lname, email, password, password_confirmation, phone])

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const values = { fname: Fname, lname: Lname, email, password, password_confirmation, phone };
        setOtpemail(email);
        setOtpfname(Fname);
        console.log(values);
        const v1 = USER_REGEX.test(Fname);
        const v2 = USER_REGEX.test(Lname);
        const v3 = EMAIL_REGEX.test(email);
        const v4 = PWD_REGEX.test(password);
        const v5 = PHONE_REGEX.test(phone);
        const v6 = isChecked;
    
        if (!v1 || !v2 || !v3 || !v4 || !v5 || !v6) {
            setErrMsg("Invalid Entry");
            return;
        }

        try {
            const response =  await axios.post('/API/Auth/Register', values);
            setusercode(response.data.data.user.code);
            setSuccess(true);
            setFname('');
            setLname('');
            setemail('');
            setpassword('');
            setpassword_confirmation('');
            setphone('');
            setIsChecked(false);
        } catch (err) {
            console.error('Error during request:', err);
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else if (err.response?.status === 422) {
                setErrMsg('Email is already taken');
            }else {
                setErrMsg('Registration Failed');
            }
            errRef.current.focus();
        }
        finally{
            setLoading(false);
        }
    };

    const handleOTP = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const otpresponse = await axios.post('/API/Auth/Verify', {user_code:usercode, otp});
            setotpformsg(otpresponse.data.message);
            handleOpen();
        } catch (err) {
            console.error('Error during request:', err);
            setotpformsg('An error occurred while verifying the OTP. Please try again.');
        } finally {
            setLoading(false);
            setotp('');
        }
    };
    
    const close_and_reset = () => {
        props.onClose;
        props.setcurrentPage("register")
        
    }
    
    // if (!isopen) return null
    return (
        <>
            {success ? (
                <section className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-12">
                            <form onSubmit={handleOTP}>
                                <div className="p-3 p-md-5 mx-auto text-center">
                                    <img src={otpicon} alt="OTP Icon" className="img-fluid"/>
                                </div>
                                <h3 className="otp-header1 text-center fw-bold lh-base">OTP Verification</h3>
                                <h6 className="otp-header2 text-center fw-semibold lh-base">{`Hello ${otpfname}`}</h6>
                                <p className="otp-paragraph text-center fw-medium lh-base">{`Thank you for Registering with us, Please type in the Verification code that was send to you at ${otpemail}`}</p>
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
            ) : (
                <section className="conatiner-fluid">    
                    <div className="row vh-100 ">
                        <div className="col-md-12">
                            <div className="inner">
                                <div className="close-btn-container">
                                    <Link to="/" className='no-underline-close'><img src={close} onClick={props.onClose}/>
                                    </Link> 
                                </div>
                                
                                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                                <div className="row">
                                    <div className="col-12 d-flex justify-content-between align-items-center">
                                        <h1 className="title mx-auto">&nbsp;&nbsp;Create a New Account</h1>                                                
                                    </div>
                                </div>
                                <form onSubmit={handleSubmit} className="ms-4 me-4">
                                    <div className="fname-lname">
                                        <div className="row">
                                            <div className="col-sm-6 ">
                                                <div className="inner">
                                                    <label htmlFor="Fname">
                                                        First Name:
                                                        <FontAwesomeIcon icon={faCheck} className={validFname ? "valid" : "hide"} />
                                                        <FontAwesomeIcon icon={faTimes} className={validFname || !Fname ? "hide" : "invalid"} />
                                                    </label>
                                                    <input
                                                        placeholder="Type your first name"
                                                        className="form-control mt-2"
                                                        type="text"
                                                        id="Fname"
                                                        ref={userRef}
                                                        autoComplete="off"
                                                        onChange={(e) => setFname(e.target.value)}
                                                        value={Fname}
                                                        required
                                                        aria-invalid={validFname ? "false" : "true"}
                                                        aria-describedby="uidnote"
                                                        onFocus={() => setFnameFocus(true)}
                                                        onBlur={() => setFnameFocus(false)}/>
                                                    <p id="uidnote" className={FnameFocus && Fname && !validFname ? "instructions" : "offscreen"}>
                                                        <FontAwesomeIcon icon={faInfoCircle} />
                                                        4 to 24 characters.<br />
                                                        Must begin with a letter.<br />
                                                        Letters, numbers, underscores, hyphens allowed.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="inner">
                                                    <label htmlFor="Lname">
                                                        Last Name:
                                                        <FontAwesomeIcon icon={faCheck} className={validLname ? "valid" : "hide"} />
                                                        <FontAwesomeIcon icon={faTimes} className={validLname || !Lname ? "hide" : "invalid"} />
                                                    </label>
                                                    <input
                                                        placeholder="Type your nast name"                                                            
                                                        className="form-control mt-2"
                                                        type="text"
                                                        id="Lname"
                                                        autoComplete="off"
                                                        onChange={(e) => setLname(e.target.value)}
                                                        value={Lname}
                                                        required
                                                        aria-invalid={validLname ? "false" : "true"}
                                                        aria-describedby="uidnote"
                                                        onFocus={() => setLnameFocus(true)}
                                                        onBlur={() => setLnameFocus(false)}
                                                    />
                                                    <p id="uidnote" className={LnameFocus && Lname && !validLname ? "instructions" : "offscreen"}>
                                                        <FontAwesomeIcon icon={faInfoCircle} />
                                                        4 to 24 characters.<br />
                                                        Must begin with a letter.<br />
                                                        Letters, numbers, underscores, hyphens allowed.
                                                    </p>                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <label htmlFor="email">
                                        Email:
                                        <FontAwesomeIcon icon={faCheck} className={validemail ? "valid" : "hide"} />
                                        <FontAwesomeIcon icon={faTimes} className={validemail || !email ? "hide" : "invalid"} />
                                    </label>
                                    <input
                                        placeholder="Type your email"
                                        className="form-control mt-2"
                                        type="text"
                                        id="email"
                                        onChange={(e) => setemail(e.target.value)}
                                        value={email}
                                        required
                                        aria-invalid={validemail ? "false" : "true"}
                                        aria-describedby="emailnote"
                                        onFocus={() => setemailFocus(true)}
                                        onBlur={() => setemailFocus(false)}
                                    />
                                    <p id="emailnote" className={emailFocus && !validemail ? "instructions" : "offscreen"}>
                                        <FontAwesomeIcon icon={faInfoCircle} />
                                        Allowed Email Pattern Username<span aria-label="at symbol">@</span>site<span aria-label="hashtag">.</span>com
                                    </p>

                                    <label htmlFor="phone">
                                        Mobile number:
                                        <FontAwesomeIcon icon={faCheck} className={validphone ? "valid" : "hide"} />
                                        <FontAwesomeIcon icon={faTimes} className={validphone || !phone ? "hide" : "invalid"} />
                                    </label>
                                    <input
                                        placeholder="+966 512 345 678"
                                        className="form-control mt-2"
                                        type="number"
                                        id="phone"
                                        onChange={(e) => setphone(e.target.value)}
                                        value={phone}
                                        required
                                        aria-invalid={validphone ? "false" : "true"}
                                        aria-describedby="phonenote"
                                        onFocus={() => setphoneFocus(true)}
                                        onBlur={() => setphoneFocus(false)}
                                    />
                                    <p id="phonenote" className={phoneFocus && !validphone ? "instructions" : "offscreen"}>
                                        <FontAwesomeIcon icon={faInfoCircle} />
                                        Saudia Arabia phone number<br />
                                    </p>

                                    <label htmlFor="password">
                                        Password:
                                        <FontAwesomeIcon icon={faCheck} className={validpassword ? "valid" : "hide"} />
                                        <FontAwesomeIcon icon={faTimes} className={validpassword || !password ? "hide" : "invalid"} />
                                    </label>
                                    <input
                                        placeholder="********"
                                        className="form-control mt-2"
                                        type="password"
                                        id="password"
                                        onChange={(e) => setpassword(e.target.value)}
                                        value={password}
                                        required
                                        aria-invalid={validpassword ? "false" : "true"}
                                        aria-describedby="passwordnote"
                                        onFocus={() => setpasswordFocus(true)}
                                        onBlur={() => setpasswordFocus(false)}
                                    />
                                    <p id="passwordnote" className={passwordFocus && !validpassword ? "instructions" : "offscreen"}>
                                        <FontAwesomeIcon icon={faInfoCircle} />
                                        8 to 24 characters.<br />
                                        Must include uppercase and lowercase letters, a number and a special character.<br />
                                        Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                                    </p>

                                    <label htmlFor="password_confirmation">
                                        Confirm Password:
                                        <FontAwesomeIcon icon={faCheck} className={validconfirmation && password_confirmation ? "valid" : "hide"} />
                                        <FontAwesomeIcon icon={faTimes} className={validconfirmation || !password_confirmation ? "hide" : "invalid"} />
                                    </label>
                                    <input
                                        placeholder="********"
                                        className="form-control mt-2"
                                        type="password"
                                        id="password_confirmation"
                                        onChange={(e) => setpassword_confirmation(e.target.value)}
                                        value={password_confirmation}
                                        required
                                        aria-invalid={validconfirmation ? "false" : "true"}
                                        aria-describedby="confirmnote"
                                        onFocus={() => setconfirmationFocus(true)}
                                        onBlur={() => setconfirmationFocus(false)}
                                    />
                                    <p id="confirmnote" className={confirmationFocus && !validconfirmation ? "instructions" : "offscreen"}>
                                        <FontAwesomeIcon icon={faInfoCircle} />
                                        Must match the first password input field.
                                    </p>

                                    <div className="form-check">
                                        <input 
                                            className="form-check-input mt-3" 
                                            type="checkbox" 
                                            value="" 
                                            id="defaultCheck1"
                                            checked={isChecked}
                                            onChange={handleCheckboxChange}/>
                                        <label 
                                            className="form-check-label mt-3" 
                                            for="defaultCheck1">
                                            &nbsp; By clicking (Signup) I'm confirming that I'm 16 or older, and I accept the <a href="#">Terms of Use</a>
                                        </label>
                                    </div>
                                    
                                    <button className="btn submit mt-2 mb-2 btn--border" disabled={!validFname || !validLname || !validemail || !validpassword || !validconfirmation || !validphone || !isChecked ? true : false}>{loading ? <PulseLoader className='mt-1' size='16' color='white'/>:
                                        "Sign Up"}</button>
                                    
                                    <p className="line">
                                        Already registered?&nbsp;
                                        <span className="line">
                                            {/*put router link here*/}
                                            <Link onClick={() => props.setcurrentPage("login")}>Sign In</Link>
                                        </span>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>        
                </section>
                
            )}
            <OtpMessage_Modal
            open={open}
            handleOpen={handleOpen}
            handleClose={handleClose}
            msg={otpformsg}
          />
        </>
    )

}

export default Register