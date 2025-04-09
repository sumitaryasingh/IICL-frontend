import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import './styles/FranchiseForm.css';
import 'react-toastify/dist/ReactToastify.css';
import { submitFranchiseForm } from '../../services/franchiseForm';
import { toast } from 'react-toastify';
const FranchiseLogin = () => {
    const [applyingFor, setApplyingFor] = useState('franchise');
    const [centerStatus, setCenterStatus] = useState('planning');
    const [branchName, setBranchName] = useState('');
    const [directorName, setDirectorName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [whatsappNumber, setWhatsappNumber] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [pincode, setPincode] = useState('');
    const [facilities, setFacilities] = useState([]);
    const [additionalInfo, setAdditionalInfo] = useState('');
    const [existingFranchise, setExistingFranchise] = useState("");
    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setFacilities((prev) => checked ? [...prev, value] : prev.filter((item) => item !== value));
    };
    const handleRadioChange = (e) => {
        setExistingFranchise(e.target.value);
    };
    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };
    const validatePhoneNumber = (number) => {
        return /^\d{10}$/.test(number);
    };
    const handleSubmit = async () => {
        const missingFields = [];
        if (!applyingFor)
            missingFields.push('"Applying For"');
        if (!centerStatus)
            missingFields.push('"Current Center Status"');
        if (!branchName)
            missingFields.push('"Branch/Institute Name"');
        if (!directorName)
            missingFields.push('"Full Name of Center Director"');
        if (!email || !validateEmail(email))
            missingFields.push('"Valid Center Email"');
        if (!phoneNumber || !validatePhoneNumber(phoneNumber))
            missingFields.push('"Valid 10-digit Phone Number"');
        if (!address)
            missingFields.push('"Center Address/Proposed Location"');
        if (!city)
            missingFields.push('"City"');
        if (!state)
            missingFields.push('"State"');
        if (!pincode)
            missingFields.push('"Pincode"');
        if (facilities.length === 0)
            missingFields.push('"Facilities Available at Center"');
        if (!existingFranchise)
            missingFields.push('"Already Having a Franchise"');
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
            }
            else {
                toast.error(response.message || 'Failed to submit form!');
            }
        }
        catch (error) {
            console.error('Error submitting form:', error);
            toast.error('There was an error submitting the form.');
        }
    };
    const handleCancel = () => {
        alert('Form canceled!');
    };
    return (_jsx("div", { className: "franchise-login-container", children: _jsxs("div", { className: "franchise-login-form", children: [_jsxs("div", { className: "form-row", children: [_jsxs("div", { className: "input-group-for-two", children: [_jsx("label", { htmlFor: "applyingFor", children: "Applying for" }), _jsxs("select", { id: "applyingFor", value: applyingFor, onChange: (e) => setApplyingFor(e.target.value), children: [_jsx("option", { value: "franchise", children: "Franchise" }), _jsx("option", { value: "masterFranchise", children: "Master Franchise" }), _jsx("option", { value: "other", children: "Other" })] })] }), _jsxs("div", { className: "input-group-for-two", children: [_jsx("label", { htmlFor: "centerStatus", children: "Current Center Status" }), _jsxs("select", { id: "centerStatus", value: centerStatus ?? 'planning', onChange: (e) => setCenterStatus(e.target.value), children: [_jsx("option", { value: "planning", children: "Planning to Start a New Center" }), _jsx("option", { value: "newlyOpened", children: "Newly Opened/Fresh Started" }), _jsx("option", { value: "existing", children: "Old/Existing Center" })] })] })] }), _jsx("div", { className: "form-row", children: _jsxs("div", { className: "input-independent-group", children: [_jsx("label", { htmlFor: "branchName", children: "Branch/Institute Name" }), _jsx("input", { type: "text", id: "branchName", value: branchName, onChange: (e) => setBranchName(e.target.value) })] }) }), _jsx("div", { className: "form-row", children: _jsxs("div", { className: "input-independent-group", children: [_jsx("label", { htmlFor: "directorName", children: "Full Name of Center Director" }), _jsx("input", { type: "text", id: "directorName", value: directorName, onChange: (e) => setDirectorName(e.target.value) })] }) }), _jsx("div", { className: "form-row", children: _jsxs("div", { className: "input-independent-group", children: [_jsx("label", { htmlFor: "email", children: "Center Email" }), _jsx("input", { type: "email", id: "email", value: email, onChange: (e) => setEmail(e.target.value), onBlur: (e) => {
                                    if (!validateEmail(e.target.value)) {
                                        setEmail('');
                                        toast.error('Please enter a valid email address');
                                    }
                                } })] }) }), _jsxs("div", { className: "form-row", children: [_jsxs("div", { className: "input-group-for-two", children: [_jsx("label", { htmlFor: "phoneNumber", children: "Phone Number" }), _jsxs("div", { className: "phone-input-group-for-two", children: [_jsx("span", { className: "country-code", children: "+91" }), _jsx("input", { type: "number", id: "phoneNumber", placeholder: "Enter phone number", value: phoneNumber, onChange: (e) => {
                                                const value = e.target.value;
                                                if (value.length > 10) {
                                                    toast.error('Phone number must be 10 digits');
                                                }
                                                else {
                                                    setPhoneNumber(value);
                                                }
                                            }, onBlur: (e) => {
                                                const value = e.target.value;
                                                if (value.length < 10) {
                                                    toast.error('Phone number must be 10 digits');
                                                    setPhoneNumber('');
                                                }
                                            } })] })] }), _jsxs("div", { className: "input-group-for-two", children: [_jsx("label", { htmlFor: "whatsappNumber", children: "Institute WhatsApp Number (optional)" }), _jsx("input", { type: "number", id: "whatsappNumber", placeholder: "Enter WhatsApp number", value: whatsappNumber, onChange: (e) => {
                                        const value = e.target.value;
                                        if (value.length > 10) {
                                            toast.error('WhatsApp number must be 10 digits');
                                        }
                                        else {
                                            setWhatsappNumber(value);
                                        }
                                    }, onBlur: (e) => {
                                        const value = e.target.value;
                                        if (value.length < 10) {
                                            toast.error('WhatsApp number must be 10 digits');
                                            setWhatsappNumber('');
                                        }
                                    } })] })] }), _jsx("div", { className: "form-row", children: _jsxs("div", { className: "input-independent-group", children: [_jsx("label", { htmlFor: "address", children: "Center Address/Proposed Location" }), _jsx("input", { type: "text", id: "address", value: address, onChange: (e) => setAddress(e.target.value) })] }) }), _jsxs("div", { className: "form-row", children: [_jsxs("div", { className: "input-group-for-three", children: [_jsx("label", { htmlFor: "city", children: "City" }), _jsx("input", { type: "text", id: "city", value: city, onChange: (e) => setCity(e.target.value) })] }), _jsxs("div", { className: "input-group-for-three", children: [_jsx("label", { htmlFor: "state", children: "State" }), _jsx("input", { type: "text", id: "state", value: state, onChange: (e) => setState(e.target.value) })] }), _jsxs("div", { className: "input-group-for-three", children: [_jsx("label", { htmlFor: "pincode", children: "Pincode" }), _jsx("input", { type: "number", id: "pincode", value: pincode, onChange: (e) => {
                                        const value = e.target.value;
                                        if (value.length > 6) {
                                            toast.error('PinCode must be 10 digits');
                                        }
                                        else {
                                            setPincode(value);
                                        }
                                    }, onBlur: (e) => {
                                        const value = e.target.value;
                                        if (value.length < 6) {
                                            toast.error('PinCode must be 6 digits');
                                            setPincode('');
                                        }
                                    } })] })] }), _jsx("div", { className: "form-row", children: _jsxs("div", { className: "input-independent-group", children: [_jsx("label", { htmlFor: "facilities", children: "Facilities Available at Center" }), _jsxs("div", { className: "checkbox-group", children: [_jsxs("label", { className: "checkbox-item", children: [_jsx("input", { type: "checkbox", value: "directorCabin", onChange: handleCheckboxChange }), " Director Cabin", _jsx("div", { className: "divider" })] }), _jsxs("label", { className: "checkbox-item", children: [_jsx("input", { type: "checkbox", value: "reception", onChange: handleCheckboxChange }), " Reception", _jsx("div", { className: "divider" })] }), _jsxs("label", { className: "checkbox-item", children: [_jsx("input", { type: "checkbox", value: "practicalLab", onChange: handleCheckboxChange }), " Practical Lab", _jsx("div", { className: "divider" })] }), _jsxs("label", { className: "checkbox-item", children: [_jsx("input", { type: "checkbox", value: "theoryRoom", onChange: handleCheckboxChange }), " Theory Room", _jsx("div", { className: "divider" })] }), _jsxs("label", { className: "checkbox-item", children: [_jsx("input", { type: "checkbox", value: "parkingSpace", onChange: handleCheckboxChange }), " Parking Space", _jsx("div", { className: "divider" })] }), _jsxs("label", { className: "checkbox-item", children: [_jsx("input", { type: "checkbox", value: "bathroom", onChange: handleCheckboxChange }), " Bathroom/Toilet", _jsx("div", { className: "divider" })] }), _jsxs("label", { className: "checkbox-item", children: [_jsx("input", { type: "checkbox", value: "underConstruction", onChange: handleCheckboxChange }), " Under Construction"] })] })] }) }), _jsx("div", { className: "form-row", children: _jsxs("div", { className: "input-independent-group", children: [_jsx("label", { children: "Already Having a Franchise" }), _jsxs("div", { className: "radio-group", children: [_jsxs("label", { className: "radio-item", children: [_jsx("input", { type: "radio", name: "existingFranchise", value: "yes", onChange: handleRadioChange }), "Yes"] }), _jsxs("label", { className: "radio-item", children: [_jsx("input", { type: "radio", name: "existingFranchise", value: "no", onChange: handleRadioChange }), "No"] })] })] }) }), _jsx("div", { className: "form-row", children: _jsxs("div", { className: "input-independent-group", children: [_jsx("label", { htmlFor: "additionalInfo", children: "Any Other Information (Optional)" }), _jsx("textarea", { id: "additionalInfo", placeholder: "Enter additional information here", value: additionalInfo, onChange: (e) => setAdditionalInfo(e.target.value) })] }) }), _jsxs("div", { className: "form-actions", children: [_jsx("button", { type: "button", className: "cancel-btn", onClick: handleCancel, children: "Cancel" }), _jsx("button", { type: "button", className: "submit-btn", onClick: handleSubmit, children: "Submit" })] })] }) }));
};
export default FranchiseLogin;
