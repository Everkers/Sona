const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString,
});
module.exports = class duoqDbHanlder {
  constructor(msgObject, name, ign, elo, id) {
    this.name = name;
    this.ign = ign;
    this.elo = elo;
    this.id = id;
    this.msgObject = msgObject;
  }

  async isUserExist() {
    const userExist = await new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM duo_q WHERE id='${this.id}'`,
        (err, res) => {
          resolve(res.rows);
        },
      );
    });
    return userExist;
  }

  // eslint-disable-next-line consistent-return
  async addUser() {
    // check if user exist
    const userExist = await this.isUserExist();
    // if user dosn't exist
    if (!userExist[0]) {
      pool.query(
        `INSERT INTO duo_q (name,ign,elo,id) VALUES ('${this.name}', '${this.ign}' , '${this.elo}' , '${this.id}');`,
      );
      this.msgObject.channel.send('You have successfully registered');
    } else this.msgObject.channel.send('You are already registered');
  }

  async updateData(options = 'ign+elo', data) {
    const userExist = await this.isUserExist();
    const opt = options.split('+');
    let query;
    if (opt.length === 1) query = `${opt[0]}='${data}'`;
    else query = `${opt[0]}='${this[opt[0]]}',${opt[1]}='${this[opt[1]]}'`;
    if (!userExist[0]) {
      this.msgObject.channel.send('Please make sure to register with `$sona duoq add ign elo`');
    } else {
      await new Promise((resolve, reject) => {
        pool.query(
          `UPDATE duo_q SET ${query} WHERE id='${this.id}'`,
          (err, res) => {
            resolve(res.rows);
          },
        );
      });
      this.msgObject.channel.send(`Your ${opt.length === 1 ? opt[0] : 'Data'} has been updated`);
    }
  }

  async changeStatus(looking) {
    const userExist = await this.isUserExist();
    if (!userExist[0]) {
      this.msgObject.channel.send('Please make sure to register with `$sona duoq add ign elo`');
    } else {
      await new Promise((resolve, reject) => {
        pool.query(
          `UPDATE duo_q SET looking=${looking} WHERE id='${this.id}'`,
          (err, res) => {
            resolve(res.rows);
          },
        );
        if (looking) this.msgObject.channel.send('You status has been set to `LOOKING` :eyes: ');
        else this.msgObject.channel.send('Looking mode is off :arrow_down_small:');
      });
    }
    // if (!userExist[0]) {
    //   // if user doesn't exist
    //   await this.addUser(true);
    //   // set looking to true
    //   await new Promise((resolve, reject) => {
    //     pool.query(
    //       `UPDATE duo_q SET looking=true WHERE id='${this.id}'`,
    //       (err, res) => {
    //         resolve(res.rows);
    //       },
    //     );
    // //   });
    // } else {
    //   // if user already exist
    //   await new Promise((resolve, reject) => {
    //     pool.query(
    //       `UPDATE duo_q SET looking=true WHERE id='${this.id}'`,
    //       (err, res) => {
    //         resolve(res.rows);
    //       },
    //     );
    //   });
    // }
  }
};
