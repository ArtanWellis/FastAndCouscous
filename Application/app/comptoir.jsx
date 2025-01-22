import React  ,{ useState } from 'react';
import { View, Text, StyleSheet, ScrollView,TouchableOpacity, Switch  } from 'react-native';
import OrderItem from './orders';


const initialOrders = [
  {
    id: 351,
    items: [
      { name: "Cheese Burger", quantity: 2, category: "hot"},
      { name: "Moyenne frites", quantity: 1,category: "hot" },
      { name: "Coca Cola", quantity: 1,category: "cold" },
    ],
    PayedHour: "18h38",
    Type: "DineIn"
  },
  {
    id: 352,
    items: [
      { name: "Nuggets x6", quantity: 1, category: "hot"  },
      { name: "Salade cesar", quantity: 1, category: "cold" },
      { name: "Jus d'orange", quantity: 1, category: "cold" },
    ],
    PayedHour: "18h48",
    Type: "DineIn"
  },
];

const Comptoir = () => {
    const [orders, setOrders] = useState(initialOrders);
    const [isRushMode, setIsRushMode] = useState(false);
    const [coldWindow, setColdWindow] = useState(null);

  const handleValidate = (id) => {
    setOrders(orders.filter(order => order.id !== id));
  };


  const toggleRushMode = () => {
    if (!isRushMode) {
      // Séparer les plats froids
      const coldItems = orders.map((order) => ({
        ...order,
        items: order.items.filter((item) => item.category === "cold"),
      })).filter((order) => order.items.length > 0);

      const stylesCSS = `
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 20px;
        background-color: #F5FCFF;
      }
      .title {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 10px;
        text-align: center;
      }
      .orders-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
      }
      .order-card {
        width: 48%;
        margin-bottom: 15px;
        background-color: #FFF;
        padding: 10px;
        border-radius: 5px;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
      }
      .validate-button {
        background-color: #19C319;
        padding: 10px;
        margin-top: 10px;
        border-radius: 5px;
        text-align: center;
        color: white;
        font-weight: bold;
        cursor: pointer;
      }
    `;

    // Créer une nouvelle fenêtre avec les styles injectés
    const coldData = JSON.stringify(coldItems);
    const newWindow = window.open("", "_blank", "width=800,height=600");
    newWindow.document.write(`
      <html>
        <head>
          <title>Plats Froids</title>
          <style>
        /* Appliquez les styles généraux de Comptoir.js ici */
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 20px;
          background-color: #F5FCFF;
        }
        .title {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 10px;
          text-align: center;
        }
        .orders-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
        }
        .order-card {
          width: 48%;
          margin-bottom: 15px;
          background-color: #FFF;
          padding: 10px;
          border-radius: 5px;
          box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
        }
        .validate-button {
          background-color: #19C319;
          padding: 10px;
          margin-top: 10px;
          border-radius: 5px;
          text-align: center;
          color: white;
          font-weight: bold;
          cursor: pointer;
        }
      </style>
        </head>
        <body>
          <h1 class="title">Plats Froids et Boissons</h1>
          <div class="orders-container" id="cold-orders"></div>
          <script>
            const coldOrders = ${coldData};
            const coldOrdersContainer = document.getElementById("cold-orders");
            coldOrders.forEach(order => {
              const orderDiv = document.createElement("div");
              orderDiv.classList.add("order-card");
              orderDiv.innerHTML = \`
                <h3>Commande #\${order.id}</h3>
                \${order.items.map(item => \`<p>\${item.quantity}x \${item.name}</p>\`).join("")}
                <button class="validate-button" onclick="validateOrder(\${order.id})">Valider</button>
              \`;
              coldOrdersContainer.appendChild(orderDiv);
            });
            
            // Fonction pour valider la commande dans la fenêtre secondaire
            function validateOrder(orderId) {
            // Juste retirer de la liste des plats froids (dans la fenêtre secondaire)
                let coldOrders = ${JSON.stringify(coldItems)};
                coldOrders = coldOrders.filter(order => order.id !== orderId);

                // Mettre à jour les plats froids dans la fenêtre secondaire
                const coldOrdersContainer = document.getElementById("cold-orders");
                coldOrdersContainer.innerHTML = "";
                coldOrders.forEach(order => {
                  const orderDiv = document.createElement("div");
                  orderDiv.classList.add("order-card");
                  orderDiv.innerHTML = \`
                    <h3> Commande #\${order.id}</h3>
                    \${order.items.map(item => \`<p>\${item.quantity} x \${item.name} < /p>\`).join("")}
                  \`;
                  coldOrdersContainer.appendChild(orderDiv);
                });
              }
 
          </script>
        </body>
      </html>
    `);
      setColdWindow(newWindow);
    } else {
      // Fermer la fenêtre ouverte
      if (coldWindow) {
        coldWindow.close();
        setColdWindow(null);
      }
    }
    setIsRushMode(!isRushMode);
  };


  const displayedOrders = isRushMode
  ? orders.map(order => ({
      ...order,
      items: order.items.filter(item => item.category === "hot"),
    })).filter(order => order.items.length > 0)
  : orders; // Afficher toutes les commandes si le mode rush est désactivé

  
  // const hotItems = orders.filter(order =>
  //   order.items.some(item => item.category === "hot")
  // );
  // const coldItems = orders.filter(order =>
  //   order.items.some(item => item.category === "cold")
  // );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comptoir</Text>
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Mode Rush</Text>
        <Switch
          value={isRushMode}
          onValueChange={toggleRushMode}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isRushMode ? "#007AFF" : "#f4f3f4"}
        />
      </View>
      <ScrollView contentContainerStyle={styles.ordersContainer}>
         {displayedOrders.map((order) => (
          <View key={order.id} style={styles.orderCard}>
            <OrderItem order={order} />
            <TouchableOpacity
              style={styles.validateButton}
              onPress={() => handleValidate(order.id)}
            >
              <Text style={styles.validateButtonText}>Valider</Text>
            </TouchableOpacity>
          </View>
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F5FCFF'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  switchLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  scrollContainer: {
    flex: 1
  },
  ordersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', 
    justifyContent: 'space-between',
  },
  orderCard: {
    width: '48%', 
    marginBottom: 15,
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3
  },
  validateButton: {
    backgroundColor: '#19C319',
    paddingVertical: 10,
    marginTop: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  validateButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Comptoir;
