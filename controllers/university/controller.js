import university from "../../models/university";
import stream from "../../models/stream";
import subject from "../../models/subjects";
/**
 * Create a new University
 * @param  {Object} University
 * @return {Promise}
 */

export const createUniversity = objUniversity => {
  return new Promise((resolve, reject) => {
    const newUniversity = new university({
      name: objUniversity.name,
      imageUrl: objUniversity.imageUrl,
      shortName: objUniversity.shortName,
      state: objUniversity.state,
      city: objUniversity.city,
      isIIT: objUniversity.isIIT,
      affiliatedby: objUniversity.affiliatedby
    });
    newUniversity.save(error => {
      if (error) {
        console.log(error);
        reject(error);
      }
      resolve(newUniversity);
    });
  });
};

/**
 * Create a new Stream
 * @param  {Object} Stream
 * @return {Promise}
 */

export const createStream = objstream => {
  return new Promise((resolve, reject) => {
    const newStream = new stream({
      name: objstream.name,
      imageUrl: objstream.imageUrl,
      shortName: objstream.shortName
    });
    newStream.save(error => {
      if (error) {
        console.log(error);
        reject(error);
      }
      resolve(newStream);
    });
  });
};

/**
 * Create a new Subject
 * @param  {Object} Subject
 * @return {Promise}
 */

export const createSubject = objSubject => {
  return new Promise((resolve, reject) => {
    const newSubject = new subject({
      name: objSubject.name,
      imageUrl: objSubject.imageUrl,
      shortName: objSubject.shortName
    });
    newSubject.save(error => {
      if (error) {
        console.log(error);
        reject(error);
      }
      resolve(newSubject);
    });
  });
};

/**
 * Get all DiscussiondrpdownValues
 * @return {Promise}
 */
export const getalldrpdownValues = () => {
  return Promise.all([
    new Promise((resolve, reject) => {
      university.find({}).exec((error, results) => {
        if (error) {
          console.log(error);
          reject(error);
        } else if (!results) reject(null);
        else resolve(results);
      });
    }),
    new Promise((resolve, reject) => {
      stream.find({}).exec((error, results) => {
        if (error) {
          console.log(error);
          reject(error);
        } else if (!results) reject(null);
        else resolve(results);
      });
    }),
    new Promise((resolve, reject) => {
      subject.find({}).exec((error, results) => {
        if (error) {
          console.log(error);
          reject(error);
        } else if (!results) reject(null);
        else resolve(results);
      });
    })
  ]).then(values => {
    return values;
  });
};
