import overlay from '../images/overlay.svg';

export const styles = theme => ({
    backgroundOverlay: {
        background: `url(${overlay}) no-repeat`,
        position: 'fixed',
        width: '70%',
        height: '100%',
        right: 0,
        top: 0,
        backgroundSize: 'cover',
        zIndex: -1
    },
    authOverlay: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: 30,
        zIndex: 2,
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 260,
        marginTop: 10
    },
    button: {
        margin: theme.spacing.unit,
    },
    form: {
        display: 'flex',
        flexDirection: 'column'
    },
    bottomGutter: {
        marginBottom: 30
    },
    loader: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        zIndex: 3,
        transform: 'translate(-50%, -50%)',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
});