import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { FlatList } from 'react-native';
import { AdList } from '.';
import { WView, WSpinner, WText } from '../../Common';
import Colors from '../../Styles/Colors';
import { connect } from 'react-redux';
import * as Actions from '../../../redux/Search/Action';
import { API, graphqlOperation } from 'aws-amplify';
const { getAds } = Actions.default;

class AdVerticalList extends PureComponent {

    state = {
        ads: [],
        isLoading: false
    }

    static propTypes = {

    }

    componentWillReceiveProps = (prevProps) => {
        const { search_data } = this.props;
        console.log('procesing', search_data, prevProps.search_data);
        this.getAds();
    }

    componentDidMount = () => {
        this.getAds();
    }

    async getAds() {
        const { search_data } = this.props;
        const { search_data_order_by } = search_data;

        this.setState({ isLoading: true });
        const data = await API.graphql(graphqlOperation(getAds({}, search_data_order_by, 10, 0)));
        this.setState({ ads: data.data.ads && data.data.ads.length ? data.data.ads : [], isLoading: false });
    }

    render() {
        const { ads, isLoading } = this.state;

        return (
            <FlatList
                data={ads}
                contentContainerStyle={{ alignItems: 'stretch' }}
                keyExtractor={(item, index) => `ad-list-view-${index}`}
                ListHeaderComponent={
                    isLoading ?
                        <WView dial={5} margin={[20, 20]}>
                            <WSpinner size={'small'} color={Colors.theme_color} />
                            <WText fontSize={14} color={Colors.search_type_line_color}>Please wait...</WText>
                        </WView>
                        : null
                }
                renderItem={({ item, index }) => {
                    console.log('processing', item);
                    return (
                        <WView dial={5} backgroundColor={Colors.white} style={{ alignItems: 'stretch' }}>
                            <AdList
                                item={item}
                                onPress={() => { }}
                                key={`ad-list-item-${index}`}
                                source={{ uri: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" }}
                                topRightIcon1={() => { alert('Hided') }}
                                topRightIcon2={() => { alert('Added to Favorite') }}
                                isTopLeftBtn={false}
                            />
                        </WView>
                    );
                }}
            />
        )
    }
}

export default connect(({ Search: SearchData }) => {
    const { search_data } = SearchData;
    console.log("search_data", search_data);

    return { search_data };
})(AdVerticalList);