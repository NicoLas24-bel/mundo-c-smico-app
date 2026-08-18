import { StyleSheet, Text, View } from 'react-native';

export function MenuScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title} >MenuScreen</Text>
            <Text>adskn</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },

});

