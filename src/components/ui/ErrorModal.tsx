import React from 'react';
import styles from './ErrorModal.module.css'; // Import the CSS module

interface ErrorModalProps {
    message: string;
    onClose: () => void;
}

export const ErrorModal: React.FC<ErrorModalProps> = ({ message, onClose }) => {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <p className={styles.message}>{message}</p>
                <button className={styles.okButton} onClick={onClose}>
                    OK
                </button>
            </div>
        </div>
    );
};
