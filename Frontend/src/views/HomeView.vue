<script>
import CreateHomeworkModal from "../components/CreateHomeworkComponent.vue";

export default {
    name: 'HomeView',
    data() {
        return {
            data: [[], [], [], [], []],
            newdate: "",
            date: "",
            day: 0,
            selectday: 0,
            showCreateHomeworkModal: false,
            pageSelect: 0
        };
    },

    components: {
        CreateHomeworkModal
    },

    created() {
        window.addEventListener('keydown', (e) => {
        if (e.key == 'Escape') {
            this.showCreateHomeworkModal = false;
        }
        });
    },

    methods:{
        getData(weekoffset = 0) {
            const requestOptions = {
                method: "GET",
                headers: { "Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem('token')},
            };

            const date = this.newdate;
            date.setHours(0, 0, 0, 0);

            date.setDate(date.getDate() + weekoffset * 7);

            this.data = [[], [], [], [], []];

            const datestr = date.toISOString().split('T')[0].split('-');
            fetch(`http://10.8.0.4:3000/api/homework/${datestr[0]}/${datestr[1]}/${datestr[2]}`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    date.setHours(0, 0, 0, 0);
                    date.setDate(date.getDate() - 2);
                    for (const item of data) {
                        const parsedDate = new Date(item.date);
                        parsedDate.setHours(0, 0, 0, 0);
                        const diff = parsedDate.getTime() - date.getTime();
                        if (diff >= 0 && diff <= 518400000) {
                            let day = parsedDate.getDay() - 1;
                            if (day == -1 || day > 4){
                                day = 1;
                            }
                            this.data[day].push(item);
                        }
                    }
                }
            );
        },
        
        deleteHomework(id){
            const requestOptions ={
                method: "DELETE",
                headers: { "Content-Type": "application/json",
                            "Authorization": "Bearer " + localStorage.getItem('token')},
            };

            fetch("http://10.8.0.4:3000/api/homework/" + id, requestOptions)
                .then(response => response.json())
                .then(data => {
                    
                }
            );
        },
    },

    computed: {
        tbody() {
            const tbody = document.createElement("tbody");
            let biggest = 0;
            for (let items in this.data) {
                items = parseInt(items);
                for (let item in this.data[items]) {
                    item = parseInt(item);
                    if (item + 1 > biggest) {
                        biggest = item + 1;
                    }
                }
            }
            for (let i = 0; i < biggest; i++) {
                const row = document.createElement("tr");
                for (let j = 0; j < 5; j++) {
                    const cell = document.createElement("td");
                    const title = document.createElement("span");
                    const subtitle = document.createElement("span");
                    const lineBreak = document.createElement("br");
                    const div = document.createElement("div");
                    title.classList.add("cell-title");
                    subtitle.classList.add("cell-subtitle");
                    try {
                        const name = this.data[j][i].name;
                        if (name == null) {
                            title.textContent = "No name set";
                            title.style.fontStyle = "italic";
                            
                        } else {
                            title.textContent = name;
                        }
                        cell.appendChild(title);
                        cell.appendChild(lineBreak);
                        
                        const description = this.data[j][i].description;
                        if (description == null) {
                            subtitle.textContent = "No description set";
                            subtitle.style.fontStyle = "italic";
                        } else {
                            subtitle.textContent = description;
                        }

                        div.appendChild(subtitle);
                        div.classList.add("subtitle-div");
            
                        cell.appendChild(div);
                    } catch (error) {
                        
                    }
                    if (j + 1 == this.selectday) {
                        cell.classList.add("highlighted");
                    }
                    row.appendChild(cell);
                }
                tbody.appendChild(row);
            }
            return tbody.outerHTML;
        }
    },
    
    beforeMount(){
        this.date = new Date();
        this.date.setHours(0, 0, 0, 0);
        this.day = this.date.getDay();
        this.newdate = new Date(this.date.setDate(this.date.getDate() - this.day + 1 + ((this.day == 6) ? 7 : 0)));
        this.selectday = this.day + ((this.day == 6) ? -5 : 0) + ((this.day == 0) ? 1 : 0);

        this.getData(0);
    }
}

</script>

<template>

<div class="button-layout">
    <button class="pageselect" id="pageselect" @click="pageSelect--;">&lt</button>
    <button class="createhomework" id="show-createhomework-modal" @click="showCreateHomeworkModal = true">Create Homework</button>
    <button class="pageselect" id="pageselect" @click="pageSelect++;">></button>
</div>

<table>
    <thead>
        <tr>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
        </tr>
    </thead>
    <tbody v-html="tbody"></tbody>
</table>

<Teleport to="body">
    <CreateHomeworkModal :show="showCreateHomeworkModal" @close="showCreateHomeworkModal = false" @update="getData(0)">
        <template #header>
        </template>
    </CreateHomeworkModal>
</Teleport>

</template>

<style>

table {
    width: 100%;
    box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.5);
    border-collapse: collapse;
    border-bottom: 5px solid var(--table-accent);
    display: table;
    table-layout: fixed;
}

th {
    width: 20%;
    height: 50px;
    user-select: none;
    transition: 0.25s;
    background-color: var(--table-accent);
    color: var(--table-white-text);
    font-weight: 600;
    font-size: 25px;
    border-bottom: 0px solid var(--table-spacer);
    padding: 0px 10px;
}

th:hover {
    color: var(--vt-c-black);
}

th:first-child {
    border-top-left-radius: 15px;
}

th:last-child {
    border-top-right-radius: 15px;
}

tbody td:first-child {
    border-left: 0px solid var(--table-accent);
}

tbody td:last-child {
    border-right: 0px solid var(--table-accent);
}

tbody .highlighted {
    background: var(--table-background-light);
}

tbody {
    background-color: var(--table-background);
}

td {
    padding: 2px 6px;
    border-left: 2px solid var(--table-spacer);
    border-right: 2px solid var(--table-spacer);
    border-bottom: 1px solid var(--table-spacer);
}

td:hover {
    cursor: pointer;
}

tbody .cell-title {
    font-size: 22px;
}

tbody .cell-subtitle {
    font-size: 14px;
    overflow-wrap: break-word;
    overflow: hidden;
    display: -webkit-box;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

tbody .subtitle-div {
    margin-left: 8px;
}

.button-layout {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: left;
}

.button-layout .createhomework {
    width: 200px;
    height: 40px;
    font-size: 20px;
    padding-bottom: 3px;
    background-color: var(--table-accent);
    border: 0px;
    border-radius: 5px;
    margin-bottom: 13px;
    transition: 0.25s;
    cursor: pointer;
    color: var(--table-white-text);
    font-weight: 600;
    margin: 0px 10px;
}

.button-layout .pageselect {
    width: 40px;
    height: 40px;
    font-size: 20px;
    padding-bottom: 3px;
    background-color: var(--table-accent);
    border: 0px;
    border-radius: 5px;
    margin-bottom: 13px;
    transition: 0.25s;
    cursor: pointer;
    padding-bottom: 4px;
    color: var(--table-white-text);
}

.button-layout button:hover {
    background-color: hsla(160, 70%, 37%, 1);
}

.button-layout button:active {
    background-color: hsla(160, 45%, 37%, 1);
}

</style>