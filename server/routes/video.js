const express = require("express");
const multer = require("multer");
const router = express.Router();
const { Video } = require("../models/Video");
const { Subscriber } = require("../models/Subscriber");
var ffmpeg = require("fluent-ffmpeg");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".mp4") {
      return cb(res.status(400).end("only .mp4 is allowed"), false);
    }
    cb(null, true);
  },
});

const upload = multer({ storage: storage }).single("file");

router.post("/uploadfile", (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

router.post("/thumbnail", (req, res) => {
  let url = "";
  let fileDuration = "";

  ffmpeg.ffprobe(req.body.filePath, function (err, metadata) {
    console.dir(metadata);
    fileDuration = metadata.format.duration;
  });

  ffmpeg(req.body.filePath)
    .on("filenames", function (filenames) {
      console.log("Will generate " + filenames.join(", "));

      url = "upload/thumbnail/" + filenames[0];
    })
    .on("end", function () {
      console.log("Screenshots taken");
      return res.json({
        success: true,
        url: url,
        fileDuration: fileDuration,
      });
    })
    .on("error", function (err) {
      console.log(err);
      return res.json({ success: false, err });
    })
    .screenshots({
      count: 3,
      folder: "upload/thumbnail",
      size: "320x240",
      filename: "thumbnail-%b.png",
    });
});

router.post("/uploadvideo", (req, res) => {
  const video = new Video(req.body);

  video.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({ success: true, doc });
  });
});

router.get("/getvideo", (req, res) => {
  Video.find()
    .populate("writer")
    .exec((err, video) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, video });
    });
});

router.post("/getvideodetail", (req, res) => {
  Video.findOne({ _id: req.body.videoId })
    .populate("writer")
    .exec((err, videoDetail) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({ success: true, videoDetail });
    });
});

router.post("/getSubscriptionVideo", (req, res) => {
  Subscriber.find({ userFrom: req.body.userFrom }).exec((err, info) => {
    if (err) return res.status(400).send(err);

    let subscribedUser = [];

    info.map((subscriber, index) => {
      subscribedUser.push(subscriber.userTo);
    });

    Video.find({ writer: { $in: subscribedUser } })
      .populate("writer")
      .exec((err, video) => {
        if (err) return res.status(400).send(err);
        return res.status(200).json({ success: true, video });
      });
  });
});
module.exports = router;
