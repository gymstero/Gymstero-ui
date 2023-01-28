import React, { useState } from 'react';
import { Pressable, Box, Text,Center,HStack} from "native-base";
const NavBar = () => {
    const [selected, setSelected] = React.useState(1);
    return( 
        <Box flex={1} bg="white" safeAreaTop width="100%"  alignSelf="center">
          <HStack bg="primary.600" alignItems="center" h='100%' safeAreaBottom shadow={6}>
            <Pressable cursor="pointer" opacity={selected === 0 ? 1 : 0.5} py="3" flex={1} onPress={() => setSelected(0)}>
              <Center>
                <Text color="white" fontSize="12">
                  Workout
                </Text>
              </Center>
            </Pressable>
            <Pressable cursor="pointer" opacity={selected === 1 ? 1 : 0.5} py="2" flex={1} onPress={() => setSelected(1)}>
              <Center>
                <Text color="white" fontSize="12">
                  Schedule
                </Text>
              </Center>
            </Pressable>
            <Pressable cursor="pointer" opacity={selected === 2 ? 1 : 0.6} py="2" flex={1} onPress={() => setSelected(2)}>
              <Center>
                <Text color="white" fontSize="12">
                  Social
                </Text>
              </Center>
            </Pressable>
            <Pressable cursor="pointer" opacity={selected === 3 ? 1 : 0.5} py="2" flex={1} onPress={() => setSelected(3)}>
              <Center>
                <Text color="white" fontSize="12">
                  Account
                </Text>
              </Center>
            </Pressable>
          </HStack>
        </Box>
     
      )
  }

  export default NavBar;