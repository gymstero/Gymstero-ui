import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { firebase } from '@react-native-firebase/auth';

const getGoogleUser = async () => {
    try {
        return await GoogleSignin.getCurrentUser();
    } catch (err) {
        console.log(err);
        return null;
    }
};

const getUser = async () => {
    try {
        return await firebase.auth().currentUser;
    } catch (err) {
        console.log(err);
        return null;
    }
};

const getIdToken = async () => {
    try {
        return await firebase.auth().currentUser.getIdToken(true);
    } catch (err) {
        console.log(err);
        return null;
    }
};

const googleLogout = async (setError, setUserMessage, navigation) => {
    setError(false);
    setUserMessage('');

    try {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        navigation.navigate('Authentication');
    } catch (err) {
        console.error('Error in Google logout', err);
        setUserMessage('Something went wrong. Please try again.');
        setError(true);
    }
};

export { getUser, getGoogleUser, getIdToken, googleLogout };
