import ImageData from "../components/ImageData";
import HomeScreen from "../screens/Homescreen";
import {createStackNavigator} from '@react-navigation/stack';
import DataPolling from "../screens/DataPolling";
import LazyLoading from "../screens/LazyLoading";
import Tabs from "../screens/Tabs";
import InfiniteScrolling from "../screens/InfiniteScrolling";
import CancelSlowApi from "../screens/CancelSlowApi";
import StopWatch from "../screens/StopWatch";
import ChattingAppWebsockets from "../screens/ChattingAppWebsockets";
import ToDoList from "../screens/ToDoList";

const Stack = createStackNavigator()

const App = () => {
    const tabsData = [
        {
            title: "Tab 1",
            content: "Content of Tab 1",
            children: [
                {
                    title: "Sub Tab 1.1",
                    content: "Content of Sub Tab 1.1",
                    children: [
                        {
                            title: "Sub Tab 1.1.1",
                            content: "Content of Sub Tab 1.1.1",
                        },
                    ],
                },
                {
                    title: "Sub Tab 1.2",
                    content: "Content of Sub Tab 1.2",
                    children: [
                        {
                            title: "Sub Tab 1.1.2",
                            content: "Content of Sub Tab 1.1.2",
                        },
                    ],
                },
            ],
        },
        {
            title: "Tab 2",
            content: "Content of Tab 2",
        },
        {
            title: "Tab 3",
            content: "Content of Tab 3",
            children: [
                {
                    title: "Sub Tab 3.1",
                    content: "Content of Sub Tab 3.1",
                },
            ],
        },
    ];


    return (
        <Stack.Navigator initialRouteName={"/"}>
            <Stack.Screen name="/pictureData" component={ImageData} options={{headerShown: false}}></Stack.Screen>
            <Stack.Screen name="/Home" component={HomeScreen} options={{headerShown: false}}></Stack.Screen>
            <Stack.Screen name="/DataPolling" component={DataPolling} options={{headerShown: false}}></Stack.Screen>
            <Stack.Screen name={"/LazyLoading"} component={LazyLoading} options={{headerShown: false}}></Stack.Screen>
            <Stack.Screen name={"/Tabs"} component={() => Tabs({tabsData})}
                          options={{headerShown: false}}></Stack.Screen>
            <Stack.Screen name={"/InfiniteScrolling"} component={InfiniteScrolling}
                          options={{headerShown: false}}></Stack.Screen>
            <Stack.Screen name={"/CancelSlowApi"} component={CancelSlowApi}
                          options={{headerShown: false}}></Stack.Screen>
            <Stack.Screen name={"/StopWatch"} component={StopWatch}
                          options={{headerShown: false}}></Stack.Screen>
            <Stack.Screen name={"/ChattingAppWebsockets"} component={ChattingAppWebsockets}
                          options={{headerShown: false}}></Stack.Screen>
            <Stack.Screen name={"/"} component={ToDoList}
                          options={{headerShown: false}}></Stack.Screen>
        </Stack.Navigator>
    )
}

export default App;