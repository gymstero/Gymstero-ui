import { theme } from './theme';

export const customStyles = {
    container: {
        padding: 2,
        alignItems: 'center',
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        // backgroundColor: theme.colors.primary,
        width: '100%',
        fontFamily: 'Arial',
        fontSize: 22,
        fontWeight: 'bold',
        // color: theme.colors.text,
        textAlign: 'center',
        padding: 10,
    },
    body: {
        //fontFamily: "Arial",
        fontSize: 15,
        border: 1,
        padding: 5,
    },
    h1: {
        fontFamily: 'Arial',
        fontSize: 32,
        fontWeight: 'bold',
        padding: 10,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loading: {
        //size: "large",
        color: theme.colors.secondary,
    },
};
