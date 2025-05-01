import styles from './Verifications.module.css';
import { HiOutlineDocumentCheck } from 'react-icons/hi2';
import { FaQrcode } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Verifications = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className={styles.container}>
        <div className={`${styles.button} ${styles.verify}`}>
          <Link to="/student/certificate-verification" className={styles.Verifybutton}>
            <HiOutlineDocumentCheck className={styles.icon} />
            <span>VERIFY CERTIFICATE</span>
          </Link>
        </div>

        <div className={`${styles.button} ${styles.pay}`}>
          <div
            className={`${styles.Verifybutton} ${styles.pay}`}
            onClick={() => setShowModal(true)}
          >
            <FaQrcode className={styles.icon} />
            <span>SCAN QR AND PAY</span>
          </div>
        </div>
      </div>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Scan QR to Pay</h3>
            <img
              src="/images/PhonePeQR.jpg"
              alt="Payment QR"
              className={styles.qrImage}
            />
            <img src="/images/iicl-icon.png" className={styles.iiclLogoQr} alt="" />
            <button className={styles.closeButton} onClick={() => setShowModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Verifications;
