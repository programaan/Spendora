import { Input } from "@/components/ui/input";

function IncomeFilters({
  search,
  setSearch,
  category,
  setCategory,
  sort,
  setSort,
}) {
  return (
    
    <section className="mb-8">

    <div
        className="
          flex
          flex-col
          gap-4
          rounded-3xl
          border
          bg-card
          p-5
          shadow-sm
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >

      <Input
        placeholder="Search income..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="h-11 w-full lg:w-[380px]"
      />

      <div className="grid grid-cols-2 gap-3 lg:flex">

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="
              h-11
              w-full
              lg:w-48
              rounded-xl
              border
              bg-background
              px-4
              text-sm
              outline-none
              transition
              focus:ring-2
              focus:ring-primary
            "
          >
          <option value="All Categories">All Categories</option>
          <option value="Salary">Salary</option>
          <option value="Freelance">Freelance</option>
          <option value="Investment">Investment</option>
          <option value="Business">Business</option>
          <option value="Other">Other</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="
              h-11
              w-full
              lg:w-44
              rounded-xl
              border
              bg-background
              px-4
              text-sm
              outline-none
              transition
              focus:ring-2
              focus:ring-primary
            "
          >
          <option value="Newest First">Newest First</option>
          <option value="Oldest First">Oldest First</option>
          
        </select>

      </div>

    </div>

    </section>
    
  );

}

export default IncomeFilters;