import React from "react";
import { TouchableOpacity } from "react-native";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import StartScreen from "../components/StartScreen";
import PostDetails from "../components/PostDetails";
import PostModify from "../components/PostModify";

type RootStackParamList = {
  StartScreen: undefined;
  PostDetailsScreen: undefined;
  PostModifyScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function Navigate() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="StartScreen"
          component={StartScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PostDetailsScreen"
          component={PostDetails}
          options={({
            navigation,
          }: {
            navigation: StackNavigationProp<
              RootStackParamList,
              "PostDetailsScreen"
            >;
          }) => ({
            headerTitle: "",
            headerStyle: {
              backgroundColor: "#343A30",
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ marginLeft: 15 }}
              >
                <Ionicons name="play-back-outline" size={24} color="white" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="PostModifyScreen"
          component={PostModify}
          options={({
            navigation,
          }: {
            navigation: StackNavigationProp<
              RootStackParamList,
              "PostModifyScreen"
            >;
          }) => ({
            headerTitle: "",
            headerStyle: {
              backgroundColor: "#343A30",
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ marginLeft: 15 }}
              >
                <Ionicons name="play-back-outline" size={24} color="white" />
              </TouchableOpacity>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
