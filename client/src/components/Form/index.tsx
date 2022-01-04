import { useContext, memo } from 'react';
import { Button, FormControl, Input, FormErrorMessage, Box, FormLabel} from '@chakra-ui/react';

import { TransactionContext } from 'context/TransactionContext';

const Form = () => {
  const { connectWallet, currentAccount, sendTransaction, handleChange, logout } = useContext(TransactionContext);

  const handleSubmit:React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    //const { addressTo, amount, keyword, message } = formData;
    sendTransaction();
  }
  console.log(currentAccount)

    return (
    <Box>
        <form onSubmit={handleSubmit} style={{ maxWidth:"400px", margin:"0 auto"}}>
          {
            currentAccount ?
            (
              <>
              <FormControl mt={4} >
                <FormLabel htmlFor='name'>Reciever Address</FormLabel>
                <Input
                  id='to'
                  name="addressto"
                  placeholder='Enter address of receiver'
                  type="text"
                  isRequired={true}
                  onChange={(e) => handleChange(e,"addressTo")}
                />
              </FormControl>
              <FormControl mt={4} >
                <FormLabel htmlFor='name'>Amount (ETH)</FormLabel>
                <Input
                  id='amount'
                  placeholder='Enter amount of ETH'
                  type="number"
                  step="0.000001"
                  isRequired={true}
                  onChange={(e) => handleChange(e,"amount")}
                />
              </FormControl>
              <FormControl mt={4} >
                <FormLabel htmlFor='name'>Keyword (GIF)</FormLabel>
                <Input
                  id='keyword'
                  placeholder='Enter GIF'
                  type="text"
                  isRequired={true}
                  onChange={(e) => handleChange(e,"keyword")}
                />
              </FormControl>
              <FormControl mt={4} >
                <FormLabel htmlFor='name'>Message</FormLabel>
                <Input
                  id='message'
                  placeholder='Enter message'
                  type="text"
                  isRequired={true}
                  onChange={(e) => handleChange(e,"message")}
                />
              </FormControl>
              <Button mt={4} w="full" colorScheme='teal' type='submit'>
                Submit
              </Button>
              <Button mt={4} w="full" onClick={logout}>
                Logout
              </Button>
              </>)
              :
              <Button onClick={connectWallet} w="full" margin="10px auto" colorScheme="teal">Connect to Wallet</Button>
          }
        </form>
    </Box>
    )
}

export default memo(Form);