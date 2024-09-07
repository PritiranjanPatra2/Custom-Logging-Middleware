import fs from 'fs';
export function logging(req, res, next) {
  const startTime = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - startTime;
    
     let logfile= `[${new Date().toISOString()}] ${req.method} ${req.url} ${
        req.ip
      } - Status: ${res.statusCode}, Response Time: ${duration}ms}`;

    fs.appendFileSync('app.log', logfile + '\n');

  });


  next();
}
