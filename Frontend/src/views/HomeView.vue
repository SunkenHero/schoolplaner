<script setup>

</script>

<template>
    <div>
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
                <td></td>
                <td></td>
            </tr>
        </tbody>
    </div>
</template>

<style>

th {
    width: 100vw;
    height: 40px;
    border: 2px solid var(--color-border);
    user-select: none;
    transition: 0.25s;
}

th:hover {
    background-color: var(--color-green);
    color: var(--vt-c-black);
}

</style>