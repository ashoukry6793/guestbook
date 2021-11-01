import "./Error.css";
import {Collapse, IconButton, Alert} from "@mui/material";
import {Close as CloseIcon} from "@mui/icons-material";
import {useEffect, useState} from "react";
import {notificationService} from "../../../core/services/NotificationService";

export default function Error() {
    const [open, setOpen] = useState(false);
    const [service] = useState(notificationService);

    useEffect(() => {
        service.subscribe(() => {
            setOpen(true);
        })
    }, [])

    return (
        <div className="error">
            <Collapse in={open}>
                <Alert
                    severity="error"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                >
                    {service.notification?.message}
                </Alert>
            </Collapse>
        </div>
    )
}
