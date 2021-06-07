import { useState } from "react";
import Head from "next/head";

export default function SingleCourse({ course }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentPageBlock, setCurrentPageBlock] = useState(course.blocks[0]);
  const [progress, setProgress] = useState(0);

  const navigateToNextPage = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    setCurrentPageBlock(course.blocks[nextPage]);
    const percentage = Math.min(
      Math.max(Math.floor((nextPage / (course.blocks.length - 1)) * 100), 0),
      100
    );
    setProgress(percentage);
  };

  const navigateToPreviousPage = () => {
    const previousPage = currentPage - 1;
    setCurrentPage(previousPage);
    setCurrentPageBlock(course.blocks[previousPage]);
    const percentage = Math.min(
      Math.max(
        Math.floor((previousPage / (course.blocks.length - 1)) * 100),
        0
      ),
      100
    );
    setProgress(percentage);
  };

  return (
    <>
      <Head>
        <title>{course.title} | Learn</title>
      </Head>
      <main>
        <div className="container mt-3">
          <div
            style={{
              width: "80%",
              margin: "0 auto",
            }}
            className="progress"
          >
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${progress}%` }}
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          <div
            className="course-body"
            style={{
              backgroundColor: "#f4f3f2",
              padding: "20px 40px",
              width: "80%",
              margin: "0 auto",
            }}
          >
            <div
              className="mb-2"
              dangerouslySetInnerHTML={{ __html: currentPageBlock.body }}
            ></div>
            <div
              className="mb-2"
              dangerouslySetInnerHTML={{ __html: currentPageBlock.body2 }}
            ></div>
            {currentPageBlock.layout === "interact" && (
              <>
                <form>
                  <textarea
                    className="form-control"
                    style={{ height: 200, width: "70%" }}
                  ></textarea>
                  <button className="btn btn-primary mt-3 px-4">Save</button>
                </form>
              </>
            )}
          </div>
          <div
            style={{
              backgroundColor: "#efeeed",
              padding: "20px 40px",
              width: "80%",
              margin: "0 auto",
              marginBottom: 30,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {currentPage !== 0 && (
              <button
                className="btn btn-outline-primary"
                style={{ padding: "10px 50px" }}
                onClick={navigateToPreviousPage}
              >
                PREVIOUS PAGE
              </button>
            )}
            {currentPage + 1 === course.blocks.length ? (
              ""
            ) : (
              <button
                className="btn btn btn-primary"
                style={{ padding: "10px 50px" }}
                onClick={navigateToNextPage}
              >
                NEXT PAGE
              </button>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const res = await fetch(
    `https://damp-brook-31398.herokuapp.com/courses/${params.id}`
  );
  const course = await res.json();

  return {
    props: {
      course,
    },
  };
}
