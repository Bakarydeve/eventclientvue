<template>
<div>
  <div v-if="!isLoggedIn">
        <router-link to="/login">Cliquez sur le lien pour vous authentifiez</router-link>
    </div>
  <div v-else>
    <h2>Événements</h2>
    <ul>
      <div v-for="(evenement, index) in evenements" :key="index">
      <p><strong>Nom :</strong> {{ evenement.nom }}</p>
      <p><strong>Date de début :</strong> {{ evenement.dateDebut }}</p>
      <p><strong>Date de fin :</strong> {{ evenement.dateFin }}</p>
      <p><strong>Capacité :</strong> {{ evenement.capacite}}</p>
      <p><strong>Nombre de place disponible :</strong> {{ evenement.dispo }}</p>
      <p><strong>Nombre de place vendue :</strong> {{ evenement.vendue }}</p>
      <p><strong>Lieu :</strong> {{ evenement.lieu.nom }} ({{ evenement.lieu.adresse }})</p>

      <form @submit.prevent="commenter(evenement)">
      <div>
        <label for="commentaire">Commentaire :</label>
        <input type="textarea" id="commentaire" required v-model="commentaire">
      </div>
      <button type="submit">Commenter</button>
    </form>


      <button @click="toggleDisplay(index)"> membres </button>
      <ul v-if="!affichermembres[index]">
          <div v-if="evenement.membres.length === 0">
            <p><strong>Aucun membre inscrit.</strong></p>
          </div>
      </ul>
      <ul v-else>
        <div v-if="evenement.membres.length > 0">
          <li v-for="membre in evenement.membres" :key="membre.id">
            {{ membre.nom }} {{ membre.prenom }}
          </li>
        </div>
      </ul>

        <button @click="inscription(evenement)">S'inscrire</button>
        <button @click="desinscription(evenement)">Se désinscrire</button>
      </div>
    </ul>
  </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      evenements: [], // Liste des événements reçus de la servlet
      utilisateur: JSON.parse(localStorage.getItem('utilisateur')), // Récupérer l'utilisateur depuis le stockage local
      isLoggedIn: localStorage.getItem('isLoggedIn') === 'true', // Récupérer l'état de connexion depuis le stockage local
      affichermembres: [],
      commentaire : ''
    };
  },
  methods: {

    async commenter(evenement) {
      try {
        console.log("nom : " + evenement.nom + " pseudo : " + this.utilisateur.pseudo + " com : " + this.commentaire)
        const response = await fetch('http://localhost:8080/projetSICLIENT/Commentaires?operation=ajoutcommentaire', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams({
            evenement: evenement.nom,
            pseudo: this.utilisateur.pseudo,
            contenu: this.commentaire
          })
        });
        console.log(response.ok)
        if (response.ok) {
          console.log("ajout com ok")
        } else {
          console.log("ajout com not ok")
        }
      } catch (error) {
        console.error('Erreur lors de l\'ajout du commentaire :', error);
      }
    },

    async inscription(evenement) {
      try {
        const non = evenement.nom;
        const pseudo = this.utilisateur.pseudo;

        console.log("nom : " + evenement.nom + " pseudo : " + this.utilisateur.pseudo)

        const response = await fetch('http://localhost:8080/projetSICLIENT/Evenement?operation=Inscription', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams({
            nom: evenement.nom,
            pseudo: this.utilisateur.pseudo
          })
        });
        console.log(response.ok)
        if (response.ok) {
          console.log("oui inscription")
          this.getEvenements();
          //window.location.reload();
        } else {
          console.log("non inscription")
          //this.errorMessage = 'Login ou mot de passe incorrect.';
        }
        console.log(response.data);
      } catch (error) {
        console.error('Erreur lors de l\'inscription à l\'événement :', error);
      }
    },
    async desinscription(evenement) {
      try {
        const non = evenement.nom;
        const pseudo = this.utilisateur.pseudo;

        console.log("nom : " + evenement.nom + " pseudo : " + this.utilisateur.pseudo)

        const response = await fetch('http://localhost:8080/projetSICLIENT/Evenement?operation=Desinscription', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams({
            nom: evenement.nom,
            pseudo: this.utilisateur.pseudo
          })
        });
        console.log(response.ok)
        if (response.ok) {
          console.log("ouiiii désinscription")
          this.getEvenements();
          //this.$router.push('/events');
          //window.location.reload();
        } else {
          console.log("non désinscription")
        }
        console.log(response.data);
      } catch (error) {
        console.error('Erreur lors de l\'inscription à l\'événement :', error);
      }
    },

    async getEvenements() {
      try {
        const response = await axios.get('http://localhost:8080/projetSICLIENT/Evenement?operation=Events');

        if (response.status === 200) {
          const evenements = response.data;
          this.affichermembres = new Array(this.evenements.length).fill(false);
          // Ajouter la propriété afficherMembres à chaque événement
          this.evenements = evenements.map(evenement => ({
            ...evenement,
            afficherMembres: false // Initialiser à false par défaut
          }));
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des événements :', error);
        //this.$router.push('/login');
      }
    },
    toggleMembres(evenement) {
      evenement.afficherMembres = !evenement.afficherMembres;
    },
    toggleDisplay(index) {
      // Inverser l'état d'affichage des événements pour le lieu donné
      this.affichermembres[index] = !this.affichermembres[index];
    }
  },
  mounted() {
    // Appeler la méthode pour récupérer les événements lors du montage du composant
    this.getEvenements();
  }
};
</script>