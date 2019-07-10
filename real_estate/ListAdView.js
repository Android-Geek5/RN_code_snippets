import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { WView, WText } from '../components/Common';
import { NavigationBackWithSearch } from '../components/Card/Misc';
import Colors from '../components/Styles/Colors';
import { ScrollView, FlatList } from 'react-native';
import { routeNames } from '../RouteConfig';
import { HorizontalBtnList } from '../components/Card/Search';
import { connect } from 'react-redux';
import { PopupList } from '../components/Card/Search/';
import { AdVerticalList } from '../components/Card/Image';

class ListAdView extends Component {

    render() {
        const { screenWidth, screenHeight, history, filter_main_form_data } = this.props;
        const { stretch, btnStyle, footerBtnContainer } = styles;

        return (
            <AdVerticalList />
        )
    }
}

const styles = {
    stretch: {
        alignItems: 'stretch'
    },
    btnStyle: { backgroundColor: Colors.secondary_theme_color, alignSelf: "stretch", height: 52, borderRadius: 5 },
    footerBtnContainer: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        marginBottom: 10,
    }
}

export default connect(({ FilterMain: FilterMainData }) => {
    const { filter_main_form_data } = FilterMainData;
    console.log("filter_main_form_data", filter_main_form_data);

    return { filter_main_form_data };
}, {})(ListAdView);

