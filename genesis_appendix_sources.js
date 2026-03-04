const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Header, Footer,
  AlignmentType, HeadingLevel, PageBreak, PageNumber,
  BorderStyle, ExternalHyperlink
} = require("docx");

// ===== SOURCE APPENDIX GENERATOR =====
// Companion document to Genesis, Science, and the Human Soul
//
// PURPOSE: Preserve source references with metadata and archived excerpts.
// When an external link goes dark, add the relevant text to the "archived"
// field below and re-run this script to generate an updated appendix.
//
// LEGAL NOTES:
// - Pre-1928 works are public domain in the US (Gosse, Frazer, Irving, etc.)
// - Vatican and Council documents are public ecclesiastical texts
// - CCC text is published by the Holy See and widely reproduced
// - Scientific paper abstracts are generally fair use; full texts require permission
// - For copyrighted works, include only bibliographic data and brief fair-use excerpts

// ===== SOURCE REGISTRY =====
// status: "live" = external link works; "dark" = link is dead, see archived text
// archived: null = not yet cached; string = preserved excerpt for when link dies
// license: "public-domain", "ecclesiastical", "fair-use-excerpt", "copyrighted"

const sources = [
  // ===== MAGISTERIAL DOCUMENTS (Ecclesiastical — freely reproducible) =====
  {
    id: "DEI_FILIUS",
    title: "Dei Filius: Dogmatic Constitution on the Catholic Faith",
    author: "First Vatican Council",
    date: "April 24, 1870",
    url: "https://www.ewtn.com/catholicism/teachings/vatican-i-dogmatic-constitution-dei-filius-on-the-catholic-faith-241",
    altUrls: [
      "https://www.papalencyclicals.net/councils/ecum20.htm",
      "https://inters.org/Vatican-Council-I-Dei-Filius"
    ],
    license: "ecclesiastical",
    status: "live",
    keyExcerpts: [
      { section: "Chapter 2, Canon 1", text: "If anyone says that the one, true God, our creator and lord, cannot be known with certainty from the things that have been made, by the natural light of human reason: let him be anathema." },
      { section: "Chapter 4", text: "Since the same God who reveals mysteries and infuses faith has bestowed the light of reason on the human mind, God cannot deny himself, nor can truth ever contradict truth." },
      { section: "Chapter 1, Canon 5", text: "If anyone does not confess that the world and all things which are contained in it, both spiritual and material, as regards their whole substance, have been produced by God from nothing... let him be anathema." }
    ],
    archived: null
  },
  {
    id: "HUMANI_GENERIS",
    title: "Humani Generis: Encyclical Letter",
    author: "Pope Pius XII",
    date: "August 12, 1950",
    url: "https://www.vatican.va/content/pius-xii/en/encyclicals/documents/hf_p-xii_enc_12081950_humani-generis.html",
    altUrls: [
      "https://www.ewtn.com/catholicism/library/humani-generis-334",
      "https://www.papalencyclicals.net/pius12/p12human.htm"
    ],
    license: "ecclesiastical",
    status: "live",
    keyExcerpts: [
      { section: "36", text: "For these reasons the Teaching Authority of the Church does not forbid that, in conformity with the present state of human sciences and sacred theology, research and discussions, on the part of men experienced in both fields, take place with regard to the doctrine of evolution, in as far as it inquires into the origin of the human body as coming from pre-existent and living matter - for the Catholic faith obliges us to hold that souls are immediately created by God." },
      { section: "37", text: "When, however, there is question of another conjectural opinion, namely polygenism, the children of the Church by no means enjoy such liberty. For the faithful cannot embrace that opinion which maintains that either after Adam there existed on this earth true men who did not take their origin through natural generation from him as from the first parent of all, or that Adam represents a certain number of first parents." }
    ],
    archived: null
  },
  {
    id: "FIDES_ET_RATIO",
    title: "Fides et Ratio: Encyclical Letter",
    author: "Pope John Paul II",
    date: "September 14, 1998",
    url: "https://www.vatican.va/content/john-paul-ii/en/encyclicals/documents/hf_jp-ii_enc_14091998_fides-et-ratio.html",
    altUrls: [
      "https://www.ewtn.com/catholicism/library/fides-et-ratio-faith-and-reason-10246"
    ],
    license: "ecclesiastical",
    status: "live",
    keyExcerpts: [
      { section: "Introduction", text: "Faith and reason are like two wings on which the human spirit rises to the contemplation of truth." },
      { section: "4", text: "Philosophy and theology must maintain a legitimate autonomy... faith does not fear reason, but seeks it out and has trust in it." }
    ],
    archived: null
  },
  {
    id: "GAUDIUM_ET_SPES",
    title: "Gaudium et Spes: Pastoral Constitution on the Church in the Modern World",
    author: "Second Vatican Council",
    date: "December 7, 1965",
    url: "https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_const_19651207_gaudium-et-spes_en.html",
    altUrls: [],
    license: "ecclesiastical",
    status: "live",
    keyExcerpts: [
      { section: "12", text: "According to the almost unanimous opinion of believers and unbelievers alike, all things on earth should be related to man as their center and crown." }
    ],
    archived: null
  },
  {
    id: "TRENT_V",
    title: "Decree Concerning Original Sin (Session V)",
    author: "Council of Trent",
    date: "June 17, 1546",
    url: "https://www.ewtn.com/catholicism/library/decree-concerning-original-sin-1503",
    altUrls: [
      "https://www.papalencyclicals.net/councils/trent/fifth-session.htm"
    ],
    license: "ecclesiastical",
    status: "live",
    keyExcerpts: [
      { section: "Canon 3", text: "Original sin is in its origin one, and being transfused into all by propagation, not by imitation, is in each one as his own." }
    ],
    archived: null
  },
  {
    id: "CCC",
    title: "Catechism of the Catholic Church, Second Edition",
    author: "Holy See",
    date: "1994",
    url: "https://www.vatican.va/archive/ENG0015/_INDEX.HTM",
    altUrls: [
      "http://www.scborromeo.org/ccc.htm"
    ],
    license: "ecclesiastical",
    status: "live",
    keyExcerpts: [
      { section: "36", text: "Our holy mother, the Church, holds and teaches that God, the first principle and last end of all things, can be known with certainty from the created world by the natural light of human reason." },
      { section: "356", text: "Of all visible creatures only man is able to know and love his creator." },
      { section: "365", text: "The unity of soul and body is so profound that one has to consider the soul to be the form of the body." },
      { section: "366", text: "The Church teaches that every spiritual soul is created immediately by God - it is not produced by the parents." },
      { section: "390", text: "The account of the fall in Genesis 3 uses figurative language, but affirms a primeval event, a deed that took place at the beginning of the history of man." },
      { section: "404", text: "By yielding to the tempter, Adam and Eve committed a personal sin, but this sin affected the human nature that they would then transmit in a fallen state." }
    ],
    archived: null
  },

  // ===== PUBLIC DOMAIN BOOKS (Pre-1928, freely reproducible) =====
  {
    id: "GOSSE",
    title: "Omphalos: An Attempt to Untie the Geological Knot",
    author: "Gosse, Philip Henry",
    date: "1857",
    url: "https://archive.org/details/omphalosattemptt00goss",
    altUrls: [
      "https://www.gutenberg.org/ebooks/39910"
    ],
    license: "public-domain",
    status: "live",
    keyExcerpts: [],
    archived: null
  },
  {
    id: "FRAZER",
    title: "Folklore in the Old Testament: Studies in Comparative Religion, Legend, and Law",
    author: "Frazer, James George",
    date: "1918",
    url: "https://archive.org/details/folkloreinoldtes01fraz_1",
    altUrls: [],
    license: "public-domain",
    status: "live",
    keyExcerpts: [],
    archived: null
  },
  {
    id: "IRVING",
    title: "A History of the Life and Voyages of Christopher Columbus",
    author: "Irving, Washington",
    date: "1828",
    url: "https://archive.org/details/ahistorylifeand08irvigoog",
    altUrls: [],
    license: "public-domain",
    status: "live",
    keyExcerpts: [],
    archived: null
  },
  {
    id: "AUGUSTINE",
    title: "De Genesi ad Litteram (The Literal Meaning of Genesis)",
    author: "Augustine of Hippo",
    date: "c. 415 AD",
    url: "https://www.newadvent.org/fathers/1407.htm",
    altUrls: [],
    license: "public-domain",
    status: "live",
    keyExcerpts: [],
    archived: null
  },
  {
    id: "AQUINAS",
    title: "Summa Theologica, Prima Pars, Question 2, Article 3",
    author: "Thomas Aquinas",
    date: "c. 1270",
    url: "https://www.newadvent.org/summa/1002.htm#article3",
    altUrls: [],
    license: "public-domain",
    status: "live",
    keyExcerpts: [],
    archived: null
  },
  {
    id: "CE_DELUGE",
    title: "Deluge (Catholic Encyclopedia, Vol. 4)",
    author: "Maas, Anthony",
    date: "1908",
    url: "https://www.newadvent.org/cathen/04702a.htm",
    altUrls: [],
    license: "public-domain",
    status: "live",
    keyExcerpts: [],
    archived: null
  },

  // ===== SCIENTIFIC PAPERS (DOI links — fair use excerpts only) =====
  {
    id: "HU_2023",
    title: "Genomic Inference of a Severe Human Bottleneck During the Early to Middle Pleistocene Transition",
    author: "Hu, Haipeng, et al.",
    date: "2023",
    url: "https://doi.org/10.1126/science.abq7487",
    altUrls: [],
    license: "copyrighted",
    status: "live",
    keyExcerpts: [
      { section: "Abstract", text: "Population size history is essential for understanding human evolution. We used a fast infinitesimal time coalescent process model to estimate ancient population dynamics and identified a severe bottleneck in human ancestors from about 930,000 to 813,000 years ago." }
    ],
    archived: null
  },
  {
    id: "EPICA",
    title: "Eight Glacial Cycles from an Antarctic Ice Core",
    author: "EPICA Community Members",
    date: "2004",
    url: "https://doi.org/10.1038/nature02599",
    altUrls: [],
    license: "copyrighted",
    status: "live",
    keyExcerpts: [],
    archived: null
  },
  {
    id: "HOFFMANN",
    title: "U-Th Dating of Carbonate Crusts Reveals Neandertal Origin of Iberian Cave Art",
    author: "Hoffmann, D.L., et al.",
    date: "2018",
    url: "https://doi.org/10.1126/science.aap7778",
    altUrls: [],
    license: "copyrighted",
    status: "live",
    keyExcerpts: [],
    archived: null
  },
  {
    id: "KEMP_2011",
    title: "Science, Theology, and Monogenesis",
    author: "Kemp, Kenneth W.",
    date: "2011",
    url: "https://doi.org/10.5840/acpq201185213",
    altUrls: [],
    license: "copyrighted",
    status: "live",
    keyExcerpts: [],
    archived: null
  },
  {
    id: "ENCODE",
    title: "An integrated encyclopedia of DNA elements in the human genome",
    author: "ENCODE Project Consortium",
    date: "2012",
    url: "https://doi.org/10.1038/nature11247",
    altUrls: [],
    license: "copyrighted",
    status: "live",
    keyExcerpts: [],
    archived: null
  },

  // ===== CATHOLIC WEBSITES (May go dark — archive when possible) =====
  {
    id: "ITC_2004",
    title: "Communion and Stewardship: Human Persons Created in the Image of God",
    author: "International Theological Commission",
    date: "2004",
    url: "https://www.vatican.va/roman_curia/congregations/cfaith/cti_documents/rc_con_cfaith_doc_20040723_communion-stewardship_en.html",
    altUrls: [],
    license: "ecclesiastical",
    status: "live",
    keyExcerpts: [
      { section: "63", text: "According to the widely accepted scientific account, the universe erupted 15 billion years ago in an explosion called the Big Bang and has been expanding and cooling ever since." },
      { section: "69", text: "Virtually all, if not all, parsimony arguments based on molecular biology and genomics suggest a common ancestry of living organisms." }
    ],
    archived: null
  },
  {
    id: "SCS",
    title: "Q6: How Do Adam and Eve Fit in with Evolution and the Science of Human Origins?",
    author: "Society of Catholic Scientists",
    date: "2022",
    url: "https://www.catholicscientists.org/common-questions/adam-and-eve",
    altUrls: [],
    license: "fair-use-excerpt",
    status: "live",
    keyExcerpts: [],
    archived: null
  },
  {
    id: "KOLBE",
    title: "Creation, Evolution, and Catholicism",
    author: "Owen, Hugh, and the Kolbe Center",
    date: "2000ff.",
    url: "https://kolbecenter.org/",
    altUrls: [],
    license: "fair-use-excerpt",
    status: "live",
    keyExcerpts: [],
    archived: null
  },
  {
    id: "CA_YEC",
    title: "Can Catholics Believe in a Young Earth?",
    author: "Catholic Answers",
    date: null,
    url: "https://www.catholic.com/magazine/print-edition/the-six-days-of-creation",
    altUrls: [],
    license: "fair-use-excerpt",
    status: "live",
    keyExcerpts: [],
    archived: null
  },
  {
    id: "PBC_1909",
    title: "De charactere historico trium priorum capitum Geneseos",
    author: "Pontifical Biblical Commission",
    date: "June 30, 1909",
    url: "http://catholicapologetics.info/scripture/oldtestament/commission.htm",
    altUrls: [],
    license: "ecclesiastical",
    status: "live",
    keyExcerpts: [],
    archived: null
  }
];

// ===== DOCUMENT GENERATION =====

const t = (text, opts = {}) => new TextRun({ text, size: 24, font: "Georgia", ...opts });
const tb = (text) => new TextRun({ text, size: 24, font: "Georgia", bold: true });
const ti = (text) => new TextRun({ text, size: 24, font: "Georgia", italics: true });

const heading1 = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_1,
  children: [new TextRun(text)],
  spacing: { before: 360, after: 200 }
});

const heading2 = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_2,
  children: [new TextRun(text)],
  spacing: { before: 280, after: 160 }
});

const para = (runs, opts = {}) => new Paragraph({
  children: Array.isArray(runs) ? runs : [new TextRun(runs)],
  spacing: { after: 200, line: 276 },
  ...opts
});

const link = (text, url) => new ExternalHyperlink({
  children: [new TextRun({ text, size: 24, font: "Georgia", color: "0563C1", underline: { type: "single" } })],
  link: url
});

const content = [];

// Title page
content.push(new Paragraph({ spacing: { before: 2400 }, children: [] }));
content.push(para([new TextRun({ text: "Source Appendix", size: 52, bold: true, font: "Georgia" })], { alignment: AlignmentType.CENTER }));
content.push(para([new TextRun({ text: "Genesis, Science, and the Human Soul", size: 36, italics: true, font: "Georgia" })], { alignment: AlignmentType.CENTER }));
content.push(new Paragraph({ spacing: { before: 400 }, children: [] }));
content.push(para([new TextRun({ text: "Archived References and Key Excerpts", size: 28, font: "Georgia" })], { alignment: AlignmentType.CENTER }));
content.push(new Paragraph({ children: [new PageBreak()] }));

// Introduction
content.push(heading1("About This Appendix"));
content.push(para([
  t("This companion document preserves key source references and excerpts for "),
  ti("Genesis, Science, and the Human Soul"),
  t(". External links can go dark at any time. When a source URL becomes unavailable, its status is updated to \u201Cdark\u201D and the archived text (where legally permitted) is included here.")
]));
content.push(para([
  tb("License categories: "),
  t("Sources marked \u201Cecclesiastical\u201D are public Church documents freely reproducible. Sources marked \u201Cpublic-domain\u201D are pre-1928 works with no copyright restriction in the US. Sources marked \u201Ccopyrighted\u201D include only bibliographic data and brief fair-use excerpts (abstracts, single quoted passages). Sources marked \u201Cfair-use-excerpt\u201D include only short quotations used for commentary and criticism.")
]));

content.push(new Paragraph({ children: [new PageBreak()] }));

// Group sources by category
const categories = [
  { key: "ecclesiastical", title: "Magisterial and Ecclesiastical Documents" },
  { key: "public-domain", title: "Public Domain Works (Pre-1928)" },
  { key: "copyrighted", title: "Scientific Papers (Bibliographic Data and Abstracts)" },
  { key: "fair-use-excerpt", title: "Other Sources (Fair Use Excerpts)" }
];

for (const cat of categories) {
  const catSources = sources.filter(s => s.license === cat.key);
  if (catSources.length === 0) continue;

  content.push(heading1(cat.title));

  for (const src of catSources) {
    // Source heading
    content.push(heading2(`${src.id}: ${src.title}`));

    // Metadata
    const metaRuns = [
      tb("Author: "), t(src.author + "  "),
    ];
    if (src.date) {
      metaRuns.push(tb("Date: "), t(src.date + "  "));
    }
    content.push(para(metaRuns));

    // Status indicator
    const statusText = src.status === "live"
      ? "LIVE \u2014 External link active"
      : "DARK \u2014 External link unavailable; see archived text below";
    content.push(para([
      tb("Status: "),
      t(statusText, { color: src.status === "live" ? "2d7d2d" : "cc3333" })
    ]));

    // Primary URL
    const urlRuns = [tb("Primary URL: "), link(src.url, src.url)];
    content.push(para(urlRuns));

    // Alternate URLs
    if (src.altUrls.length > 0) {
      const altRuns = [tb("Alternate URLs: ")];
      src.altUrls.forEach((alt, i) => {
        if (i > 0) altRuns.push(t(" | "));
        altRuns.push(link(alt, alt));
      });
      content.push(para(altRuns));
    }

    // Key excerpts
    if (src.keyExcerpts.length > 0) {
      content.push(para([tb("Key Excerpts Referenced in Main Document:")]));
      for (const excerpt of src.keyExcerpts) {
        content.push(para([
          tb(`[${excerpt.section}] `),
          t(`\u201C${excerpt.text}\u201D`)
        ], { indent: { left: 360 } }));
      }
    }

    // Archived full text (for when links go dark)
    if (src.archived) {
      content.push(para([
        tb("Archived Text (link was dark as of archival date):"),
      ]));
      content.push(para([t(src.archived)], {
        indent: { left: 360 },
        border: { left: { style: BorderStyle.SINGLE, size: 2, color: "999999", space: 8 } }
      }));
    }

    content.push(para([])); // spacer
  }

  content.push(new Paragraph({ children: [new PageBreak()] }));
}

// Instructions for maintaining this appendix
content.push(heading1("Maintenance Instructions"));
content.push(para([
  tb("When an external link goes dark:"),
]));
content.push(para([
  t("1. In this file (genesis_appendix_sources.js), find the source entry by its ID.")
], { indent: { left: 360 } }));
content.push(para([
  t("2. Change its status from \"live\" to \"dark\".")
], { indent: { left: 360 } }));
content.push(para([
  t("3. If the source is public-domain or ecclesiastical, paste the full text into the \"archived\" field.")
], { indent: { left: 360 } }));
content.push(para([
  t("4. If the source is copyrighted, add only the abstract or a brief fair-use excerpt.")
], { indent: { left: 360 } }));
content.push(para([
  t("5. Check altUrls first \u2014 the source may still be available at an alternate location.")
], { indent: { left: 360 } }));
content.push(para([
  t("6. Re-run: node genesis_appendix_sources.js")
], { indent: { left: 360 } }));
content.push(para([
  t("7. The updated appendix will be generated with the archived text included.")
], { indent: { left: 360 } }));

content.push(para([]));
content.push(para([
  tb("To check all links programmatically:"),
]));
content.push(para([
  t("Run the following in a terminal (requires curl):")
], { indent: { left: 360 } }));
content.push(para([
  t("node -e \"const s = require('./genesis_appendix_sources.js'); // export sources for link checking\"", { font: "Courier New", size: 20 })
], { indent: { left: 360 } }));
content.push(para([
  t("Or manually visit each URL periodically and update status fields as needed.")
], { indent: { left: 360 } }));

// Build document
const doc = new Document({
  styles: {
    default: {
      document: { run: { font: "Georgia", size: 24 } }
    },
    paragraphStyles: [
      {
        id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 36, bold: true, font: "Georgia", color: "1a1a2e" },
        paragraph: { spacing: { before: 360, after: 240 }, outlineLevel: 0 }
      },
      {
        id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 30, bold: true, font: "Georgia", color: "2d3436" },
        paragraph: { spacing: { before: 280, after: 180 }, outlineLevel: 1 }
      }
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
      }
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Source Appendix \u2014 Genesis, Science, and the Human Soul", italics: true, size: 18, font: "Georgia", color: "888888" })],
          border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC", space: 4 } }
        })]
      })
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ children: [PageNumber.CURRENT], size: 20, font: "Georgia" })],
          border: { top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC", space: 4 } }
        })]
      })
    },
    children: content
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("Genesis_Source_Appendix.docx", buffer);
  console.log("Source appendix created: Genesis_Source_Appendix.docx");
  console.log(`Total sources: ${sources.length}`);
  console.log(`Live: ${sources.filter(s => s.status === "live").length}`);
  console.log(`Dark: ${sources.filter(s => s.status === "dark").length}`);
  console.log(`With archived text: ${sources.filter(s => s.archived).length}`);
});
