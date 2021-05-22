import express from 'express';
import fs from 'fs'


const app = express()

app.get("/", (req, res)=>{
    res.sendFile(__dirname + '/index.html')
});

app.get("/video", (req, res)=>{
    const range = req.headers.range
    if(!range){
        res.status(400).send('requires range header')
    }
    const videoPath = "Godzilla.King.Of.The.Monsters.2019.1080p.BluRay.x264-[YTS.LT].mp4"
    const videoSize = fs.statSync("Godzilla.King.Of.The.Monsters.2019.1080p.BluRay.x264-[YTS.LT].mp4").size // to know the size of the file

     // Parse Range
  // Example: "bytes=32324-"
  const CHUNK_SIZE = 10 ** 6; // 1MB
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

    const contentLength = end - start + 1
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    }

    res.writeHead(206, headers);
    // create video read stream for this particular chunk
    const videoStream = fs.createReadStream(videoPath, { start, end });

    // Stream the video chunk to the client
    videoStream.pipe(res);
});

app.listen(8000, ()=>{
    console.log("listening to port 8000");
})