import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Play, ArrowLeft } from 'lucide-react-native';
import { router } from 'expo-router';
import { useSound } from '../hooks/useSound';
import { LinearGradient } from 'expo-linear-gradient';

export const InstructionsModal = ({ onStart }: any) => {
  const [isOpen, setIsOpen] = useState(true);
  const { playButton } = useSound();

  const handleStart = () => {
    playButton();
    setIsOpen(false);
    onStart();
  };

  const handleBack = () => {
    playButton();
    router.back();
  };

  if (!isOpen) return null;

  return (
    <Modal visible={isOpen} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
        

          <Text style={styles.title}>¿Cómo jugar?</Text>

          <View style={styles.instructionsContainer}>
            <Text style={styles.instructionText}>
              <Text style={{ color: '#818cf8', fontWeight: 'bold' }}>1. Selecciona: </Text>
              Haz clic en una palabra de la lista.
            </Text>
            <Text style={styles.instructionText}>
              <Text style={{ color: '#c084fc', fontWeight: 'bold' }}>2. Explora: </Text>
              Toca la imagen para encontrar el objeto correcto.
            </Text>
            <Text style={styles.instructionText}>
              <Text style={{ color: '#f472b6', fontWeight: 'bold' }}>3. Rápido y preciso: </Text>
              Tienes <Text style={{ fontWeight: 'bold', color: 'white' }}>60 segundos</Text> y <Text style={{ fontWeight: 'bold', color: 'white' }}>3 vidas</Text> por nivel. Si fallas 3 veces o el tiempo se acaba, ¡pierdes el juego!
            </Text>
            <Text style={styles.warningText}>
              ¿Podrás pasar todos los niveles?
            </Text>
          </View>

          {/* Botón principal: jugar */}
          <TouchableOpacity onPress={handleStart} activeOpacity={0.8} style={styles.buttonWrapper}>
            <LinearGradient
              colors={['#6366f1', '#a855f7']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.buttonBg}
            >
              <Play color="white" size={24} fill="white" />
              <Text style={styles.buttonText}>¡Entendido, a jugar!</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Botón volver */}
          <TouchableOpacity onPress={handleBack} activeOpacity={0.7} style={styles.backButton}>
            <Text style={styles.backButtonText}>Volver al inicio</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.94)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    borderRadius: 24,
    padding: 32,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    borderWidth: 1,
    overflow: 'hidden',
  },
  topBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: 'white',
    marginBottom: 24,
  },
  instructionsContainer: {
    gap: 16,
    marginBottom: 32,
    width: '100%',
  },
  instructionText: {
    color: '#cbd5e1',
    fontSize: 16,
    lineHeight: 24,
  },
  warningText: {
    color: '#facc15',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
  },
  buttonWrapper: {
    width: '100%',
    marginBottom: 16,
  },
  buttonBg: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    gap: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  backButtonText: {
    color: '#94a3b8',
    fontSize: 15,
    fontWeight: '600',
  },
});
