import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, RefreshControl } from 'react-native';
import Tasks from './Tasks';

import React, { useState } from 'react';

export default function App() {

  const [task, setTask] = useState('');
  const [allTasks, setAllTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);


  const addTask = () => {
    if (task.trim() === '') {
      return(
        alert('inputted task is empty. wtf bro')
      );
    }

    if (isEditing) {
      let editedTask = [...allTasks]; //get a copy of all tasks
      editedTask[editIndex] = task; //edit a task by getting the index and the current task 
      setAllTasks(editedTask); //set the alltask array as the updated Task 
      setIsEditing(false);
      setEditIndex(null);
      setTask('');
    }
    else {
      let consoleTasks = ([...allTasks, task]);
      setAllTasks(consoleTasks); 
      setTask(''); 
      console.log("tasks created: ", consoleTasks);
    }
  }

  const removeTask = (index) => {
    let remainingTask = [...allTasks];
    remainingTask.splice(index, 1);
    setAllTasks(remainingTask);
  }

  const editTask = (index) => {
    setEditIndex(index);
    setTask(allTasks[index]);
    setIsEditing(true);
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.h1}>My Tasks</Text>
        <Text style={styles.subText}>Add your tasks here</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder='Enter task'
            placeholderTextColor='#888'
            value={task}
            onChangeText={text => setTask(text)}
          />
          <TouchableOpacity style={styles.addButton} onPress={addTask}>
            <Text style={styles.addButtonText}>{isEditing ? 'Update' : 'Add'}</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollContainer} refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh}></RefreshControl>
        }>
          <View style={styles.tasksContainer}>
            {
              allTasks.map((item, index) => (
                <Tasks key={index} text={item} delete={() => removeTask(index)} edit={() => editTask(index)} />
              ))
            }
          </View>
        </ScrollView>

      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  h1: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#333',
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  textInput: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
  },
  tasksContainer: {
    width: '100%',
    padding: 10,
  },
});
