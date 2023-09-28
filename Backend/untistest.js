const { WebUntis } = require('webuntis');

const Cache = require('./cache.js');

class UntisApi {
    constructor(school, username, password, url, cache, fetchinterval) {
        this.untis = new WebUntis(school, username, password , url);
        this.cache = cache;
        this.previousFetchTime = 0;
    }

    async fetchdata() {
        const fetchTime = await this.untis.getLatestImportTime();
        if (fetchTime != this.previousFetchTime) {
            this.previousFetchTime = fetchTime;
            this.cache.flushAll();
            console.log("Cache flushed");
            return true;
        }
        console.log("Cache not flushed");
        return false;
    }

    get Cache() {
        return this.cache;
    }

    set Cache(cache) {
        this.cache = cache;
    }

    async login() {
        await this.untis.login();
    }

    async logout() {
        await this.untis.logout();
    }

    async getAbsentLesson(start, end) {
        start.setHours(0, 0, 0, 0);
        end.setHours(0, 0, 0, 0);
        const cacheKey = `getAbsentLesson/${start.now()}/${end.now()}`;
        const cachedData = this.cache.get(cacheKey);
        if (cachedData) {
            return cachedData;
        }
        try {
            data = await this.untis.getAbsentLesson(start, end);
            this.cache.set(cacheKey, data);
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getClassByName(name) {
        try {
            const classes = await this.untis.getClasses();
            return classes.find(class_ => class_.name == name);
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getClassByID(id) {
        try {
            const classes = await this.untis.getClasses();
            return classes.find(class_ => class_.id == id);
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getClasses() {
        try {
            return await this.untis.getClasses();
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getDepartments() {
        try {
            return await this.untis.getDepartments();
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getExamsForRange(start, end, classid = -1, withGrades = true) {
        try {
            return await this.untis.getExamsForRange(start, end, classid, withGrades);
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getHolidays() {
        try {
            return await this.untis.getHolidays();
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getHomeWorkAndLessons(start, end) {
        try {
            return await this.untis.getHomeWorkAndLessons(start, end);
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getHomeWorksFor(start, end) {
        try {
            return await this.untis.getHomeWorksFor(start, end);
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getInbox() {
        try {
            return await this.untis.getInbox();
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getLatestImportTime() {
        try {
            return await this.untis.getLatestImportTime();
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getLatestSchoolyear() {
        try {
            return await this.untis.getLatestSchoolyear();
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getNewsWidget(date) {
        try {
            return await this.untis.getNewsWidget(date);
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getOwnClassTimetableFor(date) {
        try {
            return await this.untis.getOwnClassTimetableFor(date);
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getOwnClassTimetableForRange(start, end) {
        try {
            return await this.untis.getOwnClassTimetableForRange(start, end);
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getOwnClassTimetableForToday() {
        try {
            return await this.untis.getOwnClassTimetableForToday();
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getOwnTimetableFor(date) {
        try {
            return await this.untis.getOwnTimetableFor(date);
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getOwnTimetableForRange(start, end) {
        try {
            return await this.untis.getOwnTimetableForRange(start, end);
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getOwnTimetableForToday() {
        try {
            return await this.untis.getOwnTimetableForToday();
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getOwnTimetableForWeek(date) {
        try {
            return await this.untis.getOwnTimetableForWeek(date);
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getRooms() {
        try {
            return await this.untis.getRooms();
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getSchoolyears() {
        try {
            return await this.untis.getSchoolyears();
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getStatusData() {
        try {
            return await this.untis.getStatusData();
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getStudents() {
        try {
            return await this.untis.getStudents();
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getSubjects() {
        try {
            return await this.untis.getSubjects();
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getTeachers() {
        try {
            return await this.untis.getTeachers();
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getTimegrid() {
        try {
            return await this.untis.getTimegrid();
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getTimetableFor(date, id, type = 1) {
        try {
            return await this.untis.getTimetableFor(date, id, type);
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getTimetableForRange(start, end, id, type = 1) {
        try {
            return await this.untis.getTimetableForRange(start, end, id, type);
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getTimetableForToday(id, type = 1) {
        try {
            return await this.untis.getTimetableForToday(id, type);
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getTimetableForWeek(date, id, type = 1) {
        try {
            return await this.untis.getTimetableForWeek(date, id, type);
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}

async function main() {
    untis = new UntisApi('Friedrich-Hecker-Schule', 'tobias.weiss', 'mixyke92', 'niobe.webuntis.com', Cache.mycache, 5);
    await untis.login();

    await untis.fetchdata();
    await untis.fetchdata();
    await untis.fetchdata();
    
    await untis.logout();
}

main();