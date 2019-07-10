import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { StyleSheet, View, Image, TouchableOpacity, PixelRatio } from 'react-native'
import TabViews from './TabViews';
import { WView, WText } from '../UI';
import Colors from '../Styles/Colors';

/**
 * Tabs
 */
export default class TabsView extends Component {
    static propTypes = {
        ...View.propTypes,
        initialPage: PropTypes.number,
        pager: PropTypes.instanceOf(TabViews),
        tabs: PropTypes.arrayOf(PropTypes.shape({
            text: PropTypes.string,
            iconSource: Image.propTypes.source,
            selectedIconSource: Image.propTypes.source
        })).isRequired,
        changePageWithAnimation: PropTypes.bool,
    }

    /**
     * default properties
     */
    static defaultProps = {
        tabs: [],
        changePageWithAnimation: true
    }

    state = {
        selectedIndex: this.props.initialPage,
        left: 0
    }

    render() {
        const { bottomBorder, stretch } = styles;
        let {
            tabs, pager, style, itemStyle, selectedItemStyle, iconStyle,
            selectedIconStyle, textStyle, selectedTextStyle, changePageWithAnimation,
            onTabPress
        } = this.props
        if (!tabs || tabs.length === 0) return null

        let tabsView = tabs.map((tab, index) => {
            let isSelected = this.state.selectedIndex === index
            return (
                <TouchableOpacity
                    style={[styles.itemContainer, isSelected ? selectedItemStyle : itemStyle]}
                    activeOpacity={0.6}
                    key={index}
                    onPress={() => {
                        if (typeof tab.onTabPress === "function") {
                            tab.onTabPress();
                            return;
                        }
                        if (!isSelected) {
                            if (this.props.changePageWithAnimation)
                                pager.setPage(index);
                            else pager.setPageWithoutAnimation(index);
                        }
                        return;
                    }}
                >
                    <WView dial={5} flex style={[stretch, isSelected ? bottomBorder : {}]}>
                        <WText color={isSelected ? Colors.headingWhite : Colors.light_receipt_strip} fontSize={14} fontWeight={'500'} center>{tab.label}</WText>
                    </WView>
                </TouchableOpacity>
            )
        })
        return (
            <View style={[styles.container, style]} >
                {tabsView}
            </View>
        )
    }

    onPageSelected(e) {
        this.setState({ selectedIndex: e.position })
    }

    onPageScroll(e) {
    }
}

//Styels for this component
const styles = StyleSheet.create({
    container: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'stretch',
        backgroundColor: Colors.cardBackground
    },
    itemContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    stretch: {
        alignItems: 'stretch',
        alignSelf: 'stretch'
    },
    bottomBorder: {
        borderBottomWidth: (4 / PixelRatio.getPixelSizeForLayoutSize(1)) * 2,
        borderColor: Colors.yellow,
        borderStyle: "solid",
        borderRadius: 1
    }
})
