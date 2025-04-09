// src/components/TimerModal.jsx
import {
    Box,
    Button,
    Typography,
    Modal,
    CircularProgress,
    Stack,
  } from "@mui/material";
  import { useEffect, useState } from "react";
  
  const TimerModal = ({ open, handleClose, minutes }) => {
    const totalSeconds = minutes * 60;
    const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  
    useEffect(() => {
      if (!open) return;
  
      setSecondsLeft(totalSeconds);
  
      const interval = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            alert("⏰ Time’s up!");
            handleClose();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
  
      return () => clearInterval(interval);
    }, [open, totalSeconds, handleClose]);
  
    const formatTime = (sec) => {
      const m = String(Math.floor(sec / 60)).padStart(2, "0");
      const s = String(sec % 60).padStart(2, "0");
      return `${m}:${s}`;
    };
  
    const progress = ((totalSeconds - secondsLeft) / totalSeconds) * 100;
  
    return (
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            background: "white",
            width: 300,
            p: 4,
            borderRadius: 2,
            boxShadow: 24,
            mx: "auto",
            mt: "20vh",
            textAlign: "center",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Cooking Timer
          </Typography>
          <Stack alignItems="center" my={2}>
            <CircularProgress
              variant="determinate"
              value={progress}
              size={120}
              thickness={4}
            />
            <Typography variant="h5" mt={2}>
              {formatTime(secondsLeft)}
            </Typography>
          </Stack>
          <Button variant="outlined" onClick={handleClose}>
            Stop
          </Button>
        </Box>
      </Modal>
    );
  };
  
  export default TimerModal;
  