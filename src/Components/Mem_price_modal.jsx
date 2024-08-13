import Membership_price from './Popups/Membership_price';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import React from 'react'
import { height } from "@fortawesome/free-brands-svg-icons/fa42Group";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 50 + '%',
    height: 70 + '%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: '25px',
    boxShadow: 24,
    p: 4,
  };
const Mem_price_modal = (props) => {
  return (
    <Modal
    open={props.open}
    onClose={props.handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
      <Membership_price onClose={props.handleClose} title={props.title} price={props.price}/>
    </Box>
  
    </Modal>
  )
}





export default Mem_price_modal
