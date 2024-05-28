import React, { Component } from "react";
import BookListItem from "../book-list-item";

import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";

import { withBookstoreService } from "../hoc";
import { fetchBooks, bookAddedToCart } from "../../actions";
import { compose } from "../../utils";

import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";

import "./book-list.css";
import { AppState } from "../../types";

import { Books, typeBookstoreService, BooksList } from "../../types";

interface BookListProps {
  books: Books;
  onAddedToCart: (id: number) => void;
}

const BookList = ({ books, onAddedToCart }: BookListProps) => {
  return (
    <ul className="book-list">
      {books.map((book) => {
        return (
          <li key={book.id}>
            {/* @ts-expect-error */}
            <BookListItem
              book={book}
              onAddedToCart={() => onAddedToCart(book.id)}
            />
          </li>
        );
      })}
    </ul>
  );
};

interface BookListContainerProps extends BooksList {
  fetchBooks: () => (dispatch: Dispatch) => void;
  onAddedToCart: (id: number) => void;
}

class BookListContainer extends Component<BookListContainerProps> {
  componentDidMount() {
    this.props.fetchBooks();
  }

  render() {
    const { books, loading, error, onAddedToCart } = this.props;

    if (loading) {
      return <Spinner />;
    }

    if (error) {
      return <ErrorIndicator />;
    }

    return <BookList books={books} onAddedToCart={onAddedToCart} />;
  }
}

const mapStateToProps = ({ bookList: { books, loading, error } }: AppState) => {
  return { books, loading, error };
};

interface MapDispatchToProps {
  bookstoreService: typeBookstoreService;
}

const mapDispatchToProps = (
  dispatch: any,
  { bookstoreService }: MapDispatchToProps
) => {
  return bindActionCreators(
    {
      fetchBooks: fetchBooks(bookstoreService),
      onAddedToCart: bookAddedToCart,
    },
    dispatch
  );
};

export default compose(
  withBookstoreService(),
  connect(mapStateToProps, mapDispatchToProps)
)(BookListContainer);
