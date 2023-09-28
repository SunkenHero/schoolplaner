const { WebUntis } = require('webuntis');

async function main() {
    const untis = new WebUntis('Friedrich-Hecker-Schule', 'tobias.weiss', 'mixyke92', 'niobe.webuntis.com');
    await untis.login();
    
    obj = await getTimegrid(untis);
    console.log(obj[1].timeUnits);

    await untis.logout();
}

main();

async function getAbsentLesson(untis, start, end) {
    try {
        return await untis.getAbsentLesson(start, end);
    } catch (error) {
        return null;
    }
}

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

async function getDepartments(untis) {
    try {
        return await untis.getDepartments();
    } catch (error) {
        return null;
    }
}

async function getExamsForRange(untis, start, end, classid = -1, withGrades = true) {
    try {
        return await untis.getExamsForRange(start, end, classid, withGrades);
    } catch (error) {
        return null;
    }
}

async function getHolidays(untis) {
    try {
        return await untis.getHolidays();
    } catch (error) {
        return null;
    }
}

async function getHomeWorkAndLessons(untis, start, end) {
    try {
        return await untis.getHomeWorkAndLessons(start, end);
    } catch (error) {
        return null;
    }
}

async function getHomeWorksFor(untis, start, end) {
    try {
        return await untis.getHomeWorksFor(start, end);
    } catch (error) {
        return null;
    }
}

async function getInbox(untis) {
    try {
        return await untis.getInbox();
    } catch (error) {
        return null;
    }
}

async function getLatestImportTime(untis) {
    try {
        return await untis.getLatestImportTime();
    } catch (error) {
        return null;
    }
}

async function getLatestSchoolyear(untis) {
    try {
        return await untis.getLatestSchoolyear();
    } catch (error) {
        return null;
    }
}

async function getNewsWidget(untis, date) {
    try {
        return await untis.getNewsWidget(date);
    } catch (error) {
        return null;
    }
}

async function getOwnClassTimetableFor(untis, date) {
    try {
        return await untis.getOwnClassTimetableFor(date);
    } catch (error) {
        return null;
    }
}

async function getOwnClassTimetableForRange(untis, start, end) {
    try {
        return await untis.getOwnClassTimetableForRange(start, end);
    } catch (error) {
        return null;
    }
}

async function getOwnClassTimetableForToday(untis) {
    try {
        return await untis.getOwnClassTimetableForToday();
    } catch (error) {
        return null;
    }
}

async function getOwnTimetableFor(untis, date) {
    try {
        return await untis.getOwnTimetableFor(date);
    } catch (error) {
        return null;
    }
}

async function getOwnTimetableForRange(untis, start, end) {
    try {
        return await untis.getOwnTimetableForRange(start, end);
    } catch (error) {
        return null;
    }
}

async function getOwnTimetableForToday(untis) {
    try {
        return await untis.getOwnTimetableForToday();
    } catch (error) {
        return null;
    }
}

async function getOwnTimetableForWeek(untis, date) {
    try {
        return await untis.getOwnTimetableForWeek(date);
    } catch (error) {
        return null;
    }
}

async function getRooms(untis) {
    try {
        return await untis.getRooms();
    } catch (error) {
        return null;
    }
}

async function getSchoolyears(untis) {
    try {
        return await untis.getSchoolyears();
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

async function getStudents(untis) {
    try {
        return await untis.getStudents();
    } catch (error) {
        return null;
    }
}

async function getSubjects(untis) {
    try {
        return await untis.getSubjects();
    } catch (error) {
        return null;
    }
}

async function getTeachers(untis) {
    try {
        return await untis.getTeachers();
    } catch (error) {
        return null;
    }
}

async function getTimegrid(untis) {
    try {
        return await untis.getTimegrid();
    } catch (error) {
        return null;
    }
}
