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

export { getUser, getGoogleUser, getIdToken };
