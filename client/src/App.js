import BookList from "./components/BookList";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import AddBooks from "./components/AddBook";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="Main">
        <BookList></BookList>
        <AddBooks></AddBooks>
      </div>
    </ApolloProvider>
  );
}

export default App;
