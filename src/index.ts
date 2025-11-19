import Fastify from "fastify";
import createLinkRoute from "./routes/createLink";
import redirectRoute from "./routes/redirect";

const app = Fastify({
  trustProxy: true
});

app.register(createLinkRoute);
app.register(redirectRoute);


app.listen({ port: 3000 }).then(() => {
  console.log("🚀 Server rodando em http://localhost:3000");
});
