import {
  createUniversity,
  createStream,
  createSubject,
  getalldrpdownValues
} from "./controller";

export const university_stream_subject_API = app => {
  // create a new University
  app.post("/api/addUniversity", (req, res) => {
    if (req.body) {
      createUniversity(req.body).then(
        result => {
          res.send(Object.assign({}, result._doc, { postCreated: true }));
        },
        error => {
          console.log(error);
          res.send({ postCreated: false });
        }
      );
    } else {
      res.send({ postCreated: false });
    }
  });

  // create a new Stream
  app.post("/api/addStream", (req, res) => {
    if (req.body) {
      createStream(req.body).then(
        result => {
          res.send(Object.assign({}, result._doc, { postCreated: true }));
        },
        error => {
          console.log(error);
          res.send({ postCreated: false });
        }
      );
    } else {
      res.send({ postCreated: false });
    }
  });

  // create a new Subject
  app.post("/api/addSubject", (req, res) => {
    if (req.body) {
      createSubject(req.body).then(
        result => {
          res.send(Object.assign({}, result._doc, { postCreated: true }));
        },
        error => {
          console.log(error);
          res.send({ postCreated: false });
        }
      );
    } else {
      res.send({ postCreated: false });
    }
  });

  // get all Drop Down Values
  app.get("/api/getAlldrpDownValues", (req, res) => {
    getalldrpdownValues().then(
      result => {
        res.send(result);
      },
      error => {
        res.send(error);
      }
    );
  });
};
