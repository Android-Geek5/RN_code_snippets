import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { WButton, WView, WRow, WText, WTouchable } from '../../Common/';
import { Image } from 'react-native';
import { TxtBxInputCard } from '../../Card/Input';
import Colors from '../../Styles/Colors';
import { Large } from '../Btn';
import { empty } from 'apollo-link';
import { Storage } from 'aws-amplify';

export default class ImageUpload extends Component {

    state = {
        imageSource: require('../../../assets/images/no_image.png')
    }

    static propTypes = {
        source: PropTypes.any,
        topRightIcon1: PropTypes.any,
        topRightIcon2: PropTypes.any,
        onTopRightIconPress1: PropTypes.func,
        onTopRightIconPress2: PropTypes.func,
        isPremiumBtn: PropTypes.bool,
        isTopLeftBtn: PropTypes.bool,
        onMakePremuimPress: PropTypes.func,
        cardImageStyle: PropTypes.any,
        containerStyle: PropTypes.any,
        item: PropTypes.shape({
            description: PropTypes.string,
            id: PropTypes.string,
            s3Prefix: PropTypes.number,
            features: PropTypes.shape({
                floor: PropTypes.number,
                room: PropTypes.number,
                area: PropTypes.number
            })
        })
    }

    static defaultProps = {
        topRightIcon1: require('../../../assets/images/like.png'),
        topRightIcon2: require('../../../assets/images/block_white.png'),
        isPremiumBtn: false,
        isTopLeftBtn: false
    }

    componentDidMount() {
        this.getAdImage();
    }

    getAdImage = () => {
        const { item } = this.props;
        const { s3Prefix } = item;
        if (s3Prefix) {
            this.setState({ isImageLoading: true })
            Storage.list(s3Prefix + '/', { bucket: 'khareta-ads' }).then(
                images => {
                    this.setState({ isImageLoading: false })

                    console.log("images ====> keys", images);

                    if (images.length > 0)
                        console.log("images ====> ", `https://s3.amazonaws.com/khareta-ads/public/${images[0].key}`);

                    if (images.length > 0)
                        this.setState({ imageSource: { uri: `https://s3.amazonaws.com/khareta-ads/public/${images[0].key}` } });
                },
                error => this.setState({ isImageLoading: false })
            );
        }
    }

    render() {
        const { container, aboveRow, cardImage, crossIcon, likeIcon, bottomIcons, bottomRow, topLeftIcon } = styles;
        const empty = [];

        const {
            source,
            topRightIcon1,
            topRightIcon2,
            isPremiumBtn,
            isTopLeftBtn,
            cardImageStyle,
            onMakePremuimPress,
            onTopRightIconPress1,
            onTopRightIconPress2,
            containerStyle,
            item,
            onPress
        } = this.props;

        if (!item) return empty;

        const {
            title,
            id,
            price,
            features
        } = item;
        const { imageSource, isImageLoading } = this.state;

        return (
            <WTouchable onPress={onPress} dial={5} style={[container, containerStyle]}>
                <WView dial={5}>
                    {
                        isImageLoading ?
                            <WView dial={5} padding={[20, 10]} style={[cardImage, { alignSelf: "stretch" }]} backgroundColor={"#ccc"}>
                                <WSpinner color={Colors.white} />
                            </WView>
                            :
                            <Image
                                source={imageSource}
                                resizeMode="cover"
                                onError={() => { this.setState({ imageSource: require('../../../assets/images/no_image.png') }) }}
                                style={[cardImage, cardImageStyle]}
                            />
                    }

                    <WRow dial={5} style={[aboveRow, { "justifyContent": isTopLeftBtn ? "space-between" : "flex-end" }]}>
                        {
                            isTopLeftBtn &&
                            <WButton
                                component={() => <WText fontFamily={"Muli-Bold"} color={Colors.black}>مميز</WText>}
                                containerStyle={topLeftIcon}
                            />
                        }
                        <WRow dial={5}>
                            <WButton
                                component={() => <Image source={topRightIcon2}
                                    style={crossIcon} />}
                                onPress={onTopRightIconPress2}
                            />
                            <WButton
                                component={() => <Image source={topRightIcon1}
                                    style={likeIcon} />}
                                onPress={onTopRightIconPress1}
                            />
                        </WRow>
                    </WRow>
                    <WView dial={5} style={[bottomRow]}>
                        {
                            isPremiumBtn &&
                            <WRow dial={5}>
                                <Large
                                    label="Make it Premuim"
                                    onPress={onMakePremuimPress}
                                    containerStyle={{ paddingLeft: 10, paddingRight: 10 }}
                                />
                            </WRow>
                        }
                        <WRow dial={6}>
                            <WText fontFamily={"Muli-Bold"} right fontSize={18} color={Colors.white} >{price} JD</WText>
                        </WRow>
                    </WView>
                </WView>
                <WView dial={6} style={{ minHeight: 80 }}>
                    <WText fontFamily={"Muli-Bold"} right fontSize={14} lines={2}>
                        {title}
                    </WText>
                    <WRow dial={6} padding={[5, 0]}>
                        <WRow padding={[0, 10]}>
                            <WText fontFamily={"Muli-Bold"} >{features && features.floor}</WText>
                            <Image source={require('../../../assets/images/apartment_building.png')} style={bottomIcons} />
                        </WRow>
                        <WRow padding={[0, 10]}>
                            <WText fontFamily={"Muli-Bold"} >{features && features.room}</WText>
                            <Image source={require('../../../assets/images/bedrooms.png')} style={bottomIcons} />
                        </WRow>
                        <WRow>
                            <WText fontFamily={"Muli-Bold"} >{features && features.area}</WText>
                            <Image source={require('../../../assets/images/area.png')} style={bottomIcons} />
                        </WRow>
                    </WRow>
                </WView>
            </WTouchable>
        )
    }
}

const styles = {
    container: {
        height: 286,
        alignItems: 'stretch'
    },
    cardImage: {
        height: 200,
        maxHeight: 200
    },
    crossIcon: {
        width: 19,
        height: 19,
        marginRight: 11,
        tintColor: Colors.white
    },
    likeIcon: {
        width: 20,
        height: 17,
        tintColor: Colors.white
    },
    bottomIcons: {
        width: 17,
        height: 17,
        marginLeft: 5
    },
    aboveRow: {
        position: "absolute",
        top: 16,
        right: 18,
        left: 0,
        height: 21,
    },
    bottomRow: {
        position: "absolute",
        right: 12,
        left: 12,
        height: 21,
        bottom: 8,
        justifyContent: 'flex-end',
        alignItems: "stretch"
    },
    topLeftIcon: {
        width: 85,
        height: 25,
        backgroundColor: Colors.topLeftIcon
    }
}
