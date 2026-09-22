// Dit bestand is gepubliceerd als https://improrail.github.io/respec-assets/js/prorail-config.mjs,
// voor hergebruik in IMProRail ReSpec documenten.

const organisationConfig = {
  nl_organisationName: "ProRail",
  nl_organisationStylesURL: "https://improrail.github.io/respec-assets/style/",
  nl_organisationPublishURL: "https://improrail.github.io/docs/",

  logos: [{
    src: "https://www.prorail.nl/static/assets/brands/default/images/logo_default.svg?v=20250513",
    alt: "Prorail",
    id: "Prorail",
    height: 29,
    width: 130,
    url: "https://www.prorail.nl/"
  }],

  useLogo: true,

  fileName: "",
  latestVersion: ["nl_organisationPublishURL", "pubDomain", "/", "shortName", "/", "fileName"],
  thisVersion: ["nl_organisationPublishURL", "pubDomain", "/", "shortName", "/", "publishVersion", "/", "fileName"],
  prevVersion: ["nl_organisationPublishURL", "pubDomain", "/", "shortName", "/", "previousPublishVersion", "/", "fileName"],

  addSectionLinks: true,

  acceptedDomains: [
    'respec',
    'rttp',
    'cm',
  ],

  localizationStrings: {
    en: {
      wv: "Editor's draft",
      cv: "Candidate recommendation",
      vv: "Proposed recommendation",
      def: "Recommendation",
      ld: "Living document",
      basis: "Document",
      //eo: "Outdated version",
      //tg: "Rescinded version",
      no: "Norm",
      st: "Standard",
      ia: "Information architecture",
      im: "Information model",
      pr: "Practical guideline",
      hr: "Guide",
      wa: "Work process agreement",
      al: "General",
      bd: "Governance documentation",
      bp: "Best practice",
    },

    nl: {
      wv: "Werkversie",
      cv: "Consultatieversie",
      vv: "Versie ter vaststelling",
      def: "Vastgestelde versie",
      ld: "Levend document",
      basis: "Document",
      //eo: "Verouderde versie",
      //tg: "Teruggetrokken versie",
      no: "Norm",
      st: "Standaard",
      ia: "Informatiearchitectuur",
      im: "Informatiemodel",
      pr: "Praktijkrichtlijn",
      hr: "Handreiking",
      wa: "Werkafspraak",
      al: "Algemeen",
      bd: "Beheerdocumentatie",
      bp: "Best practice",
    },
  },

  sotdText: {
    nl: {
      sotd: "Status van dit document",
      def: `Dit is de definitieve versie van dit document. Wijzigingen naar aanleiding van consultaties zijn doorgevoerd.`,
      wv: `Dit is een werkversie die op elk moment kan worden gewijzigd, verwijderd of vervangen door andere documenten. Het is geen stabiel document.`,
      cv: `Dit is een consultatieversie.`,
      vv: `Dit is de definitieve conceptversie van dit document. Wijzigingen naar aanleiding van consultaties zijn doorgevoerd.`,
      basis: "Dit is een document zonder officiële status.",
      ld: "Dit is een levend document dat regelmatig gewijzigd wordt.",
    },

    en: {
      sotd: "Status of this document",
      def: `This is the definitive version of this document. Edits resulting from consultations have been applied.`,
      wv: `This is a working draft that can be changed, removed or replaced by other documents at any time. It is not a stable document.`,
      cv: `This is a stable draft, published for public comment.`,
      vv: `This is the final draft of this document. Edits resulting from consultations have been applied.`,
      basis: "This document has no official standing.",
      ld: "This is a living document, which is updated regularly.",
    },
  },

  labelColor: {
    def: "#bf1238",
    wv: "#c2d533",
    cv: "#00822e",
    vv: "#e8dd11",
    basis: "#535266",
    ld: "#2c2a3b",
  },

  useLabel: true,

  licenses: {
    cc0: {
      name: "Creative Commons 0 Public Domain Dedication",
      short: "CC0",
      url: "https://creativecommons.org/publicdomain/zero/1.0/",
      image: "https://gitdocumentatie.logius.nl/publicatie/respec/media/logos/cc-zero.svg",
    },

    "cc-by": {
      name: "Creative Commons Attribution 4.0 International Public License",
      short: "CC-BY",
      url: "https://creativecommons.org/licenses/by/4.0/legalcode",
      image: "https://gitdocumentatie.logius.nl/publicatie/respec/media/logos/cc-by.svg",
    },

    "cc-by-nd": {
      name: "Creative Commons Naamsvermelding-GeenAfgeleideWerken 4.0 Internationaal",
      short: "CC-BY-ND",
      url: "https://creativecommons.org/licenses/by-nd/4.0/legalcode.nl",
      image: "https://gitdocumentatie.logius.nl/publicatie/respec/media/logos/cc-by-nd.svg",
    },
  },

  license: "cc-by",

  localBiblio: {
    MIM12: {
      id: "MIM12",
      title: "MIM - Metamodel Informatie Modellering (Versie 1.2)",
      href: "https://docs.geostandaarden.nl/mim/def-st-mim-20240613/",
      status: "Definitief",
      publisher: "Geonovum",
      date: "2024-06-13",
    }
  }
};

