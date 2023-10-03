<script>
import router from '../router'

export default {
  props: {
    show: Boolean
  },

  data() {
    return {
        subjects: ["Deutsch", "Mathe", "Englisch", "Französisch", "Physik", "Chemie", "Biologie", "G-GK", "Erdkunde", "Wirtschaft", "RRK","REV", "Sport", "Kunst", "Musik", "Informatik", "Ethik","Sonstiges"].sort(),
        name: "",
        description: "",
        date: "",
        fach: "",    
    }
  },
  methods: {
    close() {
        this.$emit('update')
        this.$emit('close')
    },
    createhomework(){
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem('token') },
            body: JSON.stringify({ name: this.name, description: this.description, date: this.date, fach: this.fach })
        };
        
        fetch("http://10.8.0.4:3000/api/homework", requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
            });
        this.close()


        //todo reload tbody
    }
  },
}
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-container">
        <div class="modal-header">
          <slot name="header">Create Homework</slot>
        </div>
        <div>{{ date }}</div>
        <div class="modal-body">
                <input placeholder="Name" v-model="name" required/>
                <br />
                <input placeholder="Description" v-model="description" required/>
                <br />
                <select v-model="fach" required>
                    <option value="">--Please choose an option--</option>
                    <option v-for="subject in subjects" :key="subject" :value="subject">{{ subject }}</option>
                </select>
                <br />
                <input placeholder="Datum" type="date" v-model="date" required/>
        </div>

        <div class="modal-footer">
          <slot name="footer">
            default footer
            <button
              class="modal-default-button"
              @click="createhomework"
            >Create</button>
            <button
              class="modal-default-button"
              @click="close"
            >Cancel</button>
          </slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: auto;
  margin: auto;
  padding: 20px 30px;
  background-color: var(--vt-c-black);
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header{
  color: var(--table-accent);
  font-size: 30px;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  cursor: pointer;
  border: 0px solid;
  background-color: transparent;
  color: var(--color-green);
  border-radius: 2px;
  font-size: medium;
  float: right;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

input {
    margin-bottom: 15px;
    font-size: 15px;
}

select {
    margin-bottom: 15px;
    width: 250px;
    height: 40px;
    font-size: 15px;
    border: 1px solid var(--color-border);
    border-radius: 10px;
    background-color: var(--color-background);
    color: var(--color-text);
}

</style>