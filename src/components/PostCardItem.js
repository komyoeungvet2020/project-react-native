import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const Button = ({ onPress, style, icon }) => (
  <TouchableOpacity style={style} onPress={onPress}>
   <Icon name={icon} size={24} />
  </TouchableOpacity>
)

export default function PostCardItem({ name, amount, description, onEdit, onDelete }) {
console.log(name)
  return (
    <Card style={styles.item}>
      <View style={styles.rowView}>
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text>Price: {amount}</Text>
          <Text>Description: {description}</Text>
        </View>
        <View style={styles.rowView}>
          <Button
            onPress={onEdit}
            icon="edit"
            style={{ marginHorizontal: 16 }} />
          <Button onPress={onDelete} icon='movie' />
        </View>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  item: {
    padding: 16,
    margin: 16,
    elevation: 4,
    borderRadius: 8
  },
  name: {
    fontSize: 18,
  },
})