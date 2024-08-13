import {React, useState, useEffect} from 'react'
import axios from "axios";
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { listData } from '../../lib/BOD';
import Card from './card/card';
import './Board.css';
import { Button } from '../Button/Button';
import { Link } from 'react-router-dom';
import PropagateLoader from 'react-spinners/PropagateLoader';



function Board() {

    const client = axios.create({
        baseURL: "http://127.0.0.1:8000/API/Members/All"
      });
    
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true); // Step 1: Create loading state

    useEffect(() => {
        setLoading(true); // Step 2: Set loading to true before API call
        client.get()
        .then((response) => {
            setPosts(response.data.data);
        })
        .finally(() => {
            setLoading(false); // Step 3: Set loading to false after API call
        });
    }, []);

    const data = listData;

    return (
        <div className='container-fluid'>
            <div className='row headers justify-content-center'>
                <h6 className='header1 fw-semibold lh-base text-center'>Board of Direction</h6>
                <h3 className='header2 fw-bold lh-base text-center'>Board Members</h3>
                <div className="col-md-9"><p className='parag fw-normal lh-base text-center'>The SHIMA Board of Directors is composed of distinguished leaders with proven expertise in healthcare administration, information management, and related fields. Their collective knowledge and experience are instrumental in guiding the association’s strategic direction and ensuring the highest standards of governance.</p>
                </div>
            </div>

            {loading
            ?
                <PropagateLoader className='text-center py-5' color="#3CB7A8"/>
            :
                <div className='row bod-cards'>
                    {posts.map((item) => (
                        <div key={item.id} className="col-md-6 mb-2">
                            <Card item={item} />
                        </div>
                    ))}
                </div>
            }
            <div className='mb-4 text-center'>
                <Link to={'/about-us'}>
                    <Button
                        className='btns'
                        buttonStyle='btn--navy'>
                        Learn more&nbsp;
                        <FontAwesomeIcon icon={faArrowRight} size='lg' className='align-items-center'/>
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default Board;

/**<div className="card board-card col-md-5 mb-3 mx-auto">
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src={man1} className="img-fluid rounded-start" alt="..."/>
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card board-card col-md-5 mb-3 mx-auto">
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src={man2} className="img-fluid rounded-start" alt="..."/>
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card board-card col-md-5 mb-3 mx-auto">
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src={women1} className="img-fluid rounded-start" alt="..."/>
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card board-card col-md-5 mb-3 mx-auto">
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src={women2} className="img-fluid rounded-start" alt="..."/>
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                            </div>
                        </div>
                    </div>
                </div> */