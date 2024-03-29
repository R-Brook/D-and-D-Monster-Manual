import React from "react";
import client from "../../../apollo-graphql/apollo-client";

import Head from "next/head";
import { MonsterProps } from "types/monster";
import { MONSTER_QUERY } from "apollo-graphql/queries/monster";
import { MONSTER_INDEX_QUERY } from "apollo-graphql/queries/monsterByIndex";

export default function MonsterPage({ monsterData }: MonsterProps) {
  const proficiencies = monsterData.proficiencies
    ? Object.entries(monsterData.proficiencies)
    : [];

  const specialAbilities = monsterData.special_abilities
    ? Object.entries(monsterData.special_abilities)
    : [];

  return (
    <>
      <Head>
        <title> - D&D 5e Monster Manual</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container">
        <h1>{monsterData.name}</h1>
        <ul>
          <li>XP: {monsterData.xp}</li>
          <li>Challenge rating: {monsterData.challenge_rating}</li>
          <li>Size: {monsterData.size}</li>
          <li>Type: {monsterData.type}</li>
          <li>Hit points: {monsterData.hit_points}</li>
          <li>Hit dice: {monsterData.hit_dice}</li>
          <li>
            Ability scores:
            <ul>
              <li>Strength: {monsterData.strength}</li>
              <li>Dexterity: {monsterData.dexterity}</li>
              <li>Constitution: {monsterData.constitution}</li>
              <li>Intelligence: {monsterData.intelligence}</li>
              <li>Wisdom: {monsterData.wisdom}</li>
              <li>Charisma: {monsterData.charisma}</li>
            </ul>
          </li>
          <li>
            Armour:
            <ul>
              <li>Armour type: {monsterData.armor_class[0].type}</li>
              <li>Armour value: {monsterData.armor_class[0].value}</li>
            </ul>
          </li>
          <li>Hit points roll: {monsterData.hit_points_roll}</li>
          <li>
            Speed:
            <ul>
              <li>
                Burrow:{" "}
                {monsterData.speed.burrow ? monsterData.speed.burrow : "n/a"}
              </li>
              <li>
                Climb:{" "}
                {monsterData.speed.climb ? monsterData.speed.climb : "n/a"}
              </li>
              <li>
                Fly: {monsterData.speed.fly ? monsterData.speed.fly : "n/a"}
              </li>
              <li>
                Swim: {monsterData.speed.swim ? monsterData.speed.swim : "n/a"}
              </li>
              <li>
                Walk: {monsterData.speed.walk ? monsterData.speed.walk : "n/a"}
              </li>
            </ul>
          </li>
          <li>
            Languages: {monsterData.languages ? monsterData.languages : "n/a"}
          </li>
          <li>
            Senses:
            <ul>
              {monsterData.senses && monsterData.senses.blindsight && (
                <li>Blindsight: {monsterData.senses.blindsight}</li>
              )}
              {monsterData.senses && monsterData.senses.darkvision && (
                <li>Darkvision: {monsterData.senses.darkvision}</li>
              )}
              {monsterData.senses && monsterData.senses.passive_perception && (
                <li>
                  Passive perception: {monsterData.senses.passive_perception}
                </li>
              )}
              {monsterData.senses && monsterData.senses.tremorsense && (
                <li>Tremoursense: {monsterData.senses.tremorsense}</li>
              )}
              {monsterData.senses && monsterData.senses.truesight && (
                <li>Truesight: {monsterData.senses.truesight}</li>
              )}
            </ul>
          </li>
          <li>
            Damage resistances:{" "}
            {monsterData.damage_resistances.length > 0
              ? monsterData.damage_resistances
              : `None`}
          </li>
          <li>
            Damage vulnerabilities:{" "}
            {monsterData.damage_vulnerabilities.length > 0
              ? monsterData.damage_vulnerabilities
              : `None`}
          </li>
          <li>
            Damage immunities:{" "}
            {monsterData.damage_immunities.length > 0
              ? monsterData.damage_immunities
              : `None`}
          </li>
          <li>
            Proficiences:{" "}
            {proficiencies.length > 0 ? (
              <ul>
                {proficiencies.map((proficiency) => {
                  return (
                    <li key={proficiency[1].proficiency.name}>
                      {proficiency[1].proficiency.name}: {proficiency[1].value}
                    </li>
                  );
                })}
              </ul>
            ) : (
              "None"
            )}
          </li>
          <li>
            Special abilities:{" "}
            {specialAbilities.length > 0 ? (
              <ul>
                {specialAbilities.map((ability) => {
                  const formatDescription = ability[1].desc.split("- ");

                  return (
                    <>
                      {ability[1].name}:
                      <ul>
                        {formatDescription.length > 0 && (
                          <li>{formatDescription[0]}</li>
                        )}
                        {formatDescription.length > 1 && (
                          <ul>
                            {formatDescription.slice(1).map((item: string) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        )}
                        {ability[1].usage && (
                          <li>
                            Usage:
                            <ul>
                              <li>Times: {ability[1].usage.times}</li>
                              <li>Type: {ability[1].usage.type}</li>
                              {ability[1].usage.rest_types && (
                                <li>
                                  Rest types: {ability[1].usage.rest_types}
                                </li>
                              )}
                            </ul>
                          </li>
                        )}
                        {ability[1].dc && (
                          <li>DC type: {ability[1].dc.type.name}</li>
                        )}
                      </ul>
                    </>
                  );
                })}
              </ul>
            ) : (
              "None"
            )}
          </li>
        </ul>
      </main>
    </>
  );
}

export const getStaticPaths = async () => {
  const { data } = await client.query({
    query: MONSTER_INDEX_QUERY,
  });
  return {
    paths: data.monsters.map((param: { index: any }) => ({
      params: { index: param.index },
    })),
    fallback: false,
  };
};

export async function getStaticProps({ params }: any) {
  let monsterData = {} as MonsterProps;
  await client
    .query({
      query: MONSTER_QUERY,
      variables: {
        path: params.index,
      },
    })
    .then((res) => {
      monsterData = res.data.monster;
    });
  return {
    props: {
      monsterData,
    },
  };
}
