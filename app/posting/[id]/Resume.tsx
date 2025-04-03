import ResumeData from "@/interfaces/ResumeData";

function isJSON(str: string) {
  try {
    return JSON.parse(str) && !!str;
  } catch (e) {
    return false;
  }
}

interface ResumeProps {
  resumeString: string;
}

const Resume = ({ resumeString }: ResumeProps) => {
  console.log(resumeString);

  if (!isJSON(resumeString)) {
    return <span>Not available.</span>;
  }

  const resumeData = JSON.parse(resumeString) as ResumeData;

  return (
    <div className="mb-7">
      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-gray-800">Contact</h2>
        <div className="mt-2 flex flex-col gap-2 text-gray-600">
          <span>Email: {resumeData.email}</span>
          <span>Phone: {resumeData.phone}</span>
          <span>LinkedIn: {resumeData.linkedin}</span>
          <span>GitHub: {resumeData.github}</span>
          <span>Website: {resumeData.website}</span>
        </div>
      </section>
      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-gray-800">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {resumeData.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-gray-100 px-3 py-1 text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-gray-800">Experience</h2>
        {resumeData.experience.map((experience) => (
          <div className="mb-6" key={experience.title + experience.company}>
            <h3 className="text-lg font-medium text-gray-800">
              {experience.title} · {experience.company}
            </h3>
            <small className="block text-gray-500">
              Start Date - {experience.start_date}
            </small>
            <small className="block text-gray-500">
              End Date - {experience.end_date}
            </small>
            <small className="block text-gray-500">
              Location - {experience.location}
            </small>
            <p className="text-gray-700">{experience.description}</p>
          </div>
        ))}
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-gray-800">Education</h2>
        {resumeData.education.map((education) => (
          <div className="mb-4" key={education.school + education.degree}>
            <h3 className="text-lg font-medium text-gray-800">
              {education.degree} · {education.school}
            </h3>
            <small className="block text-gray-500">
              Start Date - {education.start_date}
            </small>
            <small className="block text-gray-500">
              End Date - {education.end_date}
            </small>
            <small className="block text-gray-500">
              Location - {education.location}
            </small>
          </div>
        ))}
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold text-gray-800">
          Additional Information
        </h2>
        <p className="text-gray-700">{resumeData.other}</p>
      </section>
    </div>
  );
};

export default Resume;
