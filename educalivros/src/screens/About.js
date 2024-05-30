import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import products from "../api/productsapi";

const About = () => {
  const [cartItems, setCartItems] = useState([]);

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

  // Função para dividir os produtos em linhas de dois
  const splitProductsIntoRows = () => {
    const rows = [];
    for (let i = 0; i < products.length; i += 2) {
      const row = (
        <View key={i} style={styles.row}>
          <View style={styles.itemContainer}>
            {products[i] && renderProduct(products[i])}
          </View>
          <View style={styles.itemContainer}>
            {products[i + 1] && renderProduct(products[i + 1])}
          </View>
        </View>
      );
      rows.push(row);
    }
    return rows;
  };

  // Função para renderizar um produto
  const renderProduct = (product) => {
    return (
      <View style={{ marginBottom: 20 }}>
        <Image source={product.productImg} style={{ width: 200, height: 150, marginBottom: 10 }} />
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{product.title}</Text>
        <Text>{product.productPrice} R$</Text>
        <TouchableOpacity onPress={() => handleAddToCart(product.id)} style={styles.addButton}>
          <Text style={{ color: 'white' }}>Adicionar ao Carrinho</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Loja da EducaLivros</Text>
        <TouchableOpacity style={styles.cartIcon}>
          <Ionicons name="cart-outline" size={24} color="black" />
          <Text>{cartItems.length}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          {splitProductsIntoRows()}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  itemContainer: {
    flex: 1,
    marginRight: 10,
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
});

export default About;