import { i as __toESM } from "../_runtime.mjs";
import { L as require_react, v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as Menu, t as X } from "../_libs/lucide-react.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CH-IKdRd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ZONE_KEY = "iecc2018.zone";
var CALC_KEY = "iecc2018.calc";
var OCC_KEY = "iecc2018.occ";
function readStored(key, fallback, ok) {
	if (typeof window === "undefined") return fallback;
	try {
		const v = window.localStorage.getItem(key);
		if (v && ok(v)) return v;
	} catch {}
	return fallback;
}
var useWorkbook = create((set) => ({
	zone: "5A",
	occupancy: "all",
	calc: "home",
	setZone: (zone) => {
		try {
			window.localStorage.setItem(ZONE_KEY, zone);
		} catch {}
		set({ zone });
	},
	setOccupancy: (occupancy) => {
		try {
			window.localStorage.setItem(OCC_KEY, occupancy);
		} catch {}
		set({ occupancy });
	},
	setCalc: (calc) => {
		try {
			window.localStorage.setItem(CALC_KEY, calc);
		} catch {}
		set({ calc });
	}
}));
function hydrateWorkbook() {
	const zone = readStored(ZONE_KEY, "5A", (v) => /^[1-8][ABC]?$/.test(v));
	const occupancy = readStored(OCC_KEY, "all", (v) => v === "all" || v === "groupR");
	const calc = readStored(CALC_KEY, "home", (v) => v.length > 0);
	useWorkbook.setState({
		zone,
		occupancy,
		calc
	});
}
var CATALOG = [
	{
		id: "home",
		title: "Workbook",
		section: "—",
		group: "Start",
		blurb: "All 2018 IECC spreadsheet calculators."
	},
	{
		id: "climate",
		title: "Climate zone",
		section: "C301 / R301",
		group: "Climate",
		blurb: "County lookup and HDD/CDD thermal criteria."
	},
	{
		id: "defaults",
		title: "Defaults & design temps",
		section: "C302 / C303",
		group: "Climate",
		blurb: "Interior design temperatures and unlabeled fenestration defaults."
	},
	{
		id: "res-envelope",
		title: "Residential envelope",
		section: "R402.1.2 / R402.1.4",
		group: "Residential",
		blurb: "Prescriptive R-values and equivalent U-factors by climate zone."
	},
	{
		id: "res-ua",
		title: "Residential UA trade-off",
		section: "R402.1.5",
		group: "Residential",
		blurb: "Total UA proposed versus code reference UA."
	},
	{
		id: "res-air",
		title: "Air leakage & ventilation",
		section: "R402.4 / R403.6",
		group: "Residential",
		blurb: "ACH50 limit, whole-house CFM, and fan efficacy."
	},
	{
		id: "steel",
		title: "Steel-frame equivalents",
		section: "R402.2.6",
		group: "Residential",
		blurb: "Wood-to-steel R-value equivalents and steel-stud U-factor."
	},
	{
		id: "eri",
		title: "ERI path",
		section: "R406",
		group: "Residential",
		blurb: "Maximum Energy Rating Index by climate zone."
	},
	{
		id: "com-envelope",
		title: "Commercial envelope",
		section: "C402.1.3 / C402.1.4",
		group: "Commercial",
		blurb: "Opaque R-value and U/C/F-factor lookups."
	},
	{
		id: "com-ua",
		title: "Component performance",
		section: "C402.1.5",
		group: "Commercial",
		blurb: "Assembly-by-assembly UA versus the code baseline."
	},
	{
		id: "fenestration",
		title: "Fenestration",
		section: "C402.4",
		group: "Commercial",
		blurb: "WWR, U-factor, SHGC, and projection factor."
	},
	{
		id: "skylight",
		title: "Skylight aperture",
		section: "C402.4.2",
		group: "Commercial",
		blurb: "Effective aperture Equation 4-4."
	},
	{
		id: "reflectance",
		title: "Aged roof reflectance",
		section: "C402.3",
		group: "Commercial",
		blurb: "Three-year aged reflectance Equation 4-3."
	},
	{
		id: "lpd-building",
		title: "Lighting — building area",
		section: "C405.3.2(1)",
		group: "Lighting",
		blurb: "Building-area method interior LPD."
	},
	{
		id: "lpd-space",
		title: "Lighting — space-by-space",
		section: "C405.3.2(2)",
		group: "Lighting",
		blurb: "Space-by-space interior lighting power."
	},
	{
		id: "lpd-exterior",
		title: "Exterior lighting",
		section: "C405.4.2",
		group: "Lighting",
		blurb: "Exterior lighting power by lighting zone."
	},
	{
		id: "fan",
		title: "Fan power limitation",
		section: "C403.8.1",
		group: "Mechanical",
		blurb: "Nameplate hp and fan-system bhp allowances."
	},
	{
		id: "erv",
		title: "Energy recovery",
		section: "C403.7.4.2",
		group: "Mechanical",
		blurb: "ERV required by climate, OA fraction, and airflow."
	},
	{
		id: "hvac",
		title: "PTAC / PTHP efficiency",
		section: "C403.3.2(3)",
		group: "Mechanical",
		blurb: "Capacity-dependent EER and COP formulae."
	},
	{
		id: "chiller",
		title: "Centrifugal chiller Kadj",
		section: "C403.3.2.1",
		group: "Mechanical",
		blurb: "Lift adjustment Equations 4-6 and 4-7."
	},
	{
		id: "pipe",
		title: "Pipe insulation",
		section: "C403.11.3",
		group: "Mechanical",
		blurb: "Minimum thickness and conductivity correction."
	},
	{
		id: "swh",
		title: "Service water heating",
		section: "C404.2",
		group: "Mechanical",
		blurb: "Minimum efficiency for water heaters."
	},
	{
		id: "hw-pipe",
		title: "Hot-water piping",
		section: "C404.4 / R403.5.3",
		group: "Mechanical",
		blurb: "Piping insulation for service hot water."
	},
	{
		id: "hood",
		title: "Kitchen hoods",
		section: "C403.7.5",
		group: "Mechanical",
		blurb: "Exhaust rate by hood type and duty."
	},
	{
		id: "formulas",
		title: "Formula library",
		section: "Ch. 4",
		group: "Reference",
		blurb: "Live versions of every extracted equation."
	},
	{
		id: "tables",
		title: "Code tables",
		section: "R402 / C402",
		group: "Reference",
		blurb: "Full envelope tables for the selected zone."
	}
];
var GROUPS = [
	"Start",
	"Climate",
	"Residential",
	"Commercial",
	"Lighting",
	"Mechanical",
	"Reference"
];
function calcMeta(id) {
	return CATALOG.find((c) => c.id === id) ?? CATALOG[0];
}
/** 2018 IECC Table C301.1 / R301.1 — climate zone by county. * = warm-humid. */
var COUNTY_RAW = `
AL
Autauga:3A,Baldwin:2A*,Barbour:2A*,Bibb:3A,Blount:3A,Bullock:2A*,Butler:2A*,Calhoun:3A,Chambers:3A,Cherokee:3A,Chilton:3A,Choctaw:2A*,Clarke:2A*,Clay:3A,Cleburne:3A,Coffee:2A*,Colbert:3A,Conecuh:2A*,Coosa:3A,Covington:2A*,Crenshaw:2A*,Cullman:3A,Dale:2A*,Dallas:2A*,DeKalb:3A,Elmore:3A,Escambia:2A*,Etowah:3A,Fayette:3A,Franklin:3A,Geneva:2A*,Greene:3A,Hale:3A,Henry:2A*,Houston:2A*,Jackson:3A,Jefferson:3A,Lamar:3A,Lauderdale:3A,Lawrence:3A,Lee:3A,Limestone:3A,Lowndes:2A*,Macon:2A*,Madison:3A,Marengo:2A*,Marion:3A,Marshall:3A,Mobile:2A*,Monroe:2A*,Montgomery:2A*,Morgan:3A,Perry:3A,Pickens:3A,Pike:2A*,Randolph:3A,Russell:2A*,Shelby:3A,St. Clair:3A,Sumter:3A,Talladega:3A,Tallapoosa:3A,Tuscaloosa:3A,Walker:3A,Washington:2A*,Wilcox:2A*,Winston:3A
AK
Aleutians East:7,Aleutians West:7,Anchorage:7,Bethel:8,Bristol Bay:7,Denali:8,Dillingham:7,Fairbanks North Star:8,Haines:7,Hoonah-Angoon:7,Juneau:7,Kenai Peninsula:7,Ketchikan Gateway:7,Kodiak Island:7,Kusilvak:8,Lake and Peninsula:7,Matanuska-Susitna:7,Nome:8,North Slope:8,Northwest Arctic:8,Petersburg:7,Prince of Wales-Hyder:7,Sitka:7,Skagway:7,Southeast Fairbanks:8,Valdez-Cordova:7,Wade Hampton:8,Wrangell:7,Yakutat:7,Yukon-Koyukuk:8
AZ
Apache:5B,Cochise:3B,Coconino:5B,Gila:4B,Graham:3B,Greenlee:4B,La Paz:2B,Maricopa:2B,Mohave:3B,Navajo:5B,Pima:2B,Pinal:2B,Santa Cruz:3B,Yavapai:4B,Yuma:2B
AR
Arkansas:3A,Ashley:3A,Baxter:4A,Benton:4A,Boone:4A,Bradley:3A,Calhoun:3A,Carroll:4A,Chicot:3A,Clark:3A,Clay:4A,Cleburne:3A,Cleveland:3A,Columbia:3A,Conway:3A,Craighead:3A,Crawford:3A,Crittenden:3A,Cross:3A,Dallas:3A,Desha:3A,Drew:3A,Faulkner:3A,Franklin:3A,Fulton:4A,Garland:3A,Grant:3A,Greene:3A,Hempstead:3A,Hot Spring:3A,Howard:3A,Independence:3A,Izard:4A,Jackson:3A,Jefferson:3A,Johnson:3A,Lafayette:3A,Lawrence:3A,Lee:3A,Lincoln:3A,Little River:3A,Logan:3A,Lonoke:3A,Madison:4A,Marion:4A,Miller:3A,Mississippi:3A,Monroe:3A,Montgomery:3A,Nevada:3A,Newton:4A,Ouachita:3A,Perry:3A,Phillips:3A,Pike:3A,Poinsett:3A,Polk:3A,Pope:3A,Prairie:3A,Pulaski:3A,Randolph:4A,Saline:3A,Scott:3A,Searcy:4A,Sebastian:3A,Sevier:3A,Sharp:4A,St. Francis:3A,Stone:3A,Union:3A,Van Buren:3A,Washington:4A,White:3A,Woodruff:3A,Yell:3A
CA
Alameda:3C,Alpine:6B,Amador:4B,Butte:3B,Calaveras:4B,Colusa:3B,Contra Costa:3C,Del Norte:4C,El Dorado:4B,Fresno:3B,Glenn:3B,Humboldt:4C,Imperial:2B,Inyo:4B,Kern:3B,Kings:3B,Lake:3C,Lassen:6B,Los Angeles:3B,Madera:3B,Marin:3C,Mariposa:4B,Mendocino:3C,Merced:3B,Modoc:6B,Mono:6B,Monterey:3C,Napa:3C,Nevada:5B,Orange:3B,Placer:4B,Plumas:6B,Riverside:3B,Sacramento:3B,San Benito:3C,San Bernardino:3B,San Diego:3B,San Francisco:3C,San Joaquin:3B,San Luis Obispo:3C,San Mateo:3C,Santa Barbara:3C,Santa Clara:3C,Santa Cruz:3C,Shasta:3B,Sierra:6B,Siskiyou:5B,Solano:3C,Sonoma:3C,Stanislaus:3B,Sutter:3B,Tehama:3B,Trinity:5B,Tulare:3B,Tuolumne:4B,Ventura:3B,Yolo:3B,Yuba:3B
CO
Adams:5B,Alamosa:6B,Arapahoe:5B,Archuleta:6B,Baca:4B,Bent:4B,Boulder:5B,Broomfield:5B,Chaffee:6B,Cheyenne:5B,Clear Creek:6B,Conejos:6B,Costilla:6B,Crowley:4B,Custer:6B,Delta:5B,Denver:5B,Dolores:6B,Douglas:5B,Eagle:6B,El Paso:5B,Elbert:5B,Fremont:5B,Garfield:5B,Gilpin:6B,Grand:6B,Gunnison:7,Hinsdale:7,Huerfano:5B,Jackson:7,Jefferson:5B,Kiowa:4B,Kit Carson:5B,La Plata:5B,Lake:7,Larimer:5B,Las Animas:4B,Lincoln:5B,Logan:5B,Mesa:5B,Mineral:7,Moffat:6B,Montezuma:5B,Montrose:5B,Morgan:5B,Otero:4B,Ouray:6B,Park:6B,Phillips:5B,Pitkin:6B,Prowers:4B,Pueblo:4B,Rio Blanco:6B,Rio Grande:6B,Routt:6B,Saguache:6B,San Juan:7,San Miguel:6B,Sedgwick:5B,Summit:7,Teller:6B,Washington:5B,Weld:5B,Yuma:5B
CT
Fairfield:5A,Hartford:5A,Litchfield:5A,Middlesex:5A,New Haven:5A,New London:5A,Tolland:5A,Windham:5A
DE
Kent:4A,New Castle:4A,Sussex:4A
DC
District of Columbia:4A
FL
Alachua:2A*,Baker:2A*,Bay:2A*,Bradford:2A*,Brevard:2A*,Broward:1A*,Calhoun:2A*,Charlotte:2A*,Citrus:2A*,Clay:2A*,Collier:1A*,Columbia:2A*,DeSoto:2A*,Dixie:2A*,Duval:2A*,Escambia:2A*,Flagler:2A*,Franklin:2A*,Gadsden:2A*,Gilchrist:2A*,Glades:2A*,Gulf:2A*,Hamilton:2A*,Hardee:2A*,Hendry:2A*,Hernando:2A*,Highlands:2A*,Hillsborough:2A*,Holmes:2A*,Indian River:2A*,Jackson:2A*,Jefferson:2A*,Lafayette:2A*,Lake:2A*,Lee:2A*,Leon:2A*,Levy:2A*,Liberty:2A*,Madison:2A*,Manatee:2A*,Marion:2A*,Martin:2A*,Miami-Dade:1A*,Monroe:1A*,Nassau:2A*,Okaloosa:2A*,Okeechobee:2A*,Orange:2A*,Osceola:2A*,Palm Beach:1A*,Pasco:2A*,Pinellas:2A*,Polk:2A*,Putnam:2A*,Santa Rosa:2A*,Sarasota:2A*,Seminole:2A*,St. Johns:2A*,St. Lucie:2A*,Sumter:2A*,Suwannee:2A*,Taylor:2A*,Union:2A*,Volusia:2A*,Wakulla:2A*,Walton:2A*,Washington:2A*
GA
Appling:2A*,Atkinson:2A*,Bacon:2A*,Baker:2A*,Baldwin:3A,Banks:3A,Barrow:3A,Bartow:3A,Ben Hill:2A*,Berrien:2A*,Bibb:3A,Bleckley:3A,Brantley:2A*,Brooks:2A*,Bryan:2A*,Bulloch:2A*,Burke:3A,Butts:3A,Calhoun:2A*,Camden:2A*,Candler:2A*,Carroll:3A,Catoosa:3A,Charlton:2A*,Chatham:2A*,Chattahoochee:2A*,Chattooga:3A,Cherokee:3A,Clarke:3A,Clay:2A*,Clayton:3A,Clinch:2A*,Cobb:3A,Coffee:2A*,Colquitt:2A*,Columbia:3A,Cook:2A*,Coweta:3A,Crawford:3A,Crisp:2A*,Dade:3A,Dawson:3A,Decatur:2A*,DeKalb:3A,Dodge:3A,Dooly:2A*,Dougherty:2A*,Douglas:3A,Early:2A*,Echols:2A*,Effingham:2A*,Elbert:3A,Emanuel:3A,Evans:2A*,Fannin:4A,Fayette:3A,Floyd:3A,Forsyth:3A,Franklin:3A,Fulton:3A,Gilmer:4A,Glascock:3A,Glynn:2A*,Gordon:3A,Grady:2A*,Greene:3A,Gwinnett:3A,Habersham:3A,Hall:3A,Hancock:3A,Haralson:3A,Harris:3A,Hart:3A,Heard:3A,Henry:3A,Houston:3A,Irwin:2A*,Jackson:3A,Jasper:3A,Jeff Davis:2A*,Jefferson:3A,Jenkins:3A,Johnson:3A,Jones:3A,Lamar:3A,Lanier:2A*,Laurens:3A,Lee:2A*,Liberty:2A*,Lincoln:3A,Long:2A*,Lowndes:2A*,Lumpkin:3A,Macon:2A*,Madison:3A,Marion:2A*,McDuffie:3A,McIntosh:2A*,Meriwether:3A,Miller:2A*,Mitchell:2A*,Monroe:3A,Montgomery:2A*,Morgan:3A,Murray:3A,Muscogee:2A*,Newton:3A,Oconee:3A,Oglethorpe:3A,Paulding:3A,Peach:3A,Pickens:3A,Pierce:2A*,Pike:3A,Polk:3A,Pulaski:2A*,Putnam:3A,Quitman:2A*,Rabun:4A,Randolph:2A*,Richmond:3A,Rockdale:3A,Schley:2A*,Screven:3A,Seminole:2A*,Spalding:3A,Stephens:3A,Stewart:2A*,Sumter:2A*,Talbot:3A,Taliaferro:3A,Tattnall:2A*,Taylor:3A*,Telfair:2A*,Terrell:2A*,Thomas:2A*,Tift:2A*,Toombs:2A*,Towns:4A,Treutlen:2A*,Troup:3A,Turner:2A*,Twiggs:3A,Union:4A,Upson:3A,Walker:3A,Walton:3A,Ware:2A*,Warren:3A,Washington:3A,Wayne:2A*,Webster:2A*,Wheeler:2A*,White:3A,Whitfield:3A,Wilcox:2A*,Wilkes:3A,Wilkinson:3A,Worth:2A*
HI
Hawaii:1A*,Honolulu:1A*,Kalawao:1A*,Kauai:1A*,Maui:1A*
ID
Ada:5B,Adams:6B,Bannock:6B,Bear Lake:6B,Benewah:6B,Bingham:6B,Blaine:6B,Boise:6B,Bonner:6B,Bonneville:6B,Boundary:6B,Butte:6B,Camas:6B,Canyon:5B,Caribou:6B,Cassia:5B,Clark:6B,Clearwater:6B,Custer:6B,Elmore:5B,Franklin:6B,Fremont:6B,Gem:5B,Gooding:5B,Idaho:6B,Jefferson:6B,Jerome:5B,Kootenai:6B,Latah:6B,Lemhi:6B,Lewis:6B,Lincoln:5B,Madison:6B,Minidoka:5B,Nez Perce:5B,Oneida:6B,Owyhee:5B,Payette:5B,Power:5B,Shoshone:6B,Teton:6B,Twin Falls:5B,Valley:6B,Washington:5B
IL
Adams:5A,Alexander:4A,Bond:4A,Boone:5A,Brown:5A,Bureau:5A,Calhoun:4A,Carroll:5A,Cass:5A,Champaign:5A,Christian:5A,Clark:4A,Clay:4A,Clinton:4A,Coles:5A,Cook:5A,Crawford:4A,Cumberland:4A,DeKalb:5A,De Witt:5A,Douglas:5A,DuPage:5A,Edgar:5A,Edwards:4A,Effingham:4A,Fayette:4A,Ford:5A,Franklin:4A,Fulton:5A,Gallatin:4A,Greene:4A,Grundy:5A,Hamilton:4A,Hancock:5A,Hardin:4A,Henderson:5A,Henry:5A,Iroquois:5A,Jackson:4A,Jasper:4A,Jefferson:4A,Jersey:4A,Jo Daviess:5A,Johnson:4A,Kane:5A,Kankakee:5A,Kendall:5A,Knox:5A,Lake:5A,LaSalle:5A,Lawrence:4A,Lee:5A,Livingston:5A,Logan:5A,Macon:5A,Macoupin:4A,Madison:4A,Marion:4A,Marshall:5A,Mason:5A,Massac:4A,McDonough:5A,McHenry:5A,McLean:5A,Menard:5A,Mercer:5A,Monroe:4A,Montgomery:4A,Morgan:5A,Moultrie:5A,Ogle:5A,Peoria:5A,Perry:4A,Piatt:5A,Pike:5A,Pope:4A,Pulaski:4A,Putnam:5A,Randolph:4A,Richland:4A,Rock Island:5A,Saline:4A,Sangamon:5A,Schuyler:5A,Scott:5A,Shelby:5A,St. Clair:4A,Stark:5A,Stephenson:5A,Tazewell:5A,Union:4A,Vermilion:5A,Wabash:4A,Warren:5A,Washington:4A,Wayne:4A,White:4A,Whiteside:5A,Will:5A,Williamson:4A,Winnebago:5A,Woodford:5A
IN
Adams:5A,Allen:5A,Bartholomew:4A,Benton:5A,Blackford:5A,Boone:5A,Brown:4A,Carroll:5A,Cass:5A,Clark:4A,Clay:4A,Clinton:5A,Crawford:4A,Daviess:4A,Dearborn:4A,Decatur:4A,DeKalb:5A,Delaware:5A,Dubois:4A,Elkhart:5A,Fayette:4A,Floyd:4A,Fountain:5A,Franklin:4A,Fulton:5A,Gibson:4A,Grant:5A,Greene:4A,Hamilton:5A,Hancock:5A,Harrison:4A,Hendricks:5A,Henry:5A,Howard:5A,Huntington:5A,Jackson:4A,Jasper:5A,Jay:5A,Jefferson:4A,Jennings:4A,Johnson:4A,Knox:4A,Kosciusko:5A,LaGrange:5A,Lake:5A,LaPorte:5A,Lawrence:4A,Madison:5A,Marion:5A,Marshall:5A,Martin:4A,Miami:5A,Monroe:4A,Montgomery:5A,Morgan:4A,Newton:5A,Noble:5A,Ohio:4A,Orange:4A,Owen:4A,Parke:5A,Perry:4A,Pike:4A,Porter:5A,Posey:4A,Pulaski:5A,Putnam:4A,Randolph:5A,Ripley:4A,Rush:4A,Scott:4A,Shelby:4A,Spencer:4A,St. Joseph:5A,Starke:5A,Steuben:5A,Sullivan:4A,Switzerland:4A,Tippecanoe:5A,Tipton:5A,Union:4A,Vanderburgh:4A,Vermillion:5A,Vigo:4A,Wabash:5A,Warren:5A,Warrick:4A,Washington:4A,Wayne:4A,Wells:5A,White:5A,Whitley:5A
IA
Adair:5A,Adams:5A,Allamakee:6A,Appanoose:5A,Audubon:5A,Benton:5A,Black Hawk:5A,Boone:5A,Bremer:6A,Buchanan:5A,Buena Vista:6A,Butler:5A,Calhoun:5A,Carroll:5A,Cass:5A,Cedar:5A,Cerro Gordo:6A,Cherokee:6A,Chickasaw:6A,Clarke:5A,Clay:6A,Clayton:6A,Clinton:5A,Crawford:5A,Dallas:5A,Davis:5A,Decatur:5A,Delaware:5A,Des Moines:5A,Dickinson:6A,Dubuque:5A,Emmet:6A,Fayette:6A,Floyd:6A,Franklin:5A,Fremont:5A,Greene:5A,Grundy:5A,Guthrie:5A,Hamilton:5A,Hancock:6A,Hardin:5A,Harrison:5A,Henry:5A,Howard:6A,Humboldt:6A,Ida:6A,Iowa:5A,Jackson:5A,Jasper:5A,Jefferson:5A,Johnson:5A,Jones:5A,Keokuk:5A,Kossuth:6A,Lee:5A,Linn:5A,Louisa:5A,Lucas:5A,Lyon:6A,Madison:5A,Mahaska:5A,Marion:5A,Marshall:5A,Mills:5A,Mitchell:6A,Monona:5A,Monroe:5A,Montgomery:5A,Muscatine:5A,O'Brien:6A,Osceola:6A,Page:5A,Palo Alto:6A,Plymouth:6A,Pocahontas:6A,Polk:5A,Pottawattamie:5A,Poweshiek:5A,Ringgold:5A,Sac:6A,Scott:5A,Shelby:5A,Sioux:6A,Story:5A,Tama:5A,Taylor:5A,Union:5A,Van Buren:5A,Wapello:5A,Warren:5A,Washington:5A,Wayne:5A,Webster:5A,Winnebago:6A,Winneshiek:6A,Woodbury:5A,Worth:6A,Wright:5A
KS
Allen:4A,Anderson:4A,Atchison:4A,Barber:4A,Barton:4A,Bourbon:4A,Brown:4A,Butler:4A,Chase:4A,Chautauqua:4A,Cherokee:4A,Cheyenne:5A,Clark:4A,Clay:4A,Cloud:4A,Coffey:4A,Comanche:4A,Cowley:4A,Crawford:4A,Decatur:5A,Dickinson:4A,Doniphan:4A,Douglas:4A,Edwards:4A,Elk:4A,Ellis:4A,Ellsworth:4A,Finney:4A,Ford:4A,Franklin:4A,Geary:4A,Gove:4A,Graham:4A,Grant:4A,Gray:4A,Greeley:5A,Greenwood:4A,Hamilton:4A,Harper:4A,Harvey:4A,Haskell:4A,Hodgeman:4A,Jackson:4A,Jefferson:4A,Jewell:4A,Johnson:4A,Kearny:4A,Kingman:4A,Kiowa:4A,Labette:4A,Lane:4A,Leavenworth:4A,Lincoln:4A,Linn:4A,Logan:5A,Lyon:4A,Marion:4A,Marshall:4A,McPherson:4A,Meade:4A,Miami:4A,Mitchell:4A,Montgomery:4A,Morris:4A,Morton:4A,Nemaha:4A,Neosho:4A,Ness:4A,Norton:5A,Osage:4A,Osborne:4A,Ottawa:4A,Pawnee:4A,Phillips:5A,Pottawatomie:4A,Pratt:4A,Rawlins:5A,Reno:4A,Republic:4A,Rice:4A,Riley:4A,Rooks:4A,Rush:4A,Russell:4A,Saline:4A,Scott:4A,Sedgwick:4A,Seward:4A,Shawnee:4A,Sheridan:5A,Sherman:5A,Smith:4A,Stafford:4A,Stanton:4A,Stevens:4A,Sumner:4A,Thomas:5A,Trego:4A,Wabaunsee:4A,Wallace:5A,Washington:4A,Wichita:4A,Wilson:4A,Woodson:4A,Wyandotte:4A
KY
Adair:4A,Allen:4A,Anderson:4A,Ballard:4A,Barren:4A,Bath:4A,Bell:4A,Boone:4A,Bourbon:4A,Boyd:4A,Boyle:4A,Bracken:4A,Breathitt:4A,Breckinridge:4A,Bullitt:4A,Butler:4A,Caldwell:4A,Calloway:4A,Campbell:4A,Carlisle:4A,Carroll:4A,Carter:4A,Casey:4A,Christian:4A,Clark:4A,Clay:4A,Clinton:4A,Crittenden:4A,Cumberland:4A,Daviess:4A,Edmonson:4A,Elliott:4A,Estill:4A,Fayette:4A,Fleming:4A,Floyd:4A,Franklin:4A,Fulton:4A,Gallatin:4A,Garrard:4A,Grant:4A,Graves:4A,Grayson:4A,Green:4A,Greenup:4A,Hancock:4A,Hardin:4A,Harlan:4A,Harrison:4A,Hart:4A,Henderson:4A,Henry:4A,Hickman:4A,Hopkins:4A,Jackson:4A,Jefferson:4A,Jessamine:4A,Johnson:4A,Kenton:4A,Knott:4A,Knox:4A,Larue:4A,Laurel:4A,Lawrence:4A,Lee:4A,Leslie:4A,Letcher:4A,Lewis:4A,Lincoln:4A,Livingston:4A,Logan:4A,Lyon:4A,Madison:4A,Magoffin:4A,Marion:4A,Marshall:4A,Martin:4A,Mason:4A,McCracken:4A,McCreary:4A,McLean:4A,Meade:4A,Menifee:4A,Mercer:4A,Metcalfe:4A,Monroe:4A,Montgomery:4A,Morgan:4A,Muhlenberg:4A,Nelson:4A,Nicholas:4A,Ohio:4A,Oldham:4A,Owen:4A,Owsley:4A,Pendleton:4A,Perry:4A,Pike:4A,Powell:4A,Pulaski:4A,Robertson:4A,Rockcastle:4A,Rowan:4A,Russell:4A,Scott:4A,Shelby:4A,Simpson:4A,Spencer:4A,Taylor:4A,Todd:4A,Trigg:4A,Trimble:4A,Union:4A,Warren:4A,Washington:4A,Wayne:4A,Webster:4A,Whitley:4A,Wolfe:4A,Woodford:4A
LA
Acadia:2A*,Allen:2A*,Ascension:2A*,Assumption:2A*,Avoyelles:2A*,Beauregard:2A*,Bienville:3A,Bossier:3A,Caddo:3A,Calcasieu:2A*,Caldwell:3A,Cameron:2A*,Catahoula:2A*,Claiborne:3A,Concordia:2A*,De Soto:3A,East Baton Rouge:2A*,East Carroll:3A,East Feliciana:2A*,Evangeline:2A*,Franklin:3A,Grant:2A*,Iberia:2A*,Iberville:2A*,Jackson:3A,Jefferson:2A*,Jefferson Davis:2A*,La Salle:2A*,Lafayette:2A*,Lafourche:2A*,Lincoln:3A,Livingston:2A*,Madison:3A,Morehouse:3A,Natchitoches:3A,Orleans:2A*,Ouachita:3A,Plaquemines:2A*,Pointe Coupee:2A*,Rapides:2A*,Red River:3A,Richland:3A,Sabine:3A,St. Bernard:2A*,St. Charles:2A*,St. Helena:2A*,St. James:2A*,St. John the Baptist:2A*,St. Landry:2A*,St. Martin:2A*,St. Mary:2A*,St. Tammany:2A*,Tangipahoa:2A*,Tensas:3A,Terrebonne:2A*,Union:3A,Vermilion:2A*,Vernon:2A*,Washington:2A*,Webster:3A,West Baton Rouge:2A*,West Carroll:3A,West Feliciana:2A*,Winn:3A
ME
Androscoggin:6A,Aroostook:7,Cumberland:6A,Franklin:6A,Hancock:6A,Kennebec:6A,Knox:6A,Lincoln:6A,Oxford:6A,Penobscot:6A,Piscataquis:6A,Sagadahoc:6A,Somerset:6A,Waldo:6A,Washington:6A,York:5A
MD
Allegany:5A,Anne Arundel:4A,Baltimore:4A,Baltimore City:4A,Calvert:4A,Caroline:4A,Carroll:4A,Cecil:4A,Charles:4A,Dorchester:4A,Frederick:4A,Garrett:5A,Harford:4A,Howard:4A,Kent:4A,Montgomery:4A,Prince George's:4A,Queen Anne's:4A,Somerset:4A,St. Mary's:4A,Talbot:4A,Washington:4A,Wicomico:4A,Worcester:4A
MA
Barnstable:5A,Berkshire:5A,Bristol:5A,Dukes:5A,Essex:5A,Franklin:5A,Hampden:5A,Hampshire:5A,Middlesex:5A,Nantucket:5A,Norfolk:5A,Plymouth:5A,Suffolk:5A,Worcester:5A
MI
Alcona:6A,Alger:6A,Allegan:5A,Alpena:6A,Antrim:6A,Arenac:6A,Baraga:6A,Barry:5A,Bay:5A,Benzie:6A,Berrien:5A,Branch:5A,Calhoun:5A,Cass:5A,Charlevoix:6A,Cheboygan:6A,Chippewa:6A,Clare:6A,Clinton:5A,Crawford:6A,Delta:6A,Dickinson:6A,Eaton:5A,Emmet:6A,Genesee:5A,Gladwin:6A,Gogebic:6A,Grand Traverse:6A,Gratiot:5A,Hillsdale:5A,Houghton:6A,Huron:5A,Ingham:5A,Ionia:5A,Iosco:6A,Iron:6A,Isabella:5A,Jackson:5A,Kalamazoo:5A,Kalkaska:6A,Kent:5A,Keweenaw:6A,Lake:6A,Lapeer:5A,Leelanau:6A,Lenawee:5A,Livingston:5A,Luce:6A,Mackinac:6A,Macomb:5A,Manistee:6A,Marquette:6A,Mason:6A,Mecosta:6A,Menominee:6A,Midland:5A,Missaukee:6A,Monroe:5A,Montcalm:5A,Montmorency:6A,Muskegon:5A,Newaygo:6A,Oakland:5A,Oceana:6A,Ogemaw:6A,Ontonagon:6A,Osceola:6A,Oscoda:6A,Otsego:6A,Ottawa:5A,Presque Isle:6A,Roscommon:6A,Saginaw:5A,Sanilac:5A,Schoolcraft:6A,Shiawassee:5A,St. Clair:5A,St. Joseph:5A,Tuscola:5A,Van Buren:5A,Washtenaw:5A,Wayne:5A,Wexford:6A
MN
Aitkin:7,Anoka:6A,Becker:7,Beltrami:7,Benton:6A,Big Stone:6A,Blue Earth:6A,Brown:6A,Carlton:7,Carver:6A,Cass:7,Chippewa:6A,Chisago:6A,Clay:7,Clearwater:7,Cook:7,Cottonwood:6A,Crow Wing:7,Dakota:6A,Dodge:6A,Douglas:6A,Faribault:6A,Fillmore:6A,Freeborn:6A,Goodhue:6A,Grant:7,Hennepin:6A,Houston:6A,Hubbard:7,Isanti:6A,Itasca:7,Jackson:6A,Kanabec:6A,Kandiyohi:6A,Kittson:7,Koochiching:7,Lac qui Parle:6A,Lake:7,Lake of the Woods:7,Le Sueur:6A,Lincoln:6A,Lyon:6A,Mahnomen:7,Marshall:7,Martin:6A,McLeod:6A,Meeker:6A,Mille Lacs:6A,Morrison:7,Mower:6A,Murray:6A,Nicollet:6A,Nobles:6A,Norman:7,Olmsted:6A,Otter Tail:7,Pennington:7,Pine:7,Pipestone:6A,Polk:7,Pope:6A,Ramsey:6A,Red Lake:7,Redwood:6A,Renville:6A,Rice:6A,Rock:6A,Roseau:7,Scott:6A,Sherburne:6A,Sibley:6A,St. Louis:7,Stearns:6A,Steele:6A,Stevens:6A,Swift:6A,Todd:7,Traverse:6A,Wabasha:6A,Wadena:7,Waseca:6A,Washington:6A,Watonwan:6A,Wilkin:7,Winona:6A,Wright:6A,Yellow Medicine:6A
MS
Adams:2A*,Alcorn:3A,Amite:2A*,Attala:3A,Benton:3A,Bolivar:3A,Calhoun:3A,Carroll:3A,Chickasaw:3A,Choctaw:3A,Claiborne:2A*,Clarke:3A,Clay:3A,Coahoma:3A,Copiah:2A*,Covington:2A*,DeSoto:3A,Forrest:2A*,Franklin:2A*,George:2A*,Greene:2A*,Grenada:3A,Hancock:2A*,Harrison:2A*,Hinds:2A*,Holmes:3A,Humphreys:3A,Issaquena:3A,Itawamba:3A,Jackson:2A*,Jasper:3A,Jefferson:2A*,Jefferson Davis:2A*,Jones:2A*,Kemper:3A,Lafayette:3A,Lamar:2A*,Lauderdale:3A,Lawrence:2A*,Leake:3A,Lee:3A,Leflore:3A,Lincoln:2A*,Lowndes:3A,Madison:3A,Marion:2A*,Marshall:3A,Monroe:3A,Montgomery:3A,Neshoba:3A,Newton:3A,Noxubee:3A,Oktibbeha:3A,Panola:3A,Pearl River:2A*,Perry:2A*,Pike:2A*,Pontotoc:3A,Prentiss:3A,Quitman:3A,Rankin:3A,Scott:3A,Sharkey:3A,Simpson:2A*,Smith:3A,Stone:2A*,Sunflower:3A,Tallahatchie:3A,Tate:3A,Tippah:3A,Tishomingo:3A,Tunica:3A,Union:3A,Walthall:2A*,Warren:2A*,Washington:3A,Wayne:2A*,Webster:3A,Wilkinson:2A*,Winston:3A,Yalobusha:3A,Yazoo:3A
MO
Adair:5A,Andrew:5A,Atchison:5A,Audrain:4A,Barry:4A,Barton:4A,Bates:4A,Benton:4A,Bollinger:4A,Boone:4A,Buchanan:4A,Butler:4A,Caldwell:4A,Callaway:4A,Camden:4A,Cape Girardeau:4A,Carroll:4A,Carter:4A,Cass:4A,Cedar:4A,Chariton:5A,Christian:4A,Clark:5A,Clay:4A,Clinton:4A,Cole:4A,Cooper:4A,Crawford:4A,Dade:4A,Dallas:4A,Daviess:5A,DeKalb:5A,Dent:4A,Douglas:4A,Dunklin:3A,Franklin:4A,Gasconade:4A,Gentry:5A,Greene:4A,Grundy:5A,Harrison:5A,Henry:4A,Hickory:4A,Holt:5A,Howard:4A,Howell:4A,Iron:4A,Jackson:4A,Jasper:4A,Jefferson:4A,Johnson:4A,Knox:5A,Laclede:4A,Lafayette:4A,Lawrence:4A,Lewis:5A,Lincoln:4A,Linn:5A,Livingston:5A,Macon:5A,Madison:4A,Maries:4A,Marion:4A,McDonald:4A,Mercer:5A,Miller:4A,Mississippi:4A,Moniteau:4A,Monroe:4A,Montgomery:4A,Morgan:4A,New Madrid:4A,Newton:4A,Nodaway:5A,Oregon:4A,Osage:4A,Ozark:4A,Pemiscot:3A,Perry:4A,Pettis:4A,Phelps:4A,Pike:4A,Platte:4A,Polk:4A,Pulaski:4A,Putnam:5A,Ralls:4A,Randolph:4A,Ray:4A,Reynolds:4A,Ripley:4A,Saline:4A,Schuyler:5A,Scotland:5A,Scott:4A,Shannon:4A,Shelby:4A,St. Charles:4A,St. Clair:4A,St. Francois:4A,St. Louis:4A,St. Louis City:4A,Ste. Genevieve:4A,Stoddard:4A,Stone:4A,Sullivan:5A,Taney:4A,Texas:4A,Vernon:4A,Warren:4A,Washington:4A,Wayne:4A,Webster:4A,Worth:5A,Wright:4A
MT
Beaverhead:6B,Big Horn:6B,Blaine:6B,Broadwater:6B,Carbon:6B,Carter:6B,Cascade:6B,Chouteau:6B,Custer:6B,Daniels:6B,Dawson:6B,Deer Lodge:6B,Fallon:6B,Fergus:6B,Flathead:6B,Gallatin:6B,Garfield:6B,Glacier:6B,Golden Valley:6B,Granite:6B,Hill:6B,Jefferson:6B,Judith Basin:6B,Lake:6B,Lewis and Clark:6B,Liberty:6B,Lincoln:6B,Madison:6B,McCone:6B,Meagher:6B,Mineral:6B,Missoula:6B,Musselshell:6B,Park:6B,Petroleum:6B,Phillips:6B,Pondera:6B,Powder River:6B,Powell:6B,Prairie:6B,Ravalli:6B,Richland:6B,Roosevelt:6B,Rosebud:6B,Sanders:6B,Sheridan:6B,Silver Bow:6B,Stillwater:6B,Sweet Grass:6B,Teton:6B,Toole:6B,Treasure:6B,Valley:6B,Wheatland:6B,Wibaux:6B,Yellowstone:6B
NE
Adams:5A,Antelope:5A,Arthur:5A,Banner:5A,Blaine:5A,Boone:5A,Box Butte:5A,Boyd:5A,Brown:5A,Buffalo:5A,Burt:5A,Butler:5A,Cass:5A,Cedar:5A,Chase:5A,Cherry:5A,Cheyenne:5A,Clay:5A,Colfax:5A,Cuming:5A,Custer:5A,Dakota:5A,Dawes:5A,Dawson:5A,Deuel:5A,Dixon:5A,Dodge:5A,Douglas:5A,Dundy:5A,Fillmore:5A,Franklin:5A,Frontier:5A,Furnas:5A,Gage:5A,Garden:5A,Garfield:5A,Gosper:5A,Grant:5A,Greeley:5A,Hall:5A,Hamilton:5A,Harlan:5A,Hayes:5A,Hitchcock:5A,Holt:5A,Hooker:5A,Howard:5A,Jefferson:5A,Johnson:5A,Kearney:5A,Keith:5A,Keya Paha:5A,Kimball:5A,Knox:5A,Lancaster:5A,Lincoln:5A,Logan:5A,Loup:5A,Madison:5A,McPherson:5A,Merrick:5A,Morrill:5A,Nance:5A,Nemaha:5A,Nuckolls:5A,Otoe:5A,Pawnee:5A,Perkins:5A,Phelps:5A,Pierce:5A,Platte:5A,Polk:5A,Red Willow:5A,Richardson:5A,Rock:5A,Saline:5A,Sarpy:5A,Saunders:5A,Scotts Bluff:5A,Seward:5A,Sheridan:5A,Sherman:5A,Sioux:5A,Stanton:5A,Thayer:5A,Thomas:5A,Thurston:5A,Valley:5A,Washington:5A,Wayne:5A,Webster:5A,Wheeler:5A,York:5A
NV
Carson City:5B,Churchill:5B,Clark:3B,Douglas:5B,Elko:6B,Esmeralda:5B,Eureka:6B,Humboldt:5B,Lander:6B,Lincoln:5B,Lyon:5B,Mineral:5B,Nye:5B,Pershing:5B,Storey:5B,Washoe:5B,White Pine:6B
NH
Belknap:6A,Carroll:6A,Cheshire:6A,Coos:6A,Grafton:6A,Hillsborough:5A,Merrimack:6A,Rockingham:5A,Strafford:6A,Sullivan:6A
NJ
Atlantic:4A,Bergen:4A,Burlington:4A,Camden:4A,Cape May:4A,Cumberland:4A,Essex:4A,Gloucester:4A,Hudson:4A,Hunterdon:4A,Mercer:4A,Middlesex:4A,Monmouth:4A,Morris:5A,Ocean:4A,Passaic:5A,Salem:4A,Somerset:4A,Sussex:5A,Union:4A,Warren:5A
NM
Bernalillo:4B,Catron:5B,Chaves:3B,Cibola:5B,Colfax:5B,Curry:4B,De Baca:4B,Dona Ana:3B,Eddy:3B,Grant:3B,Guadalupe:4B,Harding:4B,Hidalgo:3B,Lea:3B,Lincoln:4B,Los Alamos:5B,Luna:3B,McKinley:5B,Mora:5B,Otero:3B,Quay:4B,Rio Arriba:5B,Roosevelt:4B,San Juan:5B,San Miguel:4B,Sandoval:5B,Santa Fe:5B,Sierra:3B,Socorro:4B,Taos:5B,Torrance:4B,Union:4B,Valencia:4B
NY
Albany:5A,Allegany:6A,Bronx:4A,Broome:6A,Cattaraugus:6A,Cayuga:5A,Chautauqua:5A,Chemung:6A,Chenango:6A,Clinton:6A,Columbia:5A,Cortland:6A,Delaware:6A,Dutchess:5A,Erie:5A,Essex:6A,Franklin:6A,Fulton:6A,Genesee:5A,Greene:5A,Hamilton:6A,Herkimer:6A,Jefferson:6A,Kings:4A,Lewis:6A,Livingston:5A,Madison:6A,Monroe:5A,Montgomery:6A,Nassau:4A,New York:4A,Niagara:5A,Oneida:6A,Onondaga:5A,Ontario:5A,Orange:5A,Orleans:5A,Oswego:5A,Otsego:6A,Putnam:5A,Queens:4A,Rensselaer:5A,Richmond:4A,Rockland:4A,Saratoga:5A,Schenectady:5A,Schoharie:6A,Schuyler:6A,Seneca:5A,St. Lawrence:6A,Steuben:6A,Suffolk:4A,Sullivan:6A,Tioga:6A,Tompkins:6A,Ulster:5A,Warren:6A,Washington:6A,Wayne:5A,Westchester:4A,Wyoming:6A,Yates:5A
NC
Alamance:4A,Alexander:4A,Alleghany:5A,Anson:3A,Ashe:5A,Avery:5A,Beaufort:3A*,Bertie:3A*,Bladen:3A*,Brunswick:3A*,Buncombe:4A,Burke:4A,Cabarrus:3A,Caldwell:4A,Camden:3A*,Carteret:3A*,Caswell:4A,Catawba:3A,Chatham:3A,Cherokee:4A,Chowan:3A*,Clay:4A,Cleveland:3A,Columbus:3A*,Craven:3A*,Cumberland:3A,Currituck:3A*,Dare:3A*,Davidson:3A,Davie:4A,Duplin:3A*,Durham:4A,Edgecombe:3A,Forsyth:4A,Franklin:4A,Gaston:3A,Gates:3A*,Graham:4A,Granville:4A,Greene:3A,Guilford:4A,Halifax:3A,Harnett:3A,Haywood:4A,Henderson:4A,Hertford:3A*,Hoke:3A,Hyde:3A*,Iredell:3A,Jackson:4A,Johnston:3A,Jones:3A*,Lee:3A,Lenoir:3A,Lincoln:3A,Macon:4A,Madison:4A,Martin:3A*,McDowell:4A,Mecklenburg:3A,Mitchell:5A,Montgomery:3A,Moore:3A,Nash:3A,New Hanover:3A*,Northampton:3A,Onslow:3A*,Orange:4A,Pamlico:3A*,Pasquotank:3A*,Pender:3A*,Perquimans:3A*,Person:4A,Pitt:3A,Polk:4A,Randolph:3A,Richmond:3A,Robeson:3A*,Rockingham:4A,Rowan:3A,Rutherford:3A,Sampson:3A,Scotland:3A,Stanly:3A,Stokes:4A,Surry:4A,Swain:4A,Transylvania:4A,Tyrrell:3A*,Union:3A,Vance:4A,Wake:4A,Warren:4A,Washington:3A*,Watauga:5A,Wayne:3A,Wilkes:4A,Wilson:3A,Yadkin:4A,Yancey:5A
ND
Adams:6A,Barnes:6A,Benson:7,Billings:6A,Bottineau:7,Bowman:6A,Burke:7,Burleigh:6A,Cass:6A,Cavalier:7,Dickey:6A,Divide:7,Dunn:6A,Eddy:7,Emmons:6A,Foster:7,Golden Valley:6A,Grand Forks:7,Grant:6A,Griggs:7,Hettinger:6A,Kidder:6A,LaMoure:6A,Logan:6A,McHenry:7,McIntosh:6A,McKenzie:6A,McLean:7,Mercer:6A,Morton:6A,Mountrail:7,Nelson:7,Oliver:6A,Pembina:7,Pierce:7,Ramsey:7,Ransom:6A,Renville:7,Richland:6A,Rolette:7,Sargent:6A,Sheridan:7,Sioux:6A,Slope:6A,Stark:6A,Steele:7,Stutsman:6A,Towner:7,Traill:7,Walsh:7,Ward:7,Wells:7,Williams:6A
OH
Adams:4A,Allen:5A,Ashland:5A,Ashtabula:5A,Athens:4A,Auglaize:5A,Belmont:5A,Brown:4A,Butler:4A,Carroll:5A,Champaign:5A,Clark:5A,Clermont:4A,Clinton:4A,Columbiana:5A,Coshocton:5A,Crawford:5A,Cuyahoga:5A,Darke:5A,Defiance:5A,Delaware:5A,Erie:5A,Fairfield:4A,Fayette:4A,Franklin:5A,Fulton:5A,Gallia:4A,Geauga:5A,Greene:4A,Guernsey:5A,Hamilton:4A,Hancock:5A,Hardin:5A,Harrison:5A,Henry:5A,Highland:4A,Hocking:4A,Holmes:5A,Huron:5A,Jackson:4A,Jefferson:5A,Knox:5A,Lake:5A,Lawrence:4A,Licking:5A,Logan:5A,Lorain:5A,Lucas:5A,Madison:5A,Mahoning:5A,Marion:5A,Medina:5A,Meigs:4A,Mercer:5A,Miami:5A,Monroe:4A,Montgomery:4A,Morgan:4A,Morrow:5A,Muskingum:5A,Noble:4A,Ottawa:5A,Paulding:5A,Perry:4A,Pickaway:4A,Pike:4A,Portage:5A,Preble:4A,Putnam:5A,Richland:5A,Ross:4A,Sandusky:5A,Scioto:4A,Seneca:5A,Shelby:5A,Stark:5A,Summit:5A,Trumbull:5A,Tuscarawas:5A,Union:5A,Van Wert:5A,Vinton:4A,Warren:4A,Washington:4A,Wayne:5A,Williams:5A,Wood:5A,Wyandot:5A
OK
Adair:3A,Alfalfa:4A,Atoka:3A,Beaver:4A,Beckham:3A,Blaine:3A,Bryan:3A,Caddo:3A,Canadian:3A,Carter:3A,Cherokee:3A,Choctaw:3A,Cimarron:4B,Cleveland:3A,Coal:3A,Comanche:3A,Cotton:3A,Craig:4A,Creek:3A,Custer:3A,Delaware:4A,Dewey:3A,Ellis:4A,Garfield:3A,Garvin:3A,Grady:3A,Grant:4A,Greer:3A,Harmon:3A,Harper:4A,Haskell:3A,Hughes:3A,Jackson:3A,Jefferson:3A,Johnston:3A,Kay:4A,Kingfisher:3A,Kiowa:3A,Latimer:3A,Le Flore:3A,Lincoln:3A,Logan:3A,Love:3A,Major:3A,Marshall:3A,Mayes:3A,McClain:3A,McCurtain:3A,McIntosh:3A,Murray:3A,Muskogee:3A,Noble:3A,Nowata:3A,Okfuskee:3A,Oklahoma:3A,Okmulgee:3A,Osage:3A,Ottawa:4A,Pawnee:3A,Payne:3A,Pittsburg:3A,Pontotoc:3A,Pottawatomie:3A,Pushmataha:3A,Roger Mills:3A,Rogers:3A,Seminole:3A,Sequoyah:3A,Stephens:3A,Texas:4A,Tillman:3A,Tulsa:3A,Wagoner:3A,Washington:3A,Washita:3A,Woods:4A,Woodward:4A
OR
Baker:5B,Benton:4C,Clackamas:4C,Clatsop:4C,Columbia:4C,Coos:4C,Crook:5B,Curry:4C,Deschutes:5B,Douglas:4C,Gilliam:5B,Grant:6B,Harney:5B,Hood River:5B,Jackson:4C,Jefferson:5B,Josephine:4C,Klamath:5B,Lake:5B,Lane:4C,Lincoln:4C,Linn:4C,Malheur:5B,Marion:4C,Morrow:5B,Multnomah:4C,Polk:4C,Sherman:5B,Tillamook:4C,Umatilla:5B,Union:6B,Wallowa:6B,Wasco:5B,Washington:4C,Wheeler:5B,Yamhill:4C
PA
Adams:5A,Allegheny:5A,Armstrong:5A,Beaver:5A,Bedford:5A,Berks:5A,Blair:5A,Bradford:6A,Bucks:4A,Butler:5A,Cambria:5A,Cameron:6A,Carbon:5A,Centre:5A,Chester:4A,Clarion:5A,Clearfield:5A,Clinton:5A,Columbia:5A,Crawford:5A,Cumberland:5A,Dauphin:5A,Delaware:4A,Elk:6A,Erie:5A,Fayette:5A,Forest:6A,Franklin:5A,Fulton:5A,Greene:4A,Huntingdon:5A,Indiana:5A,Jefferson:5A,Juniata:5A,Lackawanna:5A,Lancaster:4A,Lawrence:5A,Lebanon:5A,Lehigh:5A,Luzerne:5A,Lycoming:5A,McKean:6A,Mercer:5A,Mifflin:5A,Monroe:5A,Montgomery:4A,Montour:5A,Northampton:5A,Northumberland:5A,Perry:5A,Philadelphia:4A,Pike:6A,Potter:6A,Schuylkill:5A,Snyder:5A,Somerset:5A,Sullivan:6A,Susquehanna:6A,Tioga:6A,Union:5A,Venango:5A,Warren:6A,Washington:5A,Wayne:6A,Westmoreland:5A,Wyoming:6A,York:4A
RI
Bristol:5A,Kent:5A,Newport:5A,Providence:5A,Washington:5A
SC
Abbeville:3A,Aiken:3A,Allendale:2A*,Anderson:3A,Bamberg:3A*,Barnwell:3A*,Beaufort:2A*,Berkeley:3A*,Calhoun:3A,Charleston:2A*,Cherokee:3A,Chester:3A,Chesterfield:3A,Clarendon:3A*,Colleton:2A*,Darlington:3A,Dillon:3A*,Dorchester:2A*,Edgefield:3A,Fairfield:3A,Florence:3A,Georgetown:2A*,Greenville:3A,Greenwood:3A,Hampton:2A*,Horry:2A*,Jasper:2A*,Kershaw:3A,Lancaster:3A,Laurens:3A,Lee:3A,Lexington:3A,Marion:3A*,Marlboro:3A,McCormick:3A,Newberry:3A,Oconee:3A,Orangeburg:3A,Pickens:3A,Richland:3A,Saluda:3A,Spartanburg:3A,Sumter:3A,Union:3A,Williamsburg:3A*,York:3A
SD
Aurora:6A,Beadle:6A,Bennett:5A,Bon Homme:5A,Brookings:6A,Brown:6A,Brule:5A,Buffalo:6A,Butte:5B,Campbell:6A,Charles Mix:5A,Clark:6A,Clay:5A,Codington:6A,Corson:6A,Custer:5B,Davison:5A,Day:6A,Deuel:6A,Dewey:6A,Douglas:5A,Edmunds:6A,Fall River:5B,Faulk:6A,Grant:6A,Gregory:5A,Haakon:5B,Hamlin:6A,Hand:6A,Hanson:5A,Harding:6B,Hughes:5A,Hutchinson:5A,Hyde:6A,Jackson:5B,Jerauld:6A,Jones:5A,Kingsbury:6A,Lake:6A,Lawrence:6B,Lincoln:5A,Lyman:5A,Marshall:6A,McCook:5A,McPherson:6A,Meade:5B,Mellette:5A,Miner:6A,Minnehaha:6A,Moody:6A,Pennington:5B,Perkins:6A,Potter:6A,Roberts:6A,Sanborn:6A,Shannon:5B,Spink:6A,Stanley:5A,Sully:6A,Todd:5A,Tripp:5A,Turner:5A,Union:5A,Walworth:6A,Yankton:5A,Ziebach:6A
TN
Anderson:4A,Bedford:4A,Benton:4A,Bledsoe:4A,Blount:4A,Bradley:4A,Campbell:4A,Cannon:4A,Carroll:4A,Carter:4A,Cheatham:4A,Chester:3A,Claiborne:4A,Clay:4A,Cocke:4A,Coffee:4A,Crockett:3A,Cumberland:4A,Davidson:4A,Decatur:4A,DeKalb:4A,Dickson:4A,Dyer:3A,Fayette:3A,Fentress:4A,Franklin:4A,Gibson:3A,Giles:4A,Grainger:4A,Greene:4A,Grundy:4A,Hamblen:4A,Hamilton:4A,Hancock:4A,Hardeman:3A,Hardin:3A,Hawkins:4A,Haywood:3A,Henderson:4A,Henry:4A,Hickman:4A,Houston:4A,Humphreys:4A,Jackson:4A,Jefferson:4A,Johnson:4A,Knox:4A,Lake:4A,Lauderdale:3A,Lawrence:4A,Lewis:4A,Lincoln:4A,Loudon:4A,Macon:4A,Madison:3A,Marion:4A,Marshall:4A,Maury:4A,McMinn:4A,McNairy:3A,Meigs:4A,Monroe:4A,Montgomery:4A,Moore:4A,Morgan:4A,Obion:4A,Overton:4A,Perry:4A,Pickett:4A,Polk:4A,Putnam:4A,Rhea:4A,Roane:4A,Robertson:4A,Rutherford:4A,Scott:4A,Sequatchie:4A,Sevier:4A,Shelby:3A,Smith:4A,Stewart:4A,Sullivan:4A,Sumner:4A,Tipton:3A,Trousdale:4A,Unicoi:4A,Union:4A,Van Buren:4A,Warren:4A,Washington:4A,Wayne:4A,Weakley:4A,White:4A,Williamson:4A,Wilson:4A
TX
Anderson:3A,Andrews:3B,Angelina:2A*,Aransas:2A*,Archer:3A,Armstrong:4B,Atascosa:2A,Austin:2A*,Bailey:4B,Bandera:2A,Bastrop:2A,Baylor:3A,Bee:2A*,Bell:2A,Bexar:2A,Blanco:3A,Borden:3B,Bosque:3A,Bowie:3A,Brazoria:2A*,Brazos:2A,Brewster:3B,Briscoe:4B,Brooks:2A*,Brown:3A,Burleson:2A,Burnet:3A,Caldwell:2A,Calhoun:2A*,Callahan:3A,Cameron:2A*,Camp:3A,Carson:4B,Cass:3A,Castro:4B,Chambers:2A*,Cherokee:3A,Childress:3A,Clay:3A,Cochran:3B,Coke:3B,Coleman:3A,Collin:3A,Collingsworth:3A,Colorado:2A*,Comal:2A,Comanche:3A,Concho:3B,Cooke:3A,Coryell:2A,Cottle:3A,Crane:3B,Crockett:3B,Crosby:3B,Culberson:3B,Dallam:4B,Dallas:3A,Dawson:3B,Deaf Smith:4B,Delta:3A,Denton:3A,DeWitt:2A*,Dickens:3A,Dimmit:2B,Donley:3A,Duval:2A*,Eastland:3A,Ector:3B,Edwards:2B,El Paso:3B,Ellis:3A,Erath:3A,Falls:2A,Fannin:3A,Fayette:2A,Fisher:3A,Floyd:3B,Foard:3A,Fort Bend:2A*,Franklin:3A,Freestone:3A,Frio:2A,Gaines:3B,Galveston:2A*,Garza:3B,Gillespie:3A,Glasscock:3B,Goliad:2A*,Gonzales:2A,Gray:4B,Grayson:3A,Gregg:3A,Grimes:2A,Guadalupe:2A,Hale:3B,Hall:3A,Hamilton:3A,Hansford:4B,Hardeman:3A,Hardin:2A*,Harris:2A*,Harrison:3A,Hartley:4B,Haskell:3A,Hays:2A,Hemphill:4A,Henderson:3A,Hidalgo:2A*,Hill:3A,Hockley:3B,Hood:3A,Hopkins:3A,Houston:2A*,Howard:3B,Hudspeth:3B,Hunt:3A,Hutchinson:4B,Irion:3B,Jack:3A,Jackson:2A*,Jasper:2A*,Jeff Davis:3B,Jefferson:2A*,Jim Hogg:2A*,Jim Wells:2A*,Johnson:3A,Jones:3A,Karnes:2A,Kaufman:3A,Kendall:2A,Kenedy:2A*,Kent:3A,Kerr:2A,Kimble:3B,King:3A,Kinney:2B,Kleberg:2A*,Knox:3A,La Salle:2A,Lamar:3A,Lamb:3B,Lampasas:2A,Lavaca:2A,Lee:2A,Leon:2A,Liberty:2A*,Limestone:2A,Lipscomb:4A,Live Oak:2A*,Llano:2A,Loving:3B,Lubbock:3B,Lynn:3B,Madison:2A,Marion:3A,Martin:3B,Mason:3B,Matagorda:2A*,Maverick:2B,McCulloch:3B,McLennan:2A,McMullen:2A,Medina:2A,Menard:3B,Midland:3B,Milam:2A,Mills:3A,Mitchell:3A,Montague:3A,Montgomery:2A*,Moore:4B,Morris:3A,Motley:3A,Nacogdoches:3A,Navarro:3A,Newton:2A*,Nolan:3A,Nueces:2A*,Ochiltree:4A,Oldham:4B,Orange:2A*,Palo Pinto:3A,Panola:3A,Parker:3A,Parmer:4B,Pecos:3B,Polk:2A*,Potter:4B,Presidio:3B,Rains:3A,Randall:4B,Reagan:3B,Real:2A,Red River:3A,Reeves:3B,Refugio:2A*,Roberts:4B,Robertson:2A,Rockwall:3A,Runnels:3A,Rusk:3A,Sabine:3A,San Augustine:3A,San Jacinto:2A*,San Patricio:2A*,San Saba:3A,Schleicher:3B,Scurry:3A,Shackelford:3A,Shelby:3A,Sherman:4B,Smith:3A,Somervell:3A,Starr:2A*,Stephens:3A,Sterling:3B,Stonewall:3A,Sutton:3B,Swisher:4B,Tarrant:3A,Taylor:3A,Terrell:3B,Terry:3B,Throckmorton:3A,Titus:3A,Tom Green:3B,Travis:2A,Trinity:2A*,Tyler:2A*,Upshur:3A,Upton:3B,Uvalde:2B,Val Verde:2B,Van Zandt:3A,Victoria:2A*,Walker:2A*,Waller:2A*,Ward:3B,Washington:2A,Webb:2A,Wharton:2A*,Wheeler:4A,Wichita:3A,Wilbarger:3A,Willacy:2A*,Williamson:2A,Wilson:2A,Winkler:3B,Wise:3A,Wood:3A,Yoakum:3B,Young:3A,Zapata:2A,Zavala:2B
UT
Beaver:5B,Box Elder:5B,Cache:6B,Carbon:5B,Daggett:6B,Davis:5B,Duchesne:6B,Emery:5B,Garfield:5B,Grand:5B,Iron:5B,Juab:5B,Kane:5B,Millard:5B,Morgan:6B,Piute:6B,Rich:6B,Salt Lake:5B,San Juan:5B,Sanpete:6B,Sevier:5B,Summit:6B,Tooele:5B,Uintah:5B,Utah:5B,Wasatch:6B,Washington:3B,Wayne:5B,Weber:5B
VT
Addison:6A,Bennington:6A,Caledonia:6A,Chittenden:6A,Essex:6A,Franklin:6A,Grand Isle:6A,Lamoille:6A,Orange:6A,Orleans:6A,Rutland:6A,Washington:6A,Windham:6A,Windsor:6A
VA
Accomack:4A,Albemarle:4A,Alexandria:4A,Alleghany:4A,Amelia:4A,Amherst:4A,Appomattox:4A,Arlington:4A,Augusta:4A,Bath:4A,Bedford:4A,Bland:4A,Botetourt:4A,Bristol:4A,Brunswick:4A,Buchanan:4A,Buckingham:4A,Buena Vista:4A,Campbell:4A,Caroline:4A,Carroll:4A,Charles City:4A,Charlotte:4A,Charlottesville:4A,Chesapeake:4A,Chesterfield:4A,Clarke:4A,Colonial Heights:4A,Covington:4A,Craig:4A,Culpeper:4A,Cumberland:4A,Danville:4A,Dickenson:4A,Dinwiddie:4A,Emporia:4A,Essex:4A,Fairfax:4A,Fairfax City:4A,Falls Church:4A,Fauquier:4A,Floyd:4A,Fluvanna:4A,Franklin:4A,Franklin City:4A,Frederick:4A,Fredericksburg:4A,Galax:4A,Giles:4A,Gloucester:4A,Goochland:4A,Grayson:4A,Greene:4A,Greensville:4A,Halifax:4A,Hampton:4A,Hanover:4A,Harrisonburg:4A,Henrico:4A,Henry:4A,Highland:5A,Hopewell:4A,Isle of Wight:4A,James City:4A,King and Queen:4A,King George:4A,King William:4A,Lancaster:4A,Lee:4A,Lexington:4A,Loudoun:4A,Louisa:4A,Lunenburg:4A,Lynchburg:4A,Madison:4A,Manassas:4A,Manassas Park:4A,Martinsville:4A,Mathews:4A,Mecklenburg:4A,Middlesex:4A,Montgomery:4A,Nelson:4A,New Kent:4A,Newport News:4A,Norfolk:4A,Northampton:4A,Northumberland:4A,Norton:4A,Nottoway:4A,Orange:4A,Page:4A,Patrick:4A,Petersburg:4A,Pittsylvania:4A,Poquoson:4A,Portsmouth:4A,Powhatan:4A,Prince Edward:4A,Prince George:4A,Prince William:4A,Pulaski:4A,Radford:4A,Rappahannock:4A,Richmond:4A,Richmond City:4A,Roanoke:4A,Roanoke City:4A,Rockbridge:4A,Rockingham:4A,Russell:4A,Salem:4A,Scott:4A,Shenandoah:4A,Smyth:4A,Southampton:4A,Spotsylvania:4A,Stafford:4A,Staunton:4A,Suffolk:4A,Surry:4A,Sussex:4A,Tazewell:4A,Virginia Beach:4A,Warren:4A,Washington:4A,Waynesboro:4A,Westmoreland:4A,Williamsburg:4A,Winchester:4A,Wise:4A,Wythe:4A,York:4A
WA
Adams:5B,Asotin:5B,Benton:5B,Chelan:5B,Clallam:4C,Clark:4C,Columbia:5B,Cowlitz:4C,Douglas:5B,Ferry:6B,Franklin:5B,Garfield:5B,Grant:5B,Grays Harbor:4C,Island:4C,Jefferson:4C,King:4C,Kitsap:4C,Kittitas:5B,Klickitat:5B,Lewis:4C,Lincoln:5B,Mason:4C,Okanogan:6B,Pacific:4C,Pend Oreille:6B,Pierce:4C,San Juan:4C,Skagit:4C,Skamania:4C,Snohomish:4C,Spokane:5B,Stevens:6B,Thurston:4C,Wahkiakum:4C,Walla Walla:5B,Whatcom:4C,Whitman:5B,Yakima:5B
WV
Barbour:5A,Berkeley:4A,Boone:4A,Braxton:4A,Brooke:5A,Cabell:4A,Calhoun:4A,Clay:4A,Doddridge:4A,Fayette:4A,Gilmer:4A,Grant:5A,Greenbrier:4A,Hampshire:4A,Hancock:5A,Hardy:4A,Harrison:5A,Jackson:4A,Jefferson:4A,Kanawha:4A,Lewis:4A,Lincoln:4A,Logan:4A,Marion:5A,Marshall:5A,Mason:4A,McDowell:4A,Mercer:4A,Mineral:4A,Mingo:4A,Monongalia:5A,Monroe:4A,Morgan:4A,Nicholas:4A,Ohio:5A,Pendleton:5A,Pleasants:4A,Pocahontas:5A,Preston:5A,Putnam:4A,Raleigh:4A,Randolph:5A,Ritchie:4A,Roane:4A,Summers:4A,Taylor:5A,Tucker:5A,Tyler:4A,Upshur:5A,Wayne:4A,Webster:4A,Wetzel:5A,Wirt:4A,Wood:4A,Wyoming:4A
WI
Adams:6A,Ashland:7,Barron:6A,Bayfield:7,Brown:6A,Buffalo:6A,Burnett:7,Calumet:6A,Chippewa:6A,Clark:6A,Columbia:6A,Crawford:6A,Dane:6A,Dodge:6A,Door:6A,Douglas:7,Dunn:6A,Eau Claire:6A,Florence:7,Fond du Lac:6A,Forest:7,Grant:5A,Green:6A,Green Lake:6A,Iowa:6A,Iron:7,Jackson:6A,Jefferson:6A,Juneau:6A,Kenosha:5A,Kewaunee:6A,La Crosse:6A,Lafayette:5A,Langlade:7,Lincoln:7,Manitowoc:6A,Marathon:6A,Marinette:6A,Marquette:6A,Menominee:6A,Milwaukee:6A,Monroe:6A,Oconto:6A,Oneida:7,Outagamie:6A,Ozaukee:6A,Pepin:6A,Pierce:6A,Polk:6A,Portage:6A,Price:7,Racine:6A,Richland:6A,Rock:6A,Rusk:6A,Sauk:6A,Sawyer:7,Shawano:6A,Sheboygan:6A,St. Croix:6A,Taylor:7,Trempealeau:6A,Vernon:6A,Vilas:7,Walworth:6A,Washburn:7,Washington:6A,Waukesha:6A,Waupaca:6A,Waushara:6A,Winnebago:6A,Wood:6A
WY
Albany:6B,Big Horn:6B,Campbell:6B,Carbon:6B,Converse:6B,Crook:6B,Fremont:6B,Goshen:5B,Hot Springs:6B,Johnson:6B,Laramie:5B,Lincoln:7,Natrona:6B,Niobrara:6B,Park:6B,Platte:5B,Sheridan:6B,Sublette:7,Sweetwater:6B,Teton:7,Uinta:6B,Washakie:6B,Weston:6B
AS
All:1A*
GU
All:1A*
MP
All:1A*
PR
All:1A*
VI
All:1A*
`;
var CLIMATE_KEYS = [
	"1A",
	"1B",
	"2A",
	"2B",
	"3A",
	"3B",
	"3C",
	"4A",
	"4B",
	"4C",
	"5A",
	"5B",
	"5C",
	"6A",
	"6B",
	"7",
	"8"
];
var STATES = [
	{
		code: "AL",
		name: "Alabama"
	},
	{
		code: "AK",
		name: "Alaska"
	},
	{
		code: "AZ",
		name: "Arizona"
	},
	{
		code: "AR",
		name: "Arkansas"
	},
	{
		code: "CA",
		name: "California"
	},
	{
		code: "CO",
		name: "Colorado"
	},
	{
		code: "CT",
		name: "Connecticut"
	},
	{
		code: "DE",
		name: "Delaware"
	},
	{
		code: "DC",
		name: "District of Columbia"
	},
	{
		code: "FL",
		name: "Florida"
	},
	{
		code: "GA",
		name: "Georgia"
	},
	{
		code: "HI",
		name: "Hawaii"
	},
	{
		code: "ID",
		name: "Idaho"
	},
	{
		code: "IL",
		name: "Illinois"
	},
	{
		code: "IN",
		name: "Indiana"
	},
	{
		code: "IA",
		name: "Iowa"
	},
	{
		code: "KS",
		name: "Kansas"
	},
	{
		code: "KY",
		name: "Kentucky"
	},
	{
		code: "LA",
		name: "Louisiana"
	},
	{
		code: "ME",
		name: "Maine"
	},
	{
		code: "MD",
		name: "Maryland"
	},
	{
		code: "MA",
		name: "Massachusetts"
	},
	{
		code: "MI",
		name: "Michigan"
	},
	{
		code: "MN",
		name: "Minnesota"
	},
	{
		code: "MS",
		name: "Mississippi"
	},
	{
		code: "MO",
		name: "Missouri"
	},
	{
		code: "MT",
		name: "Montana"
	},
	{
		code: "NE",
		name: "Nebraska"
	},
	{
		code: "NV",
		name: "Nevada"
	},
	{
		code: "NH",
		name: "New Hampshire"
	},
	{
		code: "NJ",
		name: "New Jersey"
	},
	{
		code: "NM",
		name: "New Mexico"
	},
	{
		code: "NY",
		name: "New York"
	},
	{
		code: "NC",
		name: "North Carolina"
	},
	{
		code: "ND",
		name: "North Dakota"
	},
	{
		code: "OH",
		name: "Ohio"
	},
	{
		code: "OK",
		name: "Oklahoma"
	},
	{
		code: "OR",
		name: "Oregon"
	},
	{
		code: "PA",
		name: "Pennsylvania"
	},
	{
		code: "RI",
		name: "Rhode Island"
	},
	{
		code: "SC",
		name: "South Carolina"
	},
	{
		code: "SD",
		name: "South Dakota"
	},
	{
		code: "TN",
		name: "Tennessee"
	},
	{
		code: "TX",
		name: "Texas"
	},
	{
		code: "UT",
		name: "Utah"
	},
	{
		code: "VT",
		name: "Vermont"
	},
	{
		code: "VA",
		name: "Virginia"
	},
	{
		code: "WA",
		name: "Washington"
	},
	{
		code: "WV",
		name: "West Virginia"
	},
	{
		code: "WI",
		name: "Wisconsin"
	},
	{
		code: "WY",
		name: "Wyoming"
	},
	{
		code: "AS",
		name: "American Samoa"
	},
	{
		code: "GU",
		name: "Guam"
	},
	{
		code: "MP",
		name: "Northern Mariana Islands"
	},
	{
		code: "PR",
		name: "Puerto Rico"
	},
	{
		code: "VI",
		name: "U.S. Virgin Islands"
	}
];
var cache = null;
function allCounties() {
	if (cache) return cache;
	const rows = [];
	let state = "";
	for (const line of COUNTY_RAW.split("\n")) {
		const t = line.trim();
		if (!t) continue;
		if (/^[A-Z]{2}$/.test(t)) {
			state = t;
			continue;
		}
		for (const part of t.split(",")) {
			const p = part.trim();
			if (!p) continue;
			const m = p.match(/^(.+?):(\d[ABC]?)(\*?)$/);
			if (!m) continue;
			const zone = m[2];
			rows.push({
				state,
				county: m[1],
				zone,
				warmHumid: m[3] === "*"
			});
		}
	}
	cache = rows;
	return rows;
}
function searchCounties(q, state) {
	const query = q.trim().toLowerCase();
	return allCounties().filter((c) => {
		if (state && c.state !== state) return false;
		if (!query) return true;
		return c.county.toLowerCase().includes(query);
	}).slice(0, 80);
}
function zoneNumber(zone) {
	return Number(zone[0]);
}
function moistureOf(zone) {
	const m = zone.slice(1);
	if (m === "A" || m === "B" || m === "C") return m;
	return "";
}
/** Residential Table R402 grouping: Marine 4 uses CZ5 column; 7 and 8 share a column. */
function residentialColumn(zone) {
	const n = zoneNumber(zone);
	if (n === 4 && moistureOf(zone) === "C") return "5";
	if (n >= 7) return "7";
	return String(n);
}
/** Commercial: “4 except Marine” vs “5 and Marine 4”. */
function commercialColumn(zone) {
	const n = zoneNumber(zone);
	if (n === 4 && moistureOf(zone) === "C") return 5;
	return n;
}
function zoneLabel(zone) {
	const n = zoneNumber(zone);
	const m = moistureOf(zone);
	const moist = m === "A" ? "Moist" : m === "B" ? "Dry" : m === "C" ? "Marine" : n >= 7 ? "—" : "";
	return `Climate Zone ${zone}${moist ? ` (${moist})` : ""}`;
}
/** Table C301.3(1) Dry (B): P_m < 0.44 × (T_F − 19.5) */
function isDryClimate(annualPrecipIn, meanTempF) {
	return annualPrecipIn < .44 * (meanTempF - 19.5);
}
function dryThresholdInches(meanTempF) {
	return .44 * (meanTempF - 19.5);
}
/**
* Table C301.3(2) thermal criteria (IP). Marine locations use 3C/4C rows.
* Apply marine test first, then this thermal table, then A/B moisture.
*/
function zoneFromDegreeDays(opts) {
	const { cdd50, hdd65, marine, dry } = opts;
	if (marine) {
		if (hdd65 <= 3600) return "3C";
		return "4C";
	}
	let n;
	if (cdd50 > 9e3) n = 1;
	else if (cdd50 > 6300) n = 2;
	else if (cdd50 > 4500 && hdd65 <= 5400) n = 3;
	else if (cdd50 <= 4500 && hdd65 <= 5400) n = 4;
	else if (hdd65 <= 7200) n = 5;
	else if (hdd65 <= 9e3) n = 6;
	else if (hdd65 <= 12600) n = 7;
	else n = 8;
	if (n >= 7) return String(n);
	return `${n}${dry ? "B" : "A"}`;
}
var THERMAL_CRITERIA = [
	{
		zone: "1",
		ip: "9000 < CDD50°F",
		si: "5000 < CDD10°C"
	},
	{
		zone: "2",
		ip: "6300 < CDD50°F ≤ 9000",
		si: "3500 < CDD10°C ≤ 5000"
	},
	{
		zone: "3A and 3B",
		ip: "4500 < CDD50°F ≤ 6300 AND HDD65°F ≤ 5400",
		si: "2500 < CDD10°C ≤ 3500 AND HDD18°C ≤ 3000"
	},
	{
		zone: "4A and 4B",
		ip: "CDD50°F ≤ 4500 AND HDD65°F ≤ 5400",
		si: "CDD10°C ≤ 2500 AND HDD18°C ≤ 3000"
	},
	{
		zone: "3C",
		ip: "HDD65°F ≤ 3600",
		si: "HDD18°C ≤ 2000"
	},
	{
		zone: "4C",
		ip: "3600 < HDD65°F ≤ 5400",
		si: "2000 < HDD18°C ≤ 3000"
	},
	{
		zone: "5",
		ip: "5400 < HDD65°F ≤ 7200",
		si: "3000 < HDD18°C ≤ 4000"
	},
	{
		zone: "6",
		ip: "7200 < HDD65°F ≤ 9000",
		si: "4000 < HDD18°C ≤ 5000"
	},
	{
		zone: "7",
		ip: "9000 < HDD65°F ≤ 12600",
		si: "5000 < HDD18°C ≤ 7000"
	},
	{
		zone: "8",
		ip: "12600 < HDD65°F",
		si: "7000 < HDD18°C"
	}
];
var INTERIOR_DESIGN = {
	heatingMaxF: 72,
	coolingMinF: 75,
	note: "C302.1 / R302.1 — interior design temperatures used for heating and cooling load calculations shall be a maximum of 72°F for heating and minimum of 75°F for cooling."
};
function cn(...parts) {
	return parts.filter(Boolean).join(" ");
}
function fmt(n, digits = 3) {
	if (!Number.isFinite(n)) return "—";
	return n.toLocaleString("en-US", {
		maximumFractionDigits: digits,
		minimumFractionDigits: 0
	});
}
function clamp(n, lo, hi) {
	return Math.min(hi, Math.max(lo, n));
}
function HomeCalc({ onOpen }) {
	const zone = useWorkbook((s) => s.zone);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "mb-8 max-w-2xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs tracking-widest text-faint uppercase",
				children: "International Energy Conservation Code"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display mt-1 text-3xl font-semibold tracking-tight sm:text-4xl",
				children: "2018 IECC Workbook"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-base text-muted",
				children: [
					"Spreadsheet calculators built from the code tables and equations — climate zone ",
					zone,
					" is active and drives every lookup."
				]
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-8",
		children: GROUPS.filter((g) => g !== "Start").map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "mb-3 font-mono text-xs tracking-widest text-faint uppercase",
			children: group
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3 sm:grid-cols-2",
			children: CATALOG.filter((c) => c.group === group).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => onOpen(c.id),
				className: "rounded-lg border border-line bg-surface p-4 text-left shadow-sheet transition-colors duration-150 hover:border-line-strong",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs text-faint",
						children: c.section
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display mt-1 text-lg font-semibold",
						children: c.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: c.blurb
					})
				]
			}, c.id))
		})] }, group))
	})] });
}
/** C403.8.1 fan power limitation coefficients */
var FAN_COEFF = {
	nameplate: {
		cv: .0011,
		vav: .0015
	},
	bhp: {
		cv: 94e-5,
		vav: .0013
	}
};
function fanNameplateHp(cfm, vav) {
	return cfm * (vav ? FAN_COEFF.nameplate.vav : FAN_COEFF.nameplate.cv);
}
function fanSystemBhp(cfm, vav, pressureAdjA = 0) {
	return cfm * (vav ? FAN_COEFF.bhp.vav : FAN_COEFF.bhp.cv) + pressureAdjA;
}
/**
* 2018 IECC Table C403.7.4.2(1)/(2) — minimum supply cfm at which ERV is required.
* `null` means NR for that OA bin.
*/
var OA_BINS = [
	.1,
	.2,
	.3,
	.4,
	.5,
	.6,
	.7,
	.8
];
function ervGroup(zone) {
	const n = zoneNumber(zone);
	const m = moistureOf(zone);
	if (n === 3 && (m === "B" || m === "C") || n === 4 && (m === "B" || m === "C") || n === 5 && m === "B") return "nr";
	if ((n === 1 || n === 2) && m === "B") return "b";
	if (n === 5 && m === "C") return "b";
	if (n === 6 && m === "B") return "c";
	if (n >= 7) return "c";
	return "a";
}
var ERV_LT8000 = {
	nr: [
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null
	],
	a: [
		null,
		null,
		null,
		null,
		26e3,
		12e3,
		5e3,
		4e3
	],
	b: [
		null,
		null,
		null,
		19500,
		9e3,
		5e3,
		4e3,
		3e3
	],
	c: [
		2500,
		2e3,
		1e3,
		500,
		140,
		120,
		100,
		80
	]
};
var ERV_GE8000 = {
	nr: [
		null,
		null,
		null,
		null,
		null,
		26500,
		2e4,
		4e3
	],
	a: [
		26e3,
		16e3,
		5500,
		4500,
		3500,
		2e3,
		1e3,
		120
	],
	b: [
		1e4,
		6500,
		5500,
		4500,
		3500,
		2e3,
		1e3,
		0
	],
	c: [
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0
	]
};
function ervThresholdCfm(zone, oaFrac, hours8000) {
	const row = (hours8000 ? ERV_GE8000 : ERV_LT8000)[ervGroup(zone)];
	let bin = 0;
	for (let i = 0; i < OA_BINS.length; i++) if (oaFrac >= OA_BINS[i]) bin = i;
	return row[bin] ?? null;
}
function ervRequired(zone, oaFrac, supplyCfm, hours8000) {
	const t = ervThresholdCfm(zone, oaFrac, hours8000);
	if (t === null) return false;
	return supplyCfm >= t;
}
/** C403.3.2(3) PTAC / PTHP — Cap in Btu/h, bounded 7,000–15,000 */
function ptacCap(btuh) {
	return clamp(btuh, 7e3, 15e3);
}
function ptacCoolEer(btuh, replacement = false) {
	const c = ptacCap(btuh) / 1e3;
	return replacement ? 10.9 - .213 * c : 14 - .3 * c;
}
function pthpHeatCop(btuh, replacement = false) {
	const c = ptacCap(btuh) / 1e3;
	return replacement ? 2.9 - .026 * c : 3.7 - .052 * c;
}
/**
* C403.3.2.1 centrifugal chiller lift adjustment.
* A = LIFT = CEWT − CLWT (°F)
* Eq 4-6 Path A (FL), Eq 4-7 Path B (IPLV)
*/
function chillerKadj(liftF, path) {
	const A = liftF;
	if (path === "A") return 6.174722 - .303813 * A + .006251 * A ** 2 - 4583e-8 * A ** 3;
	return 5.741807 - .287119 * A + .005995 * A ** 2 - 43008e-9 * A ** 3;
}
function chillerAdjKwPerTon(tableKwPerTon, kadj) {
	if (kadj <= 0) return NaN;
	return tableKwPerTon / kadj;
}
/** C403.11.3 minimum insulation thickness (in) by fluid temp and NPS */
var PIPE_INSULATION = [
	{
		temp: "105–140°F",
		conductivity: "0.21–0.28",
		nps: {
			"<1\"": 1,
			"1–1¼\"": 1,
			"1½–3\"": 1.5,
			"4–6\"": 1.5,
			"≥8\"": 1.5
		}
	},
	{
		temp: "141–200°F",
		conductivity: "0.25–0.29",
		nps: {
			"<1\"": 1.5,
			"1–1¼\"": 1.5,
			"1½–3\"": 2,
			"4–6\"": 2,
			"≥8\"": 2
		}
	},
	{
		temp: "201–250°F",
		conductivity: "0.27–0.30",
		nps: {
			"<1\"": 2,
			"1–1¼\"": 2.5,
			"1½–3\"": 2.5,
			"4–6\"": 3,
			"≥8\"": 3
		}
	},
	{
		temp: "251–350°F",
		conductivity: "0.29–0.32",
		nps: {
			"<1\"": 2.5,
			"1–1¼\"": 2.5,
			"1½–3\"": 3,
			"4–6\"": 3.5,
			"≥8\"": 3.5
		}
	},
	{
		temp: "40–60°F (cooling)",
		conductivity: "0.21–0.27",
		nps: {
			"<1\"": .5,
			"1–1¼\"": .5,
			"1½–3\"": 1,
			"4–6\"": 1,
			"≥8\"": 1
		}
	},
	{
		temp: "<40°F",
		conductivity: "0.20–0.26",
		nps: {
			"<1\"": 1,
			"1–1¼\"": 1.5,
			"1½–3\"": 1.5,
			"4–6\"": 1.5,
			"≥8\"": 1.5
		}
	}
];
var PIPE_NPS = [
	"<1\"",
	"1–1¼\"",
	"1½–3\"",
	"4–6\"",
	"≥8\""
];
/**
* Equivalent thickness when installed k differs from table K.
* T = r [ (1 + t/r)^(k/K) − 1 ]
*/
function equivalentThickness(r, t, k, K) {
	if (r <= 0 || K <= 0) return NaN;
	return r * ((1 + t / r) ** (k / K) - 1);
}
/** Nominal pipe radius (in) for the NPS bins — outside radius of steel pipe */
var PIPE_RADIUS_IN = {
	"<1\"": .42,
	"1–1¼\"": .83,
	"1½–3\"": 1.75,
	"4–6\"": 3,
	"≥8\"": 4.5
};
var SWH_TABLE = [
	{
		equipment: "Electric storage ≤ 12 kW",
		size: "≥ 20 gal",
		efficiency: "UEF per 10 CFR 430"
	},
	{
		equipment: "Electric storage ≤ 12 kW, heat pump",
		size: "Any",
		efficiency: "UEF ≥ 2.00 (typical ≥55 gal)"
	},
	{
		equipment: "Gas storage ≤ 75 kBtu/h",
		size: "≥ 20 gal",
		efficiency: "UEF per 10 CFR 430"
	},
	{
		equipment: "Gas storage > 75 kBtu/h",
		size: "≤ 4,000 Btu/h·gal",
		efficiency: "80% Et, SL ≤ 110√V + 800/V/2 (Btu/h)"
	},
	{
		equipment: "Instantaneous gas ≥ 4,000 Btu/h·gal",
		size: "< 200 kBtu/h",
		efficiency: "UEF per 10 CFR 430"
	},
	{
		equipment: "Instantaneous gas ≥ 4,000 Btu/h·gal",
		size: "≥ 200 kBtu/h",
		efficiency: "80% Et"
	},
	{
		equipment: "Oil storage > 105 kBtu/h",
		size: "≤ 4,000 Btu/h·gal",
		efficiency: "80% Et, SL ≤ 110√V + 800/V/2"
	},
	{
		equipment: "Hot-water supply boiler, gas",
		size: "≥ 4,000 Btu/h·gal",
		efficiency: "80% Et"
	},
	{
		equipment: "Pool heater, gas",
		size: "Any",
		efficiency: "82% Et"
	},
	{
		equipment: "Unfired storage tank",
		size: "Any",
		efficiency: "R-12.5 insulation"
	}
];
function standbyLossBtu(volumeGal) {
	if (volumeGal <= 0) return NaN;
	return 110 * Math.sqrt(volumeGal) + 800 / (volumeGal / 2);
}
var HOOD_RATES = [
	{
		type: "Wall-mounted canopy",
		light: 250,
		medium: 300,
		heavy: 400,
		extra: 550
	},
	{
		type: "Single island",
		light: 400,
		medium: 500,
		heavy: 600,
		extra: 700
	},
	{
		type: "Double island (per side)",
		light: 250,
		medium: 300,
		heavy: 400,
		extra: 550
	},
	{
		type: "Eyebrow",
		light: 250,
		medium: 250,
		heavy: 250,
		extra: 250
	},
	{
		type: "Backshelf / passover",
		light: 300,
		medium: 300,
		heavy: 400,
		extra: 400
	}
];
var HW_PIPE_MIN = [
	{
		location: "Recirculating system piping, including supply and return",
		thickness: "1 in. (per C403.11.3 105–140°F)"
	},
	{
		location: "First 8 ft from storage tank (non-recirc)",
		thickness: "1 in."
	},
	{
		location: "Piping from a recirculating pump to a storage tank",
		thickness: "1 in."
	},
	{
		location: "Piping under a floor slab",
		thickness: "1 in."
	},
	{
		location: "Buried piping",
		thickness: "1 in."
	},
	{
		location: "Supply and return in a circulating system to the heating plant",
		thickness: "1 in."
	}
];
/** Default unlabeled fenestration Table C303.1.3(1) / R303.1.3 */
var DEFAULT_FEN = [
	{
		desc: "Metal frame, single glazing",
		u: 1.2,
		shgc: .82,
		vt: .76
	},
	{
		desc: "Metal frame, single + operable",
		u: 1.2,
		shgc: .82,
		vt: .76
	},
	{
		desc: "Metal frame, double glazing",
		u: .8,
		shgc: .7,
		vt: .64
	},
	{
		desc: "Metal frame, double + low-e",
		u: .65,
		shgc: .4,
		vt: .44
	},
	{
		desc: "Nonmetal frame, single glazing",
		u: .95,
		shgc: .82,
		vt: .76
	},
	{
		desc: "Nonmetal frame, double glazing",
		u: .55,
		shgc: .7,
		vt: .64
	},
	{
		desc: "Nonmetal frame, double + low-e",
		u: .4,
		shgc: .4,
		vt: .44
	},
	{
		desc: "Glazed block",
		u: .6,
		shgc: .6,
		vt: .56
	},
	{
		desc: "Skylight, metal, single",
		u: 1.98,
		shgc: .82,
		vt: .76
	},
	{
		desc: "Skylight, metal, double",
		u: 1.31,
		shgc: .7,
		vt: .64
	}
];
var OPAQUE_DOOR_DEFAULT = {
	swinging: .7,
	nonswinging: .5
};
function Panel({ title, kicker, children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: cn("rounded-xl border border-line bg-surface p-4 shadow-sheet sm:p-5", className),
		children: [(kicker || title) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "mb-4",
			children: [kicker && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs tracking-wide text-faint uppercase",
				children: kicker
			}), title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl font-semibold text-ink",
				children: title
			})]
		}), children]
	});
}
function Field({ label, hint, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex min-w-0 flex-col gap-1.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium text-ink-2",
				children: label
			}),
			children,
			hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs text-muted",
				children: hint
			})
		]
	});
}
var inputClass = "h-11 w-full rounded-sm border border-line bg-bg px-3 font-mono text-sm text-ink tabular-nums outline-none transition-colors duration-150 focus:border-accent";
function NumInput({ value, onChange, step = "any", min, max, suffix, disabled }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "number",
			inputMode: "decimal",
			className: cn(inputClass, suffix && "pr-12", disabled && "opacity-60"),
			value: Number.isFinite(value) ? value : "",
			step,
			min,
			max,
			disabled,
			onChange: (e) => {
				const v = e.target.value;
				onChange(v === "" ? NaN : Number(v));
			}
		}), suffix && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 font-mono text-xs text-faint",
			children: suffix
		})]
	});
}
function TextInput({ value, onChange, placeholder }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type: "text",
		className: cn(inputClass, "font-sans"),
		value,
		placeholder,
		onChange: (e) => onChange(e.target.value)
	});
}
function Select({ value, onChange, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
		className: cn(inputClass, "font-sans"),
		value,
		onChange: (e) => onChange(e.target.value),
		children
	});
}
function Verdict({ status, children }) {
	const cls = status === "pass" ? "bg-pass-bg text-pass" : status === "fail" ? "bg-fail-bg text-fail" : status === "na" ? "bg-warn-bg text-warn" : "bg-info-bg text-info";
	const word = status === "pass" ? "Pass" : status === "fail" ? "Fail" : status === "na" ? "N/A" : "Note";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex flex-wrap items-center gap-2 rounded-md px-3 py-2 text-sm font-medium", cls),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-mono text-xs tracking-wide uppercase",
			children: word
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children })]
	});
}
function Stat({ label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md border border-line bg-bg px-3 py-2.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-lg text-ink tabular-nums",
				children: value
			}),
			hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-faint",
				children: hint
			})
		]
	});
}
function SheetTable({ columns, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "-mx-1 overflow-x-auto",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full min-w-[36rem] border-collapse text-left text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
				className: "border-b border-line",
				children: columns.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					className: "px-2 py-2 text-xs font-medium tracking-wide text-muted uppercase",
					children: c
				}, c))
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
				className: "font-mono text-sm tabular-nums",
				children
			})]
		})
	});
}
function Formula({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "rounded-md bg-bg-2 px-3 py-2 font-mono text-sm text-ink-2",
		children
	});
}
function GhostButton({ onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: "h-11 rounded-sm border border-line bg-bg px-3 text-sm font-medium text-ink-2 transition-colors duration-150 hover:border-line-strong hover:bg-bg-2",
		children
	});
}
function ClimateCalc() {
	const zone = useWorkbook((s) => s.zone);
	const setZone = useWorkbook((s) => s.setZone);
	const [state, setState] = (0, import_react.useState)("");
	const [q, setQ] = (0, import_react.useState)("");
	const [cdd, setCdd] = (0, import_react.useState)(4500);
	const [hdd, setHdd] = (0, import_react.useState)(5400);
	const [marine, setMarine] = (0, import_react.useState)(false);
	const [precip, setPrecip] = (0, import_react.useState)(20);
	const [meanT, setMeanT] = (0, import_react.useState)(55);
	const hits = (0, import_react.useMemo)(() => searchCounties(q, state || void 0), [q, state]);
	const dry = precip < dryThresholdInches(meanT);
	const fromDd = zoneFromDegreeDays({
		cdd50: cdd,
		hdd65: hdd,
		marine,
		dry
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			kicker: "Table C301.1 / R301.1",
			title: "County lookup",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 grid gap-3 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "State",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: state,
							onChange: setState,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "All states"
							}), STATES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: s.code,
								children: s.name
							}, s.code))]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "County",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							value: q,
							onChange: setQ,
							placeholder: "Start typing a county"
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "max-h-80 overflow-auto rounded-md border border-line",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-left text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "sticky top-0 bg-surface",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-line",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-3 py-2 text-xs font-medium text-muted",
										children: "County"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-3 py-2 text-xs font-medium text-muted",
										children: "State"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-3 py-2 text-xs font-medium text-muted",
										children: "Zone"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-3 py-2 text-xs font-medium text-muted",
										children: "Warm-humid"
									})
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [hits.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "cursor-pointer border-b border-line last:border-0 hover:bg-bg-2",
							onClick: () => setZone(h.zone),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-2",
									children: h.county
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-2 font-mono",
									children: h.state
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-2 font-mono",
									children: h.zone
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-2 text-muted",
									children: h.warmHumid ? "Yes (R301.2)" : "—"
								})
							]
						}, `${h.state}-${h.county}`)), hits.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							colSpan: 4,
							className: "px-3 py-6 text-center text-muted",
							children: "No counties match."
						}) })] })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-xs text-muted",
					children: [
						"Select a row to set the workbook climate zone. Current: ",
						zoneLabel(zone),
						"."
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			kicker: "Table C301.3",
			title: "Thermal criteria",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "CDD50°F",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
								value: cdd,
								onChange: setCdd
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "HDD65°F",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
								value: hdd,
								onChange: setHdd
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Annual precip (in)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
								value: precip,
								onChange: setPrecip
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Mean annual temp (°F)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
								value: meanT,
								onChange: setMeanT
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mb-4 flex h-11 items-center gap-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: marine,
						onChange: (e) => setMarine(e.target.checked)
					}), "Marine location (C301.3)"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 grid gap-3 sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Dry threshold",
							value: `${dryThresholdInches(meanT).toFixed(1)} in`,
							hint: "0.44 × (T − 19.5)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Moisture",
							value: dry ? "Dry (B)" : "Moist (A)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Resulting zone",
							value: fromDd
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Verdict, {
					status: "info",
					children: [
						"Computed zone ",
						fromDd,
						". Apply this zone to the workbook?"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "mt-3 h-11 rounded-sm bg-accent px-4 text-sm font-medium text-accent-fg",
					onClick: () => setZone(fromDd),
					children: ["Use ", fromDd]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[32rem] text-left text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-line",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 text-xs text-muted",
									children: "Zone"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 text-xs text-muted",
									children: "IP"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 text-xs text-muted",
									children: "SI"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: THERMAL_CRITERIA.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-line",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2 font-mono",
									children: r.zone
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2",
									children: r.ip
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2 text-muted",
									children: r.si
								})
							]
						}, r.zone)) })]
					})
				})
			]
		})]
	});
}
function DefaultsCalc() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				kicker: "C302.1 / R302.1",
				title: "Interior design temperatures",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Formula, { children: INTERIOR_DESIGN.note }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid gap-3 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Heating, maximum",
						value: `${INTERIOR_DESIGN.heatingMaxF} °F`
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Cooling, minimum",
						value: `${INTERIOR_DESIGN.coolingMinF} °F`
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				kicker: "Table C303.1.3(1)",
				title: "Unlabeled fenestration defaults",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[32rem] text-left text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-line",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 text-xs text-muted",
									children: "Glazing"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 text-xs text-muted",
									children: "U-factor"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 text-xs text-muted",
									children: "SHGC"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 text-xs text-muted",
									children: "VT"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "font-mono tabular-nums",
							children: DEFAULT_FEN.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-line",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2 font-sans",
										children: r.desc
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2",
										children: r.u.toFixed(2)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2",
										children: r.shgc.toFixed(2)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2",
										children: r.vt.toFixed(2)
									})
								]
							}, r.desc))
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid gap-3 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Swinging opaque door (default U)",
						value: OPAQUE_DOOR_DEFAULT.swinging.toFixed(2)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Nonswinging opaque door (default U)",
						value: OPAQUE_DOOR_DEFAULT.nonswinging.toFixed(2)
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				kicker: "C301.3",
				title: "All climate keys",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: CLIMATE_KEYS.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-sm border border-line bg-bg px-2 py-1 font-mono text-sm",
						children: k
					}, k))
				})
			})
		]
	});
}
/** Tables R402.1.2 and R402.1.4 */
var RES_ENVELOPE = {
	"1": {
		fenU: null,
		skyU: .75,
		shgc: .25,
		ceilingR: "R-30",
		woodWallR: "R-13",
		massWallR: "R-3 / R-4",
		floorR: "R-13",
		basementR: "0",
		slabR: "0",
		crawlR: "0",
		fenUeq: .5,
		skyUeq: .75,
		ceilingU: .035,
		wallU: .084,
		massU: .197,
		floorU: .064,
		basementU: .36,
		crawlU: .477
	},
	"2": {
		fenU: .4,
		skyU: .65,
		shgc: .25,
		ceilingR: "R-38",
		woodWallR: "R-13",
		massWallR: "R-4 / R-6",
		floorR: "R-13",
		basementR: "0",
		slabR: "0",
		crawlR: "0",
		fenUeq: .4,
		skyUeq: .65,
		ceilingU: .03,
		wallU: .084,
		massU: .165,
		floorU: .064,
		basementU: .36,
		crawlU: .477
	},
	"3": {
		fenU: .32,
		skyU: .55,
		shgc: .25,
		ceilingR: "R-38",
		woodWallR: "R-20 or 13+5ci",
		massWallR: "R-8 / R-13",
		floorR: "R-19",
		basementR: "5/13",
		slabR: "0",
		crawlR: "5/13",
		fenUeq: .32,
		skyUeq: .55,
		ceilingU: .03,
		wallU: .06,
		massU: .098,
		floorU: .047,
		basementU: .091,
		crawlU: .136
	},
	"4": {
		fenU: .32,
		skyU: .55,
		shgc: .4,
		ceilingR: "R-49",
		woodWallR: "R-20 or 13+5ci",
		massWallR: "R-8 / R-13",
		floorR: "R-19",
		basementR: "10/13",
		slabR: "R-10, 2 ft",
		crawlR: "10/13",
		fenUeq: .32,
		skyUeq: .55,
		ceilingU: .026,
		wallU: .06,
		massU: .098,
		floorU: .047,
		basementU: .059,
		crawlU: .065
	},
	"5": {
		fenU: .3,
		skyU: .55,
		shgc: null,
		ceilingR: "R-49",
		woodWallR: "R-20 or 13+5ci",
		massWallR: "R-13 / R-17",
		floorR: "R-30",
		basementR: "15/19",
		slabR: "R-10, 2 ft",
		crawlR: "15/19",
		fenUeq: .3,
		skyUeq: .55,
		ceilingU: .026,
		wallU: .06,
		massU: .082,
		floorU: .033,
		basementU: .05,
		crawlU: .055
	},
	"6": {
		fenU: .3,
		skyU: .55,
		shgc: null,
		ceilingR: "R-49",
		woodWallR: "R-20+5ci or 13+10ci",
		massWallR: "R-15 / R-20",
		floorR: "R-30",
		basementR: "15/19",
		slabR: "R-10, 4 ft",
		crawlR: "15/19",
		fenUeq: .3,
		skyUeq: .55,
		ceilingU: .026,
		wallU: .045,
		massU: .06,
		floorU: .033,
		basementU: .05,
		crawlU: .055
	},
	"7": {
		fenU: .3,
		skyU: .55,
		shgc: null,
		ceilingR: "R-49",
		woodWallR: "R-20+5ci or 13+10ci",
		massWallR: "R-19 / R-21",
		floorR: "R-38",
		basementR: "15/19",
		slabR: "R-10, 4 ft",
		crawlR: "15/19",
		fenUeq: .3,
		skyUeq: .55,
		ceilingU: .026,
		wallU: .045,
		massU: .057,
		floorU: .028,
		basementU: .05,
		crawlU: .055
	}
};
var RES_COL_LABEL = {
	"1": "Zone 1",
	"2": "Zone 2",
	"3": "Zone 3",
	"4": "Zone 4 except Marine",
	"5": "Zone 5 and Marine 4",
	"6": "Zone 6",
	"7": "Zones 7 and 8"
};
function resFor(zone) {
	return RES_ENVELOPE[residentialColumn(zone)];
}
var ERI_MAX = {
	1: 57,
	2: 57,
	3: 57,
	4: 62,
	5: 61,
	6: 61,
	7: 58,
	8: 58
};
function eriMax(zone) {
	return ERI_MAX[Number(zone[0])];
}
function ach50Limit(zone) {
	return Number(zone[0]) <= 2 ? 5 : 3;
}
function wholeHouseVentCfm(cfa, bedrooms) {
	return .01 * cfa + 7.5 * (bedrooms + 1);
}
var FAN_EFFICACY = [
	{
		location: "HRV or ERV",
		airflow: "Any",
		efficacy: 1.2
	},
	{
		location: "In-line supply or exhaust fan",
		airflow: "Any",
		efficacy: 2.8
	},
	{
		location: "Other exhaust fan",
		airflow: "≥ 10 cfm",
		efficacy: 2.8
	},
	{
		location: "Bathroom, utility room",
		airflow: "≥ 90 cfm",
		efficacy: 2.8
	}
];
var STEEL_FRAME = [
	{
		wood: "R-30 (steel truss ceiling)",
		steel: "R-38 or R-30+3 or R-26+5"
	},
	{
		wood: "R-38 (steel truss ceiling)",
		steel: "R-49 or R-38+3"
	},
	{
		wood: "R-49 (steel truss ceiling)",
		steel: "R-38+5"
	},
	{
		wood: "R-30 (steel joist ceiling)",
		steel: "R-38 in 2×4/2×6/2×8 or R-49 any"
	},
	{
		wood: "R-38 (steel joist ceiling)",
		steel: "R-49 in 2×4 through 2×10"
	},
	{
		wood: "R-13 wall, 16 in o.c.",
		steel: "R-13+4.2 or R-19+2.8 or R-0+9.3 or R-15+3.8 or R-21+3.1"
	},
	{
		wood: "R-13+3 wall, 16 in o.c.",
		steel: "R-0+11.2 or R-13+6.1 or R-15+5.7 or R-19+5.0 or R-21+4.7"
	},
	{
		wood: "R-20 wall, 16 in o.c.",
		steel: "R-0+14.0 or R-13+8.9 or R-15+8.5 or R-19+7.8 or R-21+7.5"
	},
	{
		wood: "R-20+5 wall, 16 in o.c.",
		steel: "R-13+12.7 or R-15+12.3 or R-19+11.6 or R-21+11.3 or R-25+10.9"
	},
	{
		wood: "R-21 wall, 16 in o.c.",
		steel: "R-0+14.6 or R-13+9.5 or R-15+9.1 or R-19+8.4 or R-21+8.1 or R-25+7.7"
	},
	{
		wood: "R-13 wall, 24 in o.c.",
		steel: "R-0+9.3 or R-13+3.0 or R-15+2.4"
	},
	{
		wood: "R-13+3 wall, 24 in o.c.",
		steel: "R-0+11.2 or R-13+4.9 or R-15+4.3 or R-19+3.5 or R-21+3.1"
	},
	{
		wood: "R-20 wall, 24 in o.c.",
		steel: "R-0+14.0 or R-13+7.7 or R-15+7.1 or R-19+6.3 or R-21+5.9"
	},
	{
		wood: "R-20+5 wall, 24 in o.c.",
		steel: "R-13+11.5 or R-15+10.9 or R-19+10.1 or R-21+9.7 or R-25+9.1"
	},
	{
		wood: "R-21 wall, 24 in o.c.",
		steel: "R-0+14.6 or R-13+8.3 or R-15+7.7 or R-19+6.9 or R-21+6.5 or R-25+5.9"
	},
	{
		wood: "R-13 steel joist floor",
		steel: "R-19 in 2×6, or R-19+6 in 2×8/2×10"
	},
	{
		wood: "R-19 steel joist floor",
		steel: "R-19+6 in 2×6, or R-19+12 in 2×8/2×10"
	}
];
var STEEL_STUD_ER = [
	{
		depth: "3½\"",
		spacing: 16,
		cavity: 13,
		fc: .46,
		er: 5.98
	},
	{
		depth: "3½\"",
		spacing: 16,
		cavity: 15,
		fc: .43,
		er: 6.45
	},
	{
		depth: "3½\"",
		spacing: 24,
		cavity: 13,
		fc: .55,
		er: 7.15
	},
	{
		depth: "3½\"",
		spacing: 24,
		cavity: 15,
		fc: .52,
		er: 7.8
	},
	{
		depth: "6\"",
		spacing: 16,
		cavity: 19,
		fc: .37,
		er: 7.03
	},
	{
		depth: "6\"",
		spacing: 16,
		cavity: 21,
		fc: .35,
		er: 7.35
	},
	{
		depth: "6\"",
		spacing: 24,
		cavity: 19,
		fc: .45,
		er: 8.55
	},
	{
		depth: "6\"",
		spacing: 24,
		cavity: 21,
		fc: .43,
		er: 9.03
	},
	{
		depth: "8\"",
		spacing: 16,
		cavity: 25,
		fc: .31,
		er: 7.75
	},
	{
		depth: "8\"",
		spacing: 24,
		cavity: 25,
		fc: .38,
		er: 9.5
	}
];
function steelStudU(rs, er) {
	return 1 / (rs + er);
}
var DUCT_R = {
	attic: "R-8",
	other: "R-6",
	leakageTotal: 4,
	leakageRoughInAH: 3,
	leakageRoughInNoAH: 4
};
var TRADEOFF_CAPS = {
	fenU_z45: .48,
	fenU_z68: .4,
	skyU_z48: .75,
	shgc_z13: .5
};
var SUNROOM = {
	ceilingR_z14: 19,
	ceilingR_z58: 24,
	wallR: 13,
	fenU: .45,
	skyU: .7
};
var UA_KINDS = [
	{
		id: "ceiling",
		label: "Ceiling / roof"
	},
	{
		id: "wall",
		label: "Frame wall"
	},
	{
		id: "massWall",
		label: "Mass wall"
	},
	{
		id: "floor",
		label: "Floor"
	},
	{
		id: "basement",
		label: "Basement wall"
	},
	{
		id: "crawl",
		label: "Crawl space wall"
	},
	{
		id: "fenestration",
		label: "Vertical fenestration"
	},
	{
		id: "skylight",
		label: "Skylight"
	},
	{
		id: "door",
		label: "Opaque door"
	}
];
function codeU(kind, env) {
	switch (kind) {
		case "ceiling": return env.ceilingU;
		case "wall": return env.wallU;
		case "massWall": return env.massU;
		case "floor": return env.floorU;
		case "basement": return env.basementU;
		case "crawl": return env.crawlU;
		case "fenestration":
		case "door": return env.fenUeq;
		case "skylight": return env.skyUeq;
	}
}
function ResEnvelopeCalc() {
	const zone = useWorkbook((s) => s.zone);
	const env = resFor(zone);
	const col = residentialColumn(zone);
	const rows = [
		{
			label: "Fenestration U-factor",
			r: env.fenU == null ? "NR" : `U-${env.fenU}`,
			u: `U-${env.fenUeq}`
		},
		{
			label: "Skylight U-factor",
			r: `U-${env.skyU}`,
			u: `U-${env.skyUeq}`
		},
		{
			label: "Glazed SHGC",
			r: env.shgc == null ? "NR" : String(env.shgc),
			u: env.shgc == null ? "NR" : String(env.shgc)
		},
		{
			label: "Ceiling",
			r: env.ceilingR,
			u: String(env.ceilingU)
		},
		{
			label: "Wood-frame wall",
			r: env.woodWallR,
			u: String(env.wallU)
		},
		{
			label: "Mass wall",
			r: env.massWallR,
			u: String(env.massU)
		},
		{
			label: "Floor",
			r: env.floorR,
			u: String(env.floorU)
		},
		{
			label: "Basement wall",
			r: env.basementR,
			u: String(env.basementU)
		},
		{
			label: "Slab",
			r: env.slabR,
			u: "—"
		},
		{
			label: "Crawl wall",
			r: env.crawlR,
			u: String(env.crawlU)
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		kicker: `Tables R402.1.2 & R402.1.4 · ${RES_COL_LABEL[col]}`,
		title: "Prescriptive residential envelope",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTable, {
			columns: [
				"Assembly",
				"R-value method",
				"U-factor equivalent"
			],
			children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "border-b border-line",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-2 py-2 font-sans",
						children: r.label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-2 py-2",
						children: r.r
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-2 py-2",
						children: r.u
					})
				]
			}, r.label))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 text-xs text-muted",
			children: "Marine 4 uses the Zone 5 column. Zones 7 and 8 share a column. Mass-wall interior insulation uses the more stringent footnote U-factors."
		})]
	});
}
var uaSeq = 1;
function ResUaCalc() {
	const zone = useWorkbook((s) => s.zone);
	const env = resFor(zone);
	const [rows, setRows] = (0, import_react.useState)([
		{
			id: 1,
			kind: "ceiling",
			area: 1200,
			u: env.ceilingU
		},
		{
			id: 2,
			kind: "wall",
			area: 1800,
			u: env.wallU
		},
		{
			id: 3,
			kind: "fenestration",
			area: 240,
			u: env.fenUeq
		},
		{
			id: 4,
			kind: "floor",
			area: 1200,
			u: env.floorU
		}
	]);
	const tot = (0, import_react.useMemo)(() => {
		let prop = 0;
		let code = 0;
		let area = 0;
		for (const r of rows) {
			const cu = codeU(r.kind, env);
			prop += r.u * r.area;
			code += cu * r.area;
			area += r.area;
		}
		return {
			prop,
			code,
			area,
			pass: prop <= code
		};
	}, [rows, env]);
	const n = zoneNumber(zone);
	const fenCap = n >= 6 ? TRADEOFF_CAPS.fenU_z68 : n >= 4 ? TRADEOFF_CAPS.fenU_z45 : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			kicker: "R402.1.5 Total UA alternative",
			title: "Residential UA trade-off",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Formula, { children: "UA_proposed = Σ (U_i × A_i) ≤ UA_standard = Σ (U_code,i × A_i)" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[44rem] text-left text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-line",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-2 py-2 text-xs text-muted",
									children: "Assembly"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-2 py-2 text-xs text-muted",
									children: "Area ft²"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-2 py-2 text-xs text-muted",
									children: "Proposed U"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-2 py-2 text-xs text-muted",
									children: "Code U"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-2 py-2 text-xs text-muted",
									children: "UA prop."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-2 py-2 text-xs text-muted",
									children: "UA code"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-2 py-2" })
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "font-mono tabular-nums",
							children: rows.map((r) => {
								const cu = codeU(r.kind, env);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-b border-line",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-2 py-1",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
												className: "h-11 w-full rounded-sm border border-line bg-bg px-2 font-sans text-sm",
												value: r.kind,
												onChange: (e) => setRows((rs) => rs.map((x) => x.id === r.id ? {
													...x,
													kind: e.target.value,
													u: codeU(e.target.value, env)
												} : x)),
												children: UA_KINDS.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: k.id,
													children: k.label
												}, k.id))
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-2 py-1",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
												value: r.area,
												onChange: (n) => setRows((rs) => rs.map((x) => x.id === r.id ? {
													...x,
													area: n
												} : x))
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-2 py-1",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
												value: r.u,
												step: "0.001",
												onChange: (n) => setRows((rs) => rs.map((x) => x.id === r.id ? {
													...x,
													u: n
												} : x))
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-2 py-2",
											children: cu
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-2 py-2",
											children: fmt(r.u * r.area, 2)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-2 py-2",
											children: fmt(cu * r.area, 2)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-2 py-1",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												className: "h-11 px-2 text-sm text-fail",
												onClick: () => setRows((rs) => rs.filter((x) => x.id !== r.id)),
												children: "Remove"
											})
										})
									]
								}, r.id);
							})
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostButton, {
						onClick: () => setRows((rs) => [...rs, {
							id: ++uaSeq,
							kind: "wall",
							area: 100,
							u: env.wallU
						}]),
						children: "Add assembly"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid gap-3 sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "UA proposed",
							value: fmt(tot.prop, 1)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "UA standard",
							value: fmt(tot.code, 1)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Margin",
							value: fmt(tot.code - tot.prop, 1),
							hint: "positive = better than code"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Verdict, {
						status: tot.pass ? "pass" : "fail",
						children: tot.pass ? `Proposed UA ${fmt(tot.prop, 1)} ≤ standard ${fmt(tot.code, 1)}` : `Proposed UA ${fmt(tot.prop, 1)} exceeds standard ${fmt(tot.code, 1)}`
					})
				}),
				fenCap && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-xs text-muted",
					children: [
						"Trade-off cap: vertical fenestration U ≤ ",
						fenCap,
						" in this zone (R402.1.5). SHGC in zones 1–3 cannot exceed 0.50."
					]
				})
			]
		})
	});
}
function ResAirCalc() {
	const zone = useWorkbook((s) => s.zone);
	const [cfa, setCfa] = (0, import_react.useState)(2400);
	const [br, setBr] = (0, import_react.useState)(3);
	const [ach, setAch] = (0, import_react.useState)(2.5);
	const [flow, setFlow] = (0, import_react.useState)(80);
	const [watts, setWatts] = (0, import_react.useState)(25);
	const limit = ach50Limit(zone);
	const vent = wholeHouseVentCfm(cfa, br);
	const efficacy = flow > 0 ? flow / watts : NaN;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				kicker: "R402.4.1.2",
				title: "Blower door",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Tested ACH50",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
							value: ach,
							onChange: setAch,
							step: "0.1"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Limit",
						value: `${limit} ACH50`,
						hint: zoneNumber(zone) <= 2 ? "Zones 1–2" : "Zones 3–8"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Verdict, {
						status: ach <= limit ? "pass" : "fail",
						children: ach <= limit ? `≤ ${limit} ACH50` : `${ach} exceeds ${limit} ACH50`
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				kicker: "R403.6.1 / ASHRAE 62.2",
				title: "Whole-house mechanical ventilation",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Formula, { children: "Q = 0.01 × CFA + 7.5 × (N_br + 1)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid gap-3 sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Conditioned floor area",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
								value: cfa,
								onChange: setCfa,
								suffix: "ft²"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Bedrooms",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
								value: br,
								onChange: setBr,
								step: "1"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Required Q",
							value: `${fmt(vent, 1)} cfm`
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				kicker: "Table R403.6.1",
				title: "Fan efficacy",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 grid gap-3 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Airflow",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
								value: flow,
								onChange: setFlow,
								suffix: "cfm"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Power",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
								value: watts,
								onChange: setWatts,
								suffix: "W"
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Efficacy",
						value: `${fmt(efficacy, 2)} cfm/W`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full text-left text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-line",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 text-xs text-muted",
										children: "Fan location"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 text-xs text-muted",
										children: "Airflow"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 text-xs text-muted",
										children: "Min cfm/W"
									})
								]
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: FAN_EFFICACY.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-line",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2",
										children: r.location
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2",
										children: r.airflow
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2 font-mono",
										children: r.efficacy
									})
								]
							}, r.location)) })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-xs text-muted",
						children: [
							"Ducts: attic ",
							DUCT_R.attic,
							", other ",
							DUCT_R.other,
							". Total leakage ≤ ",
							DUCT_R.leakageTotal,
							" cfm/100 ft². Rough-in with air handler ≤ ",
							DUCT_R.leakageRoughInAH,
							"; without ≤ ",
							DUCT_R.leakageRoughInNoAH,
							"."
						]
					})
				]
			})
		]
	});
}
function SteelCalc() {
	const [idx, setIdx] = (0, import_react.useState)(0);
	const [rs, setRs] = (0, import_react.useState)(.79);
	const row = STEEL_STUD_ER[idx];
	const u = steelStudU(rs, row.er);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				kicker: "Table R402.2.6",
				title: "Steel-frame R-value equivalents",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "max-h-80 overflow-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[32rem] text-left text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "sticky top-0 bg-surface",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-line",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 text-xs text-muted",
									children: "Wood-frame (required)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 text-xs text-muted",
									children: "Steel-frame equivalent"
								})]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: STEEL_FRAME.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-line",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2",
								children: r.wood
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2",
								children: r.steel
							})]
						}, r.wood)) })]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				kicker: "Equation 4-1 / Table R402.2.6",
				title: "Steel stud U-factor",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Formula, { children: "U = 1 / (R_s + E_R)" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid gap-3 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Stud / cavity",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
								value: String(idx),
								onChange: (v) => setIdx(Number(v)),
								children: STEEL_STUD_ER.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: i,
									children: [
										r.depth,
										" @ ",
										r.spacing,
										" in o.c., R-",
										r.cavity,
										" cavity"
									]
								}, `${r.depth}-${r.spacing}-${r.cavity}`))
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "R_s (exterior air films + ci + sheathing)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
								value: rs,
								onChange: setRs,
								step: "0.01"
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid gap-3 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Correction Fc",
								value: String(row.fc)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Effective R (E_R)",
								value: String(row.er)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "U-factor",
								value: fmt(u, 3)
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				kicker: "R402.2.12",
				title: "Sunroom insulation",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: [
						"Ceilings R-",
						SUNROOM.ceilingR_z14,
						" in zones 1–4, R-",
						SUNROOM.ceilingR_z58,
						" in zones 5–8. Walls R-",
						SUNROOM.wallR,
						". Fenestration U-",
						SUNROOM.fenU,
						", skylight U-",
						SUNROOM.skyU,
						"."
					]
				})
			})
		]
	});
}
function EriCalc() {
	const zone = useWorkbook((s) => s.zone);
	const [eri, setEri] = (0, import_react.useState)(eriMax(zone));
	const max = eriMax(zone);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		kicker: "Table R406.4",
		title: "Energy Rating Index",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 sm:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Proposed ERI",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
						value: eri,
						onChange: setEri
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Maximum ERI",
					value: String(max),
					hint: `Climate zone ${zoneNumber(zone)}`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "On-site power",
					value: "Excluded",
					hint: "R406.3 — without on-site generation"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Verdict, {
				status: eri <= max ? "pass" : "fail",
				children: eri <= max ? `ERI ${eri} ≤ ${max}` : `ERI ${eri} exceeds ${max}`
			})
		})]
	});
}
/** Table C402.1.3 — opaque envelope R-value method */
var COM_RVALUE = [
	{
		assembly: "Insulation entirely above deck",
		group: "Roofs",
		values: {
			1: {
				all: "R-20ci",
				groupR: "R-25ci"
			},
			2: {
				all: "R-25ci",
				groupR: "R-25ci"
			},
			3: {
				all: "R-25ci",
				groupR: "R-25ci"
			},
			4: {
				all: "R-30ci",
				groupR: "R-30ci"
			},
			5: {
				all: "R-30ci",
				groupR: "R-30ci"
			},
			6: {
				all: "R-30ci",
				groupR: "R-30ci"
			},
			7: {
				all: "R-35ci",
				groupR: "R-35ci"
			},
			8: {
				all: "R-35ci",
				groupR: "R-35ci"
			}
		}
	},
	{
		assembly: "Metal buildings (LS)",
		group: "Roofs",
		values: {
			1: {
				all: "R-19 + R-11 LS",
				groupR: "R-19 + R-11 LS"
			},
			2: {
				all: "R-19 + R-11 LS",
				groupR: "R-19 + R-11 LS"
			},
			3: {
				all: "R-19 + R-11 LS",
				groupR: "R-19 + R-11 LS"
			},
			4: {
				all: "R-19 + R-11 LS",
				groupR: "R-19 + R-11 LS"
			},
			5: {
				all: "R-19 + R-11 LS",
				groupR: "R-19 + R-11 LS"
			},
			6: {
				all: "R-25 + R-11 LS",
				groupR: "R-25 + R-11 LS"
			},
			7: {
				all: "R-30 + R-11 LS",
				groupR: "R-30 + R-11 LS"
			},
			8: {
				all: "R-30 + R-11 LS",
				groupR: "R-30 + R-11 LS"
			}
		}
	},
	{
		assembly: "Attic and other",
		group: "Roofs",
		values: {
			1: {
				all: "R-38",
				groupR: "R-38"
			},
			2: {
				all: "R-38",
				groupR: "R-38"
			},
			3: {
				all: "R-38",
				groupR: "R-38"
			},
			4: {
				all: "R-38",
				groupR: "R-49"
			},
			5: {
				all: "R-38",
				groupR: "R-49"
			},
			6: {
				all: "R-49",
				groupR: "R-49"
			},
			7: {
				all: "R-49",
				groupR: "R-49"
			},
			8: {
				all: "R-49",
				groupR: "R-49"
			}
		}
	},
	{
		assembly: "Mass",
		group: "Walls, above grade",
		values: {
			1: {
				all: "R-5.7ci",
				groupR: "R-5.7ci"
			},
			2: {
				all: "R-5.7ci",
				groupR: "R-7.6ci"
			},
			3: {
				all: "R-7.6ci",
				groupR: "R-9.5ci"
			},
			4: {
				all: "R-9.5ci",
				groupR: "R-11.4ci"
			},
			5: {
				all: "R-11.4ci",
				groupR: "R-13.3ci"
			},
			6: {
				all: "R-13.3ci",
				groupR: "R-15.2ci"
			},
			7: {
				all: "R-15.2ci",
				groupR: "R-15.2ci"
			},
			8: {
				all: "R-25ci",
				groupR: "R-25ci"
			}
		}
	},
	{
		assembly: "Metal building",
		group: "Walls, above grade",
		values: {
			1: {
				all: "R-13 + R-6.5ci",
				groupR: "R-13 + R-6.5ci"
			},
			2: {
				all: "R-13 + R-6.5ci",
				groupR: "R-13 + R-13ci"
			},
			3: {
				all: "R-13 + R-6.5ci",
				groupR: "R-13 + R-13ci"
			},
			4: {
				all: "R-13 + R-13ci",
				groupR: "R-13 + R-13ci"
			},
			5: {
				all: "R-13 + R-13ci",
				groupR: "R-13 + R-14ci"
			},
			6: {
				all: "R-13 + R-14ci",
				groupR: "R-13 + R-14ci"
			},
			7: {
				all: "R-13 + R-14ci",
				groupR: "R-13 + R-19.5ci"
			},
			8: {
				all: "R-13 + R-19.5ci",
				groupR: "R-13 + R-19.5ci"
			}
		}
	},
	{
		assembly: "Metal framed",
		group: "Walls, above grade",
		values: {
			1: {
				all: "R-13 + R-5ci",
				groupR: "R-13 + R-5ci"
			},
			2: {
				all: "R-13 + R-5ci",
				groupR: "R-13 + R-7.5ci"
			},
			3: {
				all: "R-13 + R-7.5ci",
				groupR: "R-13 + R-7.5ci"
			},
			4: {
				all: "R-13 + R-7.5ci",
				groupR: "R-13 + R-7.5ci"
			},
			5: {
				all: "R-13 + R-7.5ci",
				groupR: "R-13 + R-10ci"
			},
			6: {
				all: "R-13 + R-12.5ci",
				groupR: "R-13 + R-12.5ci"
			},
			7: {
				all: "R-13 + R-12.5ci",
				groupR: "R-13 + R-15.6ci"
			},
			8: {
				all: "R-13 + R-15.6ci",
				groupR: "R-13 + R-15.6ci"
			}
		}
	},
	{
		assembly: "Wood framed and other",
		group: "Walls, above grade",
		values: {
			1: {
				all: "R-13 + R-3.8ci or R-20",
				groupR: "R-13 + R-3.8ci or R-20"
			},
			2: {
				all: "R-13 + R-3.8ci or R-20",
				groupR: "R-13 + R-3.8ci or R-20"
			},
			3: {
				all: "R-13 + R-3.8ci or R-20",
				groupR: "R-13 + R-3.8ci or R-20"
			},
			4: {
				all: "R-13 + R-3.8ci or R-20",
				groupR: "R-13 + R-3.8ci or R-20"
			},
			5: {
				all: "R-13 + R-3.8ci or R-20",
				groupR: "R-13 + R-7.5ci or R-20 + R-3.8ci"
			},
			6: {
				all: "R-13 + R-7.5ci or R-20 + R-3.8ci",
				groupR: "R-13 + R-7.5ci or R-20 + R-3.8ci"
			},
			7: {
				all: "R-13 + R-7.5ci or R-20 + R-3.8ci",
				groupR: "R-13 + R-15.6ci or R-20 + R-10ci"
			},
			8: {
				all: "R-13 + R-15.6ci or R-20 + R-10ci",
				groupR: "R-13 + R-15.6ci or R-20 + R-10ci"
			}
		}
	},
	{
		assembly: "Below-grade wall",
		group: "Walls, below grade",
		values: {
			1: {
				all: "NR",
				groupR: "NR"
			},
			2: {
				all: "NR",
				groupR: "NR"
			},
			3: {
				all: "NR",
				groupR: "NR"
			},
			4: {
				all: "NR",
				groupR: "R-7.5ci"
			},
			5: {
				all: "R-7.5ci",
				groupR: "R-7.5ci"
			},
			6: {
				all: "R-7.5ci",
				groupR: "R-10ci"
			},
			7: {
				all: "R-10ci",
				groupR: "R-10ci"
			},
			8: {
				all: "R-12.5ci",
				groupR: "R-12.5ci"
			}
		}
	},
	{
		assembly: "Mass",
		group: "Floors",
		values: {
			1: {
				all: "NR",
				groupR: "NR"
			},
			2: {
				all: "R-6.3ci",
				groupR: "R-8.3ci"
			},
			3: {
				all: "R-10ci",
				groupR: "R-10ci"
			},
			4: {
				all: "R-10ci",
				groupR: "R-10.4ci"
			},
			5: {
				all: "R-10ci",
				groupR: "R-12.5ci"
			},
			6: {
				all: "R-12.5ci",
				groupR: "R-12.5ci"
			},
			7: {
				all: "R-15ci",
				groupR: "R-16.7ci"
			},
			8: {
				all: "R-15ci",
				groupR: "R-16.7ci"
			}
		}
	},
	{
		assembly: "Joist / framing",
		group: "Floors",
		values: {
			1: {
				all: "NR",
				groupR: "NR"
			},
			2: {
				all: "R-30",
				groupR: "R-30"
			},
			3: {
				all: "R-30",
				groupR: "R-30"
			},
			4: {
				all: "R-30",
				groupR: "R-30"
			},
			5: {
				all: "R-30",
				groupR: "R-30"
			},
			6: {
				all: "R-30",
				groupR: "R-30"
			},
			7: {
				all: "R-38",
				groupR: "R-38"
			},
			8: {
				all: "R-38",
				groupR: "R-38"
			}
		}
	},
	{
		assembly: "Unheated slabs",
		group: "Slab-on-grade",
		values: {
			1: {
				all: "NR",
				groupR: "NR"
			},
			2: {
				all: "NR",
				groupR: "NR"
			},
			3: {
				all: "NR",
				groupR: "NR"
			},
			4: {
				all: "R-10 for 24\" below",
				groupR: "R-15 for 24\" below"
			},
			5: {
				all: "R-10 for 24\" below",
				groupR: "R-15 for 24\" below"
			},
			6: {
				all: "R-15 for 24\" below",
				groupR: "R-20 for 24\" below"
			},
			7: {
				all: "R-15 for 24\" below",
				groupR: "R-20 for 24\" below"
			},
			8: {
				all: "R-20 for 24\" below",
				groupR: "R-20 for 24\" below"
			}
		}
	},
	{
		assembly: "Heated slabs",
		group: "Slab-on-grade",
		values: {
			1: {
				all: "R-7.5 for 12\" + R-5 full slab",
				groupR: "R-7.5 for 12\" + R-5 full slab"
			},
			2: {
				all: "R-7.5 for 12\" + R-5 full slab",
				groupR: "R-7.5 for 12\" + R-5 full slab"
			},
			3: {
				all: "R-10 for 24\" + R-5 full slab",
				groupR: "R-10 for 24\" + R-5 full slab"
			},
			4: {
				all: "R-15 for 24\" + R-5 full slab",
				groupR: "R-15 for 24\" + R-5 full slab"
			},
			5: {
				all: "R-15 for 36\" + R-5 full slab",
				groupR: "R-15 for 36\" + R-5 full slab"
			},
			6: {
				all: "R-15 for 36\" + R-5 full slab",
				groupR: "R-20 for 48\" + R-5 full slab"
			},
			7: {
				all: "R-20 for 24\" + R-5 full slab",
				groupR: "R-20 for 48\" + R-5 full slab"
			},
			8: {
				all: "R-20 for 48\" + R-5 full slab",
				groupR: "R-20 for 48\" + R-5 full slab"
			}
		}
	},
	{
		assembly: "Nonswinging doors",
		group: "Opaque doors",
		values: {
			1: {
				all: "R-4.75",
				groupR: "R-4.75"
			},
			2: {
				all: "R-4.75",
				groupR: "R-4.75"
			},
			3: {
				all: "R-4.75",
				groupR: "R-4.75"
			},
			4: {
				all: "R-4.75",
				groupR: "R-4.75"
			},
			5: {
				all: "R-4.75",
				groupR: "R-4.75"
			},
			6: {
				all: "R-4.75",
				groupR: "R-4.75"
			},
			7: {
				all: "R-4.75",
				groupR: "R-4.75"
			},
			8: {
				all: "R-4.75",
				groupR: "R-4.75"
			}
		}
	}
];
/** Table C402.1.4 — maximum U / C / F factors */
var COM_UFACTOR = {
	roofAbove: {
		label: "Insulation entirely above deck",
		group: "Roofs",
		unit: "U",
		values: {
			1: {
				all: .048,
				groupR: .039
			},
			2: {
				all: .039,
				groupR: .039
			},
			3: {
				all: .039,
				groupR: .039
			},
			4: {
				all: .032,
				groupR: .032
			},
			5: {
				all: .032,
				groupR: .032
			},
			6: {
				all: .032,
				groupR: .032
			},
			7: {
				all: .028,
				groupR: .028
			},
			8: {
				all: .028,
				groupR: .028
			}
		}
	},
	roofMetal: {
		label: "Metal buildings",
		group: "Roofs",
		unit: "U",
		values: {
			1: {
				all: .044,
				groupR: .035
			},
			2: {
				all: .035,
				groupR: .035
			},
			3: {
				all: .035,
				groupR: .035
			},
			4: {
				all: .035,
				groupR: .035
			},
			5: {
				all: .035,
				groupR: .035
			},
			6: {
				all: .031,
				groupR: .031
			},
			7: {
				all: .029,
				groupR: .029
			},
			8: {
				all: .029,
				groupR: .029
			}
		}
	},
	roofAttic: {
		label: "Attic and other",
		group: "Roofs",
		unit: "U",
		values: {
			1: {
				all: .027,
				groupR: .027
			},
			2: {
				all: .027,
				groupR: .027
			},
			3: {
				all: .027,
				groupR: .027
			},
			4: {
				all: .027,
				groupR: .021
			},
			5: {
				all: .021,
				groupR: .021
			},
			6: {
				all: .021,
				groupR: .021
			},
			7: {
				all: .021,
				groupR: .021
			},
			8: {
				all: .021,
				groupR: .021
			}
		}
	},
	wallMass: {
		label: "Mass",
		group: "Walls, above grade",
		unit: "U",
		values: {
			1: {
				all: .151,
				groupR: .151
			},
			2: {
				all: .123,
				groupR: .104
			},
			3: {
				all: .104,
				groupR: .09
			},
			4: {
				all: .09,
				groupR: .078
			},
			5: {
				all: .08,
				groupR: .071
			},
			6: {
				all: .071,
				groupR: .071
			},
			7: {
				all: .071,
				groupR: .061
			},
			8: {
				all: .037,
				groupR: .037
			}
		}
	},
	wallMetalBldg: {
		label: "Metal building",
		group: "Walls, above grade",
		unit: "U",
		values: {
			1: {
				all: .079,
				groupR: .079
			},
			2: {
				all: .079,
				groupR: .052
			},
			3: {
				all: .079,
				groupR: .052
			},
			4: {
				all: .052,
				groupR: .052
			},
			5: {
				all: .052,
				groupR: .052
			},
			6: {
				all: .052,
				groupR: .052
			},
			7: {
				all: .052,
				groupR: .039
			},
			8: {
				all: .039,
				groupR: .039
			}
		}
	},
	wallMetalFramed: {
		label: "Metal framed",
		group: "Walls, above grade",
		unit: "U",
		values: {
			1: {
				all: .077,
				groupR: .077
			},
			2: {
				all: .077,
				groupR: .064
			},
			3: {
				all: .064,
				groupR: .064
			},
			4: {
				all: .064,
				groupR: .064
			},
			5: {
				all: .064,
				groupR: .055
			},
			6: {
				all: .049,
				groupR: .049
			},
			7: {
				all: .049,
				groupR: .042
			},
			8: {
				all: .037,
				groupR: .037
			}
		}
	},
	wallWood: {
		label: "Wood framed and other",
		group: "Walls, above grade",
		unit: "U",
		values: {
			1: {
				all: .064,
				groupR: .064
			},
			2: {
				all: .064,
				groupR: .064
			},
			3: {
				all: .064,
				groupR: .064
			},
			4: {
				all: .064,
				groupR: .064
			},
			5: {
				all: .064,
				groupR: .051
			},
			6: {
				all: .051,
				groupR: .051
			},
			7: {
				all: .051,
				groupR: .051
			},
			8: {
				all: .032,
				groupR: .032
			}
		}
	},
	belowGrade: {
		label: "Below-grade wall",
		group: "Walls, below grade",
		unit: "C",
		values: {
			1: {
				all: 1.14,
				groupR: 1.14
			},
			2: {
				all: 1.14,
				groupR: 1.14
			},
			3: {
				all: 1.14,
				groupR: 1.14
			},
			4: {
				all: 1.14,
				groupR: .119
			},
			5: {
				all: .119,
				groupR: .119
			},
			6: {
				all: .119,
				groupR: .092
			},
			7: {
				all: .092,
				groupR: .092
			},
			8: {
				all: .075,
				groupR: .075
			}
		}
	},
	floorMass: {
		label: "Mass",
		group: "Floors",
		unit: "U",
		values: {
			1: {
				all: .322,
				groupR: .322
			},
			2: {
				all: .107,
				groupR: .087
			},
			3: {
				all: .074,
				groupR: .074
			},
			4: {
				all: .074,
				groupR: .064
			},
			5: {
				all: .074,
				groupR: .064
			},
			6: {
				all: .064,
				groupR: .057
			},
			7: {
				all: .055,
				groupR: .051
			},
			8: {
				all: .055,
				groupR: .051
			}
		}
	},
	floorJoist: {
		label: "Joist / framing",
		group: "Floors",
		unit: "U",
		values: {
			1: {
				all: .066,
				groupR: .066
			},
			2: {
				all: .033,
				groupR: .033
			},
			3: {
				all: .033,
				groupR: .033
			},
			4: {
				all: .033,
				groupR: .033
			},
			5: {
				all: .033,
				groupR: .033
			},
			6: {
				all: .033,
				groupR: .033
			},
			7: {
				all: .028,
				groupR: .028
			},
			8: {
				all: .028,
				groupR: .028
			}
		}
	},
	slabUnheated: {
		label: "Unheated slabs",
		group: "Slab-on-grade",
		unit: "F",
		values: {
			1: {
				all: .73,
				groupR: .73
			},
			2: {
				all: .73,
				groupR: .73
			},
			3: {
				all: .73,
				groupR: .73
			},
			4: {
				all: .54,
				groupR: .52
			},
			5: {
				all: .54,
				groupR: .52
			},
			6: {
				all: .52,
				groupR: .4
			},
			7: {
				all: .52,
				groupR: .4
			},
			8: {
				all: .4,
				groupR: .4
			}
		}
	},
	slabHeated: {
		label: "Heated slabs (perimeter F)",
		group: "Slab-on-grade",
		unit: "F",
		values: {
			1: {
				all: 1.02,
				groupR: 1.02
			},
			2: {
				all: 1.02,
				groupR: 1.02
			},
			3: {
				all: .9,
				groupR: .9
			},
			4: {
				all: .86,
				groupR: .86
			},
			5: {
				all: .86,
				groupR: .86
			},
			6: {
				all: .69,
				groupR: .69
			},
			7: {
				all: .69,
				groupR: .69
			},
			8: {
				all: .69,
				groupR: .69
			}
		}
	},
	doorSwing: {
		label: "Swinging door",
		group: "Opaque doors",
		unit: "U",
		values: {
			1: {
				all: .61,
				groupR: .61
			},
			2: {
				all: .61,
				groupR: .61
			},
			3: {
				all: .61,
				groupR: .61
			},
			4: {
				all: .37,
				groupR: .37
			},
			5: {
				all: .37,
				groupR: .37
			},
			6: {
				all: .37,
				groupR: .37
			},
			7: {
				all: .37,
				groupR: .37
			},
			8: {
				all: .37,
				groupR: .37
			}
		}
	},
	doorGarage: {
		label: "Garage door <14% glazing",
		group: "Opaque doors",
		unit: "U",
		values: {
			1: {
				all: .31,
				groupR: .31
			},
			2: {
				all: .31,
				groupR: .31
			},
			3: {
				all: .31,
				groupR: .31
			},
			4: {
				all: .31,
				groupR: .31
			},
			5: {
				all: .31,
				groupR: .31
			},
			6: {
				all: .31,
				groupR: .31
			},
			7: {
				all: .31,
				groupR: .31
			},
			8: {
				all: .31,
				groupR: .31
			}
		}
	}
};
function comU(kind, zone, occ) {
	const col = commercialColumn(zone);
	const v = COM_UFACTOR[kind].values[col];
	return occ === "groupR" ? v.groupR : v.all;
}
var VERTICAL_FEN_MAX = .3;
var VERTICAL_FEN_DAYLIGHT = .4;
var SKYLIGHT_MAX = .03;
var SKYLIGHT_DAYLIGHT = .06;
var AIR_LEAKAGE_MAX = .4;
/** Table C402.4 */
var FEN_C402 = {
	1: {
		fixedU: .5,
		operU: .65,
		entranceU: 1.1,
		shgc: [
			{
				sew: .25,
				n: .33
			},
			{
				sew: .3,
				n: .37
			},
			{
				sew: .4,
				n: .4
			}
		],
		skyU: .75,
		skyShgc: .35
	},
	2: {
		fixedU: .5,
		operU: .65,
		entranceU: .83,
		shgc: [
			{
				sew: .25,
				n: .33
			},
			{
				sew: .3,
				n: .37
			},
			{
				sew: .4,
				n: .4
			}
		],
		skyU: .65,
		skyShgc: .35
	},
	3: {
		fixedU: .46,
		operU: .6,
		entranceU: .77,
		shgc: [
			{
				sew: .25,
				n: .33
			},
			{
				sew: .3,
				n: .37
			},
			{
				sew: .4,
				n: .4
			}
		],
		skyU: .55,
		skyShgc: .35
	},
	4: {
		fixedU: .38,
		operU: .45,
		entranceU: .77,
		shgc: [
			{
				sew: .36,
				n: .48
			},
			{
				sew: .43,
				n: .53
			},
			{
				sew: .58,
				n: .58
			}
		],
		skyU: .5,
		skyShgc: .4
	},
	5: {
		fixedU: .38,
		operU: .45,
		entranceU: .77,
		shgc: [
			{
				sew: .38,
				n: .51
			},
			{
				sew: .46,
				n: .56
			},
			{
				sew: .61,
				n: .61
			}
		],
		skyU: .5,
		skyShgc: .4
	},
	6: {
		fixedU: .36,
		operU: .43,
		entranceU: .77,
		shgc: [
			{
				sew: .4,
				n: .53
			},
			{
				sew: .48,
				n: .58
			},
			{
				sew: .64,
				n: .64
			}
		],
		skyU: .5,
		skyShgc: .4
	},
	7: {
		fixedU: .29,
		operU: .37,
		entranceU: .77,
		shgc: [
			{
				sew: .45,
				n: null
			},
			{
				sew: null,
				n: null
			},
			{
				sew: null,
				n: null
			}
		],
		skyU: .5,
		skyShgc: null
	},
	8: {
		fixedU: .29,
		operU: .37,
		entranceU: .77,
		shgc: [
			{
				sew: null,
				n: null
			},
			{
				sew: null,
				n: null
			},
			{
				sew: null,
				n: null
			}
		],
		skyU: .5,
		skyShgc: null
	}
};
function fenFor(zone) {
	return FEN_C402[commercialColumn(zone)];
}
function projectionFactor(a, b) {
	if (b <= 0) return 0;
	return a / b;
}
function pfBin(pf) {
	if (pf < .2) return 0;
	if (pf < .5) return 1;
	return 2;
}
function skylightEffectiveAperture(area, vt, wellDepthFt, toplit) {
	const wf = wellDepthFt < 2 ? .9 : .7;
	if (toplit <= 0) return 0;
	return .85 * area * vt * wf / toplit;
}
function agedReflectance(initial) {
	return .2 + .7 * (initial - .2);
}
var AIR_LEAKAGE_FEN = [
	{
		type: "Glazed swinging entrance doors",
		rate: 1,
		std: "NFRC 400 or AAMA/WDMA/CSA 101/I.S.2/A440"
	},
	{
		type: "Curtain wall / storefront",
		rate: .06,
		std: "NFRC 400 or AAMA/WDMA/CSA 101/I.S.2/A440"
	},
	{
		type: "Power-operated sliding / folding doors",
		rate: 1,
		std: "AAMA 1607"
	},
	{
		type: "Revolving doors",
		rate: 1,
		std: "NFRC 400 or AAMA/WDMA/CSA 101/I.S.2/A440"
	},
	{
		type: "Garage doors",
		rate: .4,
		std: "ANSI/DASMA 105"
	},
	{
		type: "Rolling doors",
		rate: 1,
		std: "ANSI/DASMA 105"
	},
	{
		type: "High-speed doors",
		rate: 1.3,
		std: "ANSI/DASMA 105"
	}
];
function ComEnvelopeCalc() {
	const zone = useWorkbook((s) => s.zone);
	const occ = useWorkbook((s) => s.occupancy);
	const col = commercialColumn(zone);
	const groups = [...new Set(COM_RVALUE.map((r) => r.group))];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			kicker: `Table C402.1.3 · Zone ${col}`,
			title: "Opaque R-value method",
			children: groups.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 font-mono text-xs tracking-wide text-faint uppercase",
					children: g
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
					className: "w-full text-left text-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: COM_RVALUE.filter((r) => r.group === g).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-line",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2 pr-3",
							children: r.assembly
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2 font-mono",
							children: occ === "groupR" ? r.values[col].groupR : r.values[col].all
						})]
					}, r.assembly)) })
				})]
			}, g))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			kicker: `Table C402.1.4 · Zone ${col}`,
			title: "U / C / F-factor method",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[28rem] text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-line",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 text-xs text-muted",
								children: "Assembly"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 text-xs text-muted",
								children: "Unit"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 text-xs text-muted",
								children: "Max"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
						className: "font-mono tabular-nums",
						children: Object.keys(COM_UFACTOR).map((k) => {
							const row = COM_UFACTOR[k];
							const v = occ === "groupR" ? row.values[col].groupR : row.values[col].all;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-line",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "py-2 font-sans",
										children: [
											row.group,
											" · ",
											row.label
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2",
										children: row.unit
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2",
										children: v
									})
								]
							}, k);
						})
					})]
				})
			})
		})]
	});
}
var comSeq = 1;
function ComUaCalc() {
	const zone = useWorkbook((s) => s.zone);
	const occ = useWorkbook((s) => s.occupancy);
	const kinds = Object.keys(COM_UFACTOR);
	const [rows, setRows] = (0, import_react.useState)([
		{
			id: 1,
			kind: "roofAbove",
			area: 1e4,
			u: comU("roofAbove", zone, occ)
		},
		{
			id: 2,
			kind: "wallMetalFramed",
			area: 8e3,
			u: comU("wallMetalFramed", zone, occ)
		},
		{
			id: 3,
			kind: "floorJoist",
			area: 1e4,
			u: comU("floorJoist", zone, occ)
		}
	]);
	const tot = (0, import_react.useMemo)(() => {
		let prop = 0;
		let code = 0;
		for (const r of rows) {
			const cu = comU(r.kind, zone, occ);
			if (r.kind === "slabHeated" || r.kind === "slabUnheated") {
				prop += r.u * r.area;
				code += cu * r.area;
			} else {
				prop += r.u * r.area;
				code += cu * r.area;
			}
		}
		return {
			prop,
			code,
			pass: prop <= code
		};
	}, [
		rows,
		zone,
		occ
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		kicker: "C402.1.5 Component performance alternative",
		title: "Proposed UA vs code UA",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Formula, { children: "Σ (U_p A) + Σ (F_p P) + Σ (C_p A) ≤ Σ (U_std A) + Σ (F_std P) + Σ (C_std A)" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "Enter area for U/C assemblies and perimeter (ft) for F-factor slabs. Equation 4-2 also allows fenestration trade-off within C402.4 limits."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[44rem] text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-line",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-2 py-2 text-xs text-muted",
								children: "Assembly"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-2 py-2 text-xs text-muted",
								children: "A or P"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-2 py-2 text-xs text-muted",
								children: "Proposed"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-2 py-2 text-xs text-muted",
								children: "Code"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-2 py-2 text-xs text-muted",
								children: "UA prop."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-2 py-2" })
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
						className: "font-mono tabular-nums",
						children: rows.map((r) => {
							const cu = comU(r.kind, zone, occ);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-line",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-2 py-1",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
											className: "h-11 w-full rounded-sm border border-line bg-bg px-2 font-sans text-sm",
											value: r.kind,
											onChange: (e) => {
												const kind = e.target.value;
												setRows((rs) => rs.map((x) => x.id === r.id ? {
													...x,
													kind,
													u: comU(kind, zone, occ)
												} : x));
											},
											children: kinds.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
												value: k,
												children: [
													COM_UFACTOR[k].unit,
													"-",
													COM_UFACTOR[k].label
												]
											}, k))
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-2 py-1",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
											value: r.area,
											onChange: (n) => setRows((rs) => rs.map((x) => x.id === r.id ? {
												...x,
												area: n
											} : x))
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-2 py-1",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
											value: r.u,
											step: "0.001",
											onChange: (n) => setRows((rs) => rs.map((x) => x.id === r.id ? {
												...x,
												u: n
											} : x))
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-2 py-2",
										children: cu
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-2 py-2",
										children: fmt(r.u * r.area, 1)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-2 py-1",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "h-11 px-2 text-sm text-fail",
											onClick: () => setRows((rs) => rs.filter((x) => x.id !== r.id)),
											children: "Remove"
										})
									})
								]
							}, r.id);
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostButton, {
					onClick: () => setRows((rs) => [...rs, {
						id: ++comSeq,
						kind: "wallWood",
						area: 500,
						u: comU("wallWood", zone, occ)
					}]),
					children: "Add assembly"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Proposed ΣUA",
						value: fmt(tot.prop, 1)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Code ΣUA",
						value: fmt(tot.code, 1)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Margin",
						value: fmt(tot.code - tot.prop, 1)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Verdict, {
					status: tot.pass ? "pass" : "fail",
					children: tot.pass ? "Component performance alternative is satisfied." : "Proposed UA exceeds the code baseline."
				})
			})
		]
	});
}
function FenestrationCalc() {
	const fen = fenFor(useWorkbook((s) => s.zone));
	const [wall, setWall] = (0, import_react.useState)(12e3);
	const [vert, setVert] = (0, import_react.useState)(2800);
	const [sky, setSky] = (0, import_react.useState)(200);
	const [roof, setRoof] = (0, import_react.useState)(1e4);
	const [a, setA] = (0, import_react.useState)(3);
	const [b, setB] = (0, import_react.useState)(8);
	const [fixedU, setFixedU] = (0, import_react.useState)(fen.fixedU);
	const [shgc, setShgc] = (0, import_react.useState)(fen.shgc[0].sew ?? .4);
	const wwr = wall > 0 ? vert / wall : 0;
	const srr = roof > 0 ? sky / roof : 0;
	const pf = projectionFactor(a, b);
	const bin = pfBin(pf);
	const shgcMax = fen.shgc[bin].sew;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				kicker: "C402.4",
				title: "Window-to-wall and skylight ratios",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Gross wall area",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
									value: wall,
									onChange: setWall,
									suffix: "ft²"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Vertical fenestration",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
									value: vert,
									onChange: setVert,
									suffix: "ft²"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Roof area",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
									value: roof,
									onChange: setRoof,
									suffix: "ft²"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Skylight area",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
									value: sky,
									onChange: setSky,
									suffix: "ft²"
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid gap-3 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "WWR",
							value: `${fmt(wwr * 100, 1)}%`,
							hint: `Max ${VERTICAL_FEN_MAX * 100}% (${VERTICAL_FEN_DAYLIGHT * 100}% with daylighting)`
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Skylight %",
							value: `${fmt(srr * 100, 1)}%`,
							hint: `Max ${SKYLIGHT_MAX * 100}% (${SKYLIGHT_DAYLIGHT * 100}% toplit)`
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Verdict, {
							status: wwr <= .4 ? wwr <= .3 ? "pass" : "info" : "fail",
							children: wwr <= .3 ? "Vertical fenestration within 30%." : wwr <= .4 ? "Between 30% and 40% — daylighting of C402.4.1.1 required." : "Exceeds 40% WWR (prescriptive)."
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Verdict, {
							status: srr <= .06 ? srr <= .03 ? "pass" : "info" : "fail",
							children: srr <= .03 ? "Skylight area within 3%." : srr <= .06 ? "Between 3% and 6% — toplit daylight zone of C402.4.2 required." : "Exceeds 6% skylight area."
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				kicker: "Table C402.4",
				title: "U-factor and SHGC",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 grid gap-3 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Fixed U max",
								value: String(fen.fixedU)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Operable U max",
								value: String(fen.operU)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Entrance door U",
								value: String(fen.entranceU)
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Projection A (overhang depth)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
									value: a,
									onChange: setA,
									suffix: "ft"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Projection B (sill to overhang)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
									value: b,
									onChange: setB,
									suffix: "ft"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Proposed fixed U",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
									value: fixedU,
									onChange: setFixedU,
									step: "0.01"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Proposed SHGC (SEW)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
									value: shgc,
									onChange: setShgc,
									step: "0.01"
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid gap-3 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "PF = A/B",
								value: fmt(pf, 2)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "PF bin",
								value: bin === 0 ? "PF < 0.2" : bin === 1 ? "0.2 ≤ PF < 0.5" : "PF ≥ 0.5"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "SHGC max (SEW)",
								value: shgcMax == null ? "NR" : String(shgcMax)
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 grid gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Verdict, {
							status: fixedU <= fen.fixedU ? "pass" : "fail",
							children: [
								"Fixed fenestration U ",
								fmt(fixedU, 2),
								" vs max ",
								fen.fixedU
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Verdict, {
							status: shgcMax == null || shgc <= shgcMax ? "pass" : "fail",
							children: shgcMax == null ? "SHGC not required in this zone." : `SHGC ${fmt(shgc, 2)} vs max ${shgcMax}`
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-xs text-muted",
						children: [
							"Skylight U max ",
							fen.skyU,
							fen.skyShgc != null ? `, SHGC ${fen.skyShgc}` : ", SHGC NR",
							". Air leakage of the building envelope ≤ ",
							AIR_LEAKAGE_MAX,
							" cfm/ft² at 75 Pa (C402.5)."
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				kicker: "Table C402.5.2",
				title: "Fenestration air leakage",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-line",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 text-xs text-muted",
								children: "Type"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 text-xs text-muted",
								children: "Max cfm/ft²"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 text-xs text-muted",
								children: "Test"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: AIR_LEAKAGE_FEN.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-line",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2",
								children: r.type
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 font-mono",
								children: r.rate
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 text-muted",
								children: r.std
							})
						]
					}, r.type)) })]
				})
			})
		]
	});
}
function SkylightCalc() {
	const [area, setArea] = (0, import_react.useState)(120);
	const [vt, setVt] = (0, import_react.useState)(.6);
	const [depth, setDepth] = (0, import_react.useState)(3);
	const [toplit, setToplit] = (0, import_react.useState)(2e3);
	const ea = skylightEffectiveAperture(area, vt, depth, toplit);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		kicker: "C402.4.2 Equation 4-4",
		title: "Skylight effective aperture",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Formula, { children: "EA = 0.85 × skylight area × VT × WF / toplit area" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "WF = 0.90 when well depth is less than 2 ft, otherwise 0.70. Toplit daylight zone requires EA ≥ 1% (0.01) under C402.4.2."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Skylight area",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
							value: area,
							onChange: setArea,
							suffix: "ft²"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "VT",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
							value: vt,
							onChange: setVt,
							step: "0.01"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Well depth",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
							value: depth,
							onChange: setDepth,
							suffix: "ft"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Toplit area",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
							value: toplit,
							onChange: setToplit,
							suffix: "ft²"
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Well factor",
					value: depth < 2 ? "0.90" : "0.70"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Effective aperture",
					value: fmt(ea, 3)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Verdict, {
					status: ea >= .01 ? "pass" : "fail",
					children: [
						"EA ",
						fmt(ea, 3),
						" ",
						ea >= .01 ? "≥ 0.01" : "< 0.01 (does not qualify as toplit)"
					]
				})
			})
		]
	});
}
function ReflectanceCalc() {
	const [initial, setInitial] = (0, import_react.useState)(.7);
	const aged = agedReflectance(initial);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		kicker: "C402.3 Equation 4-3",
		title: "Three-year aged solar reflectance",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Formula, { children: "ρ_aged = 0.2 + 0.7 × (ρ_initial − 0.2)" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Initial solar reflectance",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
						value: initial,
						onChange: setInitial,
						step: "0.01",
						min: 0,
						max: 1
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Aged reflectance",
					value: fmt(aged, 3)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted",
				children: "Low-sloped roofs on buildings in climate zones 1–3 must have a 3-year-aged solar reflectance of at least 0.55 and a thermal emittance of at least 0.75, or an SRI of 64 — unless an exception applies."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Verdict, {
					status: aged >= .55 ? "pass" : "info",
					children: [
						"Aged reflectance ",
						fmt(aged, 3),
						" vs 0.55 minimum (CZ 1–3 low-slope)."
					]
				})
			})
		]
	});
}
function TablesCalc() {
	const col = commercialColumn(useWorkbook((s) => s.zone));
	const fen = FEN_C402[col];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		kicker: "C402.4 snapshot",
		title: `Fenestration table for zone ${col}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
			className: "w-full text-left text-sm",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", {
				className: "font-mono",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-line",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2 font-sans",
							children: "Fixed U"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2",
							children: fen.fixedU
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-line",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2 font-sans",
							children: "Operable U"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2",
							children: fen.operU
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-line",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2 font-sans",
							children: "Entrance U"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2",
							children: fen.entranceU
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-line",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2 font-sans",
							children: "Skylight U"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2",
							children: fen.skyU
						})]
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-sm text-muted",
			children: "Use Residential envelope and Commercial envelope calculators for the full opaque tables of the selected zone."
		})]
	});
}
/** 2018 IECC Table C405.3.2(1) — building area method (W/ft²) */
var LPD_BUILDING = [
	{
		type: "Automotive facility",
		wsf: .8
	},
	{
		type: "Convention center",
		wsf: 1.01
	},
	{
		type: "Courthouse",
		wsf: 1.01
	},
	{
		type: "Dining: bar lounge/leisure",
		wsf: 1.01
	},
	{
		type: "Dining: cafeteria/fast food",
		wsf: .9
	},
	{
		type: "Dining: family",
		wsf: .95
	},
	{
		type: "Dormitory",
		wsf: .57
	},
	{
		type: "Exercise center",
		wsf: .84
	},
	{
		type: "Fire station",
		wsf: .67
	},
	{
		type: "Gymnasium",
		wsf: .94
	},
	{
		type: "Health care clinic",
		wsf: .9
	},
	{
		type: "Hospital",
		wsf: 1.05
	},
	{
		type: "Hotel/Motel",
		wsf: .88
	},
	{
		type: "Library",
		wsf: 1.19
	},
	{
		type: "Manufacturing facility",
		wsf: 1.17
	},
	{
		type: "Motion picture theater",
		wsf: .76
	},
	{
		type: "Multifamily",
		wsf: .51
	},
	{
		type: "Museum",
		wsf: 1.02
	},
	{
		type: "Office",
		wsf: .79
	},
	{
		type: "Parking garage",
		wsf: .21
	},
	{
		type: "Penitentiary",
		wsf: .81
	},
	{
		type: "Performing arts theater",
		wsf: 1.18
	},
	{
		type: "Police station",
		wsf: .87
	},
	{
		type: "Post office",
		wsf: .87
	},
	{
		type: "Religious building",
		wsf: 1
	},
	{
		type: "Retail",
		wsf: 1.06
	},
	{
		type: "School/university",
		wsf: .81
	},
	{
		type: "Sports arena",
		wsf: .87
	},
	{
		type: "Town hall",
		wsf: .89
	},
	{
		type: "Transportation",
		wsf: .7
	},
	{
		type: "Warehouse",
		wsf: .48
	},
	{
		type: "Workshop",
		wsf: 1.14
	}
];
/** 2018 IECC Table C405.3.2(2) — common space types (W/ft²) */
var LPD_SPACE = [
	{
		type: "Audience seating area",
		wsf: .63
	},
	{
		type: "Banking activity area",
		wsf: 1.01
	},
	{
		type: "Classroom / lecture / training",
		wsf: 1.24
	},
	{
		type: "Conference / meeting / multipurpose",
		wsf: 1.23
	},
	{
		type: "Corridor / transition",
		wsf: .66
	},
	{
		type: "Courtroom",
		wsf: 1.72
	},
	{
		type: "Dining area",
		wsf: .65
	},
	{
		type: "Electrical / mechanical",
		wsf: .43
	},
	{
		type: "Food preparation",
		wsf: 1.21
	},
	{
		type: "Guest room",
		wsf: .91
	},
	{
		type: "Laboratory",
		wsf: 1.81
	},
	{
		type: "Laundry / washing area",
		wsf: .6
	},
	{
		type: "Lobby",
		wsf: .9
	},
	{
		type: "Locker room",
		wsf: .75
	},
	{
		type: "Lounge / breakroom",
		wsf: .73
	},
	{
		type: "Office — enclosed",
		wsf: 1.11
	},
	{
		type: "Office — open plan",
		wsf: .98
	},
	{
		type: "Restroom",
		wsf: .98
	},
	{
		type: "Sales area",
		wsf: 1.22
	},
	{
		type: "Stairway",
		wsf: .69
	},
	{
		type: "Storage",
		wsf: .63
	},
	{
		type: "Workshop",
		wsf: 1.59
	},
	{
		type: "Parking area, interior",
		wsf: .19
	},
	{
		type: "Gymnasium / fitness center",
		wsf: .72
	},
	{
		type: "Library",
		wsf: 1.06
	},
	{
		type: "Patient room",
		wsf: .62
	},
	{
		type: "Exam / treatment",
		wsf: 1.66
	},
	{
		type: "Nurse station",
		wsf: 1.17
	},
	{
		type: "Pharmacy",
		wsf: 1.68
	},
	{
		type: "Retail dressing room",
		wsf: .71
	},
	{
		type: "Warehouse — fine material",
		wsf: 1.19
	},
	{
		type: "Warehouse — medium/bulky",
		wsf: .51
	},
	{
		type: "Computer room",
		wsf: 1.71
	},
	{
		type: "Copy / print room",
		wsf: .72
	},
	{
		type: "Loading dock, interior",
		wsf: .47
	},
	{
		type: "Museum restoration",
		wsf: 1.02
	},
	{
		type: "Emergency vehicle garage",
		wsf: .56
	},
	{
		type: "Confinement cells",
		wsf: .81
	}
];
var LIGHTING_ZONES = [
	{
		id: 0,
		label: "LZ0 Undeveloped"
	},
	{
		id: 1,
		label: "LZ1 Parks / rural"
	},
	{
		id: 2,
		label: "LZ2 Residential"
	},
	{
		id: 3,
		label: "LZ3 Commercial"
	},
	{
		id: 4,
		label: "LZ4 High activity"
	}
];
/** 2018 IECC Table C405.4.2(2) tradable surfaces — W/ft² or W/lf */
var LPD_EXTERIOR = [
	{
		surface: "Uncovered parking areas",
		unit: "W/ft²",
		values: {
			0: null,
			1: .04,
			2: .06,
			3: .1,
			4: .13
		}
	},
	{
		surface: "Parking garage, interior",
		unit: "W/ft²",
		values: {
			0: .14,
			1: .14,
			2: .14,
			3: .14,
			4: .14
		}
	},
	{
		surface: "Walkways less than 10 ft wide",
		unit: "W/lf",
		values: {
			0: null,
			1: .7,
			2: .7,
			3: .8,
			4: 1
		}
	},
	{
		surface: "Walkways 10 ft wide or greater / plazas",
		unit: "W/ft²",
		values: {
			0: null,
			1: .14,
			2: .14,
			3: .16,
			4: .2
		}
	},
	{
		surface: "Stairways",
		unit: "W/ft²",
		values: {
			0: null,
			1: .75,
			2: 1,
			3: 1,
			4: 1
		}
	},
	{
		surface: "Pedestrian tunnels",
		unit: "W/ft²",
		values: {
			0: .14,
			1: .14,
			2: .14,
			3: .14,
			4: .14
		}
	},
	{
		surface: "Landscaping",
		unit: "W/ft²",
		values: {
			0: null,
			1: .04,
			2: .05,
			3: .05,
			4: .05
		}
	},
	{
		surface: "Entry canopies",
		unit: "W/ft²",
		values: {
			0: null,
			1: .25,
			2: .25,
			3: .4,
			4: .4
		}
	},
	{
		surface: "Loading areas for law enforcement / emergency",
		unit: "W/ft²",
		values: {
			0: null,
			1: .5,
			2: .5,
			3: .5,
			4: .5
		}
	}
];
var LPD_EXTERIOR_BASE = {
	0: 0,
	1: 350,
	2: 400,
	3: 500,
	4: 900
};
var bSeq = 1;
var sSeq = 1;
var eSeq = 1;
function LpdBuildingCalc() {
	const [rows, setRows] = (0, import_react.useState)([{
		id: 1,
		type: "Office",
		area: 2e4,
		watts: 14e3
	}]);
	const tot = (0, import_react.useMemo)(() => {
		let allowed = 0;
		let used = 0;
		for (const r of rows) {
			const lpd = LPD_BUILDING.find((x) => x.type === r.type)?.wsf ?? 0;
			allowed += lpd * r.area;
			used += r.watts;
		}
		return {
			allowed,
			used,
			pass: used <= allowed
		};
	}, [rows]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		kicker: "Table C405.3.2(1)",
		title: "Building-area method",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[40rem] text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-line",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-2 py-2 text-xs text-muted",
								children: "Building type"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-2 py-2 text-xs text-muted",
								children: "Area ft²"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-2 py-2 text-xs text-muted",
								children: "LPD"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-2 py-2 text-xs text-muted",
								children: "Allowed W"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-2 py-2 text-xs text-muted",
								children: "Installed W"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
						className: "font-mono tabular-nums",
						children: rows.map((r) => {
							const lpd = LPD_BUILDING.find((x) => x.type === r.type)?.wsf ?? 0;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-line",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-2 py-1",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
											className: "h-11 w-full rounded-sm border border-line bg-bg px-2 font-sans text-sm",
											value: r.type,
											onChange: (e) => setRows((rs) => rs.map((x) => x.id === r.id ? {
												...x,
												type: e.target.value
											} : x)),
											children: LPD_BUILDING.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: t.type }, t.type))
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-2 py-1",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
											value: r.area,
											onChange: (n) => setRows((rs) => rs.map((x) => x.id === r.id ? {
												...x,
												area: n
											} : x))
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-2 py-2",
										children: lpd.toFixed(2)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-2 py-2",
										children: fmt(lpd * r.area, 0)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-2 py-1",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
											value: r.watts,
											onChange: (n) => setRows((rs) => rs.map((x) => x.id === r.id ? {
												...x,
												watts: n
											} : x))
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-2 py-1",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "h-11 px-2 text-sm text-fail",
											onClick: () => setRows((rs) => rs.filter((x) => x.id !== r.id)),
											children: "Remove"
										})
									})
								]
							}, r.id);
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostButton, {
					onClick: () => setRows((rs) => [...rs, {
						id: ++bSeq,
						type: "Office",
						area: 5e3,
						watts: 3e3
					}]),
					children: "Add type"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Allowed",
						value: `${fmt(tot.allowed, 0)} W`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Installed",
						value: `${fmt(tot.used, 0)} W`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Remainder",
						value: `${fmt(tot.allowed - tot.used, 0)} W`
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Verdict, {
					status: tot.pass ? "pass" : "fail",
					children: tot.pass ? "Installed lighting power is within the building-area allowance." : "Installed lighting exceeds the building-area allowance."
				})
			})
		]
	});
}
function LpdSpaceCalc() {
	const [rows, setRows] = (0, import_react.useState)([{
		id: 1,
		type: "Office — open plan",
		area: 12e3,
		watts: 1e4
	}, {
		id: 2,
		type: "Corridor / transition",
		area: 2e3,
		watts: 1e3
	}]);
	const tot = (0, import_react.useMemo)(() => {
		let allowed = 0;
		let used = 0;
		for (const r of rows) {
			const lpd = LPD_SPACE.find((x) => x.type === r.type)?.wsf ?? 0;
			allowed += lpd * r.area;
			used += r.watts;
		}
		return {
			allowed,
			used,
			pass: used <= allowed
		};
	}, [rows]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		kicker: "Table C405.3.2(2)",
		title: "Space-by-space method",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[40rem] text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-line",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-2 py-2 text-xs text-muted",
								children: "Space"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-2 py-2 text-xs text-muted",
								children: "Area ft²"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-2 py-2 text-xs text-muted",
								children: "LPD"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-2 py-2 text-xs text-muted",
								children: "Allowed W"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-2 py-2 text-xs text-muted",
								children: "Installed W"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
						className: "font-mono tabular-nums",
						children: rows.map((r) => {
							const lpd = LPD_SPACE.find((x) => x.type === r.type)?.wsf ?? 0;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-line",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-2 py-1",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
											className: "h-11 w-full rounded-sm border border-line bg-bg px-2 font-sans text-sm",
											value: r.type,
											onChange: (e) => setRows((rs) => rs.map((x) => x.id === r.id ? {
												...x,
												type: e.target.value
											} : x)),
											children: LPD_SPACE.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: t.type }, t.type))
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-2 py-1",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
											value: r.area,
											onChange: (n) => setRows((rs) => rs.map((x) => x.id === r.id ? {
												...x,
												area: n
											} : x))
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-2 py-2",
										children: lpd.toFixed(2)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-2 py-2",
										children: fmt(lpd * r.area, 0)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-2 py-1",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
											value: r.watts,
											onChange: (n) => setRows((rs) => rs.map((x) => x.id === r.id ? {
												...x,
												watts: n
											} : x))
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-2 py-1",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "h-11 px-2 text-sm text-fail",
											onClick: () => setRows((rs) => rs.filter((x) => x.id !== r.id)),
											children: "Remove"
										})
									})
								]
							}, r.id);
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostButton, {
					onClick: () => setRows((rs) => [...rs, {
						id: ++sSeq,
						type: "Restroom",
						area: 400,
						watts: 300
					}]),
					children: "Add space"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Allowed",
						value: `${fmt(tot.allowed, 0)} W`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Installed",
						value: `${fmt(tot.used, 0)} W`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Remainder",
						value: `${fmt(tot.allowed - tot.used, 0)} W`
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Verdict, {
					status: tot.pass ? "pass" : "fail",
					children: tot.pass ? "Installed lighting power is within the space-by-space allowance." : "Installed lighting exceeds the space-by-space allowance."
				})
			})
		]
	});
}
function LpdExteriorCalc() {
	const [lz, setLz] = (0, import_react.useState)(3);
	const [rows, setRows] = (0, import_react.useState)([{
		id: 1,
		surface: "Uncovered parking areas",
		qty: 4e4,
		watts: 3200
	}]);
	const tot = (0, import_react.useMemo)(() => {
		const base = LPD_EXTERIOR_BASE[lz];
		let allowed = base;
		let used = 0;
		for (const r of rows) {
			const lpd = LPD_EXTERIOR.find((x) => x.surface === r.surface)?.values[lz] ?? 0;
			allowed += (lpd ?? 0) * r.qty;
			used += r.watts;
		}
		return {
			allowed,
			used,
			base,
			pass: used <= allowed
		};
	}, [rows, lz]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		kicker: "Table C405.4.2(2)",
		title: "Exterior lighting power",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-4 max-w-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Lighting zone",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						value: String(lz),
						onChange: (v) => setLz(Number(v)),
						children: LIGHTING_ZONES.map((z) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: z.id,
							children: z.label
						}, z.id))
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[40rem] text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-line",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-2 py-2 text-xs text-muted",
								children: "Surface"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-2 py-2 text-xs text-muted",
								children: "Area or length"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-2 py-2 text-xs text-muted",
								children: "Allowance"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-2 py-2 text-xs text-muted",
								children: "Allowed W"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-2 py-2 text-xs text-muted",
								children: "Installed W"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
						className: "font-mono tabular-nums",
						children: rows.map((r) => {
							const spec = LPD_EXTERIOR.find((x) => x.surface === r.surface);
							const lpd = spec?.values[lz];
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-line",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-2 py-1",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
											className: "h-11 w-full rounded-sm border border-line bg-bg px-2 font-sans text-sm",
											value: r.surface,
											onChange: (e) => setRows((rs) => rs.map((x) => x.id === r.id ? {
												...x,
												surface: e.target.value
											} : x)),
											children: LPD_EXTERIOR.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: s.surface }, s.surface))
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-2 py-1",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
											value: r.qty,
											onChange: (n) => setRows((rs) => rs.map((x) => x.id === r.id ? {
												...x,
												qty: n
											} : x))
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-2 py-2",
										children: lpd == null ? "NR" : `${lpd} ${spec?.unit}`
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-2 py-2",
										children: lpd == null ? "—" : fmt(lpd * r.qty, 0)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-2 py-1",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
											value: r.watts,
											onChange: (n) => setRows((rs) => rs.map((x) => x.id === r.id ? {
												...x,
												watts: n
											} : x))
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-2 py-1",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "h-11 px-2 text-sm text-fail",
											onClick: () => setRows((rs) => rs.filter((x) => x.id !== r.id)),
											children: "Remove"
										})
									})
								]
							}, r.id);
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostButton, {
					onClick: () => setRows((rs) => [...rs, {
						id: ++eSeq,
						surface: "Walkways less than 10 ft wide",
						qty: 200,
						watts: 120
					}]),
					children: "Add surface"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Base site allowance",
						value: `${tot.base} W`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Total allowed",
						value: `${fmt(tot.allowed, 0)} W`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Installed",
						value: `${fmt(tot.used, 0)} W`
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Verdict, {
					status: tot.pass ? "pass" : "fail",
					children: tot.pass ? "Exterior lighting is within the tradable allowance plus base site wattage." : "Exterior lighting exceeds the allowance."
				})
			})
		]
	});
}
function FanCalc() {
	const [cfm, setCfm] = (0, import_react.useState)(12e3);
	const [vav, setVav] = (0, import_react.useState)(true);
	const [nameplate, setNameplate] = (0, import_react.useState)(15);
	const [bhp, setBhp] = (0, import_react.useState)(12);
	const [adj, setAdj] = (0, import_react.useState)(0);
	const allowHp = fanNameplateHp(cfm, vav);
	const allowBhp = fanSystemBhp(cfm, vav, adj);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		kicker: "Table C403.8.1",
		title: "Fan power limitation",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Supply airflow",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
							value: cfm,
							onChange: setCfm,
							suffix: "cfm"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "System type",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: vav ? "vav" : "cv",
							onChange: (v) => setVav(v === "vav"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "cv",
								children: "Constant volume"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "vav",
								children: "Variable volume"
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Nameplate hp (proposed)",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
							value: nameplate,
							onChange: setNameplate,
							suffix: "hp"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Fan system bhp",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
							value: bhp,
							onChange: setBhp,
							suffix: "bhp"
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Pressure-drop adjustment A (Option 2)",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
					value: adj,
					onChange: setAdj
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Formula, { children: [
				"Option 1 nameplate: CFM × ",
				vav ? FAN_COEFF.nameplate.vav : FAN_COEFF.nameplate.cv,
				". Option 2 bhp: CFM ×",
				" ",
				vav ? FAN_COEFF.bhp.vav : FAN_COEFF.bhp.cv,
				" + A"
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Allowable nameplate",
					value: `${fmt(allowHp, 2)} hp`
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Allowable bhp",
					value: `${fmt(allowBhp, 2)} bhp`
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 grid gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Verdict, {
					status: nameplate <= allowHp ? "pass" : "fail",
					children: [
						"Option 1: ",
						fmt(nameplate, 2),
						" hp vs ",
						fmt(allowHp, 2),
						" hp allowed"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Verdict, {
					status: bhp <= allowBhp ? "pass" : "fail",
					children: [
						"Option 2: ",
						fmt(bhp, 2),
						" bhp vs ",
						fmt(allowBhp, 2),
						" bhp allowed"
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xs text-muted",
				children: "Applies to each fan system with total nameplate ≥ 5 hp. Either option may be used."
			})
		]
	});
}
function ErvCalc() {
	const zone = useWorkbook((s) => s.zone);
	const [oa, setOa] = (0, import_react.useState)(.4);
	const [cfm, setCfm] = (0, import_react.useState)(8e3);
	const [hrs, setHrs] = (0, import_react.useState)(false);
	const t = ervThresholdCfm(zone, oa, hrs);
	const req = ervRequired(zone, oa, cfm, hrs);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		kicker: "Table C403.7.4.2",
		title: "Exhaust air energy recovery",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Outdoor air fraction",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
							value: oa,
							onChange: setOa,
							step: "0.05",
							min: 0,
							max: 1
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Design supply airflow",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
							value: cfm,
							onChange: setCfm,
							suffix: "cfm"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Annual hours",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: hrs ? "ge" : "lt",
							onChange: (v) => setHrs(v === "ge"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "lt",
								children: "Less than 8,000 h/yr"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "ge",
								children: "8,000 h/yr or more"
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Threshold",
						value: t == null ? "NR" : `${fmt(t, 0)} cfm`
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Verdict, {
					status: req ? "fail" : "pass",
					children: req ? `Energy recovery is required — supply ${fmt(cfm, 0)} cfm is at or above the ${fmt(t ?? 0, 0)} cfm threshold.` : t == null ? "Energy recovery is not required (NR) for this climate / OA bin." : `Energy recovery is not required — supply is below ${fmt(t, 0)} cfm.`
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xs text-muted",
				children: "Sensible recovery effectiveness ≥ 50% where required. Several exceptions in C403.7.4.2 still apply (kitchen exhaust, dedicated outdoor air already recovered, etc.)."
			})
		]
	});
}
function HvacCalc() {
	const [btuh, setBtuh] = (0, import_react.useState)(12e3);
	const [repl, setRepl] = (0, import_react.useState)(false);
	const cap = ptacCap(btuh);
	const eer = ptacCoolEer(btuh, repl);
	const cop = pthpHeatCop(btuh, repl);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		kicker: "Table C403.3.2(3)",
		title: "PTAC / PTHP minimum efficiency",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Formula, { children: [
				"EER = ",
				repl ? "10.9 − 0.213" : "14.0 − 0.300",
				" × Cap/1000 · COP_h = ",
				repl ? "2.9 − 0.026" : "3.7 − 0.052",
				" × Cap/1000"
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Rated cooling capacity",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
						value: btuh,
						onChange: setBtuh,
						suffix: "Btu/h"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Construction",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: repl ? "r" : "n",
						onChange: (v) => setRepl(v === "r"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "n",
							children: "New construction"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "r",
							children: "Replacement"
						})]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Cap used",
						value: `${fmt(cap, 0)} Btu/h`,
						hint: "clamped 7,000–15,000"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Cooling EER",
						value: fmt(eer, 2)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Heating COP (PTHP)",
						value: fmt(cop, 2)
					})
				]
			})
		]
	});
}
function ChillerCalc() {
	const [cewt, setCewt] = (0, import_react.useState)(85);
	const [clwt, setClwt] = (0, import_react.useState)(44);
	const [table, setTable] = (0, import_react.useState)(.61);
	const lift = cewt - clwt;
	const ka = chillerKadj(lift, "A");
	const kb = chillerKadj(lift, "B");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		kicker: "C403.3.2.1 Equations 4-6 / 4-7",
		title: "Centrifugal chiller Kadj",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Formula, { children: "LIFT = CEWT − CLWT · Kadj_A = 6.174722 − 0.303813A + 0.006251A² − 0.00004583A³" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Condenser entering (°F)",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
							value: cewt,
							onChange: setCewt
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Chilled leaving (°F)",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
							value: clwt,
							onChange: setClwt
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Table FL kW/ton",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
							value: table,
							onChange: setTable,
							step: "0.01"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "LIFT",
						value: `${fmt(lift, 1)} °F`
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Kadj Path A (FL)",
					value: fmt(ka, 4),
					hint: `Adj FL ${fmt(chillerAdjKwPerTon(table, ka), 3)} kW/ton`
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Kadj Path B (IPLV)",
					value: fmt(kb, 4),
					hint: `Adj IPLV ${fmt(chillerAdjKwPerTon(table, kb), 3)} kW/ton`
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xs text-muted",
				children: "Applies when leaving-fluid or condenser temperatures differ from the AHRI 550/590 rating conditions. Path A is full-load; Path B is IPLV.V.s."
			})
		]
	});
}
function PipeCalc() {
	const [tempIdx, setTempIdx] = (0, import_react.useState)(1);
	const [nps, setNps] = (0, import_react.useState)("1½–3\"");
	const [kInst, setKInst] = (0, import_react.useState)(.27);
	const [kTable, setKTable] = (0, import_react.useState)(.27);
	const row = PIPE_INSULATION[tempIdx];
	const t = row.nps[nps];
	const r = PIPE_RADIUS_IN[nps];
	const teq = equivalentThickness(r, t, kInst, kTable);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		kicker: "Table C403.11.3",
		title: "HVAC piping insulation",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Formula, { children: "T = r [(1 + t/r)^(k/K) − 1]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-3 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Fluid operating temperature",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: String(tempIdx),
							onChange: (v) => setTempIdx(Number(v)),
							children: PIPE_INSULATION.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: i,
								children: p.temp
							}, p.temp))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Nominal pipe size",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: nps,
							onChange: (v) => setNps(v),
							children: PIPE_NPS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: p }, p))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Installed conductivity k",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
							value: kInst,
							onChange: setKInst,
							step: "0.01"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Table conductivity K",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
							value: kTable,
							onChange: setKTable,
							step: "0.01"
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Table thickness t",
						value: `${t} in`,
						hint: `k range ${row.conductivity}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Pipe radius r",
						value: `${r} in`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Equivalent T",
						value: `${fmt(teq, 2)} in`
					})
				]
			})
		]
	});
}
function SwhCalc() {
	const [v, setV] = (0, import_react.useState)(80);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			kicker: "Table C404.2",
			title: "Service water-heating equipment",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[32rem] text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-line",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 text-xs text-muted",
								children: "Equipment"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 text-xs text-muted",
								children: "Size"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 text-xs text-muted",
								children: "Minimum efficiency"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: SWH_TABLE.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-line",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2",
								children: r.equipment
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2",
								children: r.size
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2",
								children: r.efficiency
							})
						]
					}, r.equipment + r.size)) })]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Storage volume V",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
						value: v,
						onChange: setV,
						suffix: "gal"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Standby loss (gas storage >75 kBtu/h)",
					value: `${fmt(standbyLossBtu(v), 0)} Btu/h`,
					hint: "110√V + 800/(V/2)"
				})]
			})]
		})
	});
}
function HwPipeCalc() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
		kicker: "C404.4 / R403.5.3",
		title: "Service hot-water piping insulation",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full text-left text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "border-b border-line",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					className: "py-2 text-xs text-muted",
					children: "Piping"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					className: "py-2 text-xs text-muted",
					children: "Minimum insulation"
				})]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: HW_PIPE_MIN.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "border-b border-line",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: "py-2 pr-3",
					children: r.location
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: "py-2",
					children: r.thickness
				})]
			}, r.location)) })]
		})
	});
}
function HoodCalc() {
	const [type, setType] = (0, import_react.useState)(HOOD_RATES[0].type);
	const [duty, setDuty] = (0, import_react.useState)("medium");
	const [len, setLen] = (0, import_react.useState)(8);
	const [exhaust, setExhaust] = (0, import_react.useState)(2400);
	const rate = (HOOD_RATES.find((h) => h.type === type) ?? HOOD_RATES[0])[duty];
	const allow = rate * len;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		kicker: "Table C403.7.5",
		title: "Kitchen exhaust hoods",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Hood type",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: type,
							onChange: setType,
							children: HOOD_RATES.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: h.type }, h.type))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Duty",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: duty,
							onChange: (v) => setDuty(v),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "light",
									children: "Light"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "medium",
									children: "Medium"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "heavy",
									children: "Heavy"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "extra",
									children: "Extra heavy"
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Hood length",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
							value: len,
							onChange: setLen,
							suffix: "ft"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Design exhaust",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
							value: exhaust,
							onChange: setExhaust,
							suffix: "cfm"
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Max cfm per lip foot",
					value: String(rate)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Max exhaust",
					value: `${fmt(allow, 0)} cfm`
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Verdict, {
					status: exhaust <= allow ? "pass" : "fail",
					children: exhaust <= allow ? "Exhaust is within the Table C403.7.5 rate." : "Exhaust exceeds the maximum for this hood type and duty."
				})
			})
		]
	});
}
function FormulaLibrary() {
	const [cfa, setCfa] = (0, import_react.useState)(2e3);
	const [br, setBr] = (0, import_react.useState)(3);
	const [rs, setRs] = (0, import_react.useState)(.79);
	const [er, setEr] = (0, import_react.useState)(6.45);
	const [a, setA] = (0, import_react.useState)(2);
	const [b, setB] = (0, import_react.useState)(6);
	const [rho, setRho] = (0, import_react.useState)(.7);
	const [skyA, setSkyA] = (0, import_react.useState)(100);
	const [vt, setVt] = (0, import_react.useState)(.55);
	const [depth, setDepth] = (0, import_react.useState)(4);
	const [toplit, setToplit] = (0, import_react.useState)(1800);
	const [r, setR] = (0, import_react.useState)(1.75);
	const [t, setT] = (0, import_react.useState)(1.5);
	const [kInst, setKInst] = (0, import_react.useState)(.28);
	const [kTable, setKTable] = (0, import_react.useState)(.27);
	const [cap, setCap] = (0, import_react.useState)(12e3);
	const [lift, setLift] = (0, import_react.useState)(41);
	const [p, setP] = (0, import_react.useState)(18);
	const [tm, setTm] = (0, import_react.useState)(55);
	const [f, setF] = (0, import_react.useState)(4);
	const [press, setPress] = (0, import_react.useState)(25);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			kicker: "Extracted equations",
			title: "Live formula library",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-4 text-sm text-muted",
				children: "Each identity is evaluated as you edit. Section references are 2018 IECC unless noted."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Formula, { children: "Q_vent = 0.01 × CFA + 7.5 × (N_br + 1) · R403.6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 grid gap-3 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "CFA",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
									value: cfa,
									onChange: setCfa
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Bedrooms",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
									value: br,
									onChange: setBr
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Q",
								value: `${fmt(wholeHouseVentCfm(cfa, br), 1)} cfm`
							})
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Formula, { children: "U_steel = 1 / (R_s + E_R) · R402.2.6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 grid gap-3 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "R_s",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
									value: rs,
									onChange: setRs
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "E_R",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
									value: er,
									onChange: setEr
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "U",
								value: fmt(steelStudU(rs, er), 3)
							})
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Formula, { children: "PF = A / B · C402.4.3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 grid gap-3 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "A",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
									value: a,
									onChange: setA
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "B",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
									value: b,
									onChange: setB
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "PF",
								value: fmt(projectionFactor(a, b), 2)
							})
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Formula, { children: "ρ_aged = 0.2 + 0.7 (ρ_i − 0.2) · Eq. 4-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 grid gap-3 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "ρ initial",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
								value: rho,
								onChange: setRho
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "ρ aged",
							value: fmt(agedReflectance(rho), 3)
						})]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Formula, { children: "EA = 0.85 × A_sky × VT × WF / A_toplit · Eq. 4-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "A_sky",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
									value: skyA,
									onChange: setSkyA
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "VT",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
									value: vt,
									onChange: setVt
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Well depth",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
									value: depth,
									onChange: setDepth
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "A_toplit",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
									value: toplit,
									onChange: setToplit
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "EA",
								value: fmt(skylightEffectiveAperture(skyA, vt, depth, toplit), 3)
							})
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Formula, { children: "T = r [(1 + t/r)^(k/K) − 1] · C403.11.3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "r",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
									value: r,
									onChange: setR
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "t",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
									value: t,
									onChange: setT
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "k",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
									value: kInst,
									onChange: setKInst
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "K",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
									value: kTable,
									onChange: setKTable
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "T",
								value: fmt(equivalentThickness(r, t, kInst, kTable), 2)
							})
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Formula, { children: "EER_PTAC = 14.0 − 0.300 × Cap/1000 · C403.3.2(3)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 grid gap-3 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Cap Btu/h",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
								value: cap,
								onChange: setCap
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "EER",
							value: fmt(ptacCoolEer(cap), 2)
						})]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Formula, { children: "Kadj_A = 6.174722 − 0.303813A + 0.006251A² − 0.00004583A³ · Eq. 4-6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 grid gap-3 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "LIFT A (°F)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
								value: lift,
								onChange: setLift
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Kadj",
							value: fmt(chillerKadj(lift, "A"), 4)
						})]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Formula, { children: "Dry if P_m < 0.44 × (T − 19.5) · Table C301.3(1)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 grid gap-3 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "P_m (in)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
									value: p,
									onChange: setP
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "T (°F)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
									value: tm,
									onChange: setTm
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Class",
								value: isDryClimate(p, tm) ? "Dry (B)" : "Moist (A)"
							})
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Formula, { children: "CL = F × P^0.65 · duct leakage class" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 grid gap-3 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Leakage class F",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
									value: f,
									onChange: setF
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Pressure P (Pa)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumInput, {
									value: press,
									onChange: setPress
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "CL",
								value: fmt(f * press ** .65, 2)
							})
						]
					})] })
				]
			})]
		})
	});
}
function CalcView({ id, onOpen }) {
	switch (id) {
		case "home": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeCalc, { onOpen });
		case "climate": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClimateCalc, {});
		case "defaults": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DefaultsCalc, {});
		case "res-envelope": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResEnvelopeCalc, {});
		case "res-ua": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResUaCalc, {});
		case "res-air": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResAirCalc, {});
		case "steel": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SteelCalc, {});
		case "eri": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EriCalc, {});
		case "com-envelope": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComEnvelopeCalc, {});
		case "com-ua": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComUaCalc, {});
		case "fenestration": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FenestrationCalc, {});
		case "skylight": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkylightCalc, {});
		case "reflectance": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReflectanceCalc, {});
		case "lpd-building": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LpdBuildingCalc, {});
		case "lpd-space": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LpdSpaceCalc, {});
		case "lpd-exterior": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LpdExteriorCalc, {});
		case "fan": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FanCalc, {});
		case "erv": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErvCalc, {});
		case "hvac": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HvacCalc, {});
		case "chiller": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChillerCalc, {});
		case "pipe": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PipeCalc, {});
		case "swh": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwhCalc, {});
		case "hw-pipe": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HwPipeCalc, {});
		case "hood": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoodCalc, {});
		case "formulas": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormulaLibrary, {});
		case "tables": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TablesCalc, {});
		default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeCalc, { onOpen });
	}
}
function AppShell() {
	const zone = useWorkbook((s) => s.zone);
	const occupancy = useWorkbook((s) => s.occupancy);
	const calc = useWorkbook((s) => s.calc);
	const setZone = useWorkbook((s) => s.setZone);
	const setOccupancy = useWorkbook((s) => s.setOccupancy);
	const setCalc = useWorkbook((s) => s.setCalc);
	const [open, setOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		hydrateWorkbook();
	}, []);
	const meta = calcMeta(calc);
	const grouped = (0, import_react.useMemo)(() => GROUPS.map((g) => ({
		group: g,
		items: CATALOG.filter((c) => c.group === g && c.id !== "home")
	})), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-dvh bg-bg text-ink",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-dvh",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: cn("fixed inset-y-0 left-0 z-30 w-72 overflow-y-auto bg-sidebar text-sidebar-fg transition-transform duration-200 lg:static lg:translate-x-0", open ? "translate-x-0" : "-translate-x-full"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between px-5 pt-5 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setCalc("home"),
							className: "text-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-xs tracking-widest text-sidebar-muted uppercase",
								children: "2018 IECC"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-lg leading-tight font-semibold",
								children: "Workbook"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "grid size-11 place-items-center rounded-sm text-sidebar-fg lg:hidden",
							onClick: () => setOpen(false),
							"aria-label": "Close menu",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "px-3 pb-10",
						children: grouped.map(({ group, items }) => items.length === 0 ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "px-2 pt-2 pb-1 font-mono text-[10px] tracking-widest text-sidebar-muted uppercase",
								children: group
							}), items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									setCalc(item.id);
									setOpen(false);
								},
								className: cn("mb-0.5 w-full rounded-sm px-2 py-2 text-left text-sm leading-snug transition-colors duration-150", calc === item.id ? "bg-sidebar-2 text-sidebar-fg" : "text-sidebar-muted hover:bg-sidebar-2 hover:text-sidebar-fg"),
								children: item.title
							}, item.id))]
						}, group))
					})]
				}),
				open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": "Close menu",
					className: "fixed inset-0 z-20 bg-ink/40 lg:hidden",
					onClick: () => setOpen(false)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 flex-1 flex-col",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "sticky top-0 z-10 flex flex-wrap items-center gap-3 border-b border-line bg-surface/95 px-4 py-3 backdrop-blur-sm sm:px-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "grid size-11 place-items-center rounded-sm border border-line lg:hidden",
								onClick: () => setOpen(true),
								"aria-label": "Open menu",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-xs text-faint",
									children: meta.section
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "font-display truncate text-lg font-semibold sm:text-xl",
									children: meta.title
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden text-xs text-muted sm:inline",
									children: "Zone"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									className: "h-11 rounded-sm border border-line bg-bg px-2 font-mono text-sm",
									value: zone,
									onChange: (e) => setZone(e.target.value),
									"aria-label": "Climate zone",
									children: CLIMATE_KEYS.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: k,
										children: k
									}, k))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden text-xs text-muted sm:inline",
									children: "Occ."
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									className: "h-11 max-w-[9.5rem] rounded-sm border border-line bg-bg px-2 text-sm",
									value: occupancy,
									onChange: (e) => setOccupancy(e.target.value),
									"aria-label": "Occupancy",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "all",
										children: "All other"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "groupR",
										children: "Group R"
									})]
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
						className: "mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mb-5 text-sm text-muted",
							children: [
								zoneLabel(zone),
								" · ",
								occupancy === "groupR" ? "Group R" : "All other occupancy"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalcView, {
							id: calc,
							onOpen: (id) => setCalc(id)
						})]
					})]
				})
			]
		})
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {});
}
//#endregion
export { Home as component };
