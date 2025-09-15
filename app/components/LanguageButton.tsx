import React from 'react'
import { Pressable, Text, StyleSheet, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { setAppLanguage } from '../services/i18n'

export default function LanguageButton() {
    const { i18n } = useTranslation()
    const current = i18n.language && i18n.language.startsWith('pt') ? 'pt' : 'en'
    const next = current === 'pt' ? 'en' : 'pt'
    return (
        <View style={styles.container} pointerEvents="box-none">
        <Pressable onPress={() => setAppLanguage(next)} style={styles.button} accessibilityLabel="language">
            <Text style={styles.text}>{current.toUpperCase()}</Text>
        </Pressable>
        </View>
    )
    }

    const styles = StyleSheet.create({
    container: { position: 'absolute', right: 16, bottom: 16, zIndex: 50 },
    button: { paddingVertical: 12, paddingHorizontal: 14, borderRadius: 24, backgroundColor: '#1f2937', shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 6, elevation: 3 },
    text: { color: '#ffffff', fontWeight: '700' }
})
