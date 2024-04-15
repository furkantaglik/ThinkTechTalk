import express from "express";
import {
  followUser,
  getUserFollowers,
  getUserFollowing,
  unFollowUser,
} from "../controllers/followController";
const followRouters = express.Router();

followRouters.get("/getuserfollowers/:id", getUserFollowers);
followRouters.get("/getuserfollowing/:id", getUserFollowing);
followRouters.get("/followuser/:id", followUser);
followRouters.get("/unfollowuser/:id", unFollowUser);

export default followRouters;
