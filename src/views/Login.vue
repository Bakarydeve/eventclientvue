<template>
  <div>
    <h2>Page d'Authentification</h2>
    <form @submit.prevent="log">
      <div>
        <label for="login">Login :</label>
        <input type="text" id="login" required v-model="login">
      </div>
      <div>
        <label for="mdp">Mot de passe :</label>
        <input type="password" id="mdp" required v-model="mdp">
      </div>
      <button type="submit">Se connecter</button>
    </form>
    <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
    data() {
        return {
            login: '',
            mdp: '',
            errorMessage: ''
        };
    },
    methods: {
    async log() {
      console.log("identifiant : " + this.login + " mot de passe : " + this.mdp)
      try {
        const response = await fetch('http://localhost:8080/projetSICLIENT/Comptes?operation=Authentification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ login: this.login, mdp: this.mdp })
        });
        console.log(response.ok)
        if (response.ok) {
          console.log("yes ok")
          this.$router.push('/about');
        } else {
          console.log("no repeat")
          this.errorMessage = 'Login ou mot de passe incorrect.';
        }
      } catch (error) {
        console.error('Erreur lors de l\'authentification :', error);
        this.errorMessage = 'Une erreur s\'est produite lors de l\'authentification.';
      }
    }
  }

}

</script>

<style>

</style>