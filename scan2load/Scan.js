import React, { Component } from "react"
import { Linking, View } from "react-native"
import QRCodeScanner from "react-native-qrcode-scanner"
import { RNCamera } from "react-native-camera"
import { Header } from './component/';
import { Actions } from "react-native-router-flux"

export default class Scan extends Component<Props> {

    constructor(props) {
        super(props)
        this.state = { flashMode: "off" }
        this.onSuccess = this.onSuccess.bind(this)
        this.onRight = this.onRight.bind(this)
    }

    onRight() {
        if (this.state.flashMode === "on") {
            this.setState({ flashMode: "off" })
        } else {
            this.setState({ flashMode: "on" })
        }
    }

    onSuccess(scannedCode) {
        let toDial = scannedCode.data
        console.log("scanned - " + toDial)
        if (toDial.endsWith("%23")) {
            toDial = toDial.substring(0, toDial.length - 3)
        }
        if (toDial.endsWith("#")) {
            toDial = toDial.substring(0, toDial.length - 1)
        }
        toDial = toDial.substr(4)
        toDial = encodeURI(toDial)
        toDial = toDial + "*2%23" //add the tracking info to inform that it came from mobile app, uri encode the
        // trailing # to %23
        toDial = "tel:" + toDial
        console.log("dialing - " + toDial)
        Linking.openURL(toDial)
    }

    render() {

        const { flashMode } = this.state;

        return (
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                <Header
                    onBack={() => { Actions.pop() }}
                    onRightPress={this.onRight.bind(this)}
                />
                <QRCodeScanner
                    cameraProps={{ autoFocus: RNCamera.Constants.AutoFocus.on, flashMode: flashMode === "on" ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off }}
                    vibrate={false}
                    onRead={this.onSuccess}
                    ref={(node) => {
                        this.scanner = node
                    }} />
            </View>
        )

    }
}
