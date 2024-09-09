<template>
    <div>
      <h2>Créer un nouveau membre</h2>
      <form @submit.prevent="creerMembre">
        <div>
          <label for="nom">Nom :</label>
          <input type="text" id="nom" v-model="nouveauMembre.nom" required>
        </div>
        <div>
          <label for="prenom">Prénom :</label>
          <input type="text" id="prenom" v-model="nouveauMembre.prenom" required>
        </div>
        <div>
          <label for="adresse">Adresse :</label>
          <input type="text" id="adresse" v-model="nouveauMembre.adresse" required>
        </div>
        <div>
          <label for="mail">Mail :</label>
          <input type="email" id="mail" v-model="nouveauMembre.mail" required>
        </div>
        <div>
          <label for="motDePasse">Mot de passe :</label>
          <input type="password" id="motDePasse" v-model="nouveauMembre.motDePasse" required>
        </div>
        <div>
          <label for="dateNaissance">Date de naissance :</label>
          <input type="date" id="dateNaissance" v-model="nouveauMembre.dateNaissance" required>
        </div>
        <button type="submit">Créer</button>
      </form>
    </div>

   <div>
    <div>
        <h2>Modifier un membre</h2>
    <select v-model="MembreId">
      <option v-for="membre in membres" :key="membre.id" :value="membre.id">{{ membre.nom }}</option>
    </select>
    <button @click="MembreInfos">Sélectionner</button>
    </div>
    <div v-if="membre">
      <h2>Modifier le membre {{ membre.nom }} {{ membre.prenom }}</h2>
      <form @submit.prevent="submitChanges">
        <label for="nom">Nom :</label>
        <input type="text" v-model="membre.nom" id="nom">
        <label for="prenom">Prenom :</label>
        <input type="text" v-model="membre.prenom" id="prenom">
        <label for="adresse">Adresse :</label>
        <input type="text" v-model="membre.adresse" id="adresse">
        <label for="mail">Mail :</label>
        <input type="text" v-model="membre.mail" id="mail">
        <label for="motDePasse">Mott de passe :</label>
        <input type="password" v-model="membre.motDePasse" id="motDePasse">
        <label for="dateNaissance">Date de naissance :</label>
        <input type="date" v-model="membre.dateNaissance" id="dateNaissance">
        <button type="submit">Enregistrer les modifications</button>
      </form>
    </div>
  </div>

  <div>
    <h2>Liste des membres</h2>
    <ul>
      <div v-for="membre in membres" :key="membre.id">
        <div>
          <p><strong>Nom :</strong> {{ membre.nom }}</p>
          <p><strong>Prenom :</strong> {{ membre.prenom }}</p>
          <button @click="deleteMembre(membre.id)">Supprimer</button>
        </div>
    </div>
    </ul>
  </div>

  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        nouveauMembre: {
          nom: '',
          prenom: '',
          adresse: '',
          mail: '',
          motDePasse: '',
          dateNaissance: ''
        },

        MembreId: null,
        membre: null,

        membres: [],

        utilisateur: JSON.parse(localStorage.getItem('utilisateur')), 
        isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
      };
    },
    methods: {
      async creerMembre() {
        try {
          const response = await axios.post('http://localhost:5000/membres', this.nouveauMembre);
          if (response.status === 200) {
            console.log("Membre créé avec succès !")
            this.nouveauMembre = {
              nom: '',
              prenom: '',
              adresse: '',
              mail: '',
              motDePasse: '',
              dateNaissance: ''
            };
          }
        } catch (error) {
          console.error('Erreur lors de la création du membre :', error);
        }
      },

      async MembreInfos() {
      try {
        const response = await axios.get(`http://localhost:5000/membres/${this.MembreId}`);
        this.membre = response.data;
      } catch (error) {
        console.error('Erreur lors du chargement des détails du membre :', error);
      }
    },
    async submitChanges() {
      try {
        const response = await axios.put(`http://localhost:5000/membres/${this.membre.id}`, this.membre);
        console.log('Modifications enregistrées avec succès :', response.data);
      } catch (error) {
        console.error('Erreur lors de la soumission des modifications du membre :', error);
      }
    },
    async getMembres() {
      try {
        const response = await axios.get('http://localhost:5000/membres');
        this.membres = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des membres :', error);
      }
    },
    async deleteMembre(membreId) {
      try {
        await axios.delete(`http://localhost:5000/membres/${membreId}`);
        this.membres = this.membres.filter(m => m.id !== membreId);
        console.log('Membre supprimé avec succès');
      } catch (error) {
        console.error('Erreur lors de la suppression du membre :', error);
      }
    }

    },
    mounted() {
        this.getMembres();
    }

  };
  </script>
  
  <style>

  </style>
  