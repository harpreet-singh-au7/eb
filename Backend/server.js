import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import Pusher from "pusher";
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import InitiateMongoServer from "./config/db.js"
import user from "./Routes/user.js"
import cards from "./Routes/cards.js"
dotenv.config()

const app = express()
const port = process.env.PORT || 8000;

const beamsClient = new PusherPushNotifications.Client({
  instanceId: '2f829ed8-151b-45d0-a506-f73f8a91e66a',
});


// middlewarse
app.use(express.json());
app.use(cors());

app.options('*', cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

const pusher = new Pusher({
  appId: '1096428',
  key: 'f6310649694c574617d6',
  secret: 'cfdec74581433a2ece26',
  cluster: 'ap2',
  encrypted: true
});


// DB

InitiateMongoServer("open", () =>{

  const itemCollection = InitiateMongoServer.collection("items");
  const changeStream = itemCollection.watch();

  changeStream.on("change", (change) => {
    console.log(change);

    if (change.operationType === "insert") {
      const itemDetails = change.fullDocument;
      pusher.trigger("items", "inserted", {
        title: itemDetails.title,
        id:itemDetails.id
      });
    }
  });
});


app.get("/", (req, res) => {
    res.json({ message: "API Working" });
  });
  app.use("/user", user);
  app.use("/cards",cards)

//Listener
app.listen(port, (req, res) => console.log(`Running on >>>>>>> ${port}`));

export default app;

