// sourced from https://worldpopulationreview.com/

export const Million = 1000000;
export const WorldPopulation = 7800; // in millions
export const DefaultIr = .23; // %
export const DefaultMr = 3.79; // %

export const Countries = [
  {name: 'World', population: 7800000000},
  {name: 'China', population: 1439323776},
  {name: 'India', population: 1380004385},
  {name: 'United States', population: 331002651},
  {name: 'Pakistan', population: 220892340},
  {name: 'Brazil', population: 212559417},
  {name: 'Russia', population: 145934462},
  {name: 'Japan', population: 126476461},
  {name: 'Vietnam', population: 97338579},
  {name: 'Germany', population: 83783942},
  {name: 'United Kingdom', population: 67886011},
  {name: 'France', population: 65273511},
  {name: 'Italy', population: 60461826},
  {name: 'South Africa', population: 59308690},
  {name: 'South Korea', population: 51269185},
  {name: 'Spain', population: 46754778},
  {name: 'Argentina', population: 45195774},
  {name: 'Ukraine', population: 43733762},
  {name: 'Afghanistan', population: 38928346},
  {name: 'Poland', population: 37846611},
  {name: 'Canada', population: 37742154},
  {name: 'Saudi Arabia', population: 34813871},
  {name: 'Malaysia', population: 32365999},
  {name: 'North Korea', population: 25778816},
  {name: 'Australia', population: 25499884},
  {name: 'Taiwan', population: 23816775},
  {name: 'Netherlands', population: 17134872},
  {name: 'Belgium', population: 11589623},
  {name: 'Czech Republic', population: 10708981},
  {name: 'Greece', population: 10423054},
  {name: 'Portugal', population: 10196709},
  {name: 'Sweden', population: 10099265},
  {name: 'United Arab Emirates', population: 9890402},
  {name: 'Hungary', population: 9660351},
  {name: 'Austria', population: 9006398},
  {name: 'Switzerland', population: 8654622},
  {name: 'Israel', population: 8655535},
  {name: 'Hong Kong', population: 7496981},
  {name: 'Singapore', population: 5850342},
  {name: 'Denmark', population: 5792202},
  {name: 'Finland', population: 5540720},
  {name: 'Norway', population: 5421241},
  {name: 'Ireland', population: 4937786},
  {name: 'New Zealand', population: 4822233},
  {name: 'Luxembourg', population: 625978},
  {name: 'Iceland', population: 341243},
  {name: 'Greenland', population: 56770},
  {name: 'Vatican City', population: 801}
];

export const Cities = [
  {name: 'Tokyo', country: 'Japan', population: 37393128},
  {name: 'Delhi', country: 'India', population: 30290936},
  {name: 'Shanghai', country: 'China', population: 27058480},
  {name: 'Sao Paulo', country: 'Brazil', population: 22043028},
  {name: 'Beijing', country: 'China', population: 20462610},
  {name: 'Mumbai', country: 'India', population: 20411274},
  {name: 'Istanbul', country: 'Turkey', population: 15190336},
  {name: 'Rio de Janeiro', country: 'Brazil', population: 13458075},
  {name: 'Moscow', country: 'Russia', population: 12537954},
  {name: 'Paris', country: 'France', population: 11017230},
  {name: 'Seoul', country: 'South Korea', population: 9963452},
  {name: 'London', country: 'United Kingdom', population: 9304016},
  {name: 'New York', country: 'United States', population: 8323340},
  {name: 'Rome', country: 'Italy', population: 4257056},
  {name: 'Los Angeles', country: 'United States', population: 4015940},
  {name: 'Berlin', country: 'Germany', population: 3562038},
  {name: 'Houston', country: 'United States', population: 2340890},
  {name: 'Hamburg', country: 'Germany', population: 1789954},
  {name: 'Stockholm', country: 'Sweden', population: 1632798},
  {name: 'Chicago', country: 'United States', population: 2694240},
  {name: 'Vancouver', country: 'Canada', population: 2581079},
  {name: 'Hiroshima', country: 'Japan', population: 2083223},
  {name: 'Vienna', country: 'Austria', population: 1929944},
  {name: 'Budapest', country: 'Hungary', population: 1768073},
  {name: 'Munich', country: 'Germany', population: 1538302},
  {name: 'Zurich', country: 'Switzerland', population: 1395356},
  {name: 'Copenhagen', country: 'Denmark', population: 1346485},
  {name: 'Dublin', country: 'Ireland', population: 1228179},
  {name: 'Amsterdam', country: 'Netherlands', population: 1148972},
  {name: 'Oslo', country: 'Norway', population: 1041377},
  {name: 'San Francisco', country: 'United States', population: 896047},
  {name: 'Las Vegas', country: 'United States', population: 662000},
  {name: 'Geneva', country: 'Switzerland', population: 613373},
  {name: 'Kansas City', country: 'United States', population: 505198}
];

export const Regions = [
  {
    name: 'Eastern Asia',
    population: 1678089619
  },
  {
    name: 'Western Europe',
    population: 196146316
  }
];

export const Continents = [
  {
    name: 'Eurasia',
    population: 5388690801
  },
  {
    name: 'Asia',
    population: 4641054775
  },
  {
    name: 'Europe',
    population: 747636026
  },
  {
    name: 'North America',
    population: 368869647
  }
];

export const PlacesSortedByName = Countries.concat(Cities).concat(Regions).concat(Continents).sort((
  placeA,
  placeB
) => placeA.name.localeCompare(placeB.name));

export const PlacesSortedByPopulation = Countries.concat(Cities).concat(Regions).concat(Continents).sort((
  placeA,
  placeB
) => {
  if (placeA.population > placeB.population) {
    return 1;
  }
  if (placeA.population < placeB.population) {
    return -1;
  }
  return 0;
});
