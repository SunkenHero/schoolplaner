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

            fetch("http://10.8.0.4:3000/api/homework", requestOptions)
                .then(response => response.json())
                .then(data => {
                    const date = this.date
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
                try {
                    const cell = document.createElement("td");
                    cell.textContent = this.data[0][i].name;
                    row.appendChild(cell);
                } catch (error) {
                    const cell = document.createElement("td");
                    row.appendChild(cell);
                }
                try {
                    const cell = document.createElement("td");
                    cell.textContent = this.data[1][i].name;
                    row.appendChild(cell);
                } catch (error) {
                    const cell = document.createElement("td");
                    row.appendChild(cell);
                }
                try {
                    const cell = document.createElement("td");
                    cell.textContent = this.data[2][i].name;
                    row.appendChild(cell);
                } catch (error) {
                    const cell = document.createElement("td");
                    row.appendChild(cell);
                }
                try {
                    const cell = document.createElement("td");
                    cell.textContent = this.data[3][i].name;
                    row.appendChild(cell);
                } catch (error) {
                    const cell = document.createElement("td");
                    row.appendChild(cell);
                }
                try {
                    const cell = document.createElement("td");
                    cell.textContent = this.data[4][i].name;
                    row.appendChild(cell);
                } catch (error) {
                    const cell = document.createElement("td");
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
    box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.5);
    border-collapse: collapse;
    border-bottom: 5px solid var(--table-accent);
    display: table;
    table-layout: fixed;
}

th {
    width: 20vw;
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

tbody td:nth-child(1) {
    border-left: 0px solid var(--table-accent);
}

tbody td:nth-child(5) {
    border-right: 0px solid var(--table-accent);
}

tbody td:nth-child(2) {
    background: var(--table-background-light);
}

tbody {
    background-color: var(--table-background);
}

td {
    padding: 5px;
    border-left: 2px solid var(--table-spacer);
    border-right: 2px solid var(--table-spacer);
    border-bottom: 1px solid var(--table-spacer);
    width: calc(100% / 5);
    word-wrap: break-word;
}

td:hover {
    cursor: pointer;
}

tr td:empty {
	border-bottom: 0px;
    cursor: auto;
}

</style>