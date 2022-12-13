
import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { BookResolver } from "./resolvers/BookResolver";
import { Book } from "./models/Book";

async function main() {
  const connection = await createConnection({
    type : "mysql",
    host: "localhost",
    port :3306,
    username:'root',
    password:'',
    database:'practice',
    synchronize:true,
    entities:['src/models/*{.ts,.js}'],
    // entities:[Book],
    logging:true,
})
  const schema = await buildSchema({resolvers: [BookResolver]})
  const server = new ApolloServer({ schema })
  await server.listen(4000)
  console.log("Server has started!")
}
main()