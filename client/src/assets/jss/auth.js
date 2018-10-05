import Grey from '@material-ui/core/colors/grey';
import overlay from '../images/overlay.svg';

export const styles = theme => ({
    backgroundOverlay: {
        background: `url(${overlay}) no-repeat`,
        position: 'fixed',
        width: '70%',
        height: '100%',
        right: 0,
        top: 0,
        backgroundSize: 'cover'
    },
    signUpOverlay: {
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
    title: {
        width: '100%',
        textAlign: 'center',
        position: 'fixed',
        top: -60,
        left: '50%',
        transform: 'translateX(-50%)',
        fontWeight: '500',
        fontSize: '1.4rem',
        color: `${Grey['600']}`
    }
});