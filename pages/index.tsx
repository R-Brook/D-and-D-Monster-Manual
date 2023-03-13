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
import { useRouter } from "next/router";

export default function Home({ monstersData }: MonstersProps) {
  const router = useRouter();

  const [filteredList, setFilteredList] = React.useState(monstersData);
  const [resultsTotal, setResultsTotal] = React.useState();

  console.log("router query", router.query);

  const { type = "ALL", size = "ALL", ac = "ALL" } = router.query;

  const filterBySize = (filteredData: any) => {
    if (size === "ALL" || undefined) {
      return filteredData;
    }
    const filteredSize = filteredData.filter(
      (monster: { size: string }) => monster.size === size
    );
    return filteredSize;
  };

  const filterByType = (filteredData: any) => {
    if (type === "ALL" || undefined) {
      return filteredData;
    }
    const filteredType = filteredData.filter(
      (monster: { type: string }) => monster.type === type
    );
    return filteredType;
  };

  const filterByAC = (filteredData: any) => {
    if (ac === "ALL" || undefined) {
      return filteredData;
    }
    const filteredAC = filteredData.filter(
      (monster: { armor_class: { value: string }[] }) =>
        monster.armor_class[0].value.toString() === ac
    );
    return filteredAC;
  };

  const setQueryParam = (param: string, event: { target: { value: any } }) => {
    const value = event.target.value;
    value === "ALL"
      ? router.push(`/`, undefined, { shallow: true })
      : router.push(`?${param}=${value}`, undefined, { shallow: true });
  };

  const clearParam = (value: string) => {
    const { pathname, query } = router;
    delete router.query[value];
    router.replace({ pathname, query }, undefined, { shallow: true });
  };

  useEffect(() => {
    let filteredData = filterBySize(monstersData);
    filteredData = filterByType(filteredData);
    filteredData = filterByAC(filteredData);
    setFilteredList(filteredData);
    setResultsTotal(filteredData.length);
  }, [size, type, ac]);

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
              value={size}
              onChange={(event) => {
                setQueryParam("size", event);
              }}
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
              value={type}
              onChange={(event) => {
                setQueryParam("type", event);
              }}
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
              value={ac}
              onChange={(event) => {
                setQueryParam("ac", event);
              }}
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
            {size !== "ALL" && (
              <SelectedFilter
                label={"Monster size"}
                selected_value={size}
                onClick={() => clearParam("size")}
              />
            )}
            {type !== "ALL" && (
              <SelectedFilter
                label={"Monster type"}
                selected_value={type}
                onClick={() => clearParam("type")}
              />
            )}
            {ac !== "ALL" && (
              <SelectedFilter
                label={"AC value"}
                selected_value={ac}
                onClick={() => clearParam("ac")}
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
