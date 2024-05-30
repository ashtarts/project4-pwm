import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Modal, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import books from "../api/booksapi";

const Store = () => {
  const [cartItems, setCartItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = async () => {
    try {
      const storedItems = await AsyncStorage.getItem("cartItems");
      if (storedItems !== null) {
        setCartItems(JSON.parse(storedItems));
      }
    } catch (error) {
      console.error("Error loading cart items:", error);
    }
  };

  const handleAddToCart = async (id) => {
    if (!cartItems.includes(id)) {
      const updatedCartItems = [...cartItems, id];
      setCartItems(updatedCartItems);
      try {
        await AsyncStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      } catch (error) {
        console.error("Error saving cart items:", error);
      }
    }
  };

  const handleRemoveFromCart = async (id) => {
    const updatedCartItems = cartItems.filter(item => item !== id);
    setCartItems(updatedCartItems);
    try {
      await AsyncStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    } catch (error) {
      console.error("Error saving cart items:", error);
    }
  };

  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach(itemId => {
      const book = books.find(book => book.id === itemId);
      total += book.productPrice;
    });
    return total.toFixed(2);
  };

  const renderProduct = ({ item }) => {
    return (
      <View style={styles.productContainer}>
        <Image
          style={styles.productImage}
          source={item.image}
          resizeMode="contain"
        />
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productPrice}>{item.productPrice} R$</Text>
        <TouchableOpacity onPress={() => handleAddToCart(item.id)} style={styles.addButton}>
          <Text style={styles.buttonText}>Adicionar ao Carrinho</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>Loja da EducaLivros</Text>
        <TouchableOpacity style={styles.cartIcon} onPress={() => setModalVisible(true)}>
          <Ionicons name="cart-outline" size={24} color="black" />
          <Text>{cartItems.length}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderCartItem = ({ item }) => {
    const book = books.find(book => book.id === item);
    return (
      <View style={styles.cartItem}>
        <Image
          style={styles.cartItemImage}
          source={book.image}
          resizeMode="contain"
        />
        <View style={styles.cartItemInfo}>
          <Text style={styles.cartItemTitle}>{book.title}</Text>
          <Text style={styles.cartItemPrice}>{book.productPrice.toFixed(2)} R$</Text>
        </View>
        <TouchableOpacity onPress={() => handleRemoveFromCart(item)} style={styles.cartItemRemoveButton}>
          <Text style={styles.cartItemRemoveButtonText}>Remover</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {renderHeader()}
      <ScrollView style={styles.container}>
        <FlatList
          numColumns={2}
          keyExtractor={(item) => item.id}
          data={books}
          renderItem={renderProduct}
          contentContainerStyle={styles.listContainer}
        />
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Carrinho</Text>
            <FlatList
              data={cartItems}
              renderItem={renderCartItem}
              keyExtractor={(item) => item}
              contentContainerStyle={styles.cartListContainer}
            />
            <Text style={styles.total}>Total: {calculateTotal()} R$</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.buyButton}>
              <Text style={styles.buyButtonText}>Comprar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalCloseButton}>
              <Text style={styles.modalCloseButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  productContainer: {
    flex: 1,
    margin: 10,
    backgroundColor: "rgba(255, 255, 255, 0.90)",
    borderRadius: 5,
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
    padding: 15,
    alignItems: 'center',
  },
  productImage: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: "center",
  },
  productPrice: {
    fontSize: 16,
    color: "#344055",
    textAlign: "center",
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#a13308',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    textTransform: 'uppercase',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cartIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxHeight: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cartListContainer: {
    flexGrow: 1,
    width: '100%',
    paddingBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cartItemImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  cartItemInfo: {
    flex: 1,
  },
  cartItemTitle: {
    fontSize: 16,
  },
  cartItemPrice: {
    fontSize: 14,
    color: '#7d7d7d',
  },
  cartItemRemoveButton: {
    padding: 8,
    backgroundColor: '#ff3333',
    borderRadius: 5,
  },
  cartItemRemoveButtonText: {
    color: 'white',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  buyButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#1E90FF',
    borderRadius: 5,
  },
  buyButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalCloseButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#808080',
    borderRadius: 5,
  },
  modalCloseButtonText: {
    color: 'white',
  },
});

export default Store;