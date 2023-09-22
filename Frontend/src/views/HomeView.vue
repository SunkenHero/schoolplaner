<script setup>

</script>

<template>
    <div>
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
                    <td>Mathe AB</td>
                    <td>Science</td>
                    <td>History</td>
                </tr>
                <tr>
                    <td>Mathe AB</td>
                    <td>Science</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style>

table {
    border-spacing: 5px;
    border: 2px solid var(--color-background-mute);
}

th {
    width: 100vw;
    height: 40px;
    border: 2px solid var(--color-border);
    border-radius: 8px;
    user-select: none;
    transition: 0.25s;
}

th:hover {
    background-color: var(--color-green);
    color: var(--vt-c-black);
    border-color: var(--color-border-hover);
}

td {
    border: 1px solid var(--color-border);
    border-radius: 8px;
    padding: 5px;
}

td:hover {
    cursor: pointer;
}

</style>