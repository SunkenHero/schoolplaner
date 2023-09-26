<script>
export default {
    name: 'HomeView',
    data() {
        return {
            data: [[], [], [], [], []],
            newdate: "",
            date: "",
            day: 0,
            selectday: 0
        };
    },

    methods:{
        getData() {
            const requestOptions = {
                method: "GET",
                headers: { "Content-Type": "application/json",
                            "Authorization": "Bearer " + localStorage.getItem('token')},
            };
                /**
                 * /2023/09/25
                 * /user --> jwt token
                 * **/
            fetch("http://10.8.0.4:3000/api/homework/", requestOptions)
                .then(response => response.json())
                .then(data => {
                    const date = this.date;
                    date.setHours(0, 0, 0, 0);
                    date.setDate(date.getDate() - 2);
                    for (const item of data) {
                        const parsedDate = new Date(item.date);
                        parsedDate.setHours(0, 0, 0, 0);
                        if (date.getFullYear() == parsedDate.getFullYear() && date.getMonth() == parsedDate.getMonth()) {
                            const diff = parsedDate.getTime() - date.getTime();
                            if (diff >= 0 && diff <= 518400000) {
                                var day = parsedDate.getDay() - 1;
                                if (day == -1 || day > 4){
                                    day = 1;
                                }
                                this.data[day].push(item);
                            }
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
                    console.log(data);
                }
            );
        }
    },

    computed: {
        tbody() {
            const tbody = document.createElement("tbody");
            var biggest = 0;
            for (var items in this.data) {
                items = parseInt(items);
                for (var item in this.data[items]) {
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
        },
    },
    
    beforeMount(){
        this.date = new Date();
        this.day = this.date.getDay();
        this.newdate = new Date(this.date.setDate(this.date.getDate() - this.day + 1 + ((this.day == 6) ? 7 : 0)));
        this.selectday = this.day + ((this.day == 6) ? -5 : 0) + ((this.day == 0) ? 1 : 0);

        this.getData();
    }
}
</script>

<template>
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
    font-size: 23px;
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

</style>