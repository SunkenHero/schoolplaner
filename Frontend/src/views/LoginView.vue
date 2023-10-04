<script>
    import { Text } from 'vue'; 
    import router from '../router'
    export default {
        name: 'LoginView',
        data() {
            return {
                name: "",
                passwort: ""
            };
        },
    components: { Text },
    methods: {
        login() {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: this.name, passwort: this.passwort })
            };

            fetch("http://10.8.0.4:3000/auth", requestOptions)
                .then(response => response.json())
                .then(data => {
                    localStorage.setItem('token', data.token)
                    console.log(localStorage.getItem('token'))
                    router.push('/')
                });  
        }
    }
}
</script>
<template>
    <div class="menu-screen">
        <div class="box">
            <div class="form-group">
                <p class="text">Login</p>
                <input class="name-input" type="text" name="Nutzername" placeholder="Nutzername" v-model="name">
                <input class="password-input" type="password" name="Passwort" placeholder="Password" v-model="passwort">
                <button class="submit-button" type="submit" v-on:click="login()">Login</button>
            </div> 
        </div>
    </div>
</template>

<style>

.form-group {
    width: 100%;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.menu-screen {
    margin-top: 50px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
}

.box {
    background-color: var(--color-background-mute);
    width: 400px;
    height: 300px;
    display:flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 5px 10px 6px rgba(0, 0, 0, 0.5);
}

.text {
    user-select: none;
    font-weight: 600;
    font-size: 32px;
    margin-bottom: 15px;
}

input {
    width: 250px;
    height: 40px;
    font-size: 20px;
    border: 1px solid var(--color-border);
    border-radius: 10px;
    background-color: var(--color-background);
    color: var(--color-text);
    align-self: center;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 0px;
}

.name-input {
    margin-bottom: 10px;
}

.password-input {
    margin-bottom: 30px;
}

.submit-button {
    width: 200px;
    height: 40px;
    font-size: 20px;
    padding-bottom: 3px;
    background-color: var(--color-green);
    border: 0px;
    border-radius: 20px;
    margin-bottom: 13px;
    transition: background-color 0.25s;
    cursor: pointer;
}

button:hover {
    background-color: hsla(160, 70%, 37%, 1);
}

button:active {
    background-color: hsla(160, 45%, 37%, 1);
}

</style>