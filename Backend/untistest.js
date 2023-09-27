const { WebUntis } = require('webuntis');

async function main() {
    const untis = new WebUntis('Friedrich-Hecker-Schule', 'tobias.weiss', 'mixyke92', 'niobe.webuntis.com');
    await untis.login();

    obj = await getExamsForRange(untis, new Date(2023, 6, 25), new Date(2023, 9, 29));
    console.log(obj);

    await untis.logout();
}

main();

async function getClassByName(untis, name) {
    try {
        const classes = await untis.getClasses();
        return classes.find(class_ => class_.name == name);
    } catch (error) {
        return null;
    }
}

async function getClassByID(untis, id) {
    try {
        const classes = await untis.getClasses();
        return classes.find(class_ => class_.id == id);
    } catch (error) {
        return null;
    }
}

async function getClasses(untis) {
    try {
        return await untis.getClasses();
    } catch (error) {
        return null;
    }
}

async function getStatusData(untis) {
    try {
        return await untis.getStatusData();
    } catch (error) {
        return null;
    }
}

async function getAbsentLesson(untis, start, end) {
    try {
        return await untis.getAbsentLesson(start, end);
    } catch (error) {
        return null;
    }
}

async function getExamsForRange(untis, start, end, classid, withGrades = true) {
    try {
        return await untis.getExamsForRange(start, end, classid, withGrades);
    } catch (error) {
        return null;
    }
}