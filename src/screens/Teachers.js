import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import products from "../api/productsapi"; 

const Store = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);

  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = async () => {
    try {
      const storedItems = await AsyncStorage.getItem("cartItems");
      if (storedItems !== null) {
        setCartItems(storedItems.split(","));
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
        await AsyncStorage.setItem("cartItems", updatedCartItems.join(","));
      } catch (error) {
        console.error("Error saving cart items:", error);
      }
    }
  };

  const handleRemoveFromCart = async (id) => {
    const updatedCartItems = cartItems.filter(item => item !== id);
    setCartItems(updatedCartItems);
    try {
      await AsyncStorage.setItem("cartItems", updatedCartItems.join(","));
    } catch (error) {
      console.error("Error saving cart items:", error);
    }
  };

  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
  };

  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach(itemId => {
      const product = products.find(product => product.id === itemId);
      if (product) {
        total += parseFloat(product.productPrice);
      }
    });
    return total.toFixed(2);
  };

  const renderCartItem = (itemId) => {
    const product = products.find(product => product.id === itemId);
    if (product) {
      return (
        <View key={product.id} style={styles.cartItem}>
          <Image
            source={product.productImg}
            style={{ width: 50, height: 50, marginRight: 10 }}
          />
          <View style={{flex: 1}}>
            <Text>{product.title}</Text>
            <Text>{product.productPrice} R$</Text>
          </View>
          <TouchableOpacity onPress={() => handleRemoveFromCart(product.id)}>
            <Text style={{color: 'red'}}>Remover</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      console.warn(`Product with id ${itemId} not found.`);
      return null; 
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Loja de Livros</Text>
        <TouchableOpacity style={styles.cartIcon} onPress={toggleCartVisibility}>
          <Ionicons name="cart-outline" size={24} color="black" />
          <Text>{cartItems.length}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          {products.map(product => (
            <View key={product.id} style={styles.productContainer}>
              <Image source={product.productImg} style={styles.productImage} />
              <Text style={styles.productTitle}>{product.title}</Text>
              <Text style={styles.productPrice}>{product.productPrice} R$</Text>
              <TouchableOpacity onPress={() => handleAddToCart(product.id)} style={styles.addButton}>
                <Text style={{ color: 'white' }}>Adicionar ao Carrinho</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
      {isCartVisible && (
        <View style={styles.cartContainer}>
          <ScrollView>
            <Text style={{textAlign: 'center', marginBottom: 10}}>Carrinho</Text>
            {cartItems.map(itemId => renderCartItem(itemId))}
            <Text style={{fontWeight: 'bold', marginTop: 10, textAlign: 'center'}}>Total: {calculateTotal()} R$</Text>
          </ScrollView>
          <Button title="Fechar" onPress={toggleCartVisibility} color="#a13308" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cartIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#a13308',
    padding: 10,
    marginTop: 5,
    borderRadius: 8,
    alignItems: 'center',
  },
  cartContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 20,
    maxHeight: '70%',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  productContainer: {
    width: '48%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  productImage: {
    width: '100%',
    height: 150,
    marginBottom: 10,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
});

export default Store;
