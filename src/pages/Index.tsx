
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to Deliveries page
    navigate("/deliveries");
  }, [navigate]);
  
  return (
    <div className="flex items-center justify-center h-screen">
      <p>Redirecting to Deliveries...</p>
    </div>
  );
};

export default Index;
