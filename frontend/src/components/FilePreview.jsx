import { Container, Flex, Grid, IconButton, Text } from "@chakra-ui/react";
import { Document, Page } from "react-pdf";
import { useEffect, useState, useRef } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { render } from "@testing-library/react";
import styles from "./FilePreview.module.css";

const FilePreview = ({ file }) => {
  const [page, setPage] = useState(1);
  const [renderedPage, setRenderedPage] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [pdfContainerWidth, setPdfContainerWidth] = useState(450);
  const pdfContainerRef = useRef(null);
  const onDocumentLoadSuccess = (pdf) => {
    setPage(1);
    setNumPages(pdf.numPages);
  }
  useEffect(() => {
    const handleResize = () => {
      console.log("hello")
      const newWidth = 
        pdfContainerRef.current.getBoundingClientRect().width;
      if (pdfContainerWidth !== newWidth) {
        setPdfContainerWidth(newWidth);
      }
    }
    window.addEventListener("resize", handleResize);
    return window.removeEventListener("resize", handleResize);
  }, [file, pdfContainerWidth])

  const isLoading = renderedPage !== page;
  return (
    <Grid placeItems="center" ref={pdfContainerRef}>
      <Flex placeItems="center">
        <IconButton
          onClick={() => setPage((current) => (current - 1))}
          isDisabled={page === 1}
          icon={<ArrowLeftIcon />} 
          />
        <Document file={file}
          onLoadSuccess={onDocumentLoadSuccess}
        >
        {
          isLoading && 
          <Page
            key={renderedPage}
            pageNumber={renderedPage}
            width={pdfContainerWidth}
            className={styles.prevPage}
            >
          </Page>
        }
          <Page
            key={page}
            pageNumber={page} width={pdfContainerWidth}
            loading={"please wait"}
            onRenderSuccess={() => setRenderedPage(page)}
          />
        </Document>
        <IconButton 
          onClick={() => {setPage((current) => current + 1)}}
          isDisabled={page === numPages - 1}
          icon={<ArrowRightIcon />}
        />
      </Flex>
      <Flex alignItems="center">
        <Text fontSize="large" m="1rem">
          {`${page}/${numPages - 1}`}
        </Text>
      </Flex>
    </Grid>
  );
};

export default FilePreview;
