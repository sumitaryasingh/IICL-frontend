import axios from 'axios';

const sampledata = {
    role: 'franchise',
    centreCode: '12345',
    centreName: 'Sample Centre',
    centreAddress: '123 Sample Street',
    directorName: 'John Doe',
    designation: 'Director',
    mobileNo: '1234567890',
    email: 'sample@example.com',
    password: 'password123',
    card: 'Sample Card',
    authorizationCertificate: 'Sample Certificate'
};

export const getProfileData = async () => {
    try {
        const response = await axios.get('/api/profile');
        return response.data;
        // return sampledata;
    } catch (error) {
        console.error('Error fetching profile data:', error);
        return null;
    }
};