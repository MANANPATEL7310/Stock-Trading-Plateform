import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogActions, Button, Checkbox, FormControlLabel, Typography } from "@mui/material";

const WelcomeModal = () => {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const hasSeen = localStorage.getItem("hasSeenWelcome");
    if (!hasSeen) {
      setOpen(true);
    }
  }, []);

  const handleClose = () => {
    if (checked) {
      localStorage.setItem("hasSeenWelcome", "true");
      setOpen(false);
    }
  };

  return (
    <Dialog 
      open={open} 
      fullWidth 
      maxWidth="md"
      PaperProps={{
        style: {
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          borderRadius: "16px",
          padding: "20px",
        }
      }}
      BackdropProps={{
        style: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(5px)", // Glassmorphism effect on background
        }
      }}
    >
      <DialogContent>
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Welcome to Our Stock Trading Plateform! 🚀</h1>
          <p className="text-slate-500">Your gateway to simulated stock trading.</p>
        </div>

        <div className="space-y-6 text-slate-700">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h3 className="font-semibold text-blue-800 mb-2">🕒 Market Hours</h3>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li><strong>Opening Time:</strong> 07:00 AM</li>
              <li><strong>Closing Time:</strong> 11:00 PM</li>
              <li><strong>Closed Days:</strong> Saturday & Sunday</li>
            </ul>
          </div>

          <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
            <h3 className="font-semibold text-emerald-800 mb-2">💡 How to Use</h3>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li><strong>Watchlist:</strong> Track real-time prices of top Indian stocks.</li>
              <li><strong>Buy/Sell:</strong> Place orders instantly. Use "GTT" for automated targets.</li>
              <li><strong>Holdings:</strong> View your long-term investments.</li>
              <li><strong>Positions:</strong> Track your intraday profits and losses.</li>
              <li><strong>Funds:</strong> Add or withdraw virtual money to trade.</li>
            </ul>
          </div>

          <div className="text-sm text-slate-500 mt-4">
            <p>
              This is a simulation platform for educational purposes. 
              The prices are simulated based on real market data but may contain random fluctuations.
            </p>
          </div>
        </div>

        <div className="mt-8 border-t pt-4">
          <FormControlLabel
            control={
              <Checkbox 
                checked={checked} 
                onChange={(e) => setChecked(e.target.checked)} 
                color="primary" 
              />
            }
            label={
              <Typography variant="body2" className="text-slate-600">
                I have read the instructions and agree to the <span className="text-blue-600 cursor-pointer hover:underline">Terms & Conditions</span>.
              </Typography>
            }
          />
        </div>
      </DialogContent>

      <DialogActions className="justify-center pb-6">
        <Button 
          onClick={handleClose} 
          variant="contained" 
          color="primary" 
          disabled={!checked}
          size="large"
          className="w-full max-w-xs"
          style={{ borderRadius: "8px", textTransform: "none", fontSize: "16px" }}
        >
          Get Started 🚀
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WelcomeModal;
