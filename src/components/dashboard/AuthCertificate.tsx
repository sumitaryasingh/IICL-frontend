import React, { useEffect, useRef, useState } from 'react';
import { getProfileData } from '../../services/profileService';
import styles from './styles/AuthCertificate.module.css';
import { FranchiseData } from '../../services/franchiseService';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function AuthCertificate() {
    const [profile, setProfile] = useState<FranchiseData | null>(null);
    const [loading, setLoading] = useState(true);
    const certificateRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const franchiseId = localStorage.getItem("franchiseId") || '';
        getProfileData('franchise', franchiseId)
            .then((data) => {
                setProfile(data as FranchiseData);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching profile data", err);
                setLoading(false);
            });
    }, []);

    const currentYear = new Date().getFullYear();
    const parts = profile?.centerId?.split('-');

    const certificateNo = parts && parts.length === 3
        ? `${parts[0]}-${parts[1]}-${currentYear}-${parts[2]}`
        : '';

    const validUpTo = (new Date().getFullYear() + 3).toString();

    const handleDownload = async () => {
        if (certificateRef.current) {
            const canvas = await html2canvas(certificateRef.current, {
                scale: 2, // Higher quality
                useCORS: true // Handle cross-origin if using remote images
            });

            const imgData = canvas.toDataURL('image/png');

            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'mm',
                format: 'a4'
            });

            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();

            const imgWidth = pageWidth;
            const imgHeight = (canvas.height * pageWidth) / canvas.width;

            const yOffset = (pageHeight - imgHeight) / 2;

            pdf.addImage(imgData, 'PNG', 0, yOffset, imgWidth, imgHeight);
            pdf.save(`${profile?.instituteName || 'certificate'}.pdf`);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
                <h1>Auth Certificate</h1>

            <div ref={certificateRef} className={styles.CertificateContainer}>
                <span className={styles.certificateNo}>{certificateNo}</span>
                <span className={styles.centerId}>{profile?.centerId}</span>
                <img src="../../images/AuthCertificate.jpg" alt="Certificate" className={styles.Certificate} />
                <div>
                    <p className={styles.DirectorName}>{profile?.directorName}</p>
                </div>
                <div>
                    <p className={styles.instituteName}>{profile?.instituteName}</p>
                </div>
                <div>
                    <p className={styles.validUpTo}>{validUpTo}</p>
                </div>
            </div>
            <div>
                <button onClick={handleDownload} className={styles.certDown}>Download Certificate</button>
            </div>
        </>
    );
}
