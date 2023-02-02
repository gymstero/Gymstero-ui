import React from 'react';
import {Box, Text, HStack, VStack, TextArea, Button} from "native-base";
const UserInfo= () => {
        return( 
            <VStack>
                <Box
                space={4} 
                    bg='amber.100'
                    rounded="lg"
                    alignItems="center" 
                    >
                        <HStack width='100%' alignItems="center">
                            <Text  space={4} width='50%'color="black" fontSize="12" >User Name</Text>
                            <Button  space={4} >
                                Edit
                            </Button>
                        </HStack>
                        <TextArea h={20} placeholder="Enter Description.." w="100%" maxW="300" />
                </Box>

                <Box
                space={4} 
                    bg='amber.100'
                    rounded="lg"
                    alignItems="center" 
                    >
                        
                </Box>

            </VStack>
           
        )
    }



  export default UserInfo;