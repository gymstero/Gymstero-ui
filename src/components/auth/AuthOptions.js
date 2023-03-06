import { useNavigation } from "@react-navigation/native";
import { theme } from "../../theme/theme";
import {
  Text,
  Button,
  VStack,
  NativeBaseProvider,
  Divider,
  Image,
  View,
} from "native-base";
import Logo from "../../images/gymsteroLogo.png";
const AuthOptions = () => {
  const navigation = useNavigation();

  return (
    <NativeBaseProvider flex={1} bg="red">
      <VStack alignItems="center" justifyContent="center" space={4}>
        <View
          style={{
            maxWidth: "100%",
            maxHeight: 400,
          }}
        >
          <Image
            style={{
              flex: 1,
              resizeMode: "cover",
            }}
            alt="Logo"
            source={Logo}
          />
        </View>
        <Button
          backgroundColor={theme.colors.secondary}
          rounded="full"
          w="85%"
          onPress={() => navigation.navigate("Login")}
        >
          Login
        </Button>
        <Divider w="80%" />
        <Button
          backgroundColor={theme.colors.primary}
          textDecorationColor={theme.colors.text}
          rounded="full"
          w="85%"
          variant="outline"
          onPress={() => navigation.navigate("Sign-up")}
        >
          <Text color={theme.colors.text}>Sign-up</Text>
        </Button>
      </VStack>
    </NativeBaseProvider>
  );
};

export default AuthOptions;
