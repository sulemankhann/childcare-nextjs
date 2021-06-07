import Head from "next/head";
import { useRouter } from "next/router";

export default function SingleCourse({ course }) {
  const router = useRouter();
  const preview = course.blocks[0];

  return (
    <>
      <Head>
        <title>{course.title} | Courses</title>
      </Head>
      <main>
        <div className="container">
          <h1 className="mt-5">{course.title}</h1>
          <h4 className="mt-5 mb-5">Description</h4>
          <div dangerouslySetInnerHTML={{ __html: course.description }}></div>
          <h4 className="mb-3">Free Preview</h4>
          <div
            className="course-body"
            style={{
              backgroundColor: "#f4f3f2",
              padding: "20px 40px",
              width: 650,
            }}
          >
            <div
              className="mb-2"
              dangerouslySetInnerHTML={{ __html: preview.body }}
            ></div>
            <div
              className="mb-2"
              dangerouslySetInnerHTML={{ __html: preview.body2 }}
            ></div>
          </div>
          <div
            style={{
              backgroundColor: "#efeeed",
              padding: "20px 40px",
              width: 650,
              marginBottom: 30,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <button
              className="btn btn-primary"
              onClick={() => router.push(`/courses/learn/${course.id}`)}
            >
              BUY IT
            </button>
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

// export async function getStaticPaths() {
//   // Call an external API endpoint to get posts
//   const res = await fetch("https://damp-brook-31398.herokuapp.com/courses");
//   const courses = await res.json();

//   // Get the paths we want to pre-render based on posts
//   const paths = courses.map((post) => ({
//     params: { id: post.id },
//   }));

//   // We'll pre-render only these paths at build time.
//   // { fallback: false } means other routes should 404.
//   return { paths, fallback: false };
// }
