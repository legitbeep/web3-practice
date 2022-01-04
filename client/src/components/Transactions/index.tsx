import { useContext } from 'react'
import { Box, Heading,Text, Flex, Image } from '@chakra-ui/react'

import useGif from 'hooks/useGif'
import {TransactionContext} from 'context/TransactionContext'

type TCProps = {
    data : number;
}

const TransactionCard = ({ data }: TCProps) => {
    const gifUrl = useGif("rickroll");
    return (
        <Box w="full" maxW="350px" borderRadius={8} p={4} my={2} >
            <Flex justifyContent="space-between" >
            <Text as="h4">From : 0x8ef...feda</Text>
            <Text as="h4">To : 0x8ef...feda</Text>
            </Flex>
            <Flex justifyContent="space-between" >
            <Text as="h4">Amount (ETH) : 0.0001</Text>
            <Text as="h4">Time : 2:00</Text></Flex>
            <Text as="h4">Message : Hello</Text>
            <Box>
                <Image src={gifUrl} alt="gif" objectFit='cover' borderRadius={8} w="full" maxH="250px" />
            </Box>
        </Box>
    )
}

const Transactions = () => {
    const { currentAccount } = useContext(TransactionContext);
    return <>
    <Heading mt={10} as="h2">Transactions</Heading>
    <hr />
        <Flex flexWrap="wrap" justifyContent="space-around">
            {[1,2,3,4].map((data,idx) => (
                <TransactionCard data={data} key={idx} />
            )) }  
            </Flex>
           </>;
}

export default Transactions;