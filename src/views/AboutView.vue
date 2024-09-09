<template>
  <div>
    <h2>À propos</h2>
    <li><a href="/events">Evenement</a></li>
    <li><a href="/membres">Membre</a></li>
    <div>
      <p>Bienvenue, {{ utilisateur.nom }}!</p>
      <p>Nom: {{ utilisateur.nom }}</p>
      <p>Prénom: {{ utilisateur.prenom }}</p>
      <p>Âge: {{ utilisateur.age }}</p>
      <p>Adresse: {{ utilisateur.adresse }}</p>
    </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: false,
      utilisateur: {}
    };
  },
  async created() {
    try {
      const response = await fetch('http://localhost:8080/projetSICLIENT/Comptes?operation=Session');
      if (response.ok) {
        const utilisateur = await response.json();
        localStorage.setItem('utilisateur', JSON.stringify(utilisateur));
        localStorage.setItem('isLoggedIn', true);
        
        this.utilisateur = utilisateur;
        console.log("toJson : " + utilisateur.adresse)
      } else {
        console.error('Erreur lors de la vérification de la session');
      }
    } catch (error) {
      console.error('Erreur lors de la vérification de la session :', error);
    }
  }
};
</script>