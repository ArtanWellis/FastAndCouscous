# Bienvenue sur FastAndCouscous

C'est un projet [Expo](https://expo.dev) crée avec [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

Notre projet est une application pour gérer la cuisine et le comptoir d'un fast food.  
Pour cela nous avons implémenté plusieurs adaptations : 
- Un mode novice pour les débutants en cuisine
- Un mode rush au comptoir qui va s'activer automatiquement lorsque le nombre de commandes en simultané va être trop élevé et va diviser le travail sur deux écrans
- Une adaptation au dispositif sur téléphone: au comptoir, on peut traiter des commandes sur mobile lors d'un rush pour répartir le travail
- Une interface sur table tactile pour gérer les rush en cuisine

## Lancer l'application

1. Installer les dépendances

   ```bash
   npm install
   ```

2. Lancer l'application

   ```bash
    npx expo start
   ```

Dans le terminal, on retrouve différentes options pour ouvrir l'application :

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go)

**Coté BFF :**
Il suffira d'ajouter son adresse ip dans le fichier "config.js" contenu dans le dossier Application.

Pour ce qui est du lancement du BFF , il vous suffira d'aller dans le dossier BFF et de lancer cette commande:
  ```bash
    node BFF.js
   ```

**Coté Back-End :**
Du au fait que le back-end ne contient pas les informations qu'il nous fallait , nous les avons rajouter dans le code du back-end.

Dans le fichier micro-restaurant-nestjs-public\menu-service\src\shared\services\startup-logic.service.ts , vous pouvez rajouter le code suivant afin de créer les items manquants :
```
try {
      await this.addMenuItem('Burger Fromage','cheese-burger',18, CategoryEnum.MAIN, 'https://cdn.pixabay.com/photo/2013/07/12/16/53/burger-151421_1280.png');
      await this.addMenuItem('Burger Bacon','bacon-burger',18, CategoryEnum.MAIN, 'https://cdn.pixabay.com/photo/2013/07/12/16/53/burger-151421_1280.png');
      await this.addMenuItem('Burger double Fromage','double-cheese-burger',18, CategoryEnum.MAIN, 'https://cdn.pixabay.com/photo/2013/07/12/16/53/burger-151421_1280.png');
      await this.addMenuItem('Burger double viande','double-meat-burger',18, CategoryEnum.MAIN, 'https://cdn.pixabay.com/photo/2013/07/12/16/53/burger-151421_1280.png');
      await this.addMenuItem('McFlurry Oreo','mcFlurry-oreo',18, CategoryEnum.DESSERT, 'https://cdn.pixabay.com/photo/2013/07/12/16/53/burger-151421_1280.png');
      await this.addMenuItem('Burger Veggie','veggie-burger',18, CategoryEnum.MAIN, 'https://cdn.pixabay.com/photo/2013/07/12/16/53/burger-151421_1280.png');
      await this.addMenuItem('Burger Poisson','fish-burger',18, CategoryEnum.MAIN, 'https://cdn.pixabay.com/photo/2013/07/12/16/53/burger-151421_1280.png');
      await this.addMenuItem('Burger BBQ','bbq-burger',18, CategoryEnum.MAIN, 'https://cdn.pixabay.com/photo/2013/07/12/16/53/burger-151421_1280.png');
      await this.addMenuItem('Burger Poulet','chicken-burger',18, CategoryEnum.MAIN, 'https://cdn.pixabay.com/photo/2013/07/12/16/53/burger-151421_1280.png');
      await this.addMenuItem('Coca Cola','coca-cola',18, CategoryEnum.BEVERAGE, 'https://cdn.pixabay.com/photo/2013/07/12/16/53/burger-151421_1280.png');
      await this.addMenuItem('6x nuggets','nuggets-x6',18, CategoryEnum.MAIN, 'https://cdn.pixabay.com/photo/2013/07/12/16/53/burger-151421_1280.png');
      await this.addMenuItem('Frites Moyennes','moyenne-frites',18, CategoryEnum.MAIN, 'https://cdn.pixabay.com/photo/2013/07/12/16/53/burger-151421_1280.png');
      await this.addMenuItem('Salade Cesar','salade-cesar',18, CategoryEnum.STARTER, 'https://cdn.pixabay.com/photo/2013/07/12/16/53/burger-151421_1280.png');
    } catch (e) {
    }
```
puis dans le fichier micro-restaurant-nestjs-public\kitchen-service\src\shared\services\startup-logic.service.ts , vous pouvez rajouter le code suivant afin de créer les informations supplémentaires liés à ces items :
```
try {
      await this.addRecipe('cheese-burger', PostEnum.HOT_DISH, ['burger', "-Cheddar" , "+Bacon"], 23);
      await this.addRecipe('bacon-burger', PostEnum.HOT_DISH, ['burger',"+Cheddar","-Sauce Ketchup","-Salade"],23);
      await this.addRecipe('double-cheese-burger', PostEnum.HOT_DISH, ['burger',"+Cheddar","-Concombres","-Salade"], 23);
      await this.addRecipe('double-meat-burger', PostEnum.HOT_DISH, ['burger',"+Cheddar","+Bacon"], 23);
      await this.addRecipe('mcFlurry-oreo', PostEnum.COLD_DISH, ['glace'], 23);
      await this.addRecipe('veggie-burger', PostEnum.HOT_DISH, ['burger',"+Avocat","+Tomates","+Cheddar","-Oignons"], 23);
      await this.addRecipe('fish-burger', PostEnum.HOT_DISH, ['burger',"-Sauce tartare"], 23);
      await this.addRecipe('bbq-burger', PostEnum.HOT_DISH, ['burger',"+Sauce BBQ","-Salade","-Tomates"], 23);
      await this.addRecipe('coca-cola', PostEnum.COLD_DISH, ['boisson'], 23);
      await this.addRecipe('moyenne-frites', PostEnum.HOT_DISH, ['frite'], 23);
      await this.addRecipe('nuggets-x6', PostEnum.HOT_DISH, ['nugget'], 23);
      await this.addRecipe('salade-cesar', PostEnum.COLD_DISH, ['salade'], 23);
    } catch (e) {
    }
```














