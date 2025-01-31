// src/components/franchise/FranchiseLogin.tsx
import React, { useState } from 'react';
import './styles/FranchiseForm.css';
import 'react-toastify/dist/ReactToastify.css';
import { submitFranchiseForm } from '../../services/franchiseForm';
import { toast } from 'react-toastify';
const FranchiseLogin: React.FC = () => {
    const [applyingFor, setApplyingFor] = useState<string>('franchise');
    const [centerStatus, setCenterStatus] = useState<string>('planning');
    const [branchName, setBranchName] = useState<string>('');
    const [directorName, setDirectorName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [whatsappNumber, setWhatsappNumber] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [state, setState] = useState<string>('');
    const [pincode, setPincode] = useState<string>('');
    const [facilities, setFacilities] = useState<string[]>([]);
    const [additionalInfo, setAdditionalInfo] = useState<string>('');
    const [existingFranchise, setExistingFranchise] = useState<string>("");

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setFacilities((prev) =>
            checked ? [...prev, value] : prev.filter((item) => item !== value)
        );
    };

    // For handling radio button state

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setExistingFranchise(e.target.value);
    };
    // Handle form submission

    // Handle form submission
    const handleSubmit = async () => {
        const missingFields: any = [];

        if (!applyingFor) {
            missingFields.push('"Applying For"');
            return
        };
        if (!centerStatus) { missingFields.push('"Current Center Status"'); };
        if (!branchName) { missingFields.push('"Branch/Institute Name"'); };
        if (!directorName) { missingFields.push('"Full Name of Center Director"'); };
        if (!email) { missingFields.push('"Center Email"'); };
        if (!phoneNumber) { missingFields.push('"Phone Number"'); };
        if (!address) { missingFields.push('"Center Address/Proposed Location"'); };
        if (!city) { missingFields.push('"City"'); };
        if (!state) { missingFields.push('"State"'); };
        if (!pincode) { missingFields.push('"Pincode"'); };
        if (facilities.length === 0) { missingFields.push('"Facilities Available at Center"'); };
        if (!existingFranchise) { missingFields.push('"Already Having a Franchise"'); };

        if (missingFields.length > 0) {
            toast.error(`Please fill in the following fields: ${missingFields[0]}`);
            return;
        }

        try {
            const formData = {
                applyingFor,
                centerStatus,
                branchName,
                directorName,
                email,
                phoneNumber,
                whatsappNumber,
                address,
                city,
                state,
                pincode,
                facilities,
                additionalInfo,
                existingFranchise
            };

            const response = await submitFranchiseForm(formData);

            if (response.success) {
                toast.success(response.message || 'Form submitted successfully!');
            } else {
                toast.error(response.message || 'Failed to submit form!');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('There was an error submitting the form.');
        }
    };


    const handleCancel = () => {
        alert('Form canceled!');
    };

    return (
        <div className="franchise-login-container">
            <div className="franchise-login-form">
                <div className="form-row">
                    <div className="input-group-for-two">
                        <label htmlFor="applyingFor">Applying for</label>
                        <select id="applyingFor" value={applyingFor} onChange={(e) => setApplyingFor(e.target.value)}>
                            <option value="franchise">Franchise</option>
                            <option value="masterFranchise">Master Franchise</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="input-group-for-two">
                        <label htmlFor="centerStatus">Current Center Status</label>
                        <select id="centerStatus" value={centerStatus ?? 'planning'} onChange={(e) => setCenterStatus(e.target.value)}>
                            <option value="planning">Planning to Start a New Center</option>
                            <option value="newlyOpened">Newly Opened/Fresh Started</option>
                            <option value="existing">Old/Existing Center</option>
                        </select>
                    </div>
                </div>

                <div className="form-row">
                    <div className="input-independent-group">
                        <label htmlFor="branchName">Branch/Institute Name</label>
                        <input
                            type="text"
                            id="branchName"
                            value={branchName}
                            onChange={(e) => setBranchName(e.target.value)}
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="input-independent-group">
                        <label htmlFor="directorName">Full Name of Center Director</label>
                        <input
                            type="text"
                            id="directorName"
                            value={directorName}
                            onChange={(e) => setDirectorName(e.target.value)}
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="input-independent-group">
                        <label htmlFor="email">Center Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="input-group-for-two">
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <div className="phone-input-group-for-two">
                            <span className="country-code">+91</span>
                            <input
                                type="text"
                                id="phoneNumber"
                                placeholder="Enter phone number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="input-group-for-two">
                        <label htmlFor="whatsappNumber">Institute WhatsApp Number (optional)</label>
                        <input
                            type="text"
                            id="whatsappNumber"
                            placeholder="Enter WhatsApp number"
                            value={whatsappNumber}
                            onChange={(e) => setWhatsappNumber(e.target.value)}
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="input-independent-group">
                        <label htmlFor="address">Center Address/Proposed Location</label>
                        <input
                            type="text"
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="input-group-for-three">
                        <label htmlFor="city">City</label>
                        <input
                            type="text"
                            id="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>
                    <div className="input-group-for-three">
                        <label htmlFor="state">State</label>
                        <input
                            type="text"
                            id="state"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        />
                    </div>
                    <div className="input-group-for-three">
                        <label htmlFor="pincode">Pincode</label>
                        <input
                            type="text"
                            id="pincode"
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                        />
                    </div>
                </div>

                {/* Other form rows will be added here (checkboxes, radio buttons, additional info, etc.) */}

                {/* Facilities Available at Center */}
                <div className="form-row">
                    <div className="input-independent-group">
                        <label htmlFor="facilities">Facilities Available at Center</label>
                        <div className="checkbox-group">
                            <label className="checkbox-item">
                                <input type="checkbox" value="directorCabin" onChange={handleCheckboxChange} /> Director Cabin
                                <div className="divider"></div>
                            </label>
                            <label className="checkbox-item">
                                <input type="checkbox" value="reception" onChange={handleCheckboxChange} /> Reception
                                <div className="divider"></div>
                            </label>
                            <label className="checkbox-item">
                                <input type="checkbox" value="practicalLab" onChange={handleCheckboxChange} /> Practical Lab
                                <div className="divider"></div>
                            </label>
                            <label className="checkbox-item">
                                <input type="checkbox" value="theoryRoom" onChange={handleCheckboxChange} /> Theory Room
                                <div className="divider"></div>
                            </label>
                            <label className="checkbox-item">
                                <input type="checkbox" value="parkingSpace" onChange={handleCheckboxChange} /> Parking Space
                                <div className="divider"></div>
                            </label>
                            <label className="checkbox-item">
                                <input type="checkbox" value="bathroom" onChange={handleCheckboxChange} /> Bathroom/Toilet
                                <div className="divider"></div>
                            </label>
                            <label className="checkbox-item">
                                <input type="checkbox" value="underConstruction" onChange={handleCheckboxChange} /> Under Construction
                            </label>
                        </div>

                    </div>
                </div>

                {/* Already Having a Franchise */}
                <div className="form-row">
                    <div className="input-independent-group">
                        <label>Already Having a Franchise</label>
                        <div className="radio-group">
                            <label className="radio-item">
                                <input type="radio" name="existingFranchise" value="yes" onChange={handleRadioChange} />
                                Yes
                            </label>
                            <label className="radio-item">
                                <input type="radio" name="existingFranchise" value="no" onChange={handleRadioChange} />
                                No
                            </label>
                        </div>



                    </div>
                </div>

                {/* Additional Information */}
                <div className="form-row">
                    <div className="input-independent-group">
                        <label htmlFor="additionalInfo">Any Other Information (Optional)</label>
                        <textarea
                            id="additionalInfo"
                            placeholder="Enter additional information here"
                            value={additionalInfo}
                            onChange={(e) => setAdditionalInfo(e.target.value)}
                        />
                    </div>
                </div>


                <div className="form-actions">
                    <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
                    <button type="button" className="submit-btn" onClick={handleSubmit}>Submit</button>
                </div>

            </div>
        </div>
    );
};

export default FranchiseLogin;
