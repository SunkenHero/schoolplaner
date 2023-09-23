<script setup>

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
        <tbody>
            <tr>
                <td><span style="font-size: 18px;">Mathe</span><span style="font-size: 12px;"><br>Arbeitsblatt Nr 2-4</span></td>
                <td><span style="font-size: 18px;">Deutsch</span><span style="font-size: 12px;"><br>Text lesen</span></td>
                <td><span style="font-size: 18px;">Science</span><span style="font-size: 12px;"><br>Create Presentation</span></td>
                <td><span style="font-size: 18px;">Mathe</span><span style="font-size: 12px;"><br>Verbesserung Arbeit</span></td>
                <td><span style="font-size: 18px;">Science</span><span style="font-size: 12px;"><br>Create Presentation</span></td>
            </tr>
            <tr>
                <td></td>
                <td><span style="font-size: 18px;">Religion</span><span style="font-size: 12px;"><br>Mit Gott eine Runde Fortnite spielen</span></td>
                <td><span style="font-size: 18px;">Wirtschaft</span><span style="font-size: 12px;"><br>GG lesen</span></td>
                <td></td>
                <td><span style="font-size: 18px;">Informatik Hardware</span><span style="font-size: 12px;"><br>Installieren von VS Code</span></td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td><span style="font-size: 18px;">Chemie</span><span style="font-size: 12px;"><br>Ei kochen und protokolieren</span></td>
                <td></td>
                <td><span style="font-size: 18px;">Physik</span><span style="font-size: 12px;"><br>AB ausfüllen</span></td>
            </tr>
        </tbody>
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