const WhyItMatters = () => {
  return (
    <section className="relative py-20 px-6 bg-gradient-to-br from-[#f9f4ff] to-[#f2f6fd]">
      <div className="flex flex-col md:flex-row items-center  md:px-6">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 ">
          Why It Matters
        </h2>

        <p className="text-lg  leading-relaxed max-w-2xl mx-auto">
          Marginalized communities often face invisible barriers when navigating
          traditional job boards and opportunity platforms. Despite good
          intentions, most systems fail to reflect their real-world contexts and
          strengths.
          <br />
          <br />
          <span className="font-medium text-[var(--equipurple)]">
            EquiBridge changes that — using inclusive AI to recommend
            meaningful, tailored opportunities that empower every individual to
            rise.
          </span>
        </p>
      </div>
    </section>
  );
};

export default WhyItMatters;
