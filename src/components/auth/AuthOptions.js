import { useNavigation } from "@react-navigation/native";
import { theme } from "../../theme/theme";
import {
  Text,
  Button,
  VStack,
  NativeBaseProvider,
  Divider,
  ScrollView,
} from "native-base";
const AuthOptions = () => {
  const navigation = useNavigation();

  return (
    <NativeBaseProvider flex={1} bg="red">
      <ScrollView h="80%">
        <VStack alignItems="center" justifyContent="center" mt="350" space={4}>
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
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default AuthOptions;
