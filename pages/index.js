import Head from "next/head";
import Course from "../components/Course";

export default function Home({ courses }) {
  return (
    <>
      <Head>
        <title>SafeGard Classes Online | Courses</title>
      </Head>

      <main>
        <div className="container">
          <h1 className="text-center mt-5">Courses</h1>
          <div className="row mt-5">
            {courses.map((course) => (
              <Course key={course.id} course={course} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

// This function gets called at build time
export async function getServerSideProps() {
  const res = await fetch("https://damp-brook-31398.herokuapp.com/courses");
  const courses = await res.json();

  return {
    props: {
      courses,
    },
  };
}
