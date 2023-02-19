import { Center } from "native-base";
import { theme } from "./theme";
export const customStyles = {
  container: {
    padding: 20,
    alignItems: "center",
    flex: 1,
  },
  header: {
    backgroundColor: theme.colors.primary,
    width: "100%",
    fontFamily: "Arial",
    fontSize: 22,
    fontWeight: "bold",
    color: theme.colors.text,
    textAlign: "center",
    padding: 10,
  },
  body: {
    //fontFamily: "Arial",
    fontSize: 15,
    border: 1,
    padding: 5,
  },
};
