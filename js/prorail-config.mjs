// Dit bestand is gepubliceerd als
// https://improrail.github.io/respec-assets/js/prorail-config.mjs
// voor hergebruik in IMProRail ReSpec-documenten.

const organisationConfig = {
  nl_organisationName: "ProRail",
  nl_organisationStylesURL: "https://improrail.github.io/respec-assets/style/",
  nl_organisationPublishURL: "https://improrail.github.io/docs/",

  logos: [{
    src: "https://www.prorail.nl/static/assets/brands/default/images/logo_default.svg?v=20250513",
    alt: "ProRail",
    id: "ProRail",
    height: 29,
    width: 130,
    url: "https://www.prorail.nl/"
  }],

  useLogo: true,

  fileName: "",
  latestVersion: [
    "nl_organisationPublishURL",
    "pubDomain",
    "/",
    "shortName",
    "/",
    "fileName"
  ],
  thisVersion: [
    "nl_organisationPublishURL",
    "pubDomain",
    "/",
    "shortName",
    "/",
    "publishVersion",
    "/",
    "fileName"
  ],
  prevVersion: [
    "nl_organisationPublishURL",
    "pubDomain",
    "/",
    "shortName",
    "/",
    "previousPublishVersion",
    "/",
    "fileName"
  ],

  addSectionLinks: true,

  acceptedDomains: [
    "respec",
    "rttp",
    "cm",
  ],

  localizationStrings: {
    en: {
      wv: "Editor's draft",
      cv: "Candidate recommendation",
      vv: "Proposed recommendation",
      def: "Recommendation",
      ld: "Living document",
      basis: "Document",

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
      def: "Dit is de definitieve versie van dit document. Wijzigingen naar aanleiding van consultaties zijn doorgevoerd.",
      wv: "Dit is een werkversie die op elk moment kan worden gewijzigd, verwijderd of vervangen door andere documenten. Het is geen stabiel document.",
      cv: "Dit is een consultatieversie.",
      vv: "Dit is de definitieve conceptversie van dit document. Wijzigingen naar aanleiding van consultaties zijn doorgevoerd.",
      basis: "Dit is een document zonder officiële status.",
      ld: "Dit is een levend document dat regelmatig gewijzigd wordt.",
    },

    en: {
      sotd: "Status of this document",
      def: "This is the definitive version of this document. Edits resulting from consultations have been applied.",
      wv: "This is a working draft that can be changed, removed or replaced by other documents at any time. It is not a stable document.",
      cv: "This is a stable draft, published for public comment.",
      vv: "This is the final draft of this document. Edits resulting from consultations have been applied.",
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


function prependSectionToBodyAndCreateIfNotExists(document, sectionId) {
  let section = document.getElementById(sectionId);

  if (section === null) {
    section = document.createElement("section");
    section.id = sectionId;
  }

  section.classList.add("introductory");
  document.body.prepend(section);
}


function missingOrIsEmpty(value) {
  return value === undefined || value.length === 0;
}


/**
 * Laadt ReSpec met een documentspecifieke configuratie.
 *
 * De standaardwaarden uit organisationConfig worden gecombineerd
 * met de configuratie van het betreffende IMProRail-document.
 *
 * In index.html:
 *
 * js/config.mjsscript>
 *
 * In js/config.mjs:
 *
 * import { loadRespecWithConfiguration } from
 *   "https://improrail.github.io/respec-assets/js/prorail-config.mjs";
 *
 * loadRespecWithConfiguration({
 *   // documentspecifieke configuratie
 * });
 *
 * @param {Object} localConfig Configuratie specifiek voor het document.
 */
export function loadRespecWithConfiguration(localConfig) {
  const respecConfig = {
    ...organisationConfig,
    ...localConfig,
  };

  // acceptedDomains kan per document worden overschreven.
  respecConfig.acceptedDomains =
    localConfig.acceptedDomains ?? organisationConfig.acceptedDomains;

  // Combineer centrale en lokale bibliografiereferenties.
  respecConfig.localBiblio = {
    ...organisationConfig.localBiblio,
    ...localConfig.localBiblio,
  };

  respecConfig.preProcess = [
    ...(localConfig.preProcess || []),

    (config, document, utils) => {
      if (!config.acceptedDomains.includes(config.pubDomain)) {
        utils.showError(
          `Invalid pubDomain. Must be one of ${config.acceptedDomains.join(", ")}, but was "${config.pubDomain}"`
        );
      }

      if (!/^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(config.shortName)) {
        utils.showError(
          `Invalid shortName. Must be in kebab-case, but was "${config.shortName}"`
        );
      }

      if (missingOrIsEmpty(config.github)) {
        utils.showError(
          "No GitHub repository specified in configuration."
        );
      }

      if (missingOrIsEmpty(config.editors)) {
        utils.showError(
          "No editors specified in configuration."
        );
      }

      if (missingOrIsEmpty(config.authors)) {
        utils.showError(
          "No authors specified in configuration."
        );
      }

      for (const person of [
        ...(config.editors || []),
        ...(config.authors || [])
      ]) {
        if (!("companyURL" in person)) {
          continue;
        }

        if (
          person.companyURL.includes("prorail.nl") &&
          person.companyURL !== "https://www.prorail.nl"
        ) {
          utils.showError(
            `companyURL of a ProRail editor/author must be "https://www.prorail.nl", instead it was "${person.companyURL}"`
          );
        }

        if (person.companyURL.includes("github.com")) {
          utils.showError(
            `companyURL of an editor/author must link to the website of an organisation, not GitHub. It was "${person.companyURL}".`
          );
        }
      }
    },

    (config, document) => {
      // Secties worden toegevoegd in omgekeerde volgorde.
      prependSectionToBodyAndCreateIfNotExists(
        document,
        "conformance"
      );

      prependSectionToBodyAndCreateIfNotExists(
        document,
        "sotd"
      );
    },

    (config, document, utils) => {
      if (!config.alternateFormats) {
        config.alternateFormats = [];
      }

      const pdfName =
        `${config.pubDomain}-${config.shortName.replace(/\//, "-")}-${config.publishVersion}.pdf`;

      const existingFormat = config.alternateFormats.find(
        format => format.label.toLowerCase() === "pdf"
      );

      if (existingFormat) {
        if (existingFormat.uri !== pdfName) {
          utils.showError(
            `Invalid name for PDF format. Expected "${pdfName}", but got "${existingFormat.uri}". Consider removing the PDF format from config.alternateFormats, as it is automatically generated already.`
          );
        }

        return;
      }

      config.alternateFormats.push({
        label: "PDF",
        uri: pdfName,
      });
    }
  ];

  respecConfig.postProcess = [
    ...(localConfig.postProcess || []),

    (config, document) => {
      if (!config.spellcheck) {
        return;
      }

      const removableElements = [
        document.querySelector(".head"),
        document.getElementById("references"),
        ...document.getElementsByClassName("bibref"),
        ...document.querySelectorAll("[data-cite]"),
        ...document.getElementsByClassName("remove-for-spellcheck"),
      ];

      for (const element of removableElements) {
        element?.remove();
      }
    }
  ];

  // Maak de configuratie beschikbaar voor ReSpec.
  globalThis.respecConfig = respecConfig;

  // Laad de NLGov ReSpec-build als klassiek script.
  // Dit voorkomt de CORS-beperking van een dynamische ES-module-import.
  const script = document.createElement("script");
  script.src =
    "https://gitdocumentatie.logius.nl/publicatie/respec/builds/respec-nlgov.js";
  script.className = "remove";
  script.async = true;

  document.head.appendChild(script);
}
