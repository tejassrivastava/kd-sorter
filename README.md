# KD Express Rest API Search | Sorting | Pagination

We have developed a simple express based Rest API which has the following features:

### Features
- Exact Search (Pass search term inside double quotes i.e. "search me")
- Simple Search
- Sorting based on field & type i.e  field = "name" , type="asc|desc"
- Hybrid Pagination i.e maintained from both backend & frontend.

------------


### Install
To install the dependecies simply run

`npm install `

------------


### Usage
To Use the API do the following:

Start the node server

`npm run dev`

Make an API request on 

`http://127.0.0.1:8080/api/posts/all`

Request Body

```json
{
    "search":"the king",
    "sort":{
        "key":"dateLastEdited",
        "type":"desc"
    },
    "page":"1",
    "limit":"10"
}
```

------------



### Tests

We have created test cases using the follwing:

- Jest
- Supertest

To run tests

`npm run test`


**Current Test Case Result:**


[![](https://github.com/tejassrivastava/kd-sorter/blob/main/TestResult.png)](https://github.com/tejassrivastava/kd-sorter/blob/main/TestResult.png)

**Current Test Coverage Result:**

[![](https://github.com/tejassrivastava/kd-sorter/blob/main/TestCoverage.png)](https://github.com/tejassrivastava/kd-sorter/blob/main/TestCoverage.png)


------------


### Author
**Tejas Srivastava**

### End
