import { Button, ButtonGroup, Center, ChakraProvider, Divider, HStack, Heading, Input, Spacer, Text, VStack } from '@chakra-ui/react'
import { useState } from 'react';
import { nanoid } from 'nanoid';
import { DeleteIcon, EditIcon, SmallCloseIcon } from '@chakra-ui/icons'


function App() {
  const [todo, setTodo] = useState('');
  const [todolist, setTodolist] = useState([]);
  const [editTodo, setEditTodo] = useState(null);

  const clickHandler = () => {
    if (todo !== '') {
      const obj = { id: nanoid(), title: todo };
      const newTodoList = [...todolist, obj];
      setTodolist(newTodoList);
      setTodo('');
    }
  }

  const keyDownHandler = (event) => {
    if (event.key === 'Enter' && editTodo === null) {
      clickHandler();
    }
  }

  const deleteHandler = (id) => {
    const toDoListAfterDelete = todolist.filter((to) => to.id !== id);
    setTodolist(toDoListAfterDelete);
  }

  const editHandler = (todoObj) => {
    setTodo(todoObj.title);
    setEditTodo(todoObj.id);
  }

  const updateHandler = () => {
    if (todo !== '') {
      const updatedTodolist = todolist.map((to) => (to.id === editTodo ? { ...to, title: todo } : to));
      setTodolist(updatedTodolist);
      setTodo('');
      setEditTodo(null);
    }
    else {
      cancelHandler();
    }
  }

  const cancelHandler = () => {
    setTodo('');
    setEditTodo(null);
  }

  return (
    <ChakraProvider>
      <Center>
        <VStack height='100vh' width='md' bgColor='grey'>
          <Heading>ToDoList</Heading>
          <HStack width='full'>
            <Input bgColor='white' value={todo} ml={5} onKeyDown={keyDownHandler} onChange={(event) => { setTodo(event.target.value) }}></Input>
            {editTodo !== null ?
              <ButtonGroup spacing={2}>
                <Button colorScheme='green' onClick={updateHandler}>Update</Button>
                <Button mr={5} leftIcon={<SmallCloseIcon />} onClick={cancelHandler}>Cancel</Button>
              </ButtonGroup>
              :
              <Button colorScheme='green' mr={5} onClick={clickHandler}>AddTask</Button>}
          </HStack>
          {todolist.map((todoObj) => (
            <>
              <HStack width='full' key={todoObj.id}>
                <Text color='white' ml={5}>{todoObj.title}</Text>
                <Spacer />
                <ButtonGroup>
                  <Button colorScheme='red' leftIcon={<DeleteIcon />} onClick={() => { deleteHandler(todoObj.id) }}>Delete</Button>
                  <Button colorScheme='blue' mr={5} leftIcon={<EditIcon />} onClick={() => { editHandler(todoObj) }}>Edit</Button>
                </ButtonGroup>
              </HStack>
              <Divider />
            </>
          )).reverse()}
        </VStack>
      </Center>
    </ChakraProvider>
  );
}

export default App;
