import { Request, Response, Router } from "express";
import logger from "../../logger/logger";

const posts = require("../../files/mock_data.json");

const checkExactMatch = (searchTerm: string, data: any) => {
  console.log("In checkExactMatch", searchTerm);
  const matchedData: any[] = [];
  data.forEach((post: any) => {
    if (
      post.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      matchedData.push(post);
    }
  });
  console.log("matchedData", matchedData);
  return matchedData;
};

const normalMatch = (searchTerm: string, data: any) => {
  console.log("In normalMatch", searchTerm);
  const matchedData: any[] = [];
  const searchTermArray = searchTerm.split(" ");
  console.log("searchTermArray", searchTermArray);

  data.forEach((post: any) => {
    let flag = false;
    searchTermArray.forEach((sword: string) => {
      if (
        post.name.toLowerCase().includes(sword.toLowerCase()) ||
        post.description.toLowerCase().includes(sword.toLowerCase())
      ) {
        flag = true;
      }
    });

    if (flag) {
      matchedData.push(post);
    }
  });
  console.log("matchedData", matchedData);
  return matchedData;
};

const searchResults = (posts: string | any[]) => {
  console.log("In searchResults");
  return (req: any, res: any, next: any) => {
    let searchedResult: any = [];
    if (req.body.search && req.body.search !== "") {
      console.log(req.body.search);
      let searchTerm = req.body.search;

      if (searchTerm.indexOf('"') >= 0) {
        searchedResult = [
          ...checkExactMatch(searchTerm.replace(/^"(.*)"$/, "$1"), posts),
        ];
      } else {
        searchedResult = [...normalMatch(searchTerm, posts)];
      }
    } else {
      searchedResult = posts;
    }

    req.searchResult = searchedResult;
    next();
  };
};

const sortedResults = () => {
  console.log("In sortedResults");

  return (req: any, res: any, next: any) => {
    if(!req.body.sort.key || !req.body.sort.key){
      res.send({"error":"Send Proper Request Body With Sort Objects"});
    }
    const data = req.searchResult;
    const sortKey = req.body.sort.key;
    const sortBy = req.body.sort.type;
    console.log(sortKey, sortBy);
    let sortedResult: any[] = [];

    sortedResult = data.sort((a: any, b: any) => {
      let x = a[sortKey];
      let y = b[sortKey];
      if (sortBy === "asc") {
        return x < y ? -1 : x > y ? 1 : 0;
      } else {
        return x > y ? -1 : x < y ? 1 : 0;
      }
    });

    // console.log("sortedResult", sortedResult);

    req.sortedResult = sortedResult;

    next();
  };
};

const paginatedResults = () => {
  console.log("In paginatedResults");

  return (req: any, res: any, next: any) => {
    const data = req.sortedResult;

    if(!req.body.page || !req.body.limit){
      res.send({"error":"Send Proper Request Body with page & limit"});
    }

    const page = parseInt(req.body.page);
    const limit = parseInt(req.body.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const postsResult: any = {};

    if (startIndex > 0) {
      postsResult.prev = {
        page: page - 1,
        limit: limit,
      };
    }

    if (endIndex < data.length) {
      postsResult.next = {
        page: page + 1,
        limit: limit,
      };
    }

    let finalPosts = data.slice(startIndex, endIndex);
    const resultPosts = {
      ...postsResult,
      posts: finalPosts,
      totalCount: finalPosts.length,
    };

    res.send(resultPosts);
    next();
  };
};

const postsRouter = Router();

postsRouter.post(
  "/all",
  searchResults(posts),
  sortedResults(),
  paginatedResults(),
  (req: Request, res: Response) => {
    logger.info("In posts.route.ts");

    res.status(200).send(res);
  }
);

export default postsRouter;
