<template>
      <div>
    <div v-if="!isLoggedIn">
        <router-link to="/login">Cliquez sur le lien pour vous authentifiez</router-link>
    </div>
    <div v-else>
        <h2>Liste des lieus</h2>
        <p><strong>Etat de la session :</strong> {{ isLoggedIn }}</p>
        <ul>
            <div v-for="(lieu, index) in lieus" :key="index">
                <p><strong>Nom :</strong> {{ lieu.nom }}</p>
                <p><strong>Adresse :</strong> {{ lieu.adresse }}</p>
                <p><strong>Capacite :</strong> {{ lieu.capacite }}</p>

                
                <button @click="toggleDisplay(index)"> evenements </button>
          <ul v-if="!afficherEvenements[index]">
            <div v-if="lieu.evenements.length === 0">
              <p><strong>Aucun événement de prévue dans ce lieu</strong></p>
            </div>
          </ul>
          <ul v-else>
            <div v-if="lieu.evenements.length > 0">
              <p><strong>Evenement informations :</strong></p>
              <p><strong>Nombre d'evenement :</strong> {{ lieu.evenements.length }}</p>
              <div v-for="(evenement, index) in lieu.evenements" :key="index">
                <p><strong>Nom :</strong> {{ evenement.nom }}</p>
                <p><strong>Date de début :</strong> {{ evenement.dateDebut }}</p>
                <p><strong>Date de fin :</strong> {{ evenement.dateFin }}</p>
              </div>
            </div>
          </ul>
        </div>
      </ul>

         
    </div>
    </div>

</template>

<script>
import axios from 'axios';

export default {
    data()  {
        return{
            lieus: [], // Liste des lieus reçus de la servlet
            utilisateur: JSON.parse(localStorage.getItem('utilisateur')), 
            isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
            afficherEvenements: []
        };
    },
    methods: {
        async getLieus() {
        try {
        const response = await axios.get('http://localhost:8080/projetSICLIENT/Lieus?operation=Lieu');

        if (response.status === 200) {
          this.lieus = response.data;
          this.afficherEvenements = new Array(this.lieus.length).fill(false);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des lieus :', error);
        //this.$router.push('/login');
      }
    },
    toggleDisplay(index) {
      // Inverser l'état d'affichage des événements pour le lieu donné
      this.afficherEvenements[index] = !this.afficherEvenements[index];
    }
    },
  mounted() {
    // Appeler la méthode pour récupérer les événements lors du montage du composant
    this.getLieus();
  }
}
</script>

<style>

</style>