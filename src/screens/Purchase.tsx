import React, { useState } from 'react';
import { Alert, StyleSheet, ScrollView } from 'react-native';
import { Text, IconButton, Card, Checkbox, List, Divider, Button } from 'react-native-paper';

const mockList = [
    { name: 'Arroz', quantityToBuy: 2, bought: false },
    { name: 'Café', quantityToBuy: 1, bought: false },
    { name: 'Leite', quantityToBuy: 3, bought: false },
]

const Purchase: React.FC = () => {
    const [purchaseList, setPurchaseList] = useState<Array<{ name: string; quantityToBuy: number; bought: boolean }>>(mockList);

    const handleToggleItem = (index: number) => {
        const updatedList = [...purchaseList];
        updatedList[index].bought = !updatedList[index].bought;
        setPurchaseList(updatedList);
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
                const updatedList = purchaseList.filter((_, i) => i !== index);
                setPurchaseList(updatedList);
            },
            },
        ]
        );
    };

    const handleMarkAllAsBought = () => {
        const updatedList = purchaseList.map(item => ({ ...item, bought: true }));
        setPurchaseList(updatedList);
    };

    return (
        <ScrollView style={styles.container}>
        <Text variant="headlineLarge" style={styles.title}>
            Compras
        </Text>

        {purchaseList.map((item, index) => (
            <Card key={index} style={styles.card}>
            <Card.Content>
                <List.Item
                title={item.name}
                description={`Quantidade para Comprar: ${item.quantityToBuy}`}
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