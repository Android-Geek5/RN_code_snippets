import React, { Component } from "react"
import {
    Image,
    ImageBackground,
    TouchableOpacity
} from "react-native"
import { Actions } from 'react-native-router-flux'

type Props = {};
export default class Home extends Component<Props> {
    
    constructor(props) {
        super(props)
        
        this.onScan = this.onScan.bind(this)
    }
    
    onScan() {
        Actions.scan()
    }
    
    render() {
        const background = require('../assets/img_bg_gradient.png')
        const logo = require('../assets/img_home_logo.png')
        const networks = require('../assets/img_home_networks.png')
        const button = require('../assets/btn_home_scan.png')
        return (
            <ImageBackground style={styles.wrapper} source={background}>
                <Image style={styles.logo} source={logo}/>
                <Image style={styles.networks} source={networks}/>
                <TouchableOpacity style={styles.buttonWrapper} onPress={this.onScan}>
                    <Image style={styles.button} source={button}/>
                </TouchableOpacity>
            </ImageBackground>
        )
        
    }
}

const styles = {
    
    wrapper: {
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
    },
    logo: {
        height: 150,
        marginTop: 50,
        resizeMode: 'contain',
    },
    networks: {
        width: 350,
        resizeMode: 'contain',
        flex: 1,
    },
    buttonWrapper :{
        height: 150,
    },
    button: {
        resizeMode: 'contain',
        flex :1,
        marginBottom : 50,
    },
}
