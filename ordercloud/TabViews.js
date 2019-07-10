import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import ViewPager from './ViewPager';

const VIEWPAGER_REF = 'viewPagerr'
const INDICATOR_REF = 'indicatorr'

/**
 * Rendering tabs functionality while taping or swiping
 */
export default class TabViews extends Component {
    static propTypes = {
        ...ViewPager.propTypes,
        indicator: PropTypes.node,
        autoPlayEnable: PropTypes.bool,
        autoPlayInterval: PropTypes.number,
        horizontalScroll: PropTypes.bool,
        tabPosition: PropTypes.string
    }

    /**
     * default properties
     */
    static defaultProps = {
        indicator: null,
        initialPage: 0,
        autoPlayInterval: 3000,
        autoPlayEnable: false,
        horizontalScroll: false,
        tabPosition: "top"
    }

    constructor(props) {
        super(props)
        this._onPageScroll = this._onPageScroll.bind(this)
        this._onPageSelected = this._onPageSelected.bind(this)
        this._renderIndicator = this._renderIndicator.bind(this)
        this.setPage = this.setPage.bind(this)
        this.setPageWithoutAnimation = this.setPageWithoutAnimation.bind(this)
        this._currentIndex = props.initialPage
        this._childrenCount = React.Children.count(props.children)
    }

    componentWillUpdate(nextProps, nextState) {
        this._childrenCount = React.Children.count(nextProps.children)
    }

    render() {
        return (
            <View style={[styles.container, this.props.style]} >
                {this.props.tabPosition === "top" && this._renderIndicator()}
                <ViewPager
                    {...this.props}
                    horizontalScroll={this.props.horizontalScroll}
                    ref={VIEWPAGER_REF}
                    style={[styles.pager, this.props.pagerStyle]}
                    onPageScroll={this._onPageScroll}
                    onPageSelected={this._onPageSelected}
                />
                {this.props.tabPosition === "bottom" && this._renderIndicator()}
            </View>
        )
    }

    _onPageScroll(params) {
        let indicator = this.refs[INDICATOR_REF]
        indicator && indicator.onPageScroll && indicator.onPageScroll && indicator.onPageScroll(params)
    }

    _onPageSelected(params) {
        let indicator = this.refs[INDICATOR_REF]
        indicator && indicator.onPageSelected && indicator.onPageSelected(params)
        this.props.onPageSelected && this.props.onPageSelected(params)
        this._currentIndex = params.position
    }

    _renderIndicator() {
        let { indicator, initialPage } = this.props
        if (!indicator) return null
        return React.cloneElement(indicator, {
            ref: INDICATOR_REF,
            pager: this,
            initialPage: initialPage
        })
    }

    setPage(selectedPage) {
        this.refs[VIEWPAGER_REF].setPage(selectedPage)
    }

    setPageWithoutAnimation(selectedPage) {
        this.refs[VIEWPAGER_REF].setPageWithoutAnimation(selectedPage)
    }
}

const styles = StyleSheet.create({
    container: {
    },
    pager: {
    }
})
