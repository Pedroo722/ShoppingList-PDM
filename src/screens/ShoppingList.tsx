import React, { useState } from 'react';
import { View, Alert, StyleSheet, ScrollView } from 'react-native';
import { Text, IconButton, Card, Button, TextInput, List, Divider, Dialog, Portal } from 'react-native-paper';
import { useProductContext } from '../context/ProductContext';

const ShoppingList: React.FC = () => {
  const { products } = useProductContext();
  const [shoppingQuantities, setShoppingQuantities] = useState<{ [key: string]: number }>({});
  const [visible, setVisible] = useState<boolean>(false);
  const [editProductName, setEditProductName] = useState<string>('');
  const [editProductQuantity, setEditProductQuantity] = useState<number>(1);

  const handleChangeQuantity = (productName: string, quantity: number) => {
    setShoppingQuantities((prev) => ({
      ...prev,
      [productName]: quantity,
    }));
  };

  const handleEditProduct = (productName: string, currentQuantity: number) => {
    setEditProductName(productName);
    setEditProductQuantity(currentQuantity);
    setVisible(true);
  };

  const handleSaveProduct = () => {
    setShoppingQuantities((prev) => ({
      ...prev,
      [editProductName]: editProductQuantity,
    }));
    setVisible(false);
  };

  const handleRemoveProduct = (productName: string) => {
    Alert.alert(
      'Remover Produto',
      `Você tem certeza que deseja remover ${productName} da sua lista de compras?`,
      [
        { text: 'Cancelar' },
        {
          text: 'Remover',
          onPress: () => {
            setShoppingQuantities((prev) => {
              const updatedQuantities = { ...prev };
              delete updatedQuantities[productName];
              return updatedQuantities;
            });
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text variant="headlineLarge" style={styles.title}>
        Lista de Compras
      </Text>

      <View style={styles.cardsContainer}>
        {products.map((product) => (
          <Card key={product.name} style={styles.card}>
            <Card.Content>
              <List.Item
                title={product.name}
                description={`Quantidade disponível: ${product.quantity}`}
                left={() => (
                  <Button
                    mode="outlined"
                    onPress={() => handleEditProduct(product.name, shoppingQuantities[product.name] || 0)}
                  >
                    Definir Quantidade
                  </Button>
                )}
              />
              <IconButton
                icon="trash-can"
                size={20}
                onPress={() => handleRemoveProduct(product.name)}
              />
            </Card.Content>
            <Divider />
          </Card>
        ))}
      </View>

      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>Editar Quantidade</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label={`Quantidade de ${editProductName}`}
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
  cardsContainer: {
    marginBottom: 20,
  },
  card: {
    marginBottom: 20,
    borderRadius: 10,
    elevation: 5,
  },
});

export default ShoppingList;