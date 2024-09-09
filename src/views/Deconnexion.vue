<template>
    <div>
      <h2>Deconnexion</h2>
      <button @click="deconnecter">Se déconnecter</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      async deconnecter() {
        try {
          const response = await fetch('http://localhost:8080/projetSICLIENT/Comptes?operation=logout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          if (response.ok) {
            const utilisateur = {};
            localStorage.setItem('utilisateur', {});
            localStorage.setItem('isLoggedIn', false);
            this.$router.push('/login');
          } else {
            console.error('Erreur lors de la déconnexion');
          }
        } catch (error) {
          console.error('Erreur lors de la déconnexion :', error);
        }
      }
    }
  };
  </script>
  