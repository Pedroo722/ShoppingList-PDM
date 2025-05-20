import React from 'react';
import { Alert, StyleSheet, ScrollView } from 'react-native';
import { Text, IconButton, Card, Checkbox, List, Divider, Button } from 'react-native-paper';
import { useProductContext } from '../context/ProductContext';

const Purchase: React.FC = () => {
    const { products, updateProductQuantity, removeProductFromPantry } = useProductContext();

    const handleToggleItem = (index: number) => {
        const updatedProducts = [...products];
        updatedProducts[index].bought = !updatedProducts[index].bought;
        updateProductQuantity(updatedProducts);
    };

    const handleRemoveItem = (index: number) => {
        Alert.alert(
            'Remover Item',
            'Tem certeza que deseja remover o item?',
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

    const handleMarkAllAsBought = () => {
        const updatedProducts = products.map(item => ({ ...item, bought: true }));
        updateProductQuantity(updatedProducts);
    };

    return (
        <ScrollView style={styles.container}>
            <Text variant="headlineLarge" style={styles.title}>
                Compras
            </Text>

            {products.map((item, index) => (
                <Card key={index} style={styles.card}>
                    <Card.Content>
                        <List.Item
                            title={item.name}
                            description={`Quantidade para Comprar: ${item.quantity}`}
                            left={() => (
                                <Checkbox
                                    status={item.bought ? 'checked' : 'unchecked'}
                                    onPress={() => handleToggleItem(index)}
                                />
                            )}
                            right={() => (
                                <IconButton
                                    icon="trash-can"
                                    size={20}
                                    onPress={() => handleRemoveItem(index)}
                                />
                            )}
                        />
                    </Card.Content>
                    <Divider />
                </Card>
            ))}

            <Button
                icon="check-all"
                mode="contained"
                onPress={handleMarkAllAsBought}
                style={styles.addButton}
                contentStyle={styles.buttonContent}
            >
                Marcar tudo como comprado
            </Button>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f4f4f4',
    },
    title: {
        marginBottom: 20,
        textAlign: 'center',
    },
    card: {
        marginBottom: 15,
        borderRadius: 10,
        elevation: 5,
    },
    addButton: {
        marginTop: 20,
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default Purchase;