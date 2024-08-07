import authRouter from "./auth";
import insertRouter from "./insert";
import categoryRouter from "./category";
import postRouter from "./post";
import filterRouter from "./filter";
import provinceRouter from "./province";
const initRouter = (app) => {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/insert", insertRouter);
  app.use("/api/v1/category", categoryRouter);
  app.use("/api/v1/post", postRouter);
  app.use("/api/v1/filter", filterRouter);
  app.use("/api/v1/province", provinceRouter);

  return app.get("/", (req, res) => {
    res.send("ok");
  });
};

export default initRouter;
