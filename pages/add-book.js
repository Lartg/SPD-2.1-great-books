import { useEffect, useState } from "react";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import Head from "next/head";
import BookList from "../components/BookList";
import classNames from "classnames";
import SearchIcon from "../components/icons/SearchIcon";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";


export default withPageAuthRequired(AddBook);

function AddBook() {
  const { user } = useUser();
  const router = useRouter();
  const queryBookTitle = router.query.title;

  // Search for a book if a parameter is supplied
  useEffect(() => {
    if (!router.isReady) return;

    if (queryBookTitle) fetchBook(queryBookTitle);
  }, [router.isReady]);

  const [searchResults, setSearchResults] = useState([]);
  const [userShelves, setUserShelves] = useState([]);

  // Get the user's shelves
  async function getShelves() {
    const shelves = await fetch(`/api/users/${user.sub}/booklists`).then((res) => res.json());
    setUserShelves(shelves);
  }

  // Get shelves on load
  useEffect(() => {
    getShelves();
  }, []);

  // Search for the book
  function fetchBook(bookTitle) {
    fetch(`/api/search?q=${bookTitle}`)
      .then((res) => res.json())
      .then((res) => {
        setSearchResults(res.docs);
      });
  }

  // Search on submit
  function handleSubmit(e) {
    e.preventDefault();
    const bookTitle = e.target.elements.bookName?.value;

    if (!bookTitle) return;
    fetchBook(bookTitle);
  }

  // Add to shelf
  function addToShelf(e) {
    const olID = e.target.dataset.olid;
    const shelfID = e.target.value;
    e.target.selectedIndex = 0;

    fetch(`/api/books`, {
      method: "POST",
      body: JSON.stringify({
        olID: olID,
        shelfID: parseInt(shelfID),
      }),
    }).then((res) => {
      // TODO: Replace the lines below
      if (!res.ok) return alert("Error while adding book!");

      if (res.status === 200) {
        alert("Book already in shelf!");
      } else {
        alert("Book added!");
      }
    });
  }

  //Generating current page as well as all page options
  const [page, setPage] = useState(1);
  const [pageResults, setPageResults] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  //Results page page
  const resultsPerPage = 9;
  useEffect(() => {
    setPageCount(Math.ceil(searchResults.length / resultsPerPage));
    setPage(1);
  }, [searchResults]);

  //Set page results
  useEffect(() => {
    if (searchResults.length > 0) {
      const subset = searchResults.slice(
        page * resultsPerPage - resultsPerPage,
        page * resultsPerPage
      );
      setPageResults(subset);
    }
  }, [page, searchResults]);

  return (
    <div className="">
      <Head>
        <title>Book Search</title>
      </Head>

      <main className={classNames("items-center")}>
        {/* if we could make the search bar` into its own component that would be great */}
        {/* then we can reuse the code and have a search bar in the header */}

        <h1 className={classNames("text-2xl w-full text-center mb-5")}>Search the library!</h1>

        {/* search bar */}
        <form
          onSubmit={handleSubmit}
          className={classNames(
            "border rounded shadow-sm bg-white text-black flex w-full flex-row justify-between",
            "md:mb-6 md:w-[300px]"
          )}>
          <input
            className="w-full px-2 py-1"
            name="bookName"
            type="text"
            placeholder="Book Title"
            defaultValue={queryBookTitle}
            required
          />
          <button className={classNames("mx-1")} type="submit">
            <SearchIcon />
          </button>
          {/* <input className="px-2 w-fit" type="submit" /> */}
        </form>

        {/* search results */}
        <div
          className={classNames(
            "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3"
          )}>
          <BookList books={pageResults} shelves={userShelves} addToShelf={addToShelf} />
        </div>
        {/* pagination */}
        {/* <p>Results</p> */}
        <div className="flex flex-row space-x-3 mb-5 mt-7">
          {[...Array(pageCount)].map((option, index) => (
            <p
              className={page === index + 1 ? "underline" : null}
              key={index}
              onClick={() => setPage(index + 1)}>
              {index + 1}
            </p>
          ))}
        </div>
      </main>
    </div>
  );
}
