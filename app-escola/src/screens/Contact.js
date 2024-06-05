import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const SchoolPortal = () => {
  const [activeTab, setActiveTab] = useState('Inicial');

  const tabs = [
    { title: 'Secretaria', screen: 'Secretaria' },
    { title: 'Quadro de Horário', screen: 'QuadroHorario' },
    { title: 'Matriz Escolar', screen: 'MatrizEscolar' },
    { title: 'Financeiro', screen: 'Financeiro' },
    { title: 'Inicial', screen: 'Inicial' }
  ];

  const renderTabs = () => {
    return tabs.map(tab => (
      <TouchableOpacity
        key={tab.title}
        style={[styles.tab, activeTab === tab.title && styles.activeTab]}
        onPress={() => setActiveTab(tab.title)}>
        <Text style={styles.tabText}>{tab.title}</Text>
      </TouchableOpacity>
    ));
  };

  const renderScreen = () => {
    // Aqui você pode renderizar o conteúdo da aba ativa com base no estado activeTab
    return <Text style={styles.screenContent}>{activeTab} Screen</Text>;
  };

  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        {renderTabs()}
      </View>
      <View style={styles.content}>
        {renderScreen()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  sidebar: {
    flex: 1,
    backgroundColor: '#a13308',
    padding: 20
  },
  content: {
    flex: 3,
    backgroundColor: '#E0E0E0',
    padding: 20
  },
  tab: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FFF'
  },
  tabText: {
    color: '#FFF',
    fontSize: 16
  },
  screenContent: {
    fontSize: 20,
    textAlign: 'center'
  }
});

export default SchoolPortal;