import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { X } from 'lucide-react-native';

interface WordDetailModalProps {
  isVisible: boolean;
  word: string;
  translation: string;
  onClose: () => void;
}

export const WordDetailModal = ({ isVisible, word, translation, onClose }: WordDetailModalProps) => {
  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.modalContainer} onPress={(e) => e.stopPropagation()}>
          <LinearGradient
            colors={['#1e1b4b', '#312e81']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientBackground}
          >
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Detalle de Palabra</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <X color="#94a3b8" size={24} />
              </TouchableOpacity>
            </View>

            <View style={styles.content}>
              <Text style={styles.originalWord}>{word}</Text>
              <View style={styles.divider} />
              <Text style={styles.translationWord}>{translation}</Text>
            </View>

            <TouchableOpacity style={styles.actionButton} onPress={onClose}>
              <LinearGradient
                colors={['#6366f1', '#a855f7']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>Volver</Text>
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    maxWidth: 400,
    borderRadius: 20,
    overflow: 'hidden',
    borderColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  gradientBackground: {
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    color: '#bec9d8ff',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  closeButton: {
    padding: 4,
  },
  content: {
    alignItems: 'center',
    marginVertical: 20,
  },
  originalWord: {
    fontSize: 24,
    fontWeight: '900',
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: 16,
  },
  divider: {
    width: 40,
    height: 4,
    backgroundColor: '#4ade80',
    borderRadius: 2,
    marginBottom: 16,
  },
  translationWord: {
    fontSize: 32,
    fontWeight: '900',
    color: '#e2e8f0ff',
    textAlign: 'center',
    lineHeight: 40,
  },
  actionButton: {
    marginTop: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});
