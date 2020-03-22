const http = require("http");
const fs = require("fs");
const path = require("path");
// 创建 http 服务，并启动该服务
http
  .createServer(function(req, res) {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Access-Control-Allow-Origin", "*");
    if (req.url === "/mall") {
      // 读取 index.html 文件
      fs.readFile(path.join(__dirname, "mall.json"), function(err, data) {
        if (err) {
          throw err;
        }
        res.end(data);
      });
    } else if (req.url.indexOf("/goods") === 0) {
      // 读取 index.html 文件
      fs.readFile(path.join(__dirname, "newGoods.json"), "utf-8", function(
        err,
        data
      ) {
        if (err) {
          throw err;
        }
        let id = req.url.split("?")[1].split("=")[1];
        let goodsDetails = JSON.parse(data);
        res.end(JSON.stringify(goodsDetails.find(ele => ele.ID === id)));
      });
    } else if (req.url.indexOf("/category") === 0) {
      if (req.url === "/category") {
        fs.readFile(path.join(__dirname, "category.json"), function(err, data) {
          if (err) {
            throw err;
          }
          res.end(data);
        });
      } else {
        if (req.url.includes("categoryId")) {
          let id = req.url.split("?")[1].split("=")[1];
          fs.readFile(
            path.join(__dirname, "category_sub.json"),
            "utf-8",
            function(err, data) {
              if (err) {
                throw err;
              }
              let subCategory = JSON.parse(data).RECORDS.reduce((pre, cur) => {
                if (cur.MALL_CATEGORY_ID === id) pre.push(cur.MALL_SUB_NAME);
                return pre;
              }, []);
              res.end(JSON.stringify(subCategory));
            }
          );
        } else if (req.url.includes("subCategoryId")) {
          let [subCategoryId, page] = req.url
            .split("?")[1]
            .split("&")
            .map(ele => ele.split("=")[1]);
          subCategoryId = Buffer.from(
            subCategoryId.replace(/%/g, ""),
            "hex"
          ).toString();
          fs.readFile(
            path.join(__dirname, "category_sub.json"),
            "utf-8",
            function(err, data) {
              if (err) {
                throw err;
              }
              let newGoods = JSON.parse(
                fs.readFileSync(path.join(__dirname, "newGoods.json"), "utf-8")
              );
              let subCategory = JSON.parse(data).RECORDS.find(
                ele => ele.MALL_SUB_NAME === subCategoryId
              );
              let goodsList = newGoods.filter(
                item => item.SUB_ID === subCategory.ID
              );
              res.end(
                JSON.stringify(goodsList.slice((page - 1) * 10, 10 * page))
              );
            }
          );
        }
      }
    } else if (req.url === "/register") {
      res.end("ok");
    } else if (req.url === "/login") {
      res.end("token");
    }
  })
  .listen(3000, function() {
    console.log("http://localhost:3000");
  });
