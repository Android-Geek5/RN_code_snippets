import React from 'react'
import {
    Router,
    Scene
} from 'react-native-router-flux'
import Dashboard from './components/Dashboard'
import LoginForm from './components/LoginForm'
import {
    Scan2PayDashboard,
    Scan2PayScanner,
    SendMoney,
    PaymentsReceipt,
    ReceiveMoney
} from './components/Scan2Pay';
import {
    Transfer, TransferDashboard
} from './components/Transfer';
import {
    Dashbaord,
    Accounts as AccountsList1,
    AddAccount,
    AddNewAddress,
    MyDetail,
    ShopDetail,
    EditMyDetail,
    EditMyShop,
    DeliveryAddresses
} from './components/MyProfile';
import {
    Dashboard as SuppliersDashbaord,
    Payments as SupplierPayment,
    PaySuppliers,
    OtpVerification,
    PayOrder
} from './components/Payments';
import MyProfileDashboard from './components/MyProfile/Dashbaord';
import {
    Dashboard as SettingsDashboard,
    TransactionNotification,
    AddTransactionNotification
} from './components/Setting';
import { Transaction as TransactionHistory, Dashboard as HistoryDashbaord } from './components/History';
import {
    OrderSuppliers,
    OrderHistory,
    Products,
    OrderPayment,
    OrderReceipt
} from './components/Order';
import { Cart, SelectFulfillment, ConfirmOrder } from './components/Cart';
import SelectDeliveryAddress from './components/Cart/SelectDeliveryAddress';
import { HomeAddShop, AddShop, ExistingShopMessage } from './components/AddShop';
import { Wrapper } from './components/UI';

const RouterComponent = () => {
    console.log("clearIntervalconnection info bar interval ===> page");
    return (
        <Router>
            <Scene key="root" hideNavBar>
                <Scene key="auth" hideNavBar>
                    <Scene key="login" component={() => <Wrapper component={LoginForm} />} initial />
                </Scene>

                <Scene key="main" hideNavBar >
                    <Scene key="dashboard" component={({...props}) => <Wrapper component={Dashboard} {...props}/>} initial />
                    <Scene key="paymentReceipt1" component={({...props}) => <Wrapper component={PaymentsReceipt} {...props}/>} />
                    <Scene key="paymentReceipt" component={({...props}) => <Wrapper component={PaymentsReceipt} {...props}/>} />
                    <Scene key="otpVerification" component={({...props}) => <Wrapper component={OtpVerification} {...props}/>} />
                    <Scene key="orderHistory" component={({...props}) => <Wrapper component={OrderHistory} {...props}/>} />
                    <Scene key="orderRecipt" component={({...props}) => <Wrapper component={OrderReceipt} {...props}/>} />
                    <Scene key="orderPayment" component={({...props}) => <Wrapper component={OrderPayment} {...props}/>} />
                    <Scene key="receiveMoney" component={({...props}) => <Wrapper component={ReceiveMoney} {...props}/>} />

                    <Scene key="addShopMain" hideNavBar>
                        <Scene key="shopMain" component={({...props}) => <Wrapper component={HomeAddShop} {...props}/>} initial />
                        <Scene key="addShop" component={({...props}) => <Wrapper component={AddShop} {...props}/>} />
                        <Scene key="existingShopMessage" component={({...props}) => <Wrapper component={ExistingShopMessage} {...props}/>} />
                    </Scene>

                    <Scene key="suppliersMain" hideNavBar>
                        <Scene key="suppliers" component={({...props}) => <Wrapper component={SuppliersDashbaord} {...props}/>} />
                        <Scene key="paySuppliers" component={({...props}) => <Wrapper component={PaySuppliers} {...props}/>} initial />
                        <Scene key="supplierPayment" component={({...props}) => <Wrapper component={SupplierPayment} {...props}/>} />
                        <Scene key="payOrder" component={({...props}) => <Wrapper component={PayOrder} {...props}/>} />
                    </Scene>

                    <Scene key="shopToShopMain" hideNavBar>
                        <Scene key="scan2PayDashboard" component={({...props}) => <Wrapper component={Scan2PayDashboard} {...props}/>} />
                        <Scene key="scan2PayScan" component={({...props}) => <Wrapper component={Scan2PayScanner} {...props}/>} initial />
                        <Scene key="sendMoney" component={({...props}) => <Wrapper component={SendMoney} {...props}/>} />
                        {/* <Scene key="receiveMoney" component={ReceiveMoney} /> */}
                    </Scene>

                    <Scene key="transferMain" hideNavBar>
                        <Scene key="transferDashboard" component={({...props}) => <Wrapper component={TransferDashboard} {...props}/>} initial />
                        <Scene key="transfer" component={({...props}) => <Wrapper component={Transfer} {...props}/>} />
                        <Scene key="sendMoneyViaTransfer" component={({...props}) => <Wrapper component={SendMoney} {...props}/>} />
                    </Scene>

                    <Scene key="transactionMain" hideNavBar>
                        <Scene key="historyDashboard" component={({...props}) => <Wrapper component={HistoryDashbaord} {...props}/>} initial />
                        <Scene key="transactionHistory" component={({...props}) => <Wrapper component={TransactionHistory} {...props}/>} />
                        {/* <Scene key="transactionHistory" component={Transactions} initial /> */}
                    </Scene>

                    <Scene key="myProfileMain" hideNavBar>
                        <Scene key="myProfileDashboard" component={({...props}) => <Wrapper component={MyProfileDashboard} {...props}/>} initial />
                        <Scene key="accounts" component={({...props}) => <Wrapper component={AccountsList1} {...props}/>} />
                        <Scene key="addAccount" component={({...props}) => <Wrapper component={AddAccount} {...props}/>} />
                        <Scene key="addNewAddress" component={({...props}) => <Wrapper component={AddNewAddress} {...props}/>} />
                        <Scene key="myDetail" component={({...props}) => <Wrapper component={MyDetail} {...props}/>} />
                        <Scene key="shopDetail" component={({...props}) => <Wrapper component={ShopDetail} {...props}/>} />
                        <Scene key="editMyDetail" component={({...props}) => <Wrapper component={EditMyDetail} {...props}/>} />
                        <Scene key="editMyShop" component={({...props}) => <Wrapper component={EditMyShop} {...props}/>} />
                        <Scene key="deliveryAddresses" component={({...props}) => <Wrapper component={DeliveryAddresses} {...props}/>} />
                    </Scene>

                    <Scene key="accountsMain" hideNavBar>
                        {/* <Scene key="accounts" component={Accounts} initial /> */}
                        {/* <Scene key="selectAccountType" component={SelectAccountType} /> */}
                        {/* <Scene key="addAccountName" component={AddAccountName} /> */}
                        <Scene key="myDetail" component={({...props}) => <Wrapper component={MyDetail} {...props}/>} />
                    </Scene>

                    <Scene key="settingsMain1" hideNavBar>
                        <Scene key="settingsDashboard" component={({...props}) => <Wrapper component={SettingsDashboard} {...props}/>} initial />
                        <Scene key="transactionNotifications" component={({...props}) => <Wrapper component={TransactionNotification} {...props}/>} />
                        <Scene key="addTransactionNotification" component={({...props}) => <Wrapper component={AddTransactionNotification} {...props}/>} />
                    </Scene>

                    {/* <Scene key="settingsMain" hideNavBar>
                        <Scene key="settings" component={Settings} initial />
                        <Scene key="viewProfile" component={ViewProfile} />
                        <Scene key="editProfile" component={EditProfile} />
                        <Scene key="viewShop" component={ViewShop} />
                        <Scene key="editShop" component={EditShop} />
                        <Scene key="addShop" component={AddShop} />
                        <Scene key="updateShop" component={UpdateShop} />
                    </Scene> */}

                    <Scene key="orderMain" hideNavBar>
                        <Scene key="orderSuppliers" component={({...props}) => <Wrapper component={OrderSuppliers} {...props}/>} initial />
                        <Scene key="products" component={({...props}) => <Wrapper component={Products} {...props}/>} direction="vertical" />
                    </Scene>

                    <Scene key="cartMain" hideNavBar>
                        <Scene key="cartList" component={({...props}) => <Wrapper component={Cart} {...props}/>} initial />
                        <Scene key="selectFulfillment" component={({...props}) => <Wrapper component={SelectFulfillment} {...props}/>} />
                        <Scene key="confirmOrder" component={({...props}) => <Wrapper component={ConfirmOrder} {...props}/>} />
                        <Scene key="selectDeliveryAddress" component={({...props}) => <Wrapper component={SelectDeliveryAddress} {...props}/>} />
                    </Scene>
                </Scene>
            </Scene>
        </Router>
    )
}

export default RouterComponent
