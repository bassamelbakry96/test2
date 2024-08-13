import React from 'react'
import './Section1.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {Link} from 'react-router-dom';
import { Button } from '../Button/Button';
import bluecircle from '../../assets/bluecircle.svg';
import pic1 from '../../assets/Image1.svg';





function Section1() {
  return (
    <div className='container-fluid '>
        <div className='row first_half position-absolute top-0 start-0 w-100'>
            <div className="col-md-6">
                <div className='cards_1'>
                    <h2 className='header_2 fw-bold lh-base text-start mt-5'>Health Information Managment</h2>
                    <p className='paragraph fw-normal lh-base text-start'>The Saudi Health Information Management Association (SHIMA) is a non-profit professional association, established under the auspices of the Saudi Commission for Health Specialties (SCFHS). The association aims to develop and promote the profession of health information management in the Kingdom of Saudi Arabia through organizing training and educational programs to qualify and train professionals in the field of health information management and informatics.</p>
                    <Link to={'/about-us'}>
                        <Button
                            className='btns'
                            buttonStyle='btn--primary'
                            buttonSize='btn--large'
                            onClick={console.log('hey')}
                            >
                            About Us
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="col-md-5"> 
                <div className='wrapper sec1-img-cont'>
                    <img src={pic1} alt="" className='sec1-img'/>
                </div>
                {/* Ensures full width on smaller screens */}
                {/* <div className="card cards_2 mx-auto">
                    <div className="card-body first_event text-center position-relative mt-5">
                        <p className='card-text date_day fw-medium text-center'>05</p>
                        <p className='card-text date_month lh-base fw-medium text-center'>JULY</p>
                        <hr className='seperatorcard'/>
                        <p className='card-text event fw-normal lh-lg text-center'>Conferences and<br/> Workshops</p>
                        <div className="card scnd_card">
                            <div className='card-body second_event text-center position-absolute'>
                                <p className='card-text date_day fw-medium text-center lh-base'>06</p>
                                <p className='card-text date_month lh-base fw-medium text-center'>JULY</p>
                                <hr className='seperatorcard'/>
                                <p className='card-text event fw-normal lh-lg text-center'>Mentoring and Q&A's</p>
                            </div>
                        </div>
                        <img src={bluecircle} alt="bluecircle" className='bluecircle img-fluid'/> {/* Ensure the image is responsive }
                    </div>
                </div> */}
                    
            </div>
        </div>
    </div>
  )
}

export default Section1
