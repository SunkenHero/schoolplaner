const { WebUntis } = require('webuntis');
const NodeCache = require( "node-cache" );

class UntisApi {
    constructor(school, username, password, url, cacheTimeout) {
        this.untis = new WebUntis(school, username, password , url);
        this.cache = new NodeCache({checkperiod: cacheTimeout});
        this.previousFetchTime = 0;
    }

    async fetchdata() {
        const fetchTime = await this.untis.getLatestImportTime();
        if (fetchTime != this.previousFetchTime) {
            this.previousFetchTime = fetchTime;
            this.cache.flushAll();
            return true;
        }
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
        const cacheKey = `getAbsentLesson/${start.getTime()}/${end.getTime()}`;
        const cachedData = this.cache.get(cacheKey);
        if (cachedData) {
            return cachedData;
        }
        try {
            const data = await this.untis.getAbsentLesson(start, end);
            this.cache.set(cacheKey, data);
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getClassByName(name) {
        const cacheKey = `getClasses`;
        const cachedData = this.cache.get(cacheKey);
        if (cachedData) {
            return cachedData.find(class_ => class_.name == name);
        }
        try {
            const data = await this.untis.getClasses();
            this.cache.set(cacheKey, data);
            return data.find(class_ => class_.name == name);
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getClassByID(id) {
        const cacheKey = `getClasses`;
        const cachedData = this.cache.get(cacheKey);
        if (cachedData) {
            return cachedData.find(class_ => class_.id == id);
        }
        try {
            const data = await this.untis.getClasses();
            this.cache.set(cacheKey, data);
            return data.find(class_ => class_.id == id);
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getClasses() {
        const cacheKey = `getClasses`;
        const cachedData = this.cache.get(cacheKey);
        if (cachedData) {
            return cachedData;
        }
        try {
            const data = await this.untis.getClasses();
            this.cache.set(cacheKey, data);
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getDepartments() {
        const cacheKey = `getDepartments`;
        const cachedData = this.cache.get(cacheKey);
        if (cachedData) {
            return cachedData;
        }
        try {
            const data = await this.untis.getDepartments();
            this.cache.set(cacheKey, data);
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getExamsForRange(start, end, classid = -1, withGrades = true) {
        start.setHours(0, 0, 0, 0);
        end.setHours(0, 0, 0, 0);
        const cacheKey = `getExamsForRange/${start.getTime()}/${end.getTime()}/${classid}/${withGrades}`;
        const cachedData = this.cache.get(cacheKey);
        if (cachedData) {
            return cachedData;
        }
        try {
            const data = await this.untis.getExamsForRange(start, end, classid, withGrades);
            this.cache.set(cacheKey, data);
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getHolidays() {
        const cacheKey = `getHolidays`;
        const cachedData = this.cache.get(cacheKey);
        if (cachedData) {
            return cachedData;
        }
        try {
            const data = await this.untis.getHolidays();
            this.cache.set(cacheKey, data);
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getHomeWorkAndLessons(start, end) {
        start.setHours(0, 0, 0, 0);
        end.setHours(0, 0, 0, 0);
        const cacheKey = `getHomeWorkAndLessons/${start.getTime()}/${end.getTime()}`;
        const cachedData = this.cache.get(cacheKey);
        if (cachedData) {
            return cachedData;
        }
        try {
            const data = await this.untis.getHomeWorkAndLessons(start, end);
            this.cache.set(cacheKey, data);
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getHomeWorksFor(start, end) {
        start.setHours(0, 0, 0, 0);
        end.setHours(0, 0, 0, 0);
        const cacheKey = `getHomeWorksFor/${start.getTime()}/${end.getTime()}`;
        const cachedData = this.cache.get(cacheKey);
        if (cachedData) {
            return cachedData;
        }
        try {
            const data = await this.untis.getHomeWorksFor(start, end);
            this.cache.set(cacheKey, data);
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getInbox() {
        const cacheKey = `getInbox`;
        const cachedData = this.cache.get(cacheKey);
        if (cachedData) {
            return cachedData;
        }
        try {
            const data = await this.untis.getInbox();
            this.cache.set(cacheKey, data);
            return data;
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
        const cacheKey = `getLatestSchoolyear`;
        const cachedData = this.cache.get(cacheKey);
        if (cachedData) {
            return cachedData;
        }
        try {
            const data = await this.untis.getLatestSchoolyear();
            this.cache.set(cacheKey, data);
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getNewsWidget(date) {
        date.setHours(0, 0, 0, 0);
        const cacheKey = `getNewsWidget/${date.getTime()}`;
        const cachedData = this.cache.get(cacheKey);
        if (cachedData) {
            return cachedData;
        }
        try {
            const data = await this.untis.getNewsWidget(date);
            this.cache.set(cacheKey, data);
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getOwnClassTimetableFor(date) {
        date.setHours(0, 0, 0, 0);
        const cacheKey = `getOwnClassTimetableFor/${date.getTime()}`;
        const cachedData = this.cache.get(cacheKey);
        if (cachedData) {
            return cachedData;
        }
        try {
            const data = await this.untis.getOwnClassTimetableFor(date);
            this.cache.set(cacheKey, data);
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getOwnClassTimetableForRange(start, end) {
        start.setHours(0, 0, 0, 0);
        end.setHours(0, 0, 0, 0);
        const cacheKey = `getOwnClassTimetableForRange/${start.getTime()}/${end.getTime()}`;
        const cachedData = this.cache.get(cacheKey);
        if (cachedData) {
            return cachedData;
        }
        try {
            const data = await this.untis.getOwnClassTimetableForRange(start, end);
            this.cache.set(cacheKey, data);
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getOwnClassTimetableForToday() {
        const date = new Date();
        date.setHours(0, 0, 0, 0);
        const cacheKey = `getOwnClassTimetableForToday/${date.getTime()}`;
        const cachedData = this.cache.get(cacheKey);
        if (cachedData) {
            return cachedData;
        }
        try {
            const data = await this.untis.getOwnClassTimetableForToday();
            this.cache.set(cacheKey, data);
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getOwnTimetableFor(date) {
        date.setHours(0, 0, 0, 0);
        const cacheKey = `getOwnTimetableFor/${date.getTime()}`;
        const cachedData = this.cache.get(cacheKey);
        if (cachedData) {
            return cachedData;
        }
        try {
            const data = await this.untis.getOwnTimetableFor(date);
            this.cache.set(cacheKey, data);
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getOwnTimetableForRange(start, end) {
        start.setHours(0, 0, 0, 0);
        end.setHours(0, 0, 0, 0);
        const cacheKey = `getOwnTimetableForRange/${start.getTime()}/${end.getTime()}`;
        const cachedData = this.cache.get(cacheKey);
        if (cachedData) {
            return cachedData;
        }
        try {
            const data = await this.untis.getOwnTimetableForRange(start, end);
            this.cache.set(cacheKey, data);
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getOwnTimetableForToday() {
        const date = new Date();
        date.setHours(0, 0, 0, 0);
        const cacheKey = `getOwnTimetableForToday/${date.getTime()}`;
        const cachedData = this.cache.get(cacheKey);
        if (cachedData) {
            return cachedData;
        }
        try {
            const data = await this.untis.getOwnTimetableForToday();
            this.cache.set(cacheKey, data);
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getOwnTimetableForWeek(date) {
        date.setHours(0, 0, 0, 0);
        const cacheKey = `getOwnTimetableForWeek/${date.getTime()}`;
        const cachedData = this.cache.get(cacheKey);
        if (cachedData) {
            return cachedData;
        }
        try {
            const data = await this.untis.getOwnTimetableForWeek(date);
            this.cache.set(cacheKey, data);
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getRooms() {
        const cacheKey = `getRooms`;
        const cachedData = this.cache.get(cacheKey);
        if (cachedData) {
            return cachedData;
        }
        try {
            const data = await this.untis.getRooms();
            this.cache.set(cacheKey, data);
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getSchoolyears() {
        const cacheKey = `getSchoolyears`;
        const cachedData = this.cache.get(cacheKey);
        if (cachedData) {
            return cachedData;
        }
        try {
            const data = await this.untis.getSchoolyears();
            this.cache.set(cacheKey, data);
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getStatusData() {
        const cacheKey = `getStatusData`;
        const cachedData = this.cache.get(cacheKey);
        if (cachedData) {
            return cachedData;
        }
        try {
            const data = await this.untis.getStatusData();
            this.cache.set(cacheKey, data);
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getStudents() {
        const cacheKey = `getStudents`;
        const cachedData = this.cache.get(cacheKey);
        if (cachedData) {
            return cachedData;
        }
        try {
            const data = await this.untis.getStudents();
            this.cache.set(cacheKey, data);
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getSubjects() {
        const cacheKey = `getSubjects`;
        const cachedData = this.cache.get(cacheKey);
        if (cachedData) {
            return cachedData;
        }
        try {
            const data = await this.untis.getSubjects();
            this.cache.set(cacheKey, data);
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getTeachers() {
        const cacheKey = `getTeachers`;
        const cachedData = this.cache.get(cacheKey);
        if (cachedData) {
            return cachedData;
        }
        try {
            const data = await this.untis.getTeachers();
            this.cache.set(cacheKey, data);
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getTimegrid() {
        const cacheKey = `getTimegrid`;
        const cachedData = this.cache.get(cacheKey);
        if (cachedData) {
            return cachedData;
        }
        try {
            const data = await this.untis.getTimegrid();
            this.cache.set(cacheKey, data);
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getTimetableFor(date, id, type = 1) {
        date.setHours(0, 0, 0, 0);
        const cacheKey = `getTimetableFor/${date.getTime()}/${id}/${type}`;
        const cachedData = this.cache.get(cacheKey);
        if (cachedData) {
            return cachedData;
        }
        try {
            const data = await this.untis.getTimetableFor(date, id, type);
            this.cache.set(cacheKey, data);
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getTimetableForRange(start, end, id, type = 1) {
        start.setHours(0, 0, 0, 0);
        end.setHours(0, 0, 0, 0);
        const cacheKey = `getTimetableForRange/${start.getTime()}/${end.getTime()}/${id}/${type}`;
        const cachedData = this.cache.get(cacheKey);
        if (cachedData) {
            return cachedData;
        }
        try {
            const data = await this.untis.getTimetableForRange(start, end, id, type);
            this.cache.set(cacheKey, data);
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getTimetableForToday(id, type = 1) {
        const date = new Date();
        date.setHours(0, 0, 0, 0);
        const cacheKey = `getTimetableForToday/${date.getTime()}/${id}/${type}`;
        const cachedData = this.cache.get(cacheKey);
        if (cachedData) {
            return cachedData;
        }
        try {
            const data = await this.untis.getTimetableForToday(id, type);
            this.cache.set(cacheKey, data);
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getTimetableForWeek(date, id, type = 1) {
        date.setHours(0, 0, 0, 0);
        const cacheKey = `getTimetableForWeek/${date.getTime()}/${id}/${type}`;
        const cachedData = this.cache.get(cacheKey);
        if (cachedData) {
            return cachedData;
        }
        try {
            const data = await this.untis.getTimetableForWeek(date, id, type);
            this.cache.set(cacheKey, data);
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}

async function main() {
    untis = new UntisApi('Friedrich-Hecker-Schule', 'tobias.weiss', 'mixyke92', 'niobe.webuntis.com', 900);
    await untis.login();

    await untis.fetchdata();

    await untis.logout();
}

main();