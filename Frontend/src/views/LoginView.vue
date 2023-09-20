<script startup>
</script>
<template>
    <div class="menu">
        <div class="box">
            <form method="post">
                <div class="form-group">
                    <Text class="text">Login</Text>
                    <input class="name-input" type="text" name="Nutzername" placeholder="Nutzername">
                    <input class="password-input" type="password" name="Passwort" placeholder="Password">
                    <button class="submit-button" type="submit">Anmelden</button>
                </div>
            </form>
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

.menu {
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
    box-shadow: 2px 6px 15px 6px rgba(0, 0, 0, 0.5);
}

.text {
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
    padding-bottom: 2px;
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
}

</style>