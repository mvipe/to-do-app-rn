import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  FlatList,
} from "react-native";
import GoalInput from "./components/GoalInput";
import GoalItem from "./components/GoalItem";

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const removeGoalHandler = (goalId) => {
    setCourseGoals((currentGoals) => {
      return currentGoals.filter((goal) => {
        goal.id != goalId;
      });
    });
  };

  const addGoalHandler = (goalTitle) => {
    setCourseGoals((currentGoals) => [
      ...courseGoals,
      { key: Math.random().toString(), value: goalTitle },
    ]);

    setIsAddMode(false);
  };
  return (
    <View style={styles.screen}>
      <Button title="Add New Goal" onPress={() => setIsAddMode(true)} />
      <GoalInput visible={isAddMode} addGoalHandler={addGoalHandler} />

      <FlatList
        data={courseGoals}
        renderItem={(itemData) => (
          <GoalItem
            title={itemData.item.value}
            id={itemData.item.id}
            onDelete={removeGoalHandler}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { padding: 50 },
});
