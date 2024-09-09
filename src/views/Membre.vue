<template>
    <div>
    <div v-if="!isLoggedIn">
        <router-link to="/login">Cliquez sur le lien pour vous authentifiez</router-link>
    </div>
    <div v-else>
        <h2>Liste des membres</h2>
        <p><strong>Etat de la session :</strong> {{ isLoggedIn }}</p>
        <ul>
            <div v-for="(membre, index) in membres" :key="index">
            <p><strong>Nom :</strong> {{ membre.nom }}</p>
            <p><strong>Prenom :</strong> {{ membre.prenom }}</p>
            <p><strong>Adresse :</strong> {{ membre.adresse }}</p>
            <p><strong>Age :</strong> {{ membre.age }}</p>


            <button @click="toggleDisplay(index)"> evenements </button>
            <ul v-if="!afficherEvenements[index]">
              <div v-if="membre.evenements.length === 0">
              <p><strong>Vous n'êtes inscrit à aucun événement</strong></p>
            </div>
            </ul>
            <ul v-else>
              <div v-if="membre.evenements.length > 0">
              <p><strong>Evenement informations :</strong></p>
              <p><strong>Nombre d'evenement :</strong> {{ membre.evenements.length }}</p>
              <div v-for="(evenement, index) in membre.evenements" :key="index">
                <p><strong>Nom :</strong> {{ evenement.nom }}</p>
                <p><strong>Date de début :</strong> {{ evenement.dateDebut }}</p>
                <p><strong>Date de fin :</strong> {{ evenement.dateFin }}</p>
                <p><strong>Lieu :</strong> {{ evenement.lieu }} </p>
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
            membres: [], // Liste des membres reçus de la servlet
            utilisateur: JSON.parse(localStorage.getItem('utilisateur')), 
            isLoggedIn: localStorage.getItem('isLoggedIn') === 'true', 
            afficherEvenements: []
        };
    },
    methods: {
        async getMembres() {
        try {
        const response = await axios.get('http://localhost:8080/projetSICLIENT/Membres?operation=Membres');

        if (response.status === 200) {
          this.membres = response.data;
          this.afficherEvenements = new Array(this.membres.length).fill(false);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des membres :', error);
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
    this.getMembres();
  }
}
</script>

<style>

</style>