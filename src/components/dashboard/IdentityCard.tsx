import React, { useEffect, useState } from 'react';
import { getProfileData, FranchiseData } from '../../services/profileService';
import styles from './styles/IdentityCard.module.css';

const IdentityCard: React.FC = () => {
    const [profile, setProfile] = useState<FranchiseData | null>(null);
    const [loading, setLoading] = useState(true);

    const convertBufferToBase64 = (buffer: ArrayBuffer | Uint8Array) => {
        const binary = Array.from(new Uint8Array(buffer))
            .map((b) => String.fromCharCode(b))
            .join('');
        return btoa(binary);
    };

    const renderDirectorImage = (franchise: FranchiseData) => {
        const image = franchise.image;
        if (!image?.data) return "No Image";

        let base64Image = "";

        if (typeof image.data === "string") {
            base64Image = image.data;
        } else if (image.data instanceof ArrayBuffer) {
            base64Image = convertBufferToBase64(new Uint8Array(image.data));
        } else if (image.data instanceof Uint8Array) {
            base64Image = convertBufferToBase64(image.data);
        } else if (
            typeof image.data === "object" &&
            (image.data as any).type === "Buffer" &&
            Array.isArray((image.data as any).data)
        ) {
            const bufferData = new Uint8Array((image.data as any).data);
            base64Image = convertBufferToBase64(bufferData);
        } else {
            return "Invalid image format";
        }

        return (
            <img
                src={`data:${image.contentType};base64,${base64Image}`}
                alt={franchise.directorName}
                className={styles.directorImage}
            />
        );
    };

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

    if (loading || !profile) return <div>Loading...</div>;

    return (
        <div className={styles.cardContainer}>
            <div style={{ position: 'relative', width: "30.3rem", border: "2px solid black" }}>
                <img
                    src="../../images/AuthId.jpg"
                    alt="Identity Card"
                    className={styles.background}
                />
                <div className={styles.IdCover}></div>
                <div>
                    {renderDirectorImage(profile)}
                </div>
                <div className={`${styles.SonOf} ${styles.field}`}>
                    <p>
                        <span>S/o. W/o. D/o : </span> {profile.directorName}
                    </p>
                </div>
                <div className={`${styles.BloodGrp} ${styles.field}`}>
                    <p>
                        <span>Blood Group : </span> {profile.directorName}
                    </p>
                </div>
                <div className={`${styles.ContactNo} ${styles.field}`}>
                    <p>
                        <span>Contact No. : </span> {profile.mobile}
                    </p>
                </div>
                <div className={`${styles.Session} ${styles.field}`}>
                    <p>
                        <span>Session : </span> {profile.dob}
                    </p>
                </div>
                <div className={`${styles.ValidUpTo} ${styles.field}`}>
                    <p>
                        <span>Valid Up to : </span> {profile.dob}
                    </p>
                </div>
                <div className={`${styles.TrainingCenter} ${styles.field}`}>
                    <p>
                        <span>Training Center : </span> {profile.instituteName}
                    </p>
                </div>
                <div className={`${styles.CenterCode} ${styles.field}`}>
                    <p>
                        <span>Center Code : </span> {profile.centerId}
                    </p>
                </div>
                <div className={`${styles.AuthSign} ${styles.field}`}>
                    <p>
                        <span>Auth Signature : </span> {profile.centerId}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default IdentityCard;
