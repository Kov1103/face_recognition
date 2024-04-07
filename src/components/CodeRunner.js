import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Grid,
  Typography,
} from "@mui/material";

const FaceRecRunner = ({ isOpen, handleClose}) => {
    const [output, setOutput] = useState('');
    
    useEffect(() => {
        if (isOpen) {
            // Chạy runFaceRec khi isOpen thay đổi và là true
            runFaceRec();
      
            // Hẹn giờ đóng pop-up sau 20 giây
            const timeoutId = setTimeout(() => {
              handleClose(false);
            }, 10000);

            // Hủy hẹn giờ khi component unmount hoặc khi pop-up đã được đóng
            return () => clearTimeout(timeoutId);
        }
    }, [isOpen, handleClose]);

    // const runFaceRec = async () => {
    //     try {
    //         const response = await fetch('http://localhost:5000/run_face_rec');
    //         const data = await response.json();
    //         setOutput(data.output || data.error || 'Unknown error occurred');
    //     } catch (error) {
    //         console.error('Error running face_rec.py:', error);
    //     }
    // };
    const runFaceRec = async () => {
        try {
            // Nhận input từ nguồn nào đó (nếu có)
            const inputData = 'example_input';
            console.log(`Sending input: ${inputData}`);
    
            const response = await fetch(`http://localhost:5000/run_face_rec?input_data=${inputData}`);
            const data = await response.json();
    
            // Log output
            console.log(`Received output: ${data.output}`);
    
            setOutput(data.output || data.error || 'Unknown error occurred');
        } catch (error) {
            console.error('Error running facial_req.py:', error);
        }
    };

    return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle
        sx={{
          textAlign: "center",
          paddingTop: "20px",
          fontSize: "20px",
          fontWeight: "600",
          color: "#1B3764",
        }}
      >
        Đang tiến hành xác thực
        </DialogTitle>
        <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={handleClose} color="primary" variant="outlined" sx={{ width: '100%' }}>
          Thoát
        </Button>
        </DialogActions>
    </Dialog>
    );
};

export default FaceRecRunner;