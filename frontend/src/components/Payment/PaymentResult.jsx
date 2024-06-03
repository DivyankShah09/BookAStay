import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";

const PaymentResult = ({ message, status }) => {
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            navigate("/booking-history");
        }, 3000);
    }, []);
    return (
        <>
            <div style={{ marginTop: 100 }}>
                {status === "success" && <Alert severity="success">{message}</Alert>}
                {status === "failure" && <Alert severity="error">{message}</Alert>}
            </div>
        </>
    );
};

export default PaymentResult;
