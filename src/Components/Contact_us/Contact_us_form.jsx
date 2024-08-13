import React, { useEffect, useState } from 'react'
import './Contact_us_form.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Button } from '../Button/Button';
import email from '../../assets/email.png';
import axios from 'axios';
import PulseLoader from 'react-spinners/PulseLoader';



function Contact_us_form() {

    const [posts, setPosts] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [values, setvalue] = useState({ fname: '', lname: '', phone:'', email:'', message:''});
  
    const fetchData = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response =  await axios.post('/API/Form-Contact/Contact', values);
            setPosts(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
            setvalue({ fname: '', lname: '', phone:'', email:'', message:'' });

        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setvalue((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    return (
        <>
        <div className="container ">
            <div className="row my-5">
                <h3 className='contact-us-header fw-bold lh-base text-center'>Contact us</h3>
                <p className='contact-us-paragraph lh-base text-center mb-5'>We would like to hear from you!</p>
                <div className="col-md-6 align-items-center">
                    <div className="contact-us-img-wrapper w-75">
                        <img src={email} alt="" className='align-self-center'/>
                    </div>
                    {/* <div className="card contact-us-card mt-5">
                        <div className='au-e2-img-con'>
                            <img src={man} className="au-img-man" alt="..."/>
                        </div>
                        <div className="card-body">
                            <h5 className="au-card-title fw-bold text-center">Hussein Albishi</h5>
                            <p className="au-card-text fw-normal text-center">SHIMA - President and CEO</p>
                            <p className="contact-us-card-text fw-normal text-center lh-1">shima.org.sa@info</p>
                            <p className="contact-us-card-text fw-normal text-center lh-1">president@shima.org.sa</p>
                        </div>            
                    </div> */}
                </div>
                <div className="col-md-6">
                    <form onSubmit={fetchData}>
                        <div className='form-contactus'>
                            <div className="row mb-2">
                                <div className="col-md-6">
                                    <label htmlFor="nameInput" className="form-label form-contact-us-lab  ">First Name</label>
                                    <input type="text" 
                                        className="form-control form-conatct-us-ins" 
                                        id="nameInput" 
                                        placeholder="first name" 
                                        aria-label="Name"
                                        name='fname' 
                                        value={values.fname} 
                                        onChange={handleChange}/>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="nameInput" className="form-label form-contact-us-lab  ">Last Name</label>
                                    <input type="text" 
                                        className="form-control form-conatct-us-ins" 
                                        id="nameInput" 
                                        placeholder="last name" 
                                        aria-label="Name" 
                                        name='lname'
                                        value={values.lname} 
                                        onChange={handleChange}/>
                                </div>
                            </div>
                            <div class="col mb-2">
                                <label htmlFor="emailInput" className="form-label form-contact-us-lab  ">Email address</label>
                                <input type="email" 
                                    className="form-control form-conatct-us-ins form-email" 
                                    id="emailInput" 
                                    placeholder="example@email.com" 
                                    aria-label="email" 
                                    name='email'
                                    value={values.email} 
                                    onChange={handleChange}/>
                            </div>
                            <div class="col mb-2">
                                <label htmlFor="phoneInput" className="form-label form-contact-us-lab  ">Phone Numaber</label>
                                <input type="number" 
                                    className="form-control form-conatct-us-ins form-phone" 
                                    id="phoneInput" 
                                    placeholder="+1 (555) 000-0000" 
                                    aria-label="phone" 
                                    name='phone'
                                    value={values.phone} 
                                    onChange={handleChange}/>
                            </div>
                            <div className="col mb-2">
                                <label for="exampleFormControlTextarea1" className="form-label form-contact-us-lab">Message</label>
                                <textarea className="form-control form-conatct-us-ins" 
                                id="exampleFormControlTextarea1" 
                                rows="3" 
                                name='message'
                                value={values.message} 
                                onChange={handleChange}></textarea>
                            </div>
                            <div className='mb-2'>
                                <Button
                                    className='btns'
                                    buttonStyle='btn--orange'
                                    type="submit">
                                    {loading ? <PulseLoader className='mt-1' size='16' color='white'/>:
                                        "Send Message"}
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
  )}

export default Contact_us_form
