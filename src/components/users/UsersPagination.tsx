import { Button, Flex, HStack } from "@chakra-ui/react";
import Router from "next/router";
import React from "react";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

type Props = {
  maxPages: number;
  page: number;
  limit: number;
};

const UsersPagination = ({ maxPages, page }: Props) => {
  const handlePageChange = (nextPage: number) => {
    Router.push(`/admin/users?page=${nextPage}`);
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const innerLimit = 2;
    const outerLimit = 2;

    // Always show first page
    pages.push(1);

    // Calculate range around current page
    const startPage = Math.max(2, page - innerLimit);
    const endPage = Math.min(maxPages - 1, page + innerLimit);

    // Add ellipsis after first page if needed
    if (startPage > 2) {
      pages.push("...");
    }

    // Add pages around current page
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Add ellipsis before last page if needed
    if (endPage < maxPages - 1) {
      pages.push("...");
    }

    // Always show last page if there's more than one page
    if (maxPages > 1) {
      pages.push(maxPages);
    }

    return pages;
  };

  return (
    <Flex align="center" justify="space-between" w="full" p={4}>
      <Button
        size="sm"
        disabled={page <= 1}
        onClick={() => handlePageChange(page - 1)}
      >
        <MdArrowBack style={{ marginRight: '0.5rem' }} />
        Previous
      </Button>
      
      <HStack spacing={2}>
        {getPageNumbers().map((pageNum, idx) => {
          if (pageNum === "...") {
            return (
              <Button key={`ellipsis-${idx}`} size="sm" variant="ghost" disabled>
                ...
              </Button>
            );
          }
          
          const isActive = pageNum === page;
          return (
            <Button
              key={pageNum}
              size="sm"
              onClick={() => handlePageChange(pageNum as number)}
              colorScheme={isActive ? "primary" : "gray"}
              variant={isActive ? "solid" : "outline"}
              fontSize="sm"
              w={7}
            >
              {pageNum}
            </Button>
          );
        })}
      </HStack>

      <Button
        size="sm"
        disabled={page === maxPages}
        onClick={() => handlePageChange(page + 1)}
      >
        Next
        <MdArrowForward style={{ marginLeft: '0.5rem' }} />
      </Button>
    </Flex>
  );
};

export default UsersPagination;
