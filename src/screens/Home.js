import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Animated } from "react-native";
import Menu from "../component/Menu";
import { useFonts, WorkSans_400Regular } from "@expo-google-fonts/work-sans";
import { Nunito_700Bold } from "@expo-google-fonts/nunito";
import AppLoading from "expo-app-loading";
import { useNavigation } from '@react-navigation/native'; 

const Home = (props) => {
  let [fontsLoaded] = useFonts({
    WorkSans_400Regular,
    Nunito_700Bold,
  });

  const navigation = useNavigation(); 
  const [isNewsDrawerOpen, setIsNewsDrawerOpen] = useState(false);
  const [isEventDrawerOpen, setIsEventDrawerOpen] = useState(false);
  const [newsDrawerWidth] = useState(new Animated.Value(0));
  const [eventDrawerWidth] = useState(new Animated.Value(0));
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  const description = ""; 

  const toggleNewsDrawer = () => {
    const toValue = isNewsDrawerOpen ? 0 : 300;
    setIsNewsDrawerOpen(!isNewsDrawerOpen);
    Animated.timing(newsDrawerWidth, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const toggleEventDrawer = () => {
    const toValue = isEventDrawerOpen ? 0 : 300;
    setIsEventDrawerOpen(!isEventDrawerOpen);
    Animated.timing(eventDrawerWidth, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const goToNewsScreen = () => {
    navigation.navigate('News');
    toggleNewsDrawer(); 
  };

  const goToWeeklyJournalScreen = () => {
    navigation.navigate('WeeklyJournal');
    toggleEventDrawer(); 
  };

  const nextNews = () => {
    setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % newsData.length);
  };

  const previousNews = () => {
    setCurrentNewsIndex((prevIndex) => (prevIndex === 0 ? newsData.length - 1 : prevIndex - 1));
  };

  const nextEvent = () => {
    setCurrentEventIndex((prevIndex) => (prevIndex + 1) % eventData.length);
  };

  const previousEvent = () => {
    setCurrentEventIndex((prevIndex) => (prevIndex === 0 ? eventData.length - 1 : prevIndex - 1));
  };

  const newsData = [
    {
      title: "Aluno Destaque do Mês",
      text: "João Silva é reconhecido por sua excelência acadêmica e compromisso com a comunidade escolar.",
      imageUri: "https://s2.glbimg.com/HPMKzcTFcqODmzzGPTWh0sEqkO8=/e.glbimg.com/og/ed/f/original/2020/04/03/atividades-de-estudo.jpeg"
    },
    {
      title: "Intercambistas Voltam",
      text: "Intercambistas do curso de inglês retornam ao Brasil após uma jornada de desafios e conquistas no exterior, enriquecendo suas experiências e habilidades linguísticas.",
      imageUri: "https://www.academiadeintercambio.com.br/wp-content/uploads/sb-instagram-feed-images/346895424_932771331178048_3884183209901899365_n.webplow.jpg"
    },
    {
      title: "Piscina Sendo Melhorada",
      text: "Piscina do colégio passa por melhorias solicitadas pelos alunos, proporcionando um ambiente mais seguro e confortável para a prática de atividades aquáticas.",
      imageUri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6SW9VeamwCGwnVVdWtHn6KYfwMDxiSAYu_LaeDriurg&s"
    }
  ];

  const eventData = [
    {
      title: "Aula de Yoga",
      text: "Participe da nossa aula de yoga na segunda-feira, 17 de junho, às 10h na quadra principal.",
      imageUri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy6d-RDLn8oFBnfIZxkDY9o05yv0ZRCzZyxg&s"
    },
    {
      title: "Oficina de Artes",
      text: "Venha explorar sua criatividade na nossa oficina de artes, segunda-feira, 17 de junho, às 14h no salão de eventos.",
      imageUri: "https://www.adotern.org.br/wp-content/uploads/2016/04/099.jpg"
    },
    {
      title: "Palestra Motivacional",
      text: "Inspire-se com a nossa palestra motivacional na quarta-feira, 19 de junho, às 11h no auditório.",
      imageUri: "https://palestrasdesucesso.com.br/wp-content/uploads/2018/05/Melhor-palestra-motivacional-como-escolher.jpg"
    },
    {
      title: "Cine Debate",
      text: "Participe do nosso cine debate na sexta-feira, 21 de junho, às 16h na sala de projeção.",
      imageUri: "https://conquistareporter.com.br/wp-content/uploads/2022/11/Mostra-Cinema-Conquista_Foto-Micael-Aquillah-_1_-e1667594985503.jpeg"
    }
  ];

  const currentNews = newsData[currentNewsIndex];
  const currentEvent = eventData[currentEventIndex];

  return (
    <View style={styles.mainContainer}>
      <View style={styles.homeTop}>
        <Image
          style={styles.headerImage}
          resizeMode="contain"
          source={require("../../assets/LogoEL.png")}
        />

        <Text style={styles.mainHeader}>Bem Vindo</Text>
        <Text
          style={[
            styles.mainHeader,
            {
              fontSize: 33,
              color: "#a13308",
              marginTop: 0,
            },
          ]}
        >
          EducaLivros
        </Text>

        <Text style={styles.paraStyle}>{description} </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={goToNewsScreen} style={styles.newsButton}>
            <Image
              style={styles.buttonImage}
              source={require("../../assets/news.jpg")}
            />
            <Text style={styles.buttonText}>Notícias</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={goToWeeklyJournalScreen} style={styles.newsButton}>
            <Image
              style={styles.buttonImage}source={require("../../assets/events.png")} 
            />
            <Text style={styles.buttonText}>Eventos da Semana</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Animated.View style={[styles.drawerContainer, { width: newsDrawerWidth }]}>
        {isNewsDrawerOpen && (
          <TouchableOpacity onPress={toggleNewsDrawer} style={[styles.closeButton, { top: 150, right: 20 }]}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        )}
        <View style={styles.drawerContent}>
          <View style={styles.blogCard}>
            <Image
              style={styles.blogImage}
              resizeMode="cover"
              source={{uri: currentNews.imageUri}}
            />
            <Text style={styles.blogTitle}>{currentNews.title}</Text>
            <Text style={styles.blogText}>{currentNews.text}</Text>
          </View>

          <View style={styles.navigationButtons}>
            <TouchableOpacity onPress={previousNews}>
              <Text style={styles.navigationButtonText}>Anterior</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={nextNews}>
              <Text style={styles.navigationButtonText}>Próxima</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>

      <Animated.View style={[styles.drawerContainer, styles.rightDrawerContainer, { width: eventDrawerWidth }]}>
        {isEventDrawerOpen && (
          <TouchableOpacity onPress={toggleEventDrawer} style={[styles.closeButton, { top: 150, right: 20 }]}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        )}
        <View style={styles.drawerContent}>
          <View style={styles.blogCard}>
            <Image
              style={styles.blogImage}
              resizeMode="cover"
              source={{uri: currentEvent.imageUri}}
            />
            <Text style={styles.blogTitle}>{currentEvent.title}</Text>
            <Text style={styles.blogText}>{currentEvent.text}</Text>
          </View>

          <View style={styles.navigationButtons}>
            <TouchableOpacity onPress={previousEvent}>
              <Text style={styles.navigationButtonText}>Anterior</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={nextEvent}>
              <Text style={styles.navigationButtonText}>Próxima</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>

      <View style={styles.menuStyle}>
        <View style={styles.lineStyle}></View>
        <Menu />
        <View
          style={[
            styles.lineStyle,
            {
              marginVertical: 10,
            },
          ]}
        ></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    textAlign: "center",
  },

  homeTop: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },

  headerImage: {
    height: undefined,
    width: "100%",
    aspectRatio: 1,
    marginTop: 50,
    borderRadius: 20,
  },

  mainHeader: {
    fontSize: 30,
    color: "#344055",
    textTransform: "uppercase",
    fontFamily: "Nunito_700Bold",
  },

  paraStyle: {
    textAlign: "left",
    fontSize: 18,
    color: "#7d7d7d",
    marginTop: 30,
    paddingBottom: 50,
    lineHeight: 27,
    fontFamily: "WorkSans_400Regular",
  },

  lineStyle: {
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: "grey",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -30,
  },

  newsButton: {
    width: 120,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },

  buttonImage: {
    width: "100%",
    height: "70%",
    marginBottom: 10,
  },

  buttonText: {
    fontSize: 16,
    color: "#000",
    textAlign: "center",
    fontFamily: "Nunito_700Bold",
  },

  drawerContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "#fff",
    zIndex: 1,
    borderRightWidth: 1,
    borderColor: "#ccc",
  },

  drawerContent: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  closeButton: {
    position: "absolute",
    zIndex: 2,
  },

  closeButtonText: {
    fontSize: 24,
    color: "#a13308",
    fontWeight: "bold",
  },

  blogCard: {
    marginBottom: 20,
  },

  blogImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },

  blogTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },

  blogText: {
    fontSize: 16,
    lineHeight: 22,
  },

  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  navigationButtonText: {
    fontSize: 18,
    color: "#a13308",
    textDecorationLine: "underline",
    fontFamily: "Nunito_700Bold",
  },

  rightDrawerContainer: {
    right: 0,
    left: 'auto',
    borderLeftWidth: 1,
    borderColor: "#ccc",
  },
});

export default Home;
