import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './card.css';
import { Button } from '../../Button/Button';
import check from "../../../assets/check.svg";
import cube from "../../../assets/cube2.svg";
import Mem_price_modal from '../../../Components/Mem_price_modal.jsx'



function card({item}) {


    const list = item.list_en;
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    // ["Must be at least eighteen years old.",
    //     "Must have full legal capacity according to Sharia law.",
    //     "Must not have been convicted of a crime involving moral turpitude or dishonesty.", 
    //     "Must have paid the minimum annual subscription fee.",
    //     "Must be approved by the Board of Directors of the association upon meeting the required conditions."];
        
  return (
    <>
        <div>
            <div className="card membership-card">
                <div className='mem-imgContainer ms-3 mt-3'>
                    <img src={cube} className="mem-img-top" alt="..."/>
                </div>
                <div className="card-body">
                    <div className='mem_active'>
                        <p className='mt-2 lh-base'>⦁ {item.name_en}</p>
                    </div>
                    <h4 className='mem_price lh-sm'>{item.amount} S.R</h4>
                    <hr className='w-75'></hr>
                
                    <p className="mem-card-title">including:</p>
                    <div className='mem-list lh-base'>
                        {list.map(listitem => (
                            <div className="d-flex ">
                                <img src={check} alt="bullet point" className="me-2" />
                                <p key={listitem} className='mb-2'>{listitem}</p>
                            </div>
                        ))}
                    </div>
                    <Button
                        className='btns'
                        buttonStyle='btn--white2'
                        onClick={handleOpen}>
                        Register Now
                    </Button>            
                </div>
            </div>
        </div>
        <Mem_price_modal
            open={open}
            handleOpen={handleOpen}
            handleClose={handleClose}
            title={item.name_en}
            price={item.amount}
            />
    </>
  )
}

export default card