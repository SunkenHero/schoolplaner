import { JsonDB, Config } from 'node-json-db';

var db = new JsonDB(new Config("./db/HomerworkDb", true, false, '/'));
var Userdb = new JsonDB(new Config("./db/UserDb", true, false, '/'));

db.push("/id","super test");
Userdb.push("/id","super test");