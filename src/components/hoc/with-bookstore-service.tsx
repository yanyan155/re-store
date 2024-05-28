import React from "react";
import { BookstoreServiceConsumer } from "../bookstore-service-context";
import BookstoreService from "../../services/bookstore-service";

type Props = {
  [key: string]: any;
};

// https://stackoverflow.com/questions/61853338/property-does-not-exist-on-type-intrinsicattributes-children-reactnode
const withBookstoreService = () => (
  Wrapped: React.FC<Props>
): React.FC<Props> => {
  return (props: Props) => {
    return (
      <BookstoreServiceConsumer>
        {(bookstoreService: BookstoreService) => {
          return (
            <Wrapped
              {...(props as object)}
              bookstoreService={bookstoreService}
            />
          );
        }}
      </BookstoreServiceConsumer>
    );
  };
};

export default withBookstoreService;
