import React, { Component } from 'react'
import {
    Linking,
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import Drawer from 'react-native-drawer';

import {
    getKeycloakToken,
    getUserProfile,
    logOutMe,
    selectMenu,
    refreshKeycloakToken,
    updateDeepLinkQRCode
} from '../actions'
import {
    Panel,
    SPanel
} from './common'
import Header from './UI/Header'
import Menu from './Menu'
import { DashboardBtnsGroup } from './card';
import Colors from './Styles/Colors';
import { ShopsList } from './UI/select'
import { getQrCodeData } from '../api/s2sApi';
import Loading from './Modals/Body/Loading';
import { Alert } from './Modals';
import { DEEP_LINK_QR_CODE, DEEP_LINK_QR_CODE_KEY } from '../actions/types';

var GLOBAL_INTERVAL;
class Dashboard extends Component {

    static defaultProps = {
        token: {},
        isLoaderCenter: false,
        activeShop: {
            id: ''
        }
    }

    state = {
        isOpen: false,
        selectedItem: 'About',
        shopName: 'STORE',
        balance: 'R 332 0093',
        isLoading: false,
        isRefresh: false
    }

    constructor(props) {
        super(props);

        const { isRefresh } = this.props;
        if (isRefresh) this.setTokenRefreshInterval();
        this.onOpenURL = this.onOpenURL.bind(this);
        this.onOpenURLInit = this.onOpenURLInit.bind(this);

        Linking.getInitialURL()
            .then(this.onOpenURLInit);
    }

    onOpenURL = (res) => {
        const { updateDeepLinkQRCode } = this.props;
        const url = res && res.url ? res.url : res;
        if (url === null) {
            return
        }
        if (url.indexOf("shop.shoptoshop.co.za/qr-code/send?code=") >= 0) {
            let code = url
            code = code.substr(code.length - 6);
            updateDeepLinkQRCode(code);
            // this.setState({ qrCodeData: code });

            //this will load the current user or login
            this.refresh()
        }
    }

    onOpenURLInit = (res) => {
        const { updateDeepLinkQRCode } = this.props;
        const url = res && res.url ? res.url : res;
        if (url === null) {
            return
        }
        if (url.indexOf("shop.shoptoshop.co.za/qr-code/send?code=") >= 0) {
            let code = url
            code = code.substr(code.length - 6);
            updateDeepLinkQRCode(code, true);
            // this.setState({ qrCodeData: code });

            //this will load the current user or login
            this.refresh()
        }
    }

    onMenuItemSelected = item =>
        this.setState({
            isOpen: false,
            selectedItem: item,
        })

    refresh = () => {
        const { activeShop, token } = this.props
        this.setState({ isLoading: true, isRefresh: true });
        if (token && token.access_token) {
            this.props.getUserProfile(token.access_token, activeShop)
        }
    }

    refetchData = () => {
        const { activeShop, token } = this.props
        this.setState({ isLoading: true });
        if (token && token.access_token) {
            this.props.getUserProfile(token.access_token, activeShop)
        }
    }

    componentWillMount() {
        Linking.addEventListener('url', this.onOpenURL)
        this.onButtonPress = this.onButtonPress.bind(this)
    }

    componentDidMount = () => {
        this.refetchData();
    }

    componentWillUnmount = () => {
        Linking.removeListener('url', () => { })
    }


    componentDidUpdate(prevProps) {
        const { userShops, activeShop, systemAccount, token, selectedMenuId, accounts, qrCodeData, screenProps } = this.props

        if( screenProps && screenProps.isConnected && prevProps.screenProps && screenProps.isConnected !== prevProps.screenProps.isConnected ){
            this.refetchData();
        }

        if (selectedMenuId !== prevProps.selectedMenuId) {
            if (selectedMenuId === 'close') this.setDrawer(false)
        }

        //While qr from url event listener
        if (qrCodeData !== prevProps.qrCodeData) {
            this.checkCode();
        }

        if (userShops !== prevProps.userShops) {
            if (userShops && userShops.count === 0) {
                this.setState({
                    isLoading: false,
                })
                Actions.addShopMain()
            }
        }

        if (systemAccount !== prevProps.systemAccount) {
            var symbol = 'R '
            var bal = systemAccount.balance
            const balanc = symbol + bal

            this.setState({
                balance: balanc,
                isLoading: false,
                isRefresh: false,
            })

            //While qr code come from getInitialURL
            if (qrCodeData && prevProps.qrCodeData && qrCodeData === prevProps.qrCodeData) {
                this.checkCode();
            }
        }
    }

    checkCode = () => {
        const { qrCodeData, updateDeepLinkQRCode } = this.props;
        const code = qrCodeData;
        if (code) {
            getQrCodeData(code)
                .then(res => {
                    if (res.code === code ? code.toUpperCase() : '') {
                        Actions.shopToShopMain()
                        Actions.sendMoney({ qrCodeData: res, screenType: "scan2Pay" })
                    }
                    updateDeepLinkQRCode("");
                }).catch((error) => {
                    updateDeepLinkQRCode("");
                })
        }

    }

    onButtonPress(name) {
        switch (name) {
            case 'suppliers':
                Actions.suppliersMain()
                break
            case 'pay':
                Actions.suppliersMain()
                break
            case 'shopToShop':
                Actions.shopToShopMain()
                break
            case 'transfer':
                Actions.transferMain()
                break
            case 'history':
                Actions.transactionMain()
                break
            case 'accounts':
                Actions.accountsMain()
                break
            case 'settings':
                Actions.settingsMain()
                break
            default:
            // Actions.main()
        }
    }

    updateMenuState(isOpen) {
        this.setState({ isOpen })
    }

    toggle() {
        this.setState({
            isOpen: true
        })
        this.props.selectMenu('none', false)
    }

    setDrawer(isOpen) {
        this.setState({
            isOpen
        })
    }

    setTokenRefreshInterval = () => {
        const { refreshKeycloakToken, token } = this.props
        let expires_in;
        if (token) {
            expires_in = token.expires_in;
        } else {
            expires_in = 0
        }
        let expires_in_time = new Date();
        expires_in_time.setSeconds(expires_in, 0);

        GLOBAL_INTERVAL = setInterval(() => {
            let is_expires_in_time = new Date().getTime();
            if (expires_in_time.getTime() <= is_expires_in_time) {
                clearInterval(GLOBAL_INTERVAL);
                refreshKeycloakToken(false);
                this.setTokenRefreshInterval();
            }
        }, 1000);
    }

    onSelectShop = () => {
        this.setState({ isLoading: true });
    }

    isLoadingInCenter = () => {
        const rootRouteLength = Actions.state.routes.length
        const routeLength = rootRouteLength ? Actions.state.routes[0].routes.length : 0;
        const { isLoaderCenter } = this.props;
        
        return isLoaderCenter || routeLength !== 1 ? true : false;
    }

    render() {
        const settingsIcon = require('../../assets/img/settings.png')
        const penIcon = require('../../assets/img/edit1.png')
        const payIcon = require('../../assets/img/wallet.png')
        const historyIcon = require('../../assets/img/history1.png')
        const shopToShop = require('../../assets/img/qr-code.png')
        const transferIcon = require('../../assets/img/transfer.png')
        const accountIcon = require('../../assets/img/accounts1.png')

        const menu = <Menu onItemSelected={this.onMenuItemSelected} />
        const { isLoading } = this.state;

        const drawerStyles = {
            drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3, backgroundColor: Colors.screenBackground },
            main: { paddingLeft: 3 },
        }

        return (
            <Drawer
                content={menu}
                type="overlay"
                tapToClose={true}
                openDrawerOffset={0.10} // 20% gap on the right side of drawer
                closedDrawerOffset={-4}
                styles={drawerStyles}
                tweenHandler={(ratio) => ({
                    main: { opacity: (2 - ratio) / 2 }
                })}
                open={isLoading ? false : this.state.isOpen}
                onClose={this.setDrawer.bind(this, false)}
                onChange={isOpen => this.updateMenuState(isOpen)}>
                <Panel>
                    <Alert
                        isBtn1={false}
                        isBtn2={false}
                        isLabel={false}
                        isVisible={isLoading}
                        containerStyle={{ backgroundColor: "transparent" }}
                        component={() =>
                            <Loading
                                isCenter={this.isLoadingInCenter()} />
                        } />
                    <Header onPress={this.toggle.bind(this)} headerText={this.state.balance} />
                    <SPanel
                        tintColor={'white'}
                        onRefresh={() => this.refresh()}
                        isRefresh={true}
                        refreshing={this.state.isRefresh}
                    >
                        <ShopsList
                            onSelectShop={this.onSelectShop.bind(this)} />
                        <DashboardBtnsGroup />
                    </SPanel>
                </Panel>
            </Drawer>
        )
    }
}

const styles = {
    button: {
        position: 'absolute',
        top: 20,
        padding: 10,
    },
    buttonStyle: {
        flex: 1,
        backgroundColor: '#28313B',
        borderRadius: 5,
        borderWidth: 0,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        height: 100,
    },
    dealsButtonStyle: {
        flex: 1,
        backgroundColor: '#D69A37',
        borderRadius: 5,
        borderWidth: 0,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        height: 100,
    },
    menusWrapper: {
        padding: 5,
        paddingTop: 50,
    },
    headingText: {
        height: 40,
        width: null,
        flex: 1,
        paddingLeft: 10,
        fontWeight: '500',
        color: '#FFF',
        backgroundColor: '#34404C',
        lineHeight: 40,
    },
}

const mapStateToProps = (state) => {
    const { auth, user, accounts, selectedMenuId } = state
    const { activeShop, userShops } = user
    const { token } = auth
    const { systemAccount } = accounts;

    let qrCodeData = user[DEEP_LINK_QR_CODE_KEY];
    qrCodeData = qrCodeData[DEEP_LINK_QR_CODE] ? qrCodeData[DEEP_LINK_QR_CODE] : "";

    return { token, activeShop, systemAccount, userShops, selectedMenuId, accounts, qrCodeData }
}

export default connect(
    mapStateToProps,
    {
        getUserProfile,
        getKeycloakToken,
        refreshKeycloakToken,
        selectMenu,
        updateDeepLinkQRCode,
        logOutMe,
    },
)(Dashboard)
