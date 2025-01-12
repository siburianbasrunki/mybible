import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useBibleApi from "../hooks/useAlkitab";

const KitabSuci = () => {
  const navigate = useNavigate();
  const [, setSelectedBibleId] = useState(null);
  const [filterCountry, setFilterCountry] = useState("ind");
  const { data, error, isLoading } = useBibleApi("/bibles");

  const filterDataByCountry = (data, countryId) => {
    return data
      .filter((bible) =>
        bible.countries.some((country) => country.id === countryId)
      )
      .map((bible) => ({
        id: bible.id,
        name: bible.name,
        description: bible.description,
        nameLocal: bible.nameLocal,
        descriptionLocal: bible.descriptionLocal,
      }));
  };

  const handleBibleClick = (bibleId) => {
    setSelectedBibleId(bibleId);
    navigate(`/bible/${bibleId}/books`);
  };

  const handleFilterChange = (e) => {
    setFilterCountry(e.target.value);
  };

  if (isLoading) {
    return <p>Loading versi Alkitab...</p>;
  }

  if (error) {
    return <p>Error: {error.message || "Terjadi kesalahan."}</p>;
  }

  const filteredData =
    data?.data &&
    filterDataByCountry(data.data, filterCountry === "eng" ? "GB" : "ID");
  // console.log("filteredData", filteredData);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-serif  text-green-600 mb-4">
        Pilih Versi Alkitab
      </h1>

      <div className="flex mb-4 items-center">
        <label className="mr-4">
          <input
            type="radio"
            name="filterCountry"
            value="ind"
            checked={filterCountry === "ind"}
            onChange={handleFilterChange}
          />
          <span className="ml-2">Indonesia</span>
        </label>
        <label>
          <input
            type="radio"
            name="filterCountry"
            value="eng"
            checked={filterCountry === "eng"}
            onChange={handleFilterChange}
          />
          <span className="ml-2">English</span>
        </label>
      </div>

      <div className="container mx-auto flex justify-center items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredData?.map((bible) => (
            <div
              key={bible.id}
              className="relative bg-cover bg-center p-6 rounded-lg shadow-lg cursor-pointer"
              style={{
                backgroundImage: `url(https://i.pinimg.com/736x/89/fd/4b/89fd4b5352dfe44059e71262ac05ccc8.jpg)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.8,
              }}
              onClick={() => handleBibleClick(bible.id)}
            >
              <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>
              <div className="relative z-10 text-center">
                <h2 className="text-2xl font-semibold text-white mb-2">
                  {bible.nameLocal || bible.name}
                </h2>
                <p className="text-white">
                  {bible.descriptionLocal || bible.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KitabSuci;
