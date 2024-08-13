import React, { useEffect, useState } from 'react';
import './My_Account_body.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Button } from '../Button/Button';
import Card from './card/card';
import { Link } from 'react-router-dom';
import questionmark from '../../assets/questionmark.svg';
import QRCode from 'react-qr-code';
import LogoutModal from '../LogoutModal';
import axios from 'axios';
import { useSelector } from "react-redux";
import { selectUser } from "../../features/UserSlice";
import { useDispatch } from "react-redux";
import { logout } from "../../features/UserSlice";
import { useNavigate } from 'react-router-dom';

function My_Account_body() {
    const [values, setValues] = useState({
        fname: '',
        lname: '',
        email: '',
        password: '',
        phone: ''
    });
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [btn1, setBtn1] = useState(true);
    const [btn2, setBtn2] = useState(false);
    const [btn3, setBtn3] = useState(false);
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const user = useSelector(selectUser);
    const token = user?.token;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
        async function getAccount() {
            try {
                const { data } = await axios.get('/API/Auth/UserInfo', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(data.fname)
                setValues(
                    {   fname: data.fname, 
                        lname: data.lname, 
                        email: data.email, 
                        password: data.password,
                        phone:  data.phone});
                setCode(data.code);
                
            } catch (error) {
                console.error('Error fetching account information:', error);
            }
        }




    useEffect(() => {
        getAccount()
    }, [token]);


    function handleChange(e) {
        const { name, value } = e.target;
        setValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const { data } = await axios.post('/API/Auth/UpdateProfile', values, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json"
                }
            });
            console.log("Profile updated:", data);
        } catch (error) {
            console.error("Error updating profile:", error);
            setError("Failed to update profile.");
        } finally {
            setLoading(false);
        }
    };    

    useEffect(() => {
        getAccount();
    }, []);

    const setBtnOne = () => {
        setBtn1(true);
        setBtn2(false);
        setBtn3(false);
    };
    const setBtnTwo = () => {
        setBtn1(false);
        setBtn2(true);
        setBtn3(false);
    };
    const setBtnThree = () => {
        setBtn1(false);
        setBtn2(false);
        setBtn3(true);
    };

    const handleDelete = async () => {
        try {
            await axios.post(
                `/API/Auth/${code}/deleteUser`, 
                {}, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            dispatch(logout());
            navigate('/'); 
        } catch (err) {
            console.log('Error deleting user:', err);
        }
    }
    
    return (
        <>
            <div className='container mt-5 px-3'>
                <div className="row">
                    <div className="d-flex justify-content-between align-items-center wrapper">
                        <p className="fw-normal ps-5 home-slash">
                            Home/ <span className="fw-medium slash">My Account</span>
                        </p>
                        <div className='sign-out-btn-top'>
                            <Button className="log-out-btn" buttonStyle="btn--circular2" onClick={handleDelete}>
                                Delete My Account
                            </Button>
                        </div>
                    </div>
                    <div className="col-md-3 mb-5 px-4">
                        <div className="card my-count-btns-card">
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title fw-semibold mt-2 ms-3 lh-base hello-msg">{`Hello ${values.fname}`}</h5>
                                <hr/>
                                <div className="d-flex flex-column flex-grow-1">
                                    <button onClick={setBtnOne} className={btn1 ? 'btn btn-myacc-active text-start fw-semibold' : 'btn btn-myacc text-start fw-semibold'}>My Account</button>
                                    <button onClick={setBtnTwo} className={btn2 ? 'btn btn-myacc-events-active text-start fw-semibold' : 'btn btn-myacc-events text-start fw-semibold'}>Events</button>
                                    <button onClick={handleOpen} className={btn3 ? 'btn btn-myacc-signout-active text-start fw-semibold' : 'btn btn-myacc-signout text-start fw-semibold'}>Sign Out</button>
                                </div>
                                <Link to='/contactus'>
                                    <Button className="log-out-btn mt-auto" buttonStyle="btn--circular2">
                                        Contact Us <img src={questionmark} alt="" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    
                    {btn1 && 
                    <div className="col-md-9">
                        <div className="card mb-5">
                            <div className="card-body">
                                <div className="first-section-myacc-edit d-flex">
                                    <label htmlFor="exampleFormControlInput1" className="form-label my-profile-lab text-start fw-semibold lh-sm">My Profile</label>
                                    <div className="inputs-fsme w-75">
                                        <input className="form-control disabled-textfield bg-white mb-2 border-0 text-start fw-semibold lh-sm" 
                                                type="text" value={`${values.fname} ${values.lname}`} 
                                                aria-label="Disabled input example" 
                                                disabled readOnly/>
                                        <input className="form-control disabled-textfield bg-white border-0 text-start fw-semibold lh-sm" 
                                                type="text" 
                                                value={values.email} 
                                                aria-label="Disabled input example" 
                                                disabled readOnly/>
                                    </div>
                                    <QRCode
                                        size={90}
                                        bgColor='white'
                                        fgColor= '#012572'
                                        value={code}
                                    />
                                </div>
                                <hr/>
                                <div className="second-section-myacc-edit d-flex">
                                    <label htmlFor="exampleFormControlInput1" className="form-label my-profile-lab text-start fw-semibold lh-sm">General Info</label>
                                    <div className="inputs-fsme w-50 ms-5">
                                        <label htmlFor="exampleFormControlInput1" className="form-label general-info-lab text-start fw-medium lh-sm">First Name</label>
                                        <input onChange={handleChange} 
                                                className="form-control disabled-textfield bg-white mb-2 text-start fw-semibold lh-sm" 
                                                type="text" 
                                                name="fname"
                                                value={values.fname}/>
                                        <label htmlFor="exampleFormControlInput1" className="form-label general-info-lab text-start fw-medium lh-sm">Last Name</label>
                                        <input onChange={handleChange} 
                                               className="form-control disabled-textfield bg-white text-start fw-semibold lh-sm" 
                                               type="text" 
                                               name="lname"
                                               value={values.lname}/>
                                        <div className="general-info-btns d-flex mt-4 justify-content-center">
                                            <Button className="" buttonStyle="btn--circular-line">
                                                Cancel
                                            </Button>
                                            <div className="ms-1 w-50">
                                                <Button onClick={handleSubmit} className="log-out-btn" buttonStyle="btn--circular2">
                                                    Save Changes
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr/>
                                <form onSubmit={handleSubmit} className="third-section-myacc-edit d-flex">
                                    <label htmlFor="exampleFormControlInput1" className="form-label my-profile-lab text-start fw-semibold lh-sm">Security</label>
                                    <div className="inputs-fsme w-50 ms-5">
                                        <div className="label-plus-change-btn d-flex justify-content-between">    
                                            <label htmlFor="exampleFormControlInput1" className="form-label general-info-lab fw-medium lh-sm">Email</label>
                                            <button type='button' className='orange-no-border-btn border-0 bg-transparent'>change address</button>
                                        </div>
                                        <input onChange={handleChange}  
                                               className="form-control security-textfield bg-white mb-2 text-start fw-normal lh-sm" 
                                               type="text" name="email" 
                                               placeholder="Karem.tukhi@watanfd.com"
                                               value={values.email}/>
                                        <div className="label-plus-change-btn d-flex justify-content-between">
                                            <label htmlFor="exampleFormControlInput1" className="form-label general-info-lab fw-medium lh-sm">Password</label>
                                            <button type='button' className='orange-no-border-btn border-0 bg-transparent'>change Password</button>
                                        </div>
                                        <input onChange={handleChange}  
                                               className="form-control security-textfield bg-white text-start fw-normal lh-sm" 
                                               type="text" name="password" 
                                               placeholder="********"
                                               value={values.password}/>
                                        <div className="label-plus-change-btn d-flex justify-content-between">
                                            <label htmlFor="exampleFormControlInput1" className="form-label general-info-lab fw-medium lh-sm">Phone number</label>
                                            <button type='button' className='orange-no-border-btn border-0 bg-transparent'>change phone number</button>
                                        </div>
                                        <input onChange={handleChange}  
                                               className="form-control security-textfield bg-white text-start fw-normal lh-sm" 
                                               type="text" 
                                               name="phone"
                                               placeholder="+12 23457873920"
                                               value={values.phone}/>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>}
                    {/* {btn2 && data.map((d) => (
                        d.user_id === '25' ? (
                            <div className="col-md-4 px-4 mb-5 mx-auto" key={d.id}>
                                <Card item={d} />
                            </div>
                        ) : null
                    ))} */}
                </div>
            </div>
            <LogoutModal
              open={open}
              handleOpen={handleOpen}
              handleClose={handleClose}
            />
        </>
    );
}

export default My_Account_body;
