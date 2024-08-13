import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './inquiry.css';
import { Button } from '../Button/Button';
import axios from 'axios';
import PulseLoader from 'react-spinners/PulseLoader';


function Inquiry() {
    const [posts, setPosts] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [values, setValues] = useState({ name: '', phone: '', email: '', message: '' });

    const fetchData = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const response = await axios.post('/API/Form-Request/Add', values);
            setPosts(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
            setValues({ name: '', phone: '', email: '', message: '' });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    return (
        <div>
            <div className='container-fluid fluid-container'>
                <div className='row '>
                    <div className='col-md-6 header-inquiry-container p-5'>
                        <h3 className='header-inquiry me-5'>For general inquiries and questions related to members</h3>
                        <p className='header2-inquiry'>Lorem ipsum dolor sit amet consectetur adipiscing eli mattis sit phasellus mollis sit aliquam sit nullam.</p>
                    </div>
                    <div className="col-md-6 p-5">
                        <form onSubmit={fetchData}>
                            <div className='form-inquiry p-5'>
                                <div className="row mb-2">
                                <div className="col-md-6">
                                        <label htmlFor="nameInput" className="form-label">Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="nameInput"
                                            placeholder="name@gmail.com"
                                            aria-label="name"
                                            name="name"
                                            value={values.name}
                                            onChange={handleChange}/>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="phoneInput" className="form-label">Phone</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="phoneInput"
                                            placeholder="(123) 456 7890"
                                            aria-label="Phone"
                                            name="phone"
                                            value={values.phone}
                                            onChange={handleChange}/>
                                    </div>
                                </div>
                                <div className="col mb-2">
                                    <label htmlFor="emailInput" className="form-label">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control form-email"
                                        id="emailInput"
                                        placeholder="example@email.com"
                                        aria-label="email"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}/>
                                </div>
                                <div className="col mb-2">
                                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Message</label>
                                    <textarea
                                        className="form-control"
                                        id="exampleFormControlTextarea1"
                                        rows="3"
                                        name="message"
                                        value={values.message}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>
                                <div className='mb-2 mx-auto'>
                                    <Button
                                        className='btns'
                                        buttonStyle='btn--circular2'
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
        </div>
    )
}

export default Inquiry;
