import React, { useState } from 'react';
import { View, Alert, StyleSheet, ScrollView } from 'react-native';
import { Text, IconButton, Card, Button, TextInput, List, Divider, Dialog, Portal } from 'react-native-paper';
import { useProductContext } from '../context/ProductContext';

const Pantry: React.FC = () => {
  const { products, addProduct, updateProductQuantity, removeProductFromPantry } = useProductContext();
  const [newProductName, setNewProductName] = useState<string>('');
  const [newProductQuantity, setNewProductQuantity] = useState<number>(1);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editProductName, setEditProductName] = useState<string>('');
  const [editProductQuantity, setEditProductQuantity] = useState<number>(1);
  const [visible, setVisible] = useState<boolean>(false);

  const handleAddProduct = () => {
    if (newProductName.trim() === '') {
      Alert.alert('Erro', 'Coloque um nome válido!');
      return;
    }

    const newProduct = { name: newProductName, quantity: newProductQuantity, bought: false };
    addProduct(newProduct);
    setNewProductName('');
    setNewProductQuantity(1);
  };

  const handleEditProduct = (index: number) => {
    const product = products[index];
    setEditIndex(index);
    setEditProductName(product.name);
    setEditProductQuantity(product.quantity);
    setVisible(true);
  };

  const handleSaveProduct = () => {
    if (editIndex !== null) {
      const updatedProducts = [...products];
      updatedProducts[editIndex] = {
        name: editProductName,
        quantity: editProductQuantity,
        bought: updatedProducts[editIndex].bought,
      };
      updateProductQuantity(updatedProducts);
      setVisible(false);
      setEditIndex(null);
    }
  };

  const handleUpdateQuantity = (index: number, newQuantity: number) => {
    const updatedProducts = [...products];
    updatedProducts[index].quantity = newQuantity;
    updateProductQuantity(updatedProducts);
  };

  const handleRemoveProduct = (index: number) => {
    Alert.alert(
      'Remover Produto',
      'Você tem certeza que deseja remover o produto?',
      [
        { text: 'Cancelar' },
        {
          text: 'Remover',
          onPress: () => {
            removeProductFromPantry(index);
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text variant="headlineLarge" style={styles.title}>
        Dispensa
      </Text>

      <TextInput
        label="Nome do Produto"
        value={newProductName}
        onChangeText={setNewProductName}
        style={styles.input}
        editable={editIndex === null}
      />
      <TextInput
        label="Quantidade"
        keyboardType="numeric"
        value={newProductQuantity.toString()}
        onChangeText={(value) => setNewProductQuantity(Number(value))}
        style={styles.input}
        editable={editIndex === null}
      />
      <Button
        mode="contained"
        onPress={handleAddProduct}
        style={styles.addButton}
      >
        Adicionar Produto
      </Button>

      <View style={styles.cardsContainer}>
        {products.map((product, index) => (
          <Card key={index} style={styles.card}>
            <Card.Content>
              <List.Item
                title={product.name}
                description={`Quantidade: ${product.quantity}`}
                left={() => (
                  <Button
                    mode="outlined"
                    onPress={() => handleUpdateQuantity(index, product.quantity + 1)}
                  >
                    +
                  </Button>
                )}
                right={() => (
                  <Button
                    mode="outlined"
                    onPress={() => handleUpdateQuantity(index, product.quantity - 1)}
                    disabled={product.quantity === 0}
                  >
                    -
                  </Button>
                )}
              />
              <IconButton
                icon="pencil"
                size={20}
                onPress={() => handleEditProduct(index)}
              />
              <IconButton
                icon="trash-can"
                size={20}
                onPress={() => handleRemoveProduct(index)}
              />
            </Card.Content>
            <Divider />
          </Card>
        ))}
      </View>

      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>Editar Produto</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Nome do Produto"
              value={editProductName}
              onChangeText={setEditProductName}
              style={styles.input}
            />
            <TextInput
              label="Quantidade"
              keyboardType="numeric"
              value={editProductQuantity.toString()}
              onChangeText={(value) => setEditProductQuantity(Number(value))}
              style={styles.input}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisible(false)}>Cancelar</Button>
            <Button onPress={handleSaveProduct}>Salvar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 10,
  },
  addButton: {
    marginTop: 10,
    marginBottom: 20,
  },
  cardsContainer: {
    marginBottom: 20
  },
  card: {
    marginBottom: 20,
    borderRadius: 10,
    elevation: 5,
  },
});

export default Pantry;