import overlay from '../images/overlay.svg';

export const styles = theme => ({
    w50: {
        width: '50%',
    },
    w100: {
        width: '100%'
    },
    mh100: {
        'min-height': '100%'
    },
    h50: {
        height: '50%'
    },
    h100: {
        height: '100%'
    },
    textAlignLeft: {
        textAlign: 'left'
    },
    none: {
        display: 'none'
    },
    flex: {
        display: 'flex'
    },
    flexColumn: {
        'flex-direction': 'column'
    },
    flexRow: {
        'flex-direction': 'row'
    },
    flexColumnReverse: {
        'flex-direction': 'column-reverse'
    },
    flexRowReverse: {
        'flex-direction': 'row-reverse'
    },
    justifyContentCenter: {
        'justify-content': 'center'
    },
    justifyContentEnd: {
        'justify-content': 'flex-end'
    },
    justifyContentStart: {
        'justify-content': 'flex-start'
    },
    alignItemsCenter: {
        'align-items': 'center'
    },
    alignItemsStart: {
        'align-items': 'flex-start'
    },
    flexWrap: {
        flexWrap: 'wrap'
    },
    noneMargin: {
        margin: 0
    },
    sFont: {
        fontSize: '.675rem'
    },
    xsMargin: {
        margin: '5px'
    },
    sMargin: {
        margin: '10px'
    },
    mMargin: {
        margin: '15px'
    },
    lMargin: {
        margin: '20px'
    },
    xlMargin: {
        margin: '30px'
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
    },
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
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    avatar: {
        border: '2px solid #fff',
        borderRadius: '50%',
        boxSizing: 'border-box'
    },
    popper: {
        marginRight: '20px',
        marginTop: '-20px'
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    cardsArea: {
        margin: '20px',
    },
    card: {
        maxWidth: '450px',
        width: '450px'
    },
    postImg: {
        maxWidth: '260px',
    },
    cardMedia: {
        width: '50%'
    },
    cardContent: {
        
    },
    cardActions: {

    },
    topMenu: {
        width: '280px',
    },
    topMenuHead: {
        backgroundColor: '#f5f5f5',
        boxShadow: 'none',
        padding: '15px'
    },
    innerArea: {
        width: '300px',
        outline: 'none'
    },
    userInfo: {
        marginLeft: '10px'
    },
    userName: {
        fontWeight: 'bold',
        fontSize: '1.25rem',
        marginRight: '5px'
    },
    userEmail: {
        color: '#8a8a8a'
    },
    userPage: {
        boxSizing: 'border-box'
    },
    post: {
        marginBottom: 20,
        position: 'relative'
    },
    fabDelete: {
        position: 'absolute',
        bottom: '-10px',
        right: 20
    },
    innerPadding: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    settingsTitle: {
        marginBottom: '20px'
    },
    avatarLoadButtons: {
        display: 'flex'
    },
    personalInfoTextField: {
        width: '100%'
    }
});