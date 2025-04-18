import {ReactNode} from 'react';
import {Box, Card, CardContent, Modal} from "@mui/material";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const CartModal = ({isOpen, onClose, children}: ModalProps) => {
    const modalStyle = {
        position: 'absolute' as const,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        maxWidth: '600px',
        maxHeight: '80vh',
        overflow: 'auto',
        outline: 'none',
    };

    const cardStyle = {
        width: '100%',
        height: '100%',
        overflow: 'auto',
    };

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="cart-modal-title"
            aria-describedby="cart-modal-description"
            sx={{
                // This adds a semi-transparent backdrop
                '& .MuiBackdrop-root': {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                },
            }}
        >
            <Box sx={modalStyle}>
                <Card sx={cardStyle}>
                    <CardContent>
                        {children}
                    </CardContent>
                </Card>
            </Box>
        </Modal>
    );
};

export default CartModal;