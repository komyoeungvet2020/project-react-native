import { StatusBar, } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { Surface, Title, TextInput } from 'react-native-paper';
import ModalDetail from './src/components/ModalDetail';
import ModalView from './src/components/ModalView';
import PostCardItem from './src/components/PostCardItem';

const url = 'http://localhost:3030/data'

const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

export default function App() {
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [detail, setDetail] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [productId, setProductId] = useState(0);
  const [loading, setLoading] = useState(false);

  const getPosts = async () => {
    setLoading(true)
    await fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      })
      .catch(e => console.log(e))
    setLoading(false)
  }

  const addPost = (name, amount ,description) => {
    fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({
        "amount": amount,
        "name": name,
        "description": description
      }),
      // body:data
    }).then((res) => res.json())
      .then(resJson => {
        console.log('post:', resJson)
        updatePost()
      }).catch(e => { console.log(e) })
  }

  const editPost = (productId, name, amount,description) => {
    fetch(url + `/${productId}`, {
      method: "PUT",
      headers,
      body: JSON.stringify({
        "amount": amount,
        "name": name,
        "description": description
      })
    }).then((res) => res.json())
      .then(resJson => {
        console.log('updated:', resJson)
        updatePost()
      }).catch(e => { console.log(e) })
  }

  const deletePost = (productId) => {
    fetch(url + `/${productId}`, {
      method: "DELETE",
      headers,
    }).then((res) => res.json())
      .then(resJson => {
        console.log('delete:', resJson)
        getPosts()
      }).catch(e => { console.log(e) })
  }

  const updatePost = () => {
    getPosts()
    setVisible(false);
    setAmount(0)
    setName('')
    setDescription('')
    setProductId(0)
  }

  const edit = (id, name, amount,description) => {
    setVisible(true)
    setProductId(id)
    setName(name)
    setAmount(amount)
    setDescription(description)
  }
  const view = (id, name, amount,description) => {
    setDetail(true)
    setProductId(id)
    setName(name)
    setAmount(amount)
    setDescription(description)
  }

  useEffect(() => {
    getPosts();
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Surface style={styles.header}>
        <Title>Produsts</Title>
        <TouchableOpacity style={styles.button} onPress={() => setVisible(true)}>
          <Text style={styles.buttonText}>Create</Text>
        </TouchableOpacity>
      </Surface>
      <FlatList
        data={data}
        keyExtractor={(item, index) => item.id + index.toString()}
        refreshing={loading}
        onRefresh={getPosts}
        renderItem={({ item }) => (
          <PostCardItem
            name={item.name}
            amount={item.amount}
            description={item.description}
            onEdit={() => edit(item.id, item.name, item.amount, item.description)}
            onView={() => view(item.id, item.name, item.amount, item.description)}
            onDelete={() => deletePost(item.id)}
          />
        )}
      />
   <ModalView
        visible={visible}
        name="Add Product"
        onDismiss={() => setVisible(false)}
        onSubmit={() => {
          if (productId && name && amount) {
            editPost(productId, name, amount,description)
          } else {
            addPost(name, amount,description)
          }
        }}
        cancelable
      >
        <TextInput
          label="Name"
          value={name}
          onChangeText={(text) => setName(text)}
          mode="outlined"
        />
        <TextInput
          label="Price"
          value={amount}
          onChangeText={(text) => setAmount(text)}
          mode="outlined"
        />
         <TextInput
          label="Description"
          value={description}
          onChangeText={(text) => setDescription(text)}
          mode="outlined"
        />
      </ModalView>
      <ModalDetail
        visible={detail}
        onDismiss={() => setDetail(false)}
        cancelable
      >
        <Text style={styles.name}>{name}</Text>
        <Text>Price: {amount}</Text>
        <Text>Description: {description}</Text>
      </ModalDetail>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  header: {
    marginTop: Platform.OS === 'android' ? 24 : 0,
    padding: 16,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  button: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'steelblue',
  },
  buttonText: {
    color: 'white'
  },
  name: {
    fontSize: 18,
  },
});
