import fs from 'fs';

const getActualRequestDurationInMilliseconds = (start:[number,number] ):number => {
    const NS_PER_SEC = 1e9; // convert to nanoseconds
    const NS_TO_MS = 1e6; // convert to milliseconds
    const diff = process.hrtime(start);
    return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
  };

const spectatorLogger = (req:Request, res:any, next:any): void => {

    res.on('finish',  function() {
        let current_datetime = new Date();
        let formatted_date =
          current_datetime.getFullYear() +
          "-" +
          (current_datetime.getMonth() + 1 <= 9 ?  '0' + (current_datetime.getMonth() + 1) : current_datetime.getMonth()) +
          "-" +
          current_datetime.getDate() +
          " " +
          current_datetime.getHours() +
          ":" +
          current_datetime.getMinutes() +
          ":" +
          current_datetime.getSeconds();
        let method:string = req.method;
        let url:string = req.url;
        let status:string = this.statusCode;
        const start  = process.hrtime();
        const durationInMilliseconds = getActualRequestDurationInMilliseconds(start);
        let log = `{ Time: "${formatted_date}" Method: "${method}" Endpoint: "${url}" Code: "${status}" Duration: "${durationInMilliseconds.toLocaleString()}" ms }`;
        fs.appendFile("logs.log", log + "\n", (err:any) => {
            if (err) {
              console.log(err);
            }
          });
      })
      next();
}
export default spectatorLogger;