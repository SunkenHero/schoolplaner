<script >
    export default {
        name: 'LogoutView',
        methods: {
            logout() {
                localStorage.removeItem('token');
                this.$router.push('/login');
            }
        }
    }
</script>

<template>
    <button class="submit-button" type="submit" v-on:click="logout()">Logout</button>
</template>

