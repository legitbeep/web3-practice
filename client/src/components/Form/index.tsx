import { useContext } from 'react';
import { Button, FormControl, Input, FormErrorMessage, Box, FormLabel} from '@chakra-ui/react';

import { TransactionContext } from 'context/TransactionContext';

const Form = () => {
  //const {} = useContext(TransactionContext);

  const handleSubmit = () => {

    }
    return (
   <Box>
        <form onSubmit={handleSubmit} style={{ maxWidth:"400px", margin:"0 auto"}}>
      <FormControl mt={4} >
        <FormLabel htmlFor='name'>From</FormLabel>
        <Input
          id='From'
          placeholder='Enter address of sender'
          type="text"
          isRequired={true}
          minLength={4}
        />
      </FormControl>
      <FormControl mt={4} >
        <FormLabel htmlFor='name'>To</FormLabel>
        <Input
          id='From'
          placeholder='Enter address of reciver'
          type="text"
          isRequired={true}
          minLength={4}
        />
      </FormControl>
      <FormControl mt={4} >
        <FormLabel htmlFor='name'>Amount</FormLabel>
        <Input
          id='From'
          placeholder='Enter amount'
          type="number"
          isRequired={true}
          minLength={4}
        />
      </FormControl>
      <Button mt={4} colorScheme='teal' type='submit'>
        Submit
      </Button>
    </form>
   </Box>
    )
}
{/* <FormErrorMessage>
  {errors.name && errors.name.message}
</FormErrorMessage> */}

export default Form;