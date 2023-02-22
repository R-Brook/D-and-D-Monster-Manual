import React, { useEffect } from "react";
import Head from "next/head";
import client from "../apollo-graphql/apollo-client";
import { Card } from "components/card";
import { MONSTERS_QUERY } from "apollo-graphql/queries/monsters";
import { MonstersProps } from "types/monsters";
import { hasImageInPublicFolder } from "utilities/images";
import { Select } from "components/select";
import { MonsterAC, MonsterSize, MonsterType } from "utilities/monster-filters";
import { SelectedFilter } from "components/selectedFilter";

export default function Home({ monstersData }: MonstersProps) {
  const [filteredList, setFilteredList] = React.useState(monstersData);
  const [selectedSize, setSelectedSize] = React.useState("ALL");
  const [selectedType, setSelectedType] = React.useState("ALL");
  const [selectedAC, setSelectedAC] = React.useState("ALL");
  const [resultsTotal, setResultsTotal] = React.useState();

  const filterBySize = (filteredData: any) => {
    if (selectedSize === "ALL") {
      return filteredData;
    }
    const filteredSize = filteredData.filter(
      (monster: { size: string }) => monster.size === selectedSize
    );
    return filteredSize;
  };

  const filterByType = (filteredData: any) => {
    if (selectedType === "ALL") {
      return filteredData;
    }
    const filteredType = filteredData.filter(
      (monster: { type: string }) => monster.type === selectedType
    );
    return filteredType;
  };

  const filterByAC = (filteredData: any) => {
    if (selectedAC === "ALL") {
      return filteredData;
    }
    const filteredAC = filteredData.filter(
      (monster: { armor_class: { value: string }[] }) =>
        monster.armor_class[0].value.toString() === selectedAC
    );
    return filteredAC;
  };

  const handleSizeSelection = (event: any) => {
    const value = event.target.value;
    setSelectedSize(value.toUpperCase());
  };
  const handleTypeSelection = (event: any) => {
    const value = event.target.value;
    setSelectedType(value.toUpperCase());
  };
  const handleACSelection = (event: any) => {
    const value = event.target.value;
    setSelectedAC(value.toUpperCase());
  };

  useEffect(() => {
    let filteredData = filterBySize(monstersData);
    filteredData = filterByType(filteredData);
    filteredData = filterByAC(filteredData);
    setFilteredList(filteredData);
    setResultsTotal(filteredData.length);
  }, [selectedSize, selectedType, selectedAC]);

  return (
    <>
      <Head>
        <title>D&D 5e Monster Manual</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container">
        <div className="cards-container">
          <div className="filter-container">
            <Select
              required={false}
              label={"Monster size"}
              name={"monster-size"}
              id={"size"}
              value={selectedSize}
              onChange={(event) => handleSizeSelection(event)}
            >
              {MonsterSize.map((size) => (
                <option value={size} key={size}>
                  {size}
                </option>
              ))}
            </Select>
            <Select
              required={false}
              label={"Monster type"}
              name={"monster-type"}
              id={"type"}
              value={selectedType}
              onChange={(event) => handleTypeSelection(event)}
            >
              {MonsterType.map((type) => (
                <option value={type} key={type}>
                  {type}
                </option>
              ))}
            </Select>
            <Select
              required={false}
              label={"Monster AC value"}
              name={"monster-ac"}
              id={"ac"}
              value={selectedAC}
              onChange={(event) => handleACSelection(event)}
            >
              {MonsterAC.map((ac) => (
                <option value={ac} key={ac}>
                  {ac}
                </option>
              ))}
            </Select>
          </div>
          <div className="selected-filter-container">
            <div className="totals">{resultsTotal} results</div>
            {selectedSize !== "ALL" && (
              <SelectedFilter
                label={"Monster size"}
                selected_value={selectedSize}
                onClick={() => setSelectedSize("ALL")}
              />
            )}
            {selectedType !== "ALL" && (
              <SelectedFilter
                label={"Monster type"}
                selected_value={selectedType}
                onClick={() => setSelectedType("ALL")}
              />
            )}
            {selectedAC !== "ALL" && (
              <SelectedFilter
                label={"AC value"}
                selected_value={selectedAC}
                onClick={() => setSelectedAC("ALL")}
              />
            )}
          </div>

          {filteredList.map((monster) => (
            <div className="card-container">
              <Card
                key={monster.index}
                name={monster.name}
                index={monster.index}
                image={
                  monster.image && monster.image.length > 0
                    ? `https://www.dnd5eapi.co${monster.image}`
                    : hasImageInPublicFolder.includes(monster.index)
                    ? `/images/monsters/${monster.index}.jpg`
                    : null
                }
                type={monster.type}
                size={monster.size}
                hit_points={monster.hit_points}
                armor_class_value={monster.armor_class[0].value}
              />
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  let monstersData = {} as MonstersProps;

  await client
    .query({
      query: MONSTERS_QUERY,
    })
    .then((res) => {
      monstersData = res.data.monsters;
    });

  return {
    props: {
      monstersData,
    },
  };
}
