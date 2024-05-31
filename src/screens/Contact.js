import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';

const SchoolPortal = () => {
  const [activeTab, setActiveTab] = useState('Inicial');
  const [nome, setNome] = useState('');
  const [matricula, setMatricula] = useState('');
  const [documento, setDocumento] = useState('');
  const [boletos, setBoletos] = useState([]);
  const [materias, setMaterias] = useState([]);

  useEffect(() => {
    // Gerar boletos aleatórios ao carregar a tela
    const generateBoletos = () => {
      const newBoletos = Array.from({ length: 5 }, (_, index) => ({
        id: index + 1,
        valor: Math.floor(Math.random() * (1000 - 100 + 1)) + 100,
        status: Math.random() < 0.5 ? 'Pago' : 'Não pago', // 50% de chance de ser pago
      }));
      setBoletos(newBoletos);
    };

    // Gerar matérias aleatórias ao carregar a tela
    const generateMaterias = () => {
      const newMaterias = Array.from({ length: 20 }, (_, index) => ({
        id: index + 1,
        nome: `Matéria ${index + 1}`,
        professor: `Professor ${index + 1}`,
      }));
      setMaterias(newMaterias);
    };

    generateBoletos();
    generateMaterias();
  }, []);

  const handleSubmit = () => {
    // Aqui você pode implementar a lógica para enviar o requerimento
    console.log('Requerimento enviado:', { nome, matricula, documento });
  };

  const renderScreen = () => {
    switch (activeTab) {
      case 'Secretaria':
        return (
          <View style={styles.screen}>
            <Text style={styles.title}>Solicitar Documento</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome"
              value={nome}
              onChangeText={text => setNome(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Matrícula"
              value={matricula}
              onChangeText={text => setMatricula(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Tipo de Documento"
              value={documento}
              onChangeText={text => setDocumento(text)}
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Enviar Requerimento</Text>
            </TouchableOpacity>
          </View>
        );
      case 'Quadro de Horário':
        return (
          <ScrollView style={styles.screen}>
            <Text style={styles.title}>Quadro de Horário</Text>
            <View style={styles.table}>
              <View style={styles.row}>
                <View style={[styles.cell, styles.cellHeader]}><Text>Dia</Text></View>
                <View style={[styles.cell, styles.cellHeader]}><Text>Horário</Text></View>
              </View>
              <View style={styles.row}>
                <View style={styles.cell}><Text>Segunda</Text></View>
                <View style={styles.cell}><Text>08:00</Text></View>
              </View>
              <View style={styles.row}>
                <View style={styles.cell}><Text>Terça</Text></View>
                <View style={styles.cell}><Text>10:00</Text></View>
              </View>
              <View style={styles.row}>
                <View style={styles.cell}><Text>Quarta</Text></View>
                <View style={styles.cell}><Text>14:00</Text></View>
              </View>
              {/* Mais dias e horários aqui */}
            </View>
          </ScrollView>
        );
      case 'Matriz Escolar':
        return (
          <ScrollView style={styles.screen}>
            <Text style={styles.title}>Matriz Curricular</Text>
            {materias.map(materia => (
              <View key={materia.id} style={styles.materia}>
                <Text>Matéria: {materia.nome}</Text>
                <Text>Professor: {materia.professor}</Text>
              </View>
            ))}
          </ScrollView>
        );
      case 'Financeiro':
        return (
          <ScrollView style={styles.screen}>
            <Text style={styles.title}>Boletos a Pagar</Text>
            {boletos.map(boleto => (
              <View key={boleto.id} style={styles.boleto}>
                <Text>Valor: R$ {boleto.valor.toFixed(2)}</Text>
                <Text>Status: {boleto.status}</Text>
                {boleto.status === 'Não pago' && (
                  <TouchableOpacity style={styles.downloadButton}>
                    <Text style={styles.buttonText}>Baixar</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </ScrollView>
        );
      case 'Inicial':
        return (
          <View style={styles.screen}>
            <Text style={styles.title}>Ana Lira</Text>
            <Text>Curso: Artes Perfomáticas</Text>
            <Text>Ano de Início: 2023</Text>
          </View>
        );
      default:
        return null;
    }
  };

  const renderTabs = () => {
    const tabs = [
      { title: 'Secretaria' },
      { title: 'Quadro de Horário' },
      { title: 'Matriz Escolar' },
      { title: 'Financeiro' },
      { title: 'Inicial' }
    ];
    return tabs.map(tab => (
      <TouchableOpacity
        key={tab.title}
        style={[styles.tab, activeTab === tab.title && styles.activeTab]}
        onPress={() => setActiveTab(tab.title)}>
        <Text style={styles.tabText}>{tab.title}</Text>
      </TouchableOpacity>
    ));
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
    paddingVertical: 20,
  },
  content: {
    flex: 3,
    backgroundColor: '#E0E0E0',
    padding: 20,
  },
  tab: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FFF'
  },
  tabText: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
  },
  activeTab: {
    backgroundColor: '#7d7d7d',
  },
  screen: {
 flex: 1,
    paddingVertical: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#a13308',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  downloadButton: {
    backgroundColor: '#3F88C5',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  boleto: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  table: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  cellHeader: {
    backgroundColor: '#f0f0f0',
  },
  materia: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
});

export default SchoolPortal;
