import { generateDiscussionSlug } from "../../utilities/tools";
const getAllOpinions = require("../opinion/controller").getAllOpinions;

const Discussion = require("../../models/discussion");
const Opinion = require("../../models/opinion");

/**
 * get a single discussion
 * @param  {String} discussion_slug
 * @param  {String} discussion_id
 * @return {Promise}
 */
export const getDiscussions = () => {
  return new Promise((resolve, reject) => {
    Discussion.find({}, (error, result) => {
      if (error) {
        console.log(error);
        reject(error);
      } else if (!result) reject(null);
      else {
        resolve(result);
      }
    });
  });
};

/**
 * Create a new discussion
 * @param  {Object} discussion
 * @return {Promise}
 */
export const createDiscussion = discussion => {
  return new Promise((resolve, reject) => {
    const newDiscussion = new Discussion({
      forum_id: discussion.forum_id,
      user_id: discussion.user_id,
      discussion_slug: generateDiscussionSlug(discussion.title),
      date: new Date(),
      snippet: discussion.snippet,
      subject: discussion.subject,
      title: discussion.title,
      content: discussion.content,
      stream: discussion.stream,
      college: discussion.college,
      favorites: [discussion.userId],
      tags: discussion.tags,
      pinned: discussion.pinned
    });

    newDiscussion.save(error => {
      if (error) {
        console.log(error);
        reject(error);
      }

      resolve(newDiscussion);
    });
  });
};

/**
 * toggle favorite status of discussion
 * @param  {ObjectId} discussion_id
 * @param  {ObjectId} user_id
 * @return {Promise}
 */
export const toggleFavorite = (discussion_id, user_id) => {
  return new Promise((resolve, reject) => {
    Discussion.findById(discussion_id, (error, discussion) => {
      if (error) {
        console.log(error);
        reject(error);
      } else if (!discussion) reject(null);
      else {
        // add or remove favorite
        let matched = null;
        for (let i = 0; i < discussion.favorites.length; i++) {
          if (String(discussion.favorites[i]) === String(user_id)) {
            matched = i;
          }
        }

        if (matched === null) {
          discussion.favorites.push(user_id);
        } else {
          discussion.favorites = [
            ...discussion.favorites.slice(0, matched),
            ...discussion.favorites.slice(
              matched + 1,
              discussion.favorites.length
            )
          ];
        }

        discussion.save((error, updatedDiscussion) => {
          if (error) {
            console.log(error);
            reject(error);
          }
          resolve(updatedDiscussion);
        });
      }
    });
  });
};

export const updateDiscussion = (forum_id, discussion_slug) => {
  // TODO: implement update feature
};

export const deleteDiscussion = discussion_slug => {
  return new Promise((resolve, reject) => {
    // find the discussion id first
    Discussion.findOne({ discussion_slug }).exec((error, discussion) => {
      if (error) {
        console.log(error);
        reject(error);
      }

      // get the discussion id
      const discussion_id = discussion._id;

      // remove any opinion regarding the discussion
      Opinion.remove({ discussion_id }).exec(error => {
        if (error) {
          console.log(error);
          reject(error);
        }

        // finally remove the discussion
        else {
          Discussion.remove({ discussion_slug }).exec(error => {
            if (error) {
              console.log(error);
              reject(error);
            } else {
              resolve({ deleted: true });
            }
          });
        }
      });
    });
  });
};
