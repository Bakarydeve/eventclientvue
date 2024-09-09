<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link :to="{ name: 'Evenement' }">Evenement</router-link> |
    <router-link :to="{ name: 'Membre' }">Membre</router-link> |
    <router-link :to="{ name: 'Lieu' }">Lieu</router-link> |
    <router-link :to="{ name: 'Gestion' }">Gestion Membres</router-link> |
    <router-link :to="{ name: 'Login' }">Connexion</router-link> |
    <router-link :to="{ name: 'Deconnexion' }">Deconnexion</router-link>
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
