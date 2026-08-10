function ReportsFilter({
  range,
  setRange,
}) {
  return (
    
    <section className="mb-8 flex flex-col gap-4 rounded-3xl border bg-card p-5 shadow-sm md:flex-row md:items-center md:justify-between">

      <div>

        <h3 className="text-lg font-semibold">
          Report Range
        </h3>

        <p className="text-sm text-muted-foreground">
          Select the period for generating analytics.
        </p>

      </div>

      <select
        value={range}
        onChange={(e) => setRange(e.target.value)}
        className="
          h-11
          w-full
          rounded-xl
          border
          bg-background
          px-4
          text-sm
          font-medium
          outline-none
          transition
          focus:ring-2
          focus:ring-primary
          md:w-52
        "
      >
        <option value="all">
          All Time
        </option>

        <option value="7">
          Last 7 Days
        </option>

        <option value="30">
          Last 30 Days
        </option>

        <option value="month">
          This Month
        </option>

        <option value="year">
          This Year
        </option>

      </select>

    </section>
  );

}

export default ReportsFilter;