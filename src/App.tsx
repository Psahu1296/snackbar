import { useState } from 'react';

import { Box, Button, Flex, useColorMode } from '@chakra-ui/react';

import Snackbar from './components/snackbar/Snackbar';
import ThemeToggleButton from './components/ThemeToggleButton';

function MyButton() {
  const { colorMode } = useColorMode();
  return (
    <button
      type="button"
      data-testid="action-btn"
      className={`action-btn ${colorMode === 'light' && 'action-text-light'}`}
    >
      Action
    </button>
  );
}
const text2 = 'Lorem ipsum dolor sit amet consectetur adipisicing elit.';

function App(): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const [open2, setOpen2] = useState<boolean>(false);

  return (
    <Box>
      <Flex
        as="header"
        direction="column"
        alignItems="center"
        justifyContent="center"
        h="100vh"
        fontSize="3xl"
      >
        <Snackbar
          open={open}
          autoCloseTime={3000}
          align="top-left"
          type="action"
          actionProps={<MyButton />}
          onclose={setOpen}
        >
          <b>warning text- 1</b>
        </Snackbar>
        <Button data-testid="open-button" onClick={() => setOpen(true)}>
          Open snackbar
        </Button>
        <Snackbar
          open={open2}
          autoCloseTime={7000}
          align="top-right"
          type="action-long"
          onclose={setOpen2}
          actionProps={<MyButton />}
        >
          {text2}
        </Snackbar>
        <Button onClick={() => setOpen2(true)} marginTop="15px">
          Open snackbar right
        </Button>
      </Flex>
      <ThemeToggleButton pos="fixed" bottom="2" right="2" />
    </Box>
  );
}

export default App;
