import {
  Box,
  Button,
  Container,
  Divider,
  Image,
  Text,
  Spacer,
  NativeBaseProvider,
  ScrollView,
  View,
  HStack,
} from "native-base";
import { googleLogout } from "../auth/auth";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../../theme/theme";
import { customStyles } from "../../theme/customStyles";
import { FontAwesome } from "@expo/vector-icons";

const UserInfoPanel = ({
  userData,
  setEditMode,
  error,
  setError,
  userMessage,
  setUserMessage,
}) => {
  const navigation = useNavigation();

  const updateButtonPressed = () => {
    setEditMode(true);
  };

  return (
    <NativeBaseProvider>
      <ScrollView>
        <View style={customStyles.container}>
          <Image
            style={{
              width: 200,
              height: 200,
              borderRadius: 10,
            }}
            source={{
              uri:
                (userData && userData.photoURL) ||
                "https://img.icons8.com/ios-glyphs/90/000000/user--v1.png",
            }}
            alt="user profile"
          />
          <View mt={8}>
            <View flexDirection={"row"}>
              <FontAwesome
                name="user"
                color={theme.colors.secondary}
                size={20}
                style={{ marginTop: 3 }}
              />
              <Text
                fontSize={19}
                fontWeight={"bold"}
                mb={1}
                textAlign={"center"}
                style={{ marginLeft: 50 }}
              >
                Username
              </Text>
            </View>
            <Divider
              style={{ backgroundColor: theme.colors.secondary, width: 220 }}
            />
            <Text fontSize={16} textAlign={"center"}>
              {userData && userData.username}
            </Text>
          </View>

          <View mt={8}>
            <View flexDirection={"row"}>
              <FontAwesome
                name={userData && userData.publicUser ? "unlock" : "lock"}
                color={theme.colors.secondary}
                size={20}
                style={{ marginTop: 3 }}
              />
              <Text
                fontSize={19}
                fontWeight={"bold"}
                textAlign={"center"}
                style={{ marginLeft: 43 }}
              >
                Public User
              </Text>
            </View>
            <Divider
              style={{ backgroundColor: theme.colors.secondary, width: 220 }}
            />
            <Text textAlign={"center"}>
              {userData && userData.publicUser ? "Yes" : "No"}
            </Text>
          </View>

          <View mt={8}>
            <View flexDirection={"row"}>
              <FontAwesome
                name="comment"
                color={theme.colors.secondary}
                size={20}
                style={{ marginTop: 3 }}
              />
              <Text
                fontSize={19}
                fontWeight={"bold"}
                mb={1}
                textAlign={"center"}
                style={{ marginLeft: 20 }}
              >
                User Description
              </Text>
            </View>
            <Divider
              style={{ backgroundColor: theme.colors.secondary, width: 220 }}
            />
            <Box width="100%" height={100} shadow={2}>
              {userData && userData.description ? (
                <Text alignItems={"start"}> {userData.description} </Text>
              ) : (
                <Text textAlign={"center"}> Empty description </Text>
              )}
            </Box>
          </View>
        </View>
      </ScrollView>
      <View ml={5} mb={10}>
        <Button
          backgroundColor={theme.colors.primary}
          color={theme.colors.text}
          rounded="full"
          width={230}
          p="2"
          mb={5}
          onPress={updateButtonPressed}
        >
          Update
        </Button>
        <Button
          backgroundColor={theme.colors.secondary}
          color={theme.colors.text}
          rounded="full"
          width={230}
          p="2"
          onPress={() => googleLogout(setError, setUserMessage, navigation)}
        >
          Log Out
        </Button>
        {error ? (
          <Text mt={2} fontSize="sm" color="red.600">
            {userMessage}
          </Text>
        ) : (
          <></>
        )}
      </View>
    </NativeBaseProvider>
  );
};

export default UserInfoPanel;
