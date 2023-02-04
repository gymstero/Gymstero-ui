import React, { useCallback, useState } from 'react';
import {Box, Text, HStack, VStack, TextArea, Button} from "native-base";
const UserInfo= () => {
    const useToggle = (initialState= true) => {
        const[ state,setState] = useState(initialState);
        const toggle = useCallback(() => setState((state) => !state),[]);
        return [state, toggle]; 
    }
    const [toggle, setToggle] =useToggle(true);
        return( 
            <VStack alignItems='center' >
                <Box>
                    <Text>
                        UserName
                    </Text>
                </Box>
                <Box
                space={4} 
                    bg='amber.100'
                    rounded="lg"
                    width='85%'
                    >
                     <TextArea  placeholder="Enter Description.." width='100%' />
                </Box>
                <Box w='85%' mt='5'>
                    {toggle && (
                        <Button
                            rounded='full'
                            w='100%'
                            p='2'
                            onPress={setToggle}>
                            Edit
                        </Button>
                    )}

                    {!toggle && (
                        <Button
                            rounded='full'
                            w='100%'
                            p='2'
                            onPress={setToggle}>
                            Submit
                        </Button>
                    )}  
                </Box>
            </VStack>
        )
    }



  export default UserInfo;