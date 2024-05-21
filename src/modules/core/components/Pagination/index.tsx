import React from "react";

import ReactPaginate from "react-paginate";
import { useRouter } from "next/navigation";
import clsx from "clsx";

import { filterAsPathParams } from "@/core/utils/url";
import { PageProps } from "@/core/types/page-props.types";
import useTranslations from "@/core/hooks/useTranslations";
import { scrollToSection } from "@/core/utils/scroll";

import { IconAngleLeftArrow, IconAngleRightArrow } from "../Icons";

import { StylePagination } from "./style";

type props = {
  data: Array<number>;
  searchParams: PageProps["searchParams"];
  itemsPerPage: number;
  query: string;
  totalData: number;
  showPerPageData: number;
  paginationLimit: number;
  loader?: boolean;
  paginationName?: string;
  scrollToSectionId?: string;
};
const PaginationPage = ({
  data,
  searchParams,
  itemsPerPage,
  // query,
  totalData,
  showPerPageData,
  paginationLimit,
  scrollToSectionId = "",
  loader = false,
  paginationName = "Products",
}: props) => {
  const [currentPage, setCurrentPage] = React.useState(0);
  const [loading, setLoader] = React.useState(loader);

  const [perPage, setPerPage] = React.useState<Record<string, number>>({});

  const router = useRouter();
  const page = Number(searchParams?.page) || 1;
  const { _t } = useTranslations();

  React.useEffect(() => {
    const pageData =
      currentPage + 1 > 1
        ? showPerPageData + paginationLimit * (currentPage + 1 - 1)
        : showPerPageData;

    setPerPage((prev) => ({ ...prev, [currentPage + 1]: pageData }));
  }, [currentPage, showPerPageData, paginationLimit]);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const prevDisable = currentPage + 1 < 2;
  const nextDisable = currentPage + 1 > data.length - 1;

  const handlePageChange = ({ selected }: { selected: number }) => {
    setLoader(true);
    setCurrentPage(selected);
    const newSearchParams = {
      ...searchParams,
      page: selected + 1,
    };
    const queryParams = filterAsPathParams(newSearchParams);
    const pathname = queryParams || `/`;
    router.push(`${pathname}`, { scroll: false });
    setTimeout(() => {
      scrollToSection(scrollToSectionId, -100);
    }, 100);
  };

  React.useEffect(() => {
    setLoader(loader);
  }, [loader]);

  React.useEffect(() => {
    if (page) {
      setCurrentPage(page - 1);
    }
  }, [page]);

  return (
    <StylePagination className="pt-60">
      <div className="total-page-count">
        {`${loading || !perPage[currentPage + 1] ? "" : `${perPage[currentPage + 1]} /`} ${totalData} ${paginationName}`}
      </div>

      <ReactPaginate
        previousLabel={
          <IconAngleLeftArrow
            size={16}
            className={clsx(
              "previous",
              { disabled: prevDisable },
              "icon-left_arrow"
            )}
          />
        }
        nextLabel={
          <IconAngleRightArrow
            size={16}
            className={clsx(
              "next",
              { disabled: nextDisable },
              nextDisable && "disabled",
              "icon-right_arrow"
            )}
          />
        }
        forcePage={currentPage}
        breakLabel="..."
        breakClassName="break-me"
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageChange}
        containerClassName="pagination"
        activeClassName="active"
        className="pagination-list"
      />
    </StylePagination>
  );
};

const Pagination = ({
  length,
  searchParams,
  query,
  totalData,
  showPerPageData,
  paginationLimit,
  loader,
  scrollToSectionId,
  paginationName,
}: {
  length: number;
  searchParams: PageProps["searchParams"];
  query: string;
  totalData: number;
  showPerPageData: number;
  paginationLimit: number;
  loader?: boolean;
  paginationName?: string;
  scrollToSectionId?: string;
}) => {
  const paginationArray = Array.from({ length }, (_, index) => index + 1);

  return (
    <div>
      <PaginationPage
        data={paginationArray}
        itemsPerPage={1}
        searchParams={searchParams}
        query={query}
        totalData={totalData}
        showPerPageData={showPerPageData}
        loader={loader}
        paginationLimit={paginationLimit}
        paginationName={paginationName}
        scrollToSectionId={scrollToSectionId}
      />
    </div>
  );
};

export default Pagination;
