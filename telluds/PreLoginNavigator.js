import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Orientation from 'react-native-orientation-locker';
import Platform from 'Platform';

import { View } from '../../BaseComponents';
import { LoginScreen, RegisterScreen, ForgotPasswordScreen, WelcomeScreen } from './PreLoginScreens';
import { FormContainerComponent } from './PreLoginScreens/SubViews';

type renderContainer = (Object) => Object;

const renderFormContainer = (navigation: Object, screenProps: Object): renderContainer => (Component: Object): Object => (
	<FormContainerComponent navigation={navigation} screenProps={screenProps}>
		<Component/>
	</FormContainerComponent>
);

const RouteConfigs = {
	Login: {
		screen: ({ navigation, screenProps }: Object): Object => renderFormContainer(navigation, screenProps)(LoginScreen),
		navigationOptions: {
			header: null,
		},
	},
	ForgotPassword: {
		screen: ({ navigation, screenProps }: Object): Object => renderFormContainer(navigation, screenProps)(ForgotPasswordScreen),
		navigationOptions: {
			header: null,
		},
	},
	Register: {
		screen: ({ navigation, screenProps }: Object): Object => renderFormContainer(navigation, screenProps)(RegisterScreen),
		navigationOptions: {
			header: null,
		},
	},
	Welcome: {
		screen: ({ navigation, screenProps }: Object): Object => renderFormContainer(navigation, screenProps)(WelcomeScreen),
		navigationOptions: {
			header: null,
		},
	},
};

const StackNavigatorConfig = {
	initialRouteName: 'Login',
};

const Navigator = createAppContainer(createStackNavigator(RouteConfigs, StackNavigatorConfig));

type Props = {
};

type State = {
	currentScreen: string,
};

class PreLoginNavigator extends View {

	getCurrentRouteName: (navigationState: Object) => void;
	onNavigationStateChange: (prevState: Object, currentState: Object) => void;

	props: Props;
	state: State;
	constructor(props: Props) {
		super(props);
		this.state = {
			currentScreen: 'Login',
		};
		this.onNavigationStateChange = this.onNavigationStateChange.bind(this);
	}
	componentDidMount() {
		if (Platform.OS !== 'android') {
			Orientation.lockToPortrait();
		}
	}

	componentWillUnmount() {
		if (Platform.OS !== 'android') {
			Orientation.unlockAllOrientations();
		}
	}

	// gets the current screen from navigation state
	getCurrentRouteName(navigationState: Object): any {
		if (!navigationState) {
			return null;
		}
		const route = navigationState.routes[navigationState.index];
		// dive into nested navigators
		if (route.routes) {
			this.getCurrentRouteName(route);
		}
		return route.routeName;
	}

	onNavigationStateChange(prevState: Object, currentState: Object) {
		const currentScreen = this.getCurrentRouteName(currentState);
		this.setState({
			currentScreen,
		});
	}

	render(): React$Element<any> {
		let screenProps = {currentScreen: this.state.currentScreen};
		return (
			<Navigator
				onNavigationStateChange={this.onNavigationStateChange}
				screenProps={screenProps}
			/>
		);
	}
}

module.exports = PreLoginNavigator;
