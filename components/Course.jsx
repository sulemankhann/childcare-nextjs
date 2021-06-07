import Link from "next/link";

const Course = ({ course }) => {
  return (
    <div className="col-md-4">
      <Link href={`/courses/${course.id}`}>
        <a className="link-primary">
          <p>{course.title}</p>
        </a>
      </Link>
    </div>
  );
};

export default Course;
