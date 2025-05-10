import React, { useEffect, useState } from "react";
import { JobicyJobsQueryParams } from "../../api/interface";
import { useJobicyJobsMutation } from "../../api/hooks/useJobicy";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { useChat } from "../../api/hooks/useChat";

interface JobicyJobListProps {
  jobs: [];
}

export const JobicyJobList: React.FC<JobicyJobListProps> = ({  }) => {
  const jobs = sampleData;

//   const tag = params.tag

//   useEffect(async() => {
//    const response = await mutateAsync(params);
//   }, [tag]);

  if (!jobs || jobs.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {jobs.map((job) => {
        const tags = [...(job.jobIndustry || []), ...(job.jobType || [])];

        return (
          <Card
            key={job.id}
            className="card-hover overflow-hidden border border-gray-200"
          >
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                {job.companyLogo && (
                  <img
                    src={job.companyLogo}
                    alt={`${job.companyName} logo`}
                    className="w-10 h-10 object-cover rounded"
                  />
                )}
                <CardTitle className="mt-0 text-xl">{job.jobTitle}</CardTitle>
              </div>

              {(job.companyName || job.jobGeo) && (
                <CardDescription className="flex items-center mt-1">
                  {job.companyName}
                  {job.companyName && job.jobGeo && " • "}
                  {job.jobGeo}
                </CardDescription>
              )}

              {/* Tags */}
              {tags.length > 0 && (
                <div className="flex gap-2 flex-wrap mt-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </CardHeader>

            <CardContent>
              {job.jobExcerpt && (
                <p className="text-gray-600 text-sm line-clamp-3">
                  {job.jobExcerpt}
                </p>
              )}
              <div className="flex pt-3">   
              {job.annualSalaryMin != null && job.annualSalaryMax != null && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  ${job.annualSalaryMin.toLocaleString()}–$
                  {job.annualSalaryMax.toLocaleString()} {job.salaryCurrency}
                </span>
              )}
              </div>
            </CardContent>

            <CardFooter className="flex justify-between items-center">
              {job.pubDate && (
                <span className="text-xs text-gray-500">
                  {new Date(job.pubDate).toLocaleDateString()}
                </span>
              )}

              <a
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer"
              >
                <Button
                  variant="outline"
                  className="border-[var(--equipurple)] text-[var(--equipurple)] hover:bg-[var(--soft-purple)]"
                >
                  View Details
                </Button>
              </a>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

// interface Props {
//   search?: string;
// }

// export default function JobsPage(props: Props) {
//   const search = props.search;
//   const mutateChat = useChat();
//   const [refinedSearch, setRefinedSearch] = useState("");

//   useEffect(() => {
//     if (search === "") {
//       setRefinedSearch("");
//       return;
//     }

//     const refine = async () => {
//       const message = search ? jobicyPrompt(search) : "developer";

//       try {
//         const response = await mutateChat.mutateAsync({ message });
//         setRefinedSearch(response.reply);
//       } catch (err) {
//         console.error("Refine failed", err);
//       }
//     };

//     refine();
//   }, [search, mutateChat]);

//   const params = { count: 50, tag: refinedSearch };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl mb-4">Remote Engineering Jobs</h1>
//       <JobicyJobList params={params} />
//     </div>
//   );
// }

// export const jobicyPrompt = (text?: string) => {
//   return `
//   respond with one word, that best describes this job search: '${text}'. Respond with just one word`;
// };


export const sampleData =   [
    {
        "id": 117433,
        "url": "https://jobicy.com/jobs/117433-senior-risk-analytics-engineer",
        "jobSlug": "117433-senior-risk-analytics-engineer",
        "jobTitle": "Senior Risk Analytics Engineer",
        "companyName": "Pipe",
        "companyLogo": "https://jobicy.com/data/server-nyc0409/galaxy/mercury/2024/05/688a0b96-221.jpeg",
        "jobIndustry": [
            "Software Engineering"
        ],
        "jobType": [
            "full-time"
        ],
        "jobGeo": "USA",
        "jobLevel": "Senior",
        "jobExcerpt": "We are hiring a Senior Analytics Engineer to join our Risk team. This role will focus heavily on data modeling to support our risk business analysts, who are responsible for using dashboards to regularly analyze and report on credit risk and underwriting to the business. You will design and develop data models using SQLMesh to&amp;#8230;",
        "jobDescription": "<p>We are hiring a Senior Analytics Engineer to join our Risk team. This role will focus heavily on data modeling to support our risk business analysts, who are responsible for using dashboards to regularly analyze and report on credit risk and underwriting to the business. You will design and develop data models using SQLMesh to support risk business analysts, create reports, construct dashboards, evaluate key metrics, and perform ad hoc analysis using SQL or Python. You will collaborate closely with the Data Science and Data Engineering teams to ensure our data infrastructure is as self-service as possible.</p>\n<p><strong>Currently our data stack is mostly comprised of:</strong></p>\n<ul>\n<li>Data Analytics: Preset, Hex</li>\n<li>Data Warehouse: Google BigQuery</li>\n<li>Data Modeling: SQLMesh</li>\n<li>MLOps: Chalk, Metaflow</li>\n</ul>\n<p>We do not expect you to have experience with all of these tools. Experience with similar tools like Tableau, Amazon Redshift, or dbt are good indicators that you’d be comfortable with our stack.</p>\n<p>Pipe is a remote company with hubs in SF, Atlanta, and New York. We have large scale challenges to tackle in multiple areas, and we invest heavily in the developer experience. We believe great engineers are capable of learning new things, and you will receive mentorship and guidance as needed.</p>\n<h2>Responsibilities</h2>\n<ul>\n<li>Collecting and integrating data from various sources such as credit bureaus, banks, payment systems, and internal financial systems.</li>\n<li>Designing and developing efficient data pipelines that move and process credit-related data from various sources into BigQuery.</li>\n<li>Working closely with credit analysts and data scientists to provide the necessary data for evaluating credit risk, creating credit scores, and assessing financial trends.</li>\n<li>Automating data processing tasks and improving the efficiency of data pipelines, reducing manual effort and time required for data preparation.</li>\n<li>Collaborating with data engineering and software engineering teams to understand and implement best practices for data modeling.</li>\n</ul>\n<h2>Qualifications</h2>\n<p>We are looking for data analysts with this kind of background:</p>\n<ul>\n<li>3-5+ years of experience writing well-structured, performant SQL and advanced Python</li>\n<li>3+ years of experience in database schema design and data modeling</li>\n<li>3+ years of experience building data models and data pipelines on top of large datasets</li>\n<li>Track record of following data modeling standards and best practices</li>\n<li>Proficiency in common engineering tools such as Git, Jira, Unix-based operating systems, etc.</li>\n<li>Experience with common data visualization tools such as Tableau, Superset, or Looker</li>\n<li>Passionate about extracting and communicating insights to support the business</li>\n<li>Prefer familiarity with concepts such as decision models, features, portfolio performance</li>\n<li>Experience in an agile team and collaborating asynchronously</li>\n<li>Curious and eager to learn</li>\n</ul>\n<h2>Compensation and Benefits</h2>\n<p>We believe in taking care of our employees. We want you to feel like an owner and that will be reflected in your salary, equity, and benefits. You’ll receive:</p>\n<ul>\n<li>The best equipment to help you do your job: computers, monitors, desks, chairs, headphones, speakers, webcams, keyboards, mice, etc.</li>\n<li>Flexible vacation and work hours. We believe in a healthy work-life balance (really!)</li>\n<li>Excellent health, dental, and vision insurance.</li>\n<li>Generous parental leave for anyone who is growing their family, regardless of gender.</li>\n<li>Great colleagues! We value a culture of authenticity, humility, and excellence. We want you to make a mark on our culture.</li>\n<li>Lifetime maximum benefit for family forming and fertility.</li>\n</ul>\n<p>Pipe is an equal opportunity employer: we do not discriminate. Diversity and inclusion are important to us, and we hope they are to you, too.</p>\n<p>The annual US base salary range for this role is $113,000 &#8211; $155,000. This salary range may be inclusive of several career levels at Pipe and will be narrowed during the interview process based on a number of factors, including the candidate’s experience, qualifications, and location.</p>",
        "pubDate": "2025-05-09 20:31:36",
        "annualSalaryMin": 113000,
        "annualSalaryMax": 155000,
        "salaryCurrency": "USD"
    },
    {
        "id": 116770,
        "url": "https://jobicy.com/jobs/116770-front-end-engineer-3",
        "jobSlug": "116770-front-end-engineer-3",
        "jobTitle": "Front End Engineer",
        "companyName": "Peerspace",
        "companyLogo": "https://jobicy.com/data/server-nyc0409/galaxy/mercury/2021/11/423c8cd867be08cf39987fcd193debe6.png",
        "jobIndustry": [
            "Software Engineering"
        ],
        "jobType": [
            "full-time"
        ],
        "jobGeo": "USA",
        "jobLevel": "Any",
        "jobExcerpt": "As a Front-End Engineer, you will play a key role in shaping the user experience of our platform, ensuring our front-end applications are modern, performant, and scalable. You will work closely with designers, product managers, and backend engineers to develop high-quality, reusable components and features while helping improve our front-end architecture. As a senior team&amp;#8230;",
        "jobDescription": "<p>As a Front-End Engineer, you will play a key role in shaping the user experience of our platform, ensuring our front-end applications are modern, performant, and scalable. You will work closely with designers, product managers, and backend engineers to develop high-quality, reusable components and features while helping improve our front-end architecture. As a senior team member, you will contribute to technical decisions, mentor junior engineers, and advocate for best practices in front-end development.</p>\n<h2><b>Qualifications</b></h2>\n<p>You are a great fit for this role if you have:</p>\n<p><b>Experience</b>: 3-5 years in front-end development, with significant experience building modern web applications.</p>\n<p><b>Technical Expertise</b>:</p>\n<ul>\n<li>Strong proficiency in React (or similar modern front-end frameworks).</li>\n<li>Experience with Next.js, server-side rendering (SSR), and static site generation (SSG).</li>\n<li>Deep understanding of CSS, responsive design, and component-driven architecture.</li>\n<li>Strong knowledge of state management solutions (e.g., Redux, React Context).</li>\n<li>Experience integrating with APIs and backend services in a services-based architecture.</li>\n</ul>\n<p><b>Code Quality &amp; Performance</b>:</p>\n<ul>\n<li>Experience building accessible (a11y-compliant), high-performance web applications.</li>\n<li>Familiarity with front-end testing frameworks and CI/CD pipelines.</li>\n<li>Strong debugging and troubleshooting skills.</li>\n</ul>\n<p><b>Collaboration &amp; Leadership</b>:</p>\n<ul>\n<li>Ability to work cross-functionally with Product, Design, and Backend teams.</li>\n<li>Experience mentoring junior engineers and contributing to technical decision-making.</li>\n<li>Strong communication skills and ability to advocate for front-end best practices.</li>\n</ul>\n<h2><b>Responsibilities</b></h2>\n<p>In this role, you will be responsible for:</p>\n<ul>\n<li><b>Develop &amp; Maintain Features</b>: Build scalable, maintainable front-end applications using modern frameworks and tools.</li>\n<li><b>Improve Front-end Architecture</b>: Contribute to technical decisions on architecture, performance optimization, and front-end best practices.</li>\n<li><b>Enhance Developer Experience</b>: Help refine our design system, component libraries, and development workflows.</li>\n<li><b>Mentor &amp; Lead</b>: Provide guidance and mentorship to junior developers, reviewing code and sharing knowledge.</li>\n<li><b>Ensure Quality &amp; Performance</b>: Write clean, well-tested code, optimizing for performance, accessibility, and SEO.</li>\n<li><b>Collaborate Across Teams</b>: Work closely with designers, product managers, and backend engineers to deliver high-quality user experiences.</li>\n</ul>\n<h2>Why Peerspace?</h2>\n<p>Peerspace is proudly certified as a Great Place to Work™ and we&#8217;re a remote first company with team members located in cities around the globe. Beyond competitive salary and equity compensation, we provide:</p>\n<ul>\n<li>100% employee coverage of medical, dental and vision insurance</li>\n<li>$500 annual professional development allowance</li>\n<li>Discount on all Peerspace bookings</li>\n<li>Laptop, high res display, and stipend to setup home office</li>\n<li>Monthly cell phone and internet credit</li>\n<li>Coworking membership if needed (in lieu of home office)</li>\n<li>Flexible take it as you need it time off policy</li>\n<li>Wellness Fridays observed company wide</li>\n<li>Annual in-person, all company offsites and team-building events</li>\n</ul>\n<p>The annual salary range for this role is $130,000 to $150,000. The actual salary will vary depending on experience, skills, and abilities as well as internal equity and market data.</p>\n<h2>Diversity</h2>\n<p>At Peerspace, we&#8217;re dedicated to creating a team that&#8217;s diverse, equitable and inclusive. We believe bringing people together from different backgrounds and identities makes us stronger and better serves the Peerspace community. We&#8217;d especially like to encourage applicants from different backgrounds, locations, and experiences.</p>",
        "pubDate": "2025-05-09 05:39:28",
        "annualSalaryMin": 130000,
        "annualSalaryMax": 150000,
        "salaryCurrency": "USD"
    },
    {
        "id": 9045,
        "url": "https://jobicy.com/jobs/9045-wordpress-developer-php-js",
        "jobSlug": "9045-wordpress-developer-php-js",
        "jobTitle": "WordPress Developer",
        "companyName": "Awesome Motive",
        "companyLogo": "https://jobicy.com/data/server-nyc0409/galaxy/mercury/2022/01/b8e354b088bd65fd9f299af4f4bc1706.jpeg",
        "jobIndustry": [
            "Programming"
        ],
        "jobType": [
            "full-time"
        ],
        "jobGeo": "Anywhere",
        "jobLevel": "Any",
        "jobExcerpt": "As a WordPress Developer, you&amp;#8217;re responsible for Making Stuff Go. You will build infrastructure to create new features, improve existing code, squash bugs, and help us rapidly scale our platform. To love this role, here’s the type of person you are You’re a self-starter who loves taking initiative and seeing things through from conception to&amp;#8230;",
        "jobDescription": "<p>As a WordPress Developer, you&#8217;re responsible for Making Stuff Go. You will build infrastructure to create new features, improve existing code, squash bugs, and help us rapidly scale our platform.</p>\n<h2>To love this role, here’s the type of person you are</h2>\n<ul>\n<li>You’re a self-starter who loves taking initiative and seeing things through from conception to completion. Our developers often &#8220;own&#8221; features/tasks and are responsible for scoping, development, and testing.</li>\n<li>You&#8217;re an excellent communicator, fluent in both verbal and written English, who makes sure nothing slips through the cracks. We believe communication is critical and there is no such thing as over communicating.</li>\n<li>You have the curiosity and desire to learn and grow your skills.</li>\n<li>You&#8217;re passionate about leaving your mark on the web for all to see and are excited to work on tasks that impact <em>millions</em> of users.</li>\n<li>You take pride in the quality and craftsmanship of your work rather than just doing it to get it done.</li>\n<li>You&#8217;re a team player who is comfortable working along side and helping other developers, and you don&#8217;t take critical feedback personally.</li>\n<li>You&#8217;re happy jumping between front-end and back-end development tasks, or tackling tasks which require both.</li>\n<li>You&#8217;re happy working on tasks of all sizes &#8211; from small bug fixes and enhancements to large features/rewrites.</li>\n</ul>\n<h2>Common responsibilities include (but are not limited to)</h2>\n<ul>\n<li>Triaging bugs and small enhancements that come into GitHub.</li>\n<li>Scoping, writing, and testing new product features and addons.</li>\n<li>Refactoring legacy code with a particular attention to backwards compatibility.</li>\n<li>Providing feedback and peer review for other developers (Github PRs).</li>\n<li>Communicating with the team and supporting your peers using chat, audio, and video.</li>\n</ul>\n<h2>Requirements</h2>\n<ul>\n<li>Professional experience with WordPress plugin development, architecture, and standards.</li>\n<li>Advanced proficiency with PHP and MySQL, including modern PHP practices (OOP, autoloading, namespacing, traits, interfaces, etc).</li>\n<li>Strong familiarity with JavaScript (vanilla JS, jQuery, ES6, etc).</li>\n<li>Ability to use and extend build tools like gulp and webpack.</li>\n<li>Familiarity with package managers such as Composer and NPM.</li>\n<li>Experience working with third-party APIs (Eg Stripe, Drip, Zapier, etc).</li>\n<li>Competent with version control through git and GitHub.</li>\n<li>The ability to iterate and ship ideas quickly.</li>\n<li>Exceptional troubleshooting skills.</li>\n<li>Ability to keep complex ideas and features <em>simple</em>. (Simplicity is a core value!)</li>\n<li>Previous freelance or remote work experience.</li>\n<li>Personal Computer with Internet Access</li>\n<li>Availability to participate in audio/video meetings between the hours 9 am &#8211; 5 pm EST.</li>\n</ul>\n<h2><strong>Bonus points if you also have</strong></h2>\n<ul>\n<li>Advanced proficiency in JavaScript frameworks like VueJS or React.</li>\n<li>Experience with e-commerce platforms or related APIs (Easy Digital Downloads, WooCommerce, Stripe, PayPal, etc).</li>\n<li>Experience with DevOps or infrastructure management.</li>\n</ul>\n<h2>Benefits</h2>\n<p>Working for a fast-growing bootstrapped company is a rare opportunity, one we consider a lifestyle choice rather than a job choice. Our positions are challenging, but also come with amazing advantages and fulfillment to those who earn them. Here’s what we offer.</p>\n<ul>\n<li>Competitive Salary.</li>\n<li>Term Life Insurance and Accidental Death &amp; Dismemberment for all full-time team members during their employment.</li>\n<li>Health, Dental, and Vision Insurance benefits for full-time U.S. employees.</li>\n<li>Health Insurance benefits for all employees in India, Pakistan, Brazil, Philippines, Ukraine, Poland, Romania, Nepal, Kenya, Mexico, Nigeria, Spain &amp; Jamaica.</li>\n<li>Work from your home. We’re spread out all over the world – United States, Canada, Ukraine, India, Pakistan, Singapore, and more.</li>\n<li>Flexible PTO after 90 days of employment. We encourage employees to take the time they need for a vacation, stay healthy, and spend time with friends and family.</li>\n<li>Holidays (based on your location)</li>\n<li>Paid maternity and paternity leave.</li>\n<li>We happily provide or reimburse software you’ll need as well as books or courses that promote continued learning.</li>\n<li>We cover all costs of company travel (including our annual all-company retreat and mini-team meetups).</li>\n<li>Additional Perks include AM Welcome Box for new team members, Yearly Anniversary Gifts, and Technology Stipend each work anniversary.</li>\n<li>We give you the opportunity to solve challenging and meaningful problems that make a difference.</li>\n<li>Ability to work with some of the best people in the business through frequent, if not daily, interactions.</li>\n<li>And in case you were wondering: no politics, no b.s., and no jerks.</li>\n</ul>\n<h2><strong>Location</strong></h2>\n<p>This is a remote position &#8211; our team is spread around the globe! Our home base is in Florida, USA, so company operating hours are 9am &#8211; 5pm ET (UTC -5). While full coverage is not a requirement, you must be available during a portion of the day.</p>\n<h2><strong>Inclusion Statement</strong></h2>\n<p>At Awesome Motive, we strive to have the broadest possible view of diversity, going beyond visible differences to include the background, experiences, skills, and perspectives that make each person unique. Awesome Motive is proud to be an equal opportunity workplace and is committed to equal employment opportunity regardless of race, color, ancestry, religion, sex, national origin, sexual orientation, age, citizenship, marital status, disability, gender identity, veteran status, or any other basis protected by federal, state, or local law.</p>\n<h2><strong>How to apply?</strong></h2>\n<p>If all of this sounds interesting, then please submit your application!</p>\n<h2><strong>Please clearly include the following in your cover letter</strong></h2>\n<ul>\n<li>Your experience with WordPress plugin development.</li>\n<li>What is your favorite WordPress hook/function and why.</li>\n<li>Tell us a bit about yourself and why you should be considered. Details about your experience, qualifications, personality, etc are very helpful.</li>\n<li>Profile links with code samples (GitHub, GitLab, WordPress.org, etc).</li>\n<li>Other profile links if available (Your website, Twitter, LinkedIn, etc).</li>\n</ul>\n<p>Also note, don&#8217;t forget to proofread before submitting. Check spelling, capitalization, etc. This is your chance to make your application stand out </p>\n<p>We won’t be able to individually respond to all applications, but if we feel you’re a strong match, someone will be in touch shortly.</p>",
        "pubDate": "2025-05-09 05:39:12"
    },
    {
        "id": 117414,
        "url": "https://jobicy.com/jobs/117414-full-stack-python-developer",
        "jobSlug": "117414-full-stack-python-developer",
        "jobTitle": "Full Stack Python Developer",
        "companyName": "Guidehouse",
        "companyLogo": "https://jobicy.com/data/server-nyc0409/galaxy/mercury/2022/08/ba764757f4067e94b1ca8fcfc155b333.jpg",
        "jobIndustry": [
            "Programming"
        ],
        "jobType": [
            "full-time"
        ],
        "jobGeo": "USA",
        "jobLevel": "Senior",
        "jobExcerpt": "The annual salary range for this position is $98,000.00-$163,000.00. Compensation decisions depend on a wide range of factors, including but not limited to skill sets, experience and training, security clearances, licensure and certifications, and other business and organizational needs. What You Will Do: Develop and maintain web applications using Angular and React. Collaborate with designers&amp;#8230;",
        "jobDescription": "<p>The annual salary range for this position is $98,000.00-$163,000.00. Compensation decisions depend on a wide range of factors, including but not limited to skill sets, experience and training, security clearances, licensure and certifications, and other business and organizational needs.</p>\n<h2><b>What You Will Do:</b></h2>\n<ul>\n<li>Develop and maintain web applications using Angular and React.</li>\n<li>Collaborate with designers to implement user interfaces and back-end support.</li>\n<li>Ensure the technical feasibility of UI/UX designs.</li>\n<li>Optimize applications for maximum speed and scalability.</li>\n</ul>\n<h2><b>What You Will Need:</b></h2>\n<ul>\n<li>Bachelor&#8217;s Degree in related field</li>\n<li>Minimum of THREE (3) years professional experience working in full-stack development with demonstrated experience in front-end, and database work.</li>\n<li><b>Needed Skills: </b>Python, Django, ORM, JavaScript, SQL, HTML, CSS, strong experience with developing and using APIs</li>\n<li>Excellent verbal and written communication skills to effectively convey technical concepts to non-technical stakeholders. Talking with content experts, design specialists, and product owners will be expected and interpreting their needs into actionable items is crucial</li>\n<li>Ability to work collaboratively in a team environment.</li>\n<li>Excellent problem-solving skills and attention to detail.</li>\n</ul>\n<h2><b>What Would Be Nice To Have:</b></h2>\n<ul>\n<li>Bonus Skills: React, PostgreSQL, AWS exposure, EC2, S3, Git, Responsive web frameworks, Jira</li>\n<li>NIH experience or previous experience working on health-related projects or applications.</li>\n</ul>\n<h2><b>What We Offer:</b></h2>\n<p>Guidehouse offers a comprehensive, total rewards package that includes competitive compensation and a flexible benefits package that reflects our commitment to creating a diverse and supportive workplace.</p>\n<ul>\n<li>Medical, Rx, Dental &amp; Vision Insurance</li>\n<li>Personal and Family Sick Time &amp; Company Paid Holidays</li>\n<li>Parental Leave</li>\n<li>401(k) Retirement Plan</li>\n<li>Group Term Life and Travel Assistance</li>\n<li>Voluntary Life and AD&amp;D Insurance</li>\n<li>Health Savings Account, Health Care &amp; Dependent Care Flexible Spending Accounts</li>\n<li>Transit and Parking Commuter Benefits</li>\n<li>Short-Term &amp; Long-Term Disability</li>\n<li>Tuition Reimbursement, Personal Development, Certifications &amp; Learning Opportunities</li>\n<li>Employee Referral Program</li>\n<li>Corporate Sponsored Events &amp; Community Outreach</li>\n<li>Care.com annual membership</li>\n<li>Employee Assistance Program</li>\n<li>Supplemental Benefits via Corestream (Critical Care, Hospital Indemnity, Accident Insurance, Legal Assistance and ID theft protection, etc.)</li>\n<li>Position may be eligible for a discretionary variable incentive bonus</li>\n</ul>\n<h2><b>About Guidehouse</b></h2>\n<p>Guidehouse is an Equal Opportunity Employer–Protected Veterans, Individuals with Disabilities or any other basis protected by law, ordinance, or regulation.</p>\n<p>Guidehouse will consider for employment qualified applicants with criminal histories in a manner consistent with the requirements of applicable law or ordinance including the Fair Chance Ordinance of Los Angeles and San Francisco.</p>\n<p>If you have visited our website for information about employment opportunities, or to apply for a position, and you require an accommodation, please contact Guidehouse Recruiting at 1-571-633-1711 or via email at RecruitingAccommodation[at]guidehouse.com. All information you provide will be kept confidential and will be used only to the extent required to provide needed reasonable accommodation.</p>\n<p>All communication regarding recruitment for a Guidehouse position will be sent from Guidehouse email domains including @guidehouse.com.  Correspondence received by an applicant from any other domain should be considered unauthorized and will not be honored by Guidehouse.  Note that Guidehouse will never charge a fee or require a money transfer at any stage of the recruitment process and does not collect fees from educational institutions for participation in a recruitment event. Never provide your banking information to a third party purporting to need that information to proceed in the hiring process.</p>",
        "pubDate": "2025-05-09 05:32:47",
        "annualSalaryMin": 98000,
        "annualSalaryMax": 163000,
        "salaryCurrency": "USD"
    },
    {
        "id": 116777,
        "url": "https://jobicy.com/jobs/116777-android-engineer-5",
        "jobSlug": "116777-android-engineer-5",
        "jobTitle": "Android Engineer",
        "companyName": "Life360",
        "companyLogo": "https://jobicy.com/data/server-nyc0409/galaxy/mercury/2022/02/f269bad3-221.jpeg",
        "jobIndustry": [
            "Software Engineering"
        ],
        "jobType": [
            "full-time"
        ],
        "jobGeo": "Canada,  USA",
        "jobLevel": "Any",
        "jobExcerpt": "This role is for an Android Engineer within the Life360 team. This person will be an integral part of the core of our app as they will be required to become experts in technologies supporting our highly visible mapping, communication, driving &amp;amp; safety features. As a member of the team, it is expected that you&amp;#8230;",
        "jobDescription": "<p>This role is for an Android Engineer within the Life360 team. This person will be an integral part of the core of our app as they will be required to become experts in technologies supporting our highly visible mapping, communication, driving &amp; safety features. As a member of the team, it is expected that you will be highly involved in architecting, designing, and leading the development of the next generation of our systems and features.</p>\n<p><strong>Note: Please be aware that the job title for positions in Canada will be &#8220;Developer&#8221; in lieu of &#8220;Engineer.&#8221; </strong></p>\n<p>For candidates based in the US, the salary range for this position is 107,000 to 149,000 USD. For candidates based out of Canada, the salary range for this position is 125,500 to 140,000 CAD.</p>\n<p>We take into consideration an individual&#8217;s background and experience in determining final salary- therefore, base pay offered may vary considerably depending on geographic location, job-related knowledge, skills, and experience. The compensation package includes a wide range of medical, dental, vision, financial, and other benefits, as well as equity.</p>\n<h2>What You’ll Do:</h2>\n<ul>\n<li>Work with a cross-functional team and collaborate closely with design, back-end engineering, marketing, data science, and product.</li>\n<li>Design and maintain robust frameworks for Android using tools such as Kotlin, Jetpack Compose, MVVM, or other relevant frameworks.</li>\n<li>Create foundational automation workflows that lead to better product quality and reliability.</li>\n<li>Opportunity to be on the leading edge of location experiences in a high-visibility team</li>\n<li>Roadmap innovative features to bring families closer together through contextual awareness, improved geolocation, and better communication</li>\n</ul>\n<h2>What We’re Looking For:</h2>\n<ul>\n<li>Bachelor&#8217;s Degree or equivalent experience</li>\n<li>Strong debugging skills\n<ul>\n<li>Many problems in the sensor frameworks require understanding hard-to-pinpoint and non-reproducible problems.</li>\n<li>Identify and correct bottlenecks and fix bugs to improve application performance and responsiveness.</li>\n</ul>\n</li>\n<li>Problem-solving\n<ul>\n<li>We will be solving problems that do not have clear solutions with limited resources available online.</li>\n</ul>\n</li>\n<li>Architecture mindset\n<ul>\n<li>Will be spending equally as much time designing and prototyping as writing production code</li>\n<li>Strong understanding of software architecture principles and experience in making codebases more testable</li>\n</ul>\n</li>\n<li>Strong understanding of the Android ecosystem\n<ul>\n<li>Expert knowledge of Kotlin and familiarity with Android frameworks and APIs.</li>\n<li>Design, build, and maintain advanced applications for the Android platform with a focus on location-based services</li>\n</ul>\n</li>\n<li>Adaptable and able to pick up new concepts</li>\n<li>Drive to level up\n<ul>\n<li>Conduct code reviews and mentor junior engineers to promote best practices and improve code quality.</li>\n<li>Work closely with product managers, designers, and engineers to define, design, and ship new features and test strategies.</li>\n</ul>\n</li>\n<li>A Passion for quality\n<ul>\n<li>We want someone who will take the craftsmanship of their work seriously and strive to improve the areas they work in continually.</li>\n<li>Pioneer new test strategies via automation to enhance the reliability and efficiency of our testing processes.</li>\n<li>Proven experience in developing and implementing automated test strategies</li>\n</ul>\n</li>\n<li>Strong communication\n<ul>\n<li>Will communicate with multiple teams, including both systems and product teams</li>\n<li>At times, may need to communicate with external partners</li>\n</ul>\n</li>\n</ul>\n<h2>Bonus:</h2>\n<ul>\n<li>Familiarity with location and other sensors</li>\n<li>Familiarity with background running tasks/services on Android</li>\n<li>Familiarity with networking and persistence technologies</li>\n<li>Familiarity with reactive programming, RxJava or combine</li>\n<li>Familiarity with developing highly polished user interfaces and animations</li>\n<li>Familiarity with all levels of automated testing</li>\n</ul>\n<h2>Our Benefits:</h2>\n<ul>\n<li>Competitive pay and benefits.</li>\n<li>Medical, dental, vision, life and disability insurance plans (100% paid for US employees). We offer supplemental plans for medical and dental for Canadian employees.</li>\n<li>401(k) plan with company matching program in the US and RRSP with DPSP plan for Canadian employees.</li>\n<li>Employee Assistance Program (EAP) for mental wellness.</li>\n<li>Flexible PTO and 12 company wide days off throughout the year.</li>\n<li>Learning &amp; Development programs.</li>\n<li>Equipment, tools, and reimbursement support for a productive remote environment.</li>\n<li>Free Life360 Platinum Membership for your preferred circle.</li>\n</ul>\n<h2>Life360 Values:</h2>\n<p>Our company’s mission-driven culture is guided by our shared values to create a trusted work environment where you can bring your authentic self to work and make a positive difference.</p>\n<ul>\n<li>Be a Good Person &#8211; We have a team of people with high integrity who you can trust.</li>\n<li>Be Direct With Respect &#8211; We communicate directly, even when it’s hard.</li>\n<li>Members Before Metrics &#8211; We focus on building an exceptional experience for families.</li>\n<li>High-Intensity High Impact &#8211; We do whatever it takes to get the job done.</li>\n</ul>\n<h2>Our Commitment to Diversity:</h2>\n<p>We believe that different ideas, perspectives, and backgrounds create a stronger, more creative work environment that delivers better results. Together, we continue to build an inclusive culture that encourages, supports, and celebrates the diverse voices of our employees. It fuels our innovation and connects us closer to our customers and the communities we serve. We strive to create a workplace that reflects the communities we serve and where everyone feels empowered to bring their authentic best selves to work.</p>\n<p><em>We are an equal-opportunity employer and value diversity at Life360. We do not discriminate based on race, religion, color, national origin, gender, sexual orientation, age, marital status, veteran status, disability status, or any legally protected status.  </em></p>\n<p><em>We encourage people of all backgrounds to apply. We believe that a diversity of perspectives and experiences creates a foundation for the best ideas. Come join us in building something meaningful. Even if you don’t meet 100% of the qualifications below, you should still seriously consider applying!</em></p>",
        "pubDate": "2025-05-09 05:22:10",
        "annualSalaryMin": 107000,
        "annualSalaryMax": 149000,
        "salaryCurrency": "USD"
    },
    {
        "id": 112046,
        "url": "https://jobicy.com/jobs/112046-senior-java-developer-2",
        "jobSlug": "112046-senior-java-developer-2",
        "jobTitle": "Senior Java Developer (Tiger Team)",
        "companyName": "Semrush",
        "companyLogo": "https://jobicy.com/data/server-nyc0409/galaxy/mercury/2023/07/c835ab611a8e5f3da3afc600bf0374b6.jpeg",
        "jobIndustry": [
            "Programming"
        ],
        "jobType": [
            "full-time"
        ],
        "jobGeo": "Cyprus,  Czechia,  Poland,  Spain",
        "jobLevel": "Senior",
        "jobExcerpt": "We are Semrush, a global Tech company developing our own product – a platform for digital marketers. Are you ready to be a part of it? This is your chance! We’re hiring for Senior Java Developer (Tiger Team). Tasks in the role Manage the full feature development lifecycle: gather requirements, design architecture, coordinate contracts/interfaces with&amp;#8230;",
        "jobDescription": "<p>We are Semrush, a global Tech company developing our own product – a platform for digital marketers. Are you ready to be a part of it? This is your chance! We’re hiring for Senior Java Developer (Tiger Team).</p>\n<h2><b>Tasks in the role</b></h2>\n<ul>\n<li>Manage the full feature development lifecycle: gather requirements, design architecture, coordinate contracts/interfaces with other developers, choose and set up infrastructure, etc.</li>\n<li>Continuous monitoring of already released features and reacting to alerts Participate in refactoring/improvements of legacy functionality</li>\n<li>Participate in a code review session</li>\n<li>Conduct technical researches (e.g., for new integrations or technologies)</li>\n<li>Share knowledge with the team and mentor newcomers</li>\n</ul>\n<h2><b>Who we are looking for</b></h2>\n<ul>\n<li>Strong expertise in Java</li>\n<li>Strong expertise in Spring and Spring Boot</li>\n<li>Knowledge of architectural design patterns and principles</li>\n<li>Experience with web-based applications</li>\n<li>Experience with queue brokers</li>\n<li>Experience with cloud stack GCP/AWS</li>\n<li>At least B2 English</li>\n</ul>\n<h2><b>Not required, but a plus</b></h2>\n<ul>\n<li>Suggest improvements in technical areas such as the codebase, processes, or infrastructure</li>\n<li>Experience with: GitLabCI, Application monitoring, Docker/K8s, Development and improvement of infrastructure through DevOps practice</li>\n<li>You share our common values: Trust, because we prefer to speak up and be our true selves; Sense of Ownership, because it’s not worth wasting time on something you don’t believe in; and enthusiasm for Constant Changes, because we are always looking to make things better</li>\n</ul>\n<h2><b>A bit about the team</b></h2>\n<p>Our Tiger team develops tools to enhance the visibility of local businesses. This includes tasks related to Google Business Profile, such as adding and updating business information, analyzing and comparing performance metrics, processing user suggestions, managing reviews, and more.</p>\n<h2><b>We will try to create all the right conditions for you to work and rest comfortably</b></h2>\n<ul>\n<li>Flexible working hours</li>\n<li>Unlimited PTO</li>\n<li>Flexi Benefit for your hobby</li>\n<li>Employee Support Program</li>\n<li>Loss of family member financial aid</li>\n<li>Employee Resource Groups</li>\n<li>Meals, snacks, and drinks at the office</li>\n<li>Corporate events</li>\n<li>Teambuilding</li>\n<li>Training, courses, conferences</li>\n<li>Gifts for employees</li>\n</ul>\n<h2><b>A  little more about our company</b></h2>\n<p>Semrush is a leading online visibility management SaaS platform that enables businesses globally to run search engine optimization, pay-per-click, content, social media and competitive research campaigns and get measurable results from online marketing.</p>\n<p>We&#8217;ve been developing our product for 16 years and have been awarded G2&#8217;s Top 100 Software Products, Global and US Search Awards 2021, Great Place to Work Certification, Deloitte Technology Fast 500 and many more. In March 2021 Semrush went public and started trading on the NYSE with the SEMR ticker.</p>\n<p>10,000,000+ users in America, Europe, Asia, and Australia have already tried Semrush, and over 1,700 people around the world are working on its development. The Semrush team is constantly growing.</p>\n<h4><b>Our Diversity, Equity, and Inclusion commitments </b></h4>\n<p>Semrush is an equal opportunity employer. Building a better future for marketers around the world unites people from all backgrounds. Even if you feel that you don’t 100% match all requirements, don’t be discouraged to apply! We are committed to ensure that everyone feels a sense of belonging in the workplace.<br />\nWe do not discriminate based upon race, religion, creed, color, national origin, sex, pregnancy, sexual orientation, gender identity, gender expression, age, ancestry, physical or mental disability, or medical condition including medical characteristics, genetic identity, marital status, military service, or any other classification protected by applicable local, state or federal laws.</p>",
        "pubDate": "2025-05-07 06:22:14"
    },
    {
        "id": 117336,
        "url": "https://jobicy.com/jobs/117336-developer-evangelist",
        "jobSlug": "117336-developer-evangelist",
        "jobTitle": "Developer Evangelist",
        "companyName": "Twilio",
        "companyLogo": "https://jobicy.com/data/server-nyc0409/galaxy/mercury/2020/10/WRILS-201023175858-722503.jpg",
        "jobIndustry": [
            "Programming"
        ],
        "jobType": [
            "full-time"
        ],
        "jobGeo": "Ireland,  UK",
        "jobLevel": "Any",
        "jobExcerpt": "This position is needed to help us inspire and equip a global network of millions of developers who will build the future of customer engagement. The Developer Evangelist will define developer relations in the EMEA region, while sustaining a relationship that fuels every developer&amp;#8217;s journey to know, use and love Twilio. The Developer Evangelist will&amp;#8230;",
        "jobDescription": "<p>This position is needed to help us inspire and equip a global network of millions of developers who will build the future of customer engagement. The Developer Evangelist will define developer relations in the EMEA region, while sustaining a relationship that fuels every developer&#8217;s journey to know, use and love Twilio. The Developer Evangelist will serve as the regional liaison for local developer communities, build Twilio-powered solutions, such as SMS, Voice and Email, to address developer needs and partner with Marketing, Product and additional teams.  The role requires a deep understanding of the developer community and technical knowledge, as well as the ability to take complex ideas and make them accessible in order to inspire creativity through code.</p>\n<h2><strong>Responsibilities</strong></h2>\n<p>In this role, you’ll:</p>\n<ul>\n<li>Help us inspire and equip developers to build with Twilio products, ensuring an exceptional developer experience with Twilio.</li>\n<li>Be an active and authentic participant in the developer community wherever they gather online and offline. For many of those developers, you will be &#8220;the face&#8221; of Twilio &#8212; the person they ping when they need help. They will feel like VIPs because they know you. And when someone who works at Twilio needs to talk to developers in the EMEA developer community, they&#8217;ll come to you.</li>\n<li>Attend, plan and speak at in-person and virtual events.</li>\n<li>Write clear and empathetic content that breaks down the complex into the understandable while telling stories with code, equipping developers with knowledge of tools and techniques.</li>\n<li>Navigate cross-functional collaboration and partner within Twilio to align with program and engagement objectives.</li>\n<li>Drive projects independently from inception to completion, outlining key milestones and ensuring deadlines are met.</li>\n<li>Communicate project plans, progress, and outcomes effectively to stakeholders at all levels within the EMEA region and across the company.</li>\n</ul>\n<h2><strong>Qualifications </strong></h2>\n<p>Twilio values diverse experiences from all kinds of industries, and we encourage everyone who meets the required qualifications to apply. If your career is just starting or hasn&#8217;t followed a traditional path, don&#8217;t let that stop you from considering Twilio. We are always looking for people who will bring something new to the table!</p>\n<h2><strong>Required: </strong></h2>\n<ul>\n<li>Proficient in writing Python, PHP, Node, C# (.NET), or Java with insights into web frameworks within or across these languages.</li>\n<li>A love of teaching others, curiosity and excitement about technology.</li>\n<li>Over 5 years of experience writing production code, with strong empathy for developers to successfully guide their building process.</li>\n<li>Experience in cross-functional collaboration with teams like sales, support, product and marketing.</li>\n<li>Creative and collaborative problem-solving skills, with a focus on data-driven decision-making for system and process improvements.</li>\n<li>Skilled in storytelling to highlight developers building on Twilio and inspire others.</li>\n<li>Experience in public speaking, writing, and/or organizing engaging programs.</li>\n</ul>\n<h2><strong>Desired:</strong></h2>\n<ul>\n<li>Familiarity with the EMEA developer and industry landscape, including local communities, events and programs.</li>\n<li>Familiarity with project management tools and methodologies.</li>\n<li>Ability to influence and build effective working relationships across all levels of the organization.</li>\n<li>Excellent skills in influencing, problem-solving, consensus-building, and strong interpersonal communication.</li>\n<li>Experience in organizing and running developer events.</li>\n</ul>\n<h2><strong>Location</strong></h2>\n<p>This role will be remote, and based in the UK/Ireland region.</p>\n<h2><strong>Travel </strong></h2>\n<p>We prioritize connection and opportunities to build relationships with our customers and each other. For this role, approximately 25-50% travel is anticipated to help you connect in-person in a meaningful way.</p>\n<h2><strong>What We Offer</strong></h2>\n<p>There are many benefits to working at Twilio, including, in addition to competitive pay, things like generous time-off, ample parental and wellness leave, healthcare, a retirement savings program, and much more. Offerings vary by location.</p>",
        "pubDate": "2025-05-06 11:55:02"
    },
    {
        "id": 116707,
        "url": "https://jobicy.com/jobs/116707-senior-software-engineer-ii-2",
        "jobSlug": "116707-senior-software-engineer-ii-2",
        "jobTitle": "Software Engineer III",
        "companyName": "Wrapbook",
        "companyLogo": "https://jobicy.com/data/server-nyc0409/galaxy/mercury/2024/03/4daf69c7-221.jpeg",
        "jobIndustry": [
            "Software Engineering"
        ],
        "jobType": [
            "full-time"
        ],
        "jobGeo": "Canada,  USA",
        "jobLevel": "Any",
        "jobExcerpt": "Wrapbook is looking for a Software Engineer III (Ruby on Rails) who will play a hands-on role in driving our mission to build an outstanding technology company. You will be working as part of a cross-functional team, significantly contributing to our core features from start to finish. What you&amp;#8217;ll Do Collaborate with other developers, designers&amp;#8230;",
        "jobDescription": "<p>Wrapbook is looking for a Software Engineer III (Ruby on Rails) who will play a hands-on role in driving our mission to build an outstanding technology company. You will be working as part of a cross-functional team, significantly contributing to our core features from start to finish.</p>\n<h2><strong>What you&#8217;ll Do</strong></h2>\n<ul>\n<li>Collaborate with other developers, designers and product managers to provide elegant solutions to Wrapbook customer problems</li>\n<li>Review code and have your code reviewed.</li>\n<li>Write performant, scalable, and secure software</li>\n<li>Ensure code is well-tested and well-architected</li>\n</ul>\n<h2><strong>What you’ll Have</strong></h2>\n<ul>\n<li>You have at least three years of experience building production web applications</li>\n<li>You are eager to learn and level up your skills</li>\n<li>You have experience writing SQL queries and a general understanding of SQL indices (PostgreSQL is a plus)</li>\n<li>You are customer-focused and like to pay attention to detail and value quality</li>\n<li>You have experience building Ruby on Rails applications and APIs</li>\n<li>Experience or interest in working with modern Rails Frontend technologies like Hotwire (Turbo and StimulusJS)</li>\n</ul>\n<h2><strong>Our Tech Stack</strong></h2>\n<ul>\n<li>Full stack Ruby on Rails (Frontend &amp; Backend)</li>\n<li>StimulusJS</li>\n<li>Redis</li>\n<li>Sidekiq</li>\n<li>PostgreSQL</li>\n<li>Kubernetes</li>\n</ul>\n<h2><strong>Why Join Us</strong></h2>\n<p>At Wrapbook, creativity meets technology — and not just in the product.</p>\n<p>In addition to a competitive salary and all the benefits you can expect from a fast-growing technology company, you’ll get access to a team of creative problem solvers and the chance to see your contributions make large impacts Benefits include:</p>\n<ul>\n<li>Unlimited Paid Time Off</li>\n<li>Work from anywhere in Canada and USA</li>\n<li>Health and Dental benefits</li>\n<li>Up to $1,500 USD/ $2,025 CAD towards IT set up for your home</li>\n<li>Up to 2% matching RRSP / 401K</li>\n<li>Learning and Development opportunities</li>\n<li>Up to $50 USD/ $67.50 CAD towards Internet/Cell phone service</li>\n</ul>\n<h2><strong>Our Pledge to Fostering an Inclusive and Safe Workplace</strong></h2>\n<p>Wrapbook pledges to be a harassment- and discrimination-free space for everyone, regardless of age, disability, ethnicity, gender identity or expression, nationality, neurotype, personal appearance, political affiliation, professional background, race, religion, or sexual identity or orientation.</p>\n<h2>Compensation:</h2>\n<ul>\n<li>Zone A: San Francisco, Los Angeles, Seattle, New York City, Boston, San Diego, Washington DC $140.4K – $191.3K</li>\n<li>Zone B: All Other US Locations $126.4K – $172.2K</li>\n<li>Zone C: All Locations in Canada CA$126.4K – CA$172.2K</li>\n</ul>\n<p>Wrapbook employs individuals across the United States and Canada, and the salary range spans multiple geographic zones based on market benchmark data. Your zone is dependent on where you live. <em>(The compensation listed is not inclusive of any bonus, commission, benefits, or equity that might exist in your total compensation package.)</em></p>",
        "pubDate": "2025-05-05 04:53:25",
        "annualSalaryMin": 126400,
        "annualSalaryMax": 172200,
        "salaryCurrency": "CAD"
    },
    {
        "id": 116877,
        "url": "https://jobicy.com/jobs/116877-python-developer",
        "jobSlug": "116877-python-developer",
        "jobTitle": "Python Developer",
        "companyName": "Bitfinex",
        "companyLogo": "https://jobicy.com/data/server-nyc0409/galaxy/mercury/2021/10/4e7d470f48dde438b7e7ee118231262d.png",
        "jobIndustry": [
            "Programming"
        ],
        "jobType": [
            "full-time"
        ],
        "jobGeo": "Europe",
        "jobLevel": "Any",
        "jobExcerpt": "Our team, composed of visionary individuals with practical expertise, focuses on crafting solutions to the market&amp;#8217;s toughest challenges. Despite our global presence and impact, we maintain a small, technology-focused core, fostering a culture of collaboration and innovation. We value integrity and autonomy, empowering our team to contribute from concept to launch. Driven by a passion&amp;#8230;",
        "jobDescription": "<p>Our team, composed of visionary individuals with practical expertise, focuses on crafting solutions to the market&#8217;s toughest challenges. Despite our global presence and impact, we maintain a small, technology-focused core, fostering a culture of collaboration and innovation.</p>\n<p>We value integrity and autonomy, empowering our team to contribute from concept to launch. Driven by a passion for lifelong learning and a commitment to advancing freedom, we prioritize high-caliber products and services, with a proven track record of innovation that draws on the dexterity of our teams.</p>\n<h2><strong>Why join us</strong></h2>\n<p><strong>Innovation</strong></p>\n<p>At Bitfinex, we merge technology and skill to create an environment where your involvement isn’t just appreciated—it’s pioneering the future and pushing boundaries in finance. Our culture values bold creativity, a passion for technology, and a deep belief in Financial Freedom.</p>\n<p><strong>Flexibility &amp; Global Reach</strong></p>\n<p>We believe in trust, autonomy, and results—our team operates remotely, ensuring you work from anywhere while collaborating with some of the best talents across the world. We thrive on innovation, autonomy, and breaking new ground.</p>\n<p><strong>Fast-Paced &amp; Impactful</strong></p>\n<p>Much like the crypto industry itself, our projects move fast, break new ground and make an impact. Your contributions reach our global audience, shaping the narrative of a decentralized future.</p>\n<p><strong>A Team that Thrives on Collaboration</strong></p>\n<p>We blend seasoned experts with fresh, creative minds, ensuring constant innovation, mentorship, and a dynamic work environment that keeps you at the forefront of achieving your goals. We see integrity and standing up for what is right as the most important qualities.</p>\n<p><strong>Grow with the Best</strong></p>\n<p>At Bitfinex, we’re committed to continuous learning—whether through technological advancements, creative workshops, or mentorship from leading professionals in the industry.</p>\n<h2><strong>We’re looking for</strong></h2>\n<p>Python developer to join our Risk Management Team.</p>\n<h2><strong>Your Day-to-Day</strong></h2>\n<ul>\n<li>Develop and maintain risk analytics tools and interactive web applications using Python (Flask/Django/FastAPI).</li>\n<li>Maintain and optimize interactive web applications for risk reporting, visualization and analysis.</li>\n<li>Design and implement APIs to support risk management workflows.</li>\n<li>Automate data pipelines using Pandas, NumPy, and SQL/NoSQL databases for efficient data processing and risk reports.</li>\n<li>Ensure secure and scalable architecture for risk-related applications, following best practices in software development.</li>\n<li>Collaborate with risk analysts to translate requirements into technical solutions.</li>\n<li>Maintain code quality through version control, testing and documentation.</li>\n</ul>\n<h2><strong>Benefits</strong></h2>\n<ul>\n<li>Flexible Work &amp; Remote-Friendly Culture</li>\n<li>Mentorship &amp; Growth</li>\n<li>Competitive Pay</li>\n<li>Career Development Opportunities</li>\n<li>Supportive Team Environment</li>\n<li>Learning &amp; Knowledge Sharing</li>\n<li>Team-Building Activities</li>\n<li>Social activities (online &amp; in-person)</li>\n</ul>\n<p><strong>Ready to join us in bringing Financial Freedom to all?</strong></p>\n<p>If you’re a visionary who thrives at the intersection of technology, knowledge and innovation, we want to hear from you!</p>\n<p><strong><em>Important Disclaimer:</em></strong></p>\n<p><em>All tasks, assessments, or tests related to the hiring process at Bitfinex will only be shared directly with candidates as they progress through the relevant stages. These will only come from an official Bitfinex email address in the format: firstname.lastname[at]bitfinex.com.</em></p>\n<p><em>If you receive an email or any notification requesting that you click on any links or complete hiring-related tasks, please verify that it is coming from the correct and authorised source before proceeding.</em></p>\n<p><strong><em>Equal Opportunity Statement:</em></strong></p>\n<p><em>Bitfinex is committed to providing equal opportunities to all personnel and applicants. We firmly condemn and prohibit any form of direct or indirect discrimination or harassment based on race, color, religion, age, sex, national origin, disability status, genetics, sexual orientation, gender identity or expression, or any other legally protected characteristic.</em></p>\n<p><em>This commitment applies at every stage of the employment relationship, including recruiting, hiring, placement, promotion, terminations, transfers, and leaves of absence.</em></p>\n<h2><strong>What You Bring to the Table</strong></h2>\n<p><strong>Technical Skills:</strong></p>\n<ul>\n<li>Strong Python programming skills, with experience in Flask/Django/FastAPI.</li>\n<li>Proficient in JavaScript and modern front-end frameworks.</li>\n<li>Experience designing and developing RESTful APIs.</li>\n<li>Strong knowledge of SQL and NoSQL databases.</li>\n<li>Strong understanding of security best practices.</li>\n<li>Experience with testing frameworks and version control.</li>\n</ul>\n<p><strong>Financial Knowledge:</strong></p>\n<ul>\n<li>Understanding of financial markets/instruments and risk management.</li>\n<li>Experience working with market data, P&amp;L, and risk metrics.</li>\n<li>Degree in Engineering, Mathematics, Physics or any other quantitative subjects.</li>\n<li>Flexibility as to working arrangements and hours.</li>\n<li>Located in a European country</li>\n</ul>",
        "pubDate": "2025-05-04 05:41:23"
    },
    {
        "id": 116641,
        "url": "https://jobicy.com/jobs/116641-senior-mobile-content-developer",
        "jobSlug": "116641-senior-mobile-content-developer",
        "jobTitle": "Sr. Mobile Content Developer",
        "companyName": "DataCamp",
        "companyLogo": "https://jobicy.com/data/server-nyc0409/galaxy/mercury/2024/03/5a36841e-221.jpeg",
        "jobIndustry": [
            "Programming"
        ],
        "jobType": [
            "full-time"
        ],
        "jobGeo": "Europe",
        "jobLevel": "Senior",
        "jobExcerpt": "As a Data Science Mobile Content Developer, you will directly contribute to DataCamp’s mission to democratize data education! You’ll be working closely with our product teams to create a great education experience for DataCamp! As part of our Data Science and AI Curriculum team, the role will provide you with opportunities to work with members&amp;#8230;",
        "jobDescription": "<p>As a Data Science Mobile Content Developer, you will directly contribute to DataCamp’s mission to democratize data education! You’ll be working closely with our product teams to create a great education experience for DataCamp!</p>\n<p>As part of our Data Science and AI Curriculum team, the role will provide you with opportunities to work with members of the team to improve the quality of existing content on our mobile app. You’ll be working on courses and practice pools acting as a reviewer, thought partner, and, most importantly, an advocate for our learners. With a product-first mentality and a strong technical competency in Python, you will work with cross-functional groups to make data-driven decisions to iterate on content.</p>\n<p>This position is ideal for someone with a passion for data science and education, who wants to join a fast-growing startup that’s training the next generation of data scientists and building the world’s best network of data science instructors.</p>\n<h2><strong>About you:</strong></h2>\n<p>At DataCamp, we seek individuals who embody our core values of data-driven decision-making, action, transparency, ownership, and customer focus. You thrive in a fast-paced, high-performing environment and are driven by a passion for making a meaningful impact. You&#8217;re adaptable, embracing change and ambiguity with enthusiasm. Your initiative and entrepreneurial spirit push you beyond just meeting targets—you aim to understand the &#8220;why&#8221; behind our goals and take ownership to drive the business forward. You’re a collaborative team player who values transparency and always seeks to improve and innovate. If this sounds like you, we encourage you to apply!</p>\n<h2><strong>Responsibilities:</strong></h2>\n<p>In this role, you will focus your time on the following areas:</p>\n<p><strong>Content Creation</strong></p>\n<ul>\n<li>Act as the product expert for our mobile content.</li>\n<li>Create engaging data content for our mobile app to complement our existing library.</li>\n<li>Work with a cross-functional team to enable new forms of content for our mobile learners.</li>\n<li>Own critical changes that improve the content experience.</li>\n<li>Make data-driven suggestions for content improvements based on learner feedback and engagement data.</li>\n</ul>\n<p><strong>Project Management</strong></p>\n<ul>\n<li>Be a liaison between the Content team and mobile product teams.</li>\n<li>Work closely with internal collaborators to make mobile content interactive and engaging.</li>\n<li>Effectively set and hold others accountable for project deadlines.</li>\n</ul>\n<h2><strong>Qualifications:</strong></h2>\n<ul>\n<li>Strong technical background with experience in Python.</li>\n<li>Prior experience generating content on mobile devices.</li>\n<li>Prior experience with product or project management.</li>\n<li>Know when to push back, challenge an idea, or seek compromise, and do so positively and for the company&#8217;s benefit.</li>\n<li>Experience working with various stakeholders and cross-functional groups.</li>\n<li>Has worked on a mobile app team.</li>\n<li>Has completed online or mobile courses from DataCamp and other mobile providers.</li>\n<li>Experience teaching others; able to effectively synthesize, visualize, and communicate your ideas to others, including non-technical audiences.</li>\n<li>Strong command of English, both written and verbal.</li>\n</ul>\n<h2><strong>Why Datacamp?</strong></h2>\n<p>Joining DataCamp means becoming part of a dynamic, creative, and international start-up. Here are just a few of the reasons why you’ll love being on our team:</p>\n<ul>\n<li>Exciting challenges: Face new technical challenges daily, keeping your work engaging and rewarding.</li>\n<li>Competitive compensation: We offer a competitive salary with attractive benefits.</li>\n<li>Flexibility: Benefit from flexible working hours because the future is flexible!</li>\n<li>Continuous learning: Access a yearly learning budget for conferences &amp; training to support your professional growth.</li>\n<li>Global retreats: Participate in international company retreats, fostering a global team spirit.</li>\n<li>Equipment: Yearly refreshment of your IT Equipment budget for your home working setup.</li>\n<li>Amazing team: Collaborate with a truly exceptional team—seriously, we’re awesome!</li>\n</ul>\n<p>Our competitive compensation package offers additional benefits. On top of your salary you will also receive extra legal benefits such as best-in-class medical insurance including dental and vision. Depending on your location additional benefits might be available to you.</p>\n<p>At DataCamp, we value diverse experiences and perspectives. If you’re excited about this role but don&#8217;t meet every qualification, we still encourage you to apply. We believe skills can be developed and are committed to fostering an inclusive workplace where everyone can thrive. Your unique talents and perspectives are what make our team great!</p>",
        "pubDate": "2025-05-02 04:21:16"
    }
]



