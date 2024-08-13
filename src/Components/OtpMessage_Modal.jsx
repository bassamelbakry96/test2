import Membership_id from "./Popups/Member_id";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import React from 'react'
import { height } from "@fortawesome/free-brands-svg-icons/fa42Group";
import OtpMessage from "../Signup/OtpMessage";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 40 + '%',
    height: 30 + '%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: '25px',
    boxShadow: 24,
    p: 4,
  };
const OtpMessage_Modal= (props) => {
  return (
    <Modal
    open={props.open}
    onClose={props.handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
      <OtpMessage onClose={props.handleClose} message={props.msg}/>
    </Box>
    </Modal>
  )
}





export default OtpMessage_Modal
