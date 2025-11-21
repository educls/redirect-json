import Fastify from "fastify";
import createLinkRoute from "./routes/createLink";
import redirectRoute from "./routes/redirect";
import GetRoute from "./routes/getLink";

const app = Fastify({
  trustProxy: true
});

app.register(createLinkRoute);
app.register(redirectRoute);
app.register(GetRoute)


app.listen({ port: 3000 }).then(() => {
  console.log("🚀 Server rodando em http://localhost:3000");
});
