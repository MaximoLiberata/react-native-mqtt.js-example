import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MttqScreen from 'src/screen/Mttq'
import { COLORS } from 'src/constants/Colors'


const Stack = createNativeStackNavigator()

const stackOptions = {
	// headerShown: false,
	headerStyle: {
		backgroundColor: COLORS.bg,
	},
	headerTransparent: true,
	headerTintColor: COLORS.text,
	headerTitleStyle: {
		fontWeight: 'bold',
	},
	headerTitleAlign: 'center',
}

const Stacks = () => {
	return (
		<Stack.Navigator screenOptions={stackOptions} initialRouteName='Mttq'>
			<Stack.Screen
				name='Mttq'
				component={MttqScreen}
				options={{ title: 'Mttq' }}
			/>
		</Stack.Navigator>
	)
}


export default Stacks
