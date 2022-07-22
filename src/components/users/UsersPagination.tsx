import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { ButtonProps } from "@chakra-ui/react";
import {
  Container,
  Next,
  PageGroup,
  Paginator,
  Previous,
  usePaginator,
} from "chakra-paginator";
import Router from "next/router";
import React from "react";

// styles
const baseStyles: ButtonProps = {
  w: 7,
  fontSize: "sm",
};

type Props = {
  maxPages: number;
  page: number;
  limit: number;
};

const UsersPagination = ({ maxPages, page, limit }: Props) => {
  const { pagesQuantity } = usePaginator({
    total: maxPages * limit,
    initialState: {
      pageSize: limit,
      currentPage: 1,
      isDisabled: false,
    },
  });

  const handlePageChange = (nextPage: number) => {
    Router.push(`/admin/users?page=${nextPage}`);
  };

  return (
    <Paginator
      activeStyles={baseStyles}
      innerLimit={2}
      currentPage={page}
      outerLimit={2}
      normalStyles={baseStyles}
      pagesQuantity={pagesQuantity}
      onPageChange={handlePageChange}
    >
      <Container align="center" justify="space-between" w="full" p={4}>
        <Previous
          isDisabled={page <= 1}
          onClick={() => handlePageChange(page - 1)}
        >
          <ArrowBackIcon />
        </Previous>
        <PageGroup isInline align="center" />
        <Next
          isDisabled={page === maxPages}
          onClick={() => handlePageChange(page + 1)}
        >
          <ArrowForwardIcon />
        </Next>
      </Container>
    </Paginator>
  );
};

export default UsersPagination;
