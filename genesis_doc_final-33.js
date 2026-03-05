const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Header, Footer,
  AlignmentType, HeadingLevel, PageBreak, PageNumber,
  BorderStyle, TabStopType, TabStopPosition,
  PositionalTab, PositionalTabAlignment, PositionalTabRelativeTo, PositionalTabLeader,
  LevelFormat, ExternalHyperlink
} = require("docx");

// Helper functions
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

const heading3 = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_3,
  children: [new TextRun(text)],
  spacing: { before: 240, after: 120 }
});

const para = (runs, opts = {}) => new Paragraph({
  children: Array.isArray(runs) ? runs : [new TextRun(runs)],
  spacing: { after: 200, line: 276 },
  ...opts
});

const t = (text, opts = {}) => new TextRun({ text, size: 24, font: "Georgia", ...opts });
const tb = (text, opts = {}) => new TextRun({ text, size: 24, font: "Georgia", bold: true, ...opts });
const ti = (text, opts = {}) => new TextRun({ text, size: 24, font: "Georgia", italics: true, ...opts });
const tbi = (text, opts = {}) => new TextRun({ text, size: 24, font: "Georgia", bold: true, italics: true, ...opts });
const sup = (text) => new TextRun({ text, size: 20, font: "Georgia", superScript: true });

const spacer = () => new Paragraph({ children: [], spacing: { after: 100 } });

const pageBreak = () => new Paragraph({ children: [new PageBreak()] });

// Build all content
const content = [];

// ===== TITLE PAGE =====
content.push(new Paragraph({ children: [], spacing: { before: 4000 } }));
content.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  children: [new TextRun({ text: "GENESIS, SCIENCE, AND THE HUMAN SOUL", size: 52, bold: true, font: "Georgia" })]
}));
content.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 300 },
  children: [new TextRun({ text: "Reconciling Catholic Teaching on Human Origins", size: 32, font: "Georgia" })]
}));
content.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 200 },
  children: [new TextRun({ text: "with Modern Genetics, Paleoanthropology, and the Fossil Record", size: 32, font: "Georgia" })]
}));
content.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 600 },
  children: [new TextRun({ text: "A Working Synthesis", size: 28, italics: true, font: "Georgia" })]
}));
content.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 400 },
  children: [new TextRun({ text: "A Biblical view of Creation, read through the full witness of Scripture,", size: 24, font: "Georgia" })]
}));
content.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 100 },
  children: [new TextRun({ text: "the teachings of the Catholic Church, and the evidence of God\u2019s creation itself", size: 24, font: "Georgia" })]
}));
content.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 2000 },
  children: [new TextRun({ text: "2026", size: 24, font: "Georgia" })]
}));
content.push(pageBreak());

// ===== QUICK REFERENCE: THE ARGUMENT IN BRIEF =====
content.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 2000, after: 600 },
  children: [new TextRun({ text: "THE ARGUMENT IN ONE SENTENCE", size: 28, bold: true, font: "Georgia" })]
}));

content.push(para([
  ti("Adam and Eve were real, ensouled by God, ancestors of all humanity\u2014and the scientific evidence for deep time, genetics, and the fossil record does not contradict this, because Catholic teaching defines what happened theologically while leaving the natural history open.")
]));

content.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 600, after: 400 },
  children: [new TextRun({ text: "THE ARGUMENT IN BRIEF", size: 28, bold: true, font: "Georgia" })]
}));

content.push(para([
  ti("Adam and Eve were real, ensouled by God, ancestors of all humanity\u2014and the scientific evidence for deep time, genetics, and the fossil record does not contradict this, because Catholic teaching defines what happened theologically while leaving the natural history open."),
  t(" That is the core claim of this document. Here is how it works:")
]));

content.push(para([
  t("The Catholic Church requires belief in a real Adam and Eve, a real Fall, and the direct creation of every human soul by God. She does not require belief in a young earth, nor does she require belief in an old one. The age of the earth is not defined by any council, encyclical, or ex cathedra statement. Both positions are permitted; neither is heretical.")
]));

content.push(para([
  t("This document argues that the scientific evidence for deep time\u2014ice cores, tree rings, coral reefs, continental drift, genetics\u2014is substantial and convergent, and that it is very difficult to set aside without invoking ad hoc miracles that raise their own theological problems. At the same time, it argues that the theological claims of the Church\u2014a real first couple, a real ensoulment, a real Fall, real original sin transmitted to all descendants\u2014are non-negotiable and must be preserved in any faithful synthesis.")
]));

content.push(para([
  t("The proposed framework: God prepared a biological substrate over deep time\u2014hominids increasingly resembling modern humans in body but lacking rational souls. At a specific moment, God ensouled two of these hominids, making them the first true human beings: Adam and Eve. Their descendants, bearing rational souls, intermarried with the surrounding non-ensouled population (as permitted under pre-Mosaic conditions), and within generations all living hominids carried both the biological lineage and the ensouled lineage of Adam and Eve. This accounts for genetic diversity without abandoning monogenism, explains the fossil record without denying theology, and preserves every dogmatic requirement the Church has defined.")
]));

content.push(para([
  t("The framework is not a proof. It is a working synthesis\u2014an attempt to show that faith and science are not at war, and that a Catholic can look honestly at the evidence of God\u2019s creation without fearing what it reveals.")
]));

content.push(pageBreak());

// ===== TABLE OF CONTENTS =====
content.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 400 },
  children: [new TextRun({ text: "TABLE OF CONTENTS", size: 32, bold: true, font: "Georgia" })]
}));

const tocEntries = [
  "Chapter 1: The Problem and the Promise",
  "Chapter 2: The Case for a Young Earth\u2014Stated Fairly",
  "Chapter 3: The Crux\u2014Why This Document Parts Ways with the Young Earth Position",
  "Chapter 4: Existing Models\u2014Their Strengths and Limitations",
  "Chapter 5: Augros and Stanciu\u2014The New Biology and Latent Potential",
  "Chapter 6: The Hominid Family Tree\u2014Who Are These Cousins?",
  "Chapter 7: The Synthesis\u2014A Proposed Framework",
  "Chapter 8: The Cain and Abel Problem",
  "Chapter 9: The Genetic Diversity Problem\u2014Honestly Addressed",
  "Chapter 10: The Hard Problem of Consciousness\u2014The Strongest Argument",
  "Chapter 11: Original Sin and the Nature of the Fall",
  "Chapter 12: The Bottleneck, the Flood, and the Memory of Near-Extinction",
  "Chapter 13: What a Scientist Would Say\u2014An Honest Assessment",
  "Chapter 14: The Framework Summarized",
  "Chapter 15: Acknowledged Weaknesses and Open Questions",
  "References and Further Reading",
  "Index of Key Terms and Persons"
];

tocEntries.forEach(title => {
  content.push(new Paragraph({
    spacing: { before: 80, after: 80 },
    indent: { left: 360 },
    children: [
      new TextRun({ text: title, font: "Georgia", size: 24 })
    ]
  }));
});

content.push(pageBreak());

// ===== INTRODUCTION =====
content.push(heading1("Chapter 1: The Problem and the Promise"));

content.push(para([
  t("For centuries, the opening chapters of Genesis have stood at the center of a seemingly irreconcilable conflict between faith and science. On one side, Catholic teaching holds that Adam and Eve were real, historical individuals\u2014the first true humans, from whom every human being descends, and through whom original sin entered the world. On the other side, modern genetics, paleoanthropology (the study of ancient human ancestors through fossils and archaeology), and the fossil record present a picture of human origins that appears to challenge these claims at every turn: populations of thousands, not a single pair; timescales of hundreds of thousands of years, not six thousand; a branching family tree of hominid species (the broader family of upright-walking primates that includes modern humans and our extinct relatives like Neanderthals), not a single created couple in a garden.")
]));

content.push(para([
  t("This document attempts something ambitious but, we believe, intellectually honest: a synthesis that takes both Catholic theology and modern science seriously, without reducing either to the other. It is not a proof. It is not a catechism. It is a working framework\u2014an attempt to show that the apparent contradictions between Genesis and the fossil record are not as absolute as either side often assumes, and that a coherent account of human origins can honor both the theological claims of the Church and the empirical discoveries of science.")
]));

content.push(para([
  t("A word about what this document is and is not. This is a Biblical view of creation. It affirms everything that Genesis teaches: that God is the Creator of all things visible and invisible, that He created the heavens and the earth, that He created man in His own image, that Adam and Eve were real historical persons, that original sin is real and transmitted through descent, and that every human soul is created directly by God. It does not treat Genesis as myth, metaphor, or outdated pre-scientific literature. It treats Genesis as divinely inspired Sacred Scripture that reveals truths about God, creation, and the human person that science alone cannot discover. Where it departs from some readings of Genesis is in asking what the sacred author intended to teach and how the Church has understood that teaching across two millennia\u2014a question that, as we will see, the Church Fathers themselves did not answer unanimously. Readers who hold a young earth position should know that this document takes their arguments seriously, tries to present them at their strongest, and explains in detail why it ultimately takes a different path. But it does so from a shared foundation: the absolute authority of Scripture, the binding teachings of the Catholic Church, and the conviction that all truth\u2014whether discovered in the Bible or in the Book of Nature\u2014comes from the same God and cannot ultimately contradict itself.")
]));

content.push(para([
  t("The framework presented here draws on the work of numerous scholars\u2014computational biologist S. Joshua Swamidass, philosopher Kenneth Kemp, physicist and philosopher George Stanciu and Robert Augros, theologian William Lane Craig, and others\u2014while departing from each of them in significant ways. Where weaknesses exist, they are acknowledged. Where the evidence is ambiguous, we say so. The goal is not to win an argument but to open a conversation.")
]));

content.push(para([
  t("A word about the spirit of this inquiry. Pope St. John Paul II, in his encyclical "),
  ti("Fides et Ratio"),
  t(" (1998), described faith and reason as \u201Clike two wings on which the human spirit rises to the contemplation of truth.\u201D"),
  sup("1"),
  t(" The encyclical warns against two opposite errors that are directly relevant to the debate over human origins. The first is fideism\u2014the position that faith alone is sufficient and that reason is irrelevant or dangerous to belief. The second is rationalism or scientism\u2014the position that empirical science is the only valid path to knowledge, and that what science cannot measure does not exist. The Church rejects both. This document is written in the conviction that faith needs reason and reason needs faith\u2014and that all sides of this debate sometimes forget this. Within the Church, the young earth advocate who dismisses radiometric dating, the fossil record, and the genetic evidence can appear\u2014to old earth Catholics\u2014to have set reason aside in the name of a particular reading of Genesis, abandoning the Catholic intellectual tradition that produced Albertus Magnus (the Dominican friar whose thirteenth-century work in natural science earned him the title Doctor Universalis), Gregor Mendel (the Augustinian monk who founded modern genetics), and Georges Lema\u00eetre (the Catholic priest who first proposed what became the Big Bang theory). The old earth advocate who treats the early chapters of Genesis as dispensable poetry, or who speaks of Adam and Eve as though their historical reality is a quaint embarrassment, can appear\u2014to young earth Catholics\u2014to have surrendered the faith to the reigning scientific consensus, keeping the label \u201CCatholic\u201D while quietly emptying it of content. Both perceptions contain some truth. Both are sometimes unfair. And beyond the Church, the scientist or philosopher who dismisses the possibility of an immaterial soul, or who insists that consciousness must ultimately reduce to physics, has not followed the evidence to its conclusion but has adopted a philosophical assumption that the scientific method itself cannot justify. As Chapter 10 of this document will argue, the hard problem of consciousness is not a gap waiting to be filled by future research; it is an explanatory boundary that materialism cannot cross. If this document succeeds, it will be because it takes both wings seriously\u2014honoring the full witness of Scripture and the binding teachings of the Church while also honoring the evidence that God has written into His own creation, and offering to the honest inquirer outside the faith a reason to consider that the Catholic account of the human person answers questions that science alone cannot even properly frame.")
]));

content.push(para([
  t("What follows is structured as an exploration. Each section takes a major question\u2014the age of the earth, the origin of Adam and Eve, the genetic diversity problem, the identity of the \u201Cother people\u201D in Genesis, the nature of Neanderthals and Denisovans, the origin of consciousness\u2014and works through the evidence, the objections, and the possibilities. The tone is intended to be readable rather than academic, though the substance is drawn from serious scholarship and peer-reviewed science.")
]));

content.push(pageBreak());


// ===== CHAPTER 2: THE CASE FOR A YOUNG EARTH =====
content.push(heading1("Chapter 2: The Case for a Young Earth\u2014Stated Fairly"));

content.push(para([
  t("The question of the earth\u2019s age stands at the threshold of any serious discussion of human origins. It deserves more than a simple paragraph. The young earth position is held sincerely by many faithful Christians, and intellectual honesty requires that we present it at its strongest before explaining why this document takes a different path.")
]));

content.push(heading2("The Case for a Young Earth, Stated Fairly"));

content.push(para([
  t("The young earth position rests on several arguments that deserve serious engagement. We try to present them here at their strongest.")
]));

content.push(para([
  t("First, the most natural reading of Genesis 1 describes six days of creation. The Hebrew word "),
  ti("yom"),
  t(" is used with the formula \u201Cthere was evening and there was morning, the Xth day\u201D\u2014a construction that, everywhere else in the Old Testament, refers to an ordinary calendar day. "),
  tb("Exodus 20:11 (NABRE)"),
  t(" grounds the Sabbath commandment in this six-day pattern: \u201CFor in six days the Lord made heaven and earth, the sea, and all that is in them, and rested on the seventh day.\u201D Young earth advocates argue that if the days of Genesis are not literal days, this commandment loses its grounding\u2014the pattern of six days of work followed by one day of rest only makes sense, they contend, if God actually worked for six ordinary days and rested on the seventh. Those who hold a non-literal view of the days respond that the commandment\u2019s force lies in the pattern of work and rest itself\u2014six units of labor followed by one of rest\u2014and that this pattern retains its meaning whether the original \u201Cdays\u201D were twenty-four hours, ages, or a literary framework. The reader must weigh both arguments.")
]));

content.push(para([
  t("Second, the genealogies of Genesis 5 and 11 provide specific ages for each patriarch, and when added together they yield a timeline of approximately six thousand years from Adam to Christ. While some scholars argue for gaps in these genealogies, the inclusion of precise ages (Adam was 130 when Seth was born, Seth was 105 when Enosh was born, and so forth) makes gap theories more difficult to sustain than in genealogies that merely list names.")
]));

content.push(para([
  t("Third, Jesus himself spoke of the creation of humanity at \u201Cthe beginning\u201D ("),
  tb("Mk 10:6"),
  t("; "),
  tb("13:19"),
  t(", NABRE), which young earth advocates argue is difficult to reconcile with humanity appearing only in the last fraction of a percent of cosmic history. If humans arrived 13.8 billion years into a 13.8-billion-year-old universe, that is not \u201Cthe beginning\u201D in any natural sense of the word.")
]));

content.push(para([
  t("Fourth, and most philosophically sophisticated, is the argument from Thomistic metaphysics\u2014the philosophical system of Saint Thomas Aquinas (1225\u20131274), the Catholic Church\u2019s most influential philosopher and theologian, whose framework remains the foundation of Catholic intellectual life. Aquinas defined creation as not a change but a simple emanation of being out of nothing\u2014it is instantaneous, supernatural, and involves no secondary causes. If God creates, He creates immediately and completely. A tree that God creates does not begin as a seed; Adam does not begin as an infant. God creates mature, fully functioning realities. This is the \u201Cmature creation\u201D argument, formalized by the naturalist Philip Henry Gosse in his 1857 work "),
  ti("Omphalos"),
  t(" (Greek for \u201Cnavel\u201D\u2014the question being whether Adam, who was never born, had a navel)."),
  sup("2"),
  t(" Gosse argued that God necessarily created a world with the "),
  ti("appearance"),
  t(" of age, because a functioning world requires pre-existing conditions: trees need rings, soil needs organic matter, rivers need erosion patterns, and light from distant stars must already be in transit. The appearance of age is not deception but a necessary feature of mature creation. We will return to this argument below, because while it is internally consistent, it raises a serious theological difficulty that deserves careful examination.")
]));

content.push(para([
  t("This is an internally consistent argument. If one accepts its premises, it cannot be empirically disproven. There would be no observable difference between a universe created six thousand years ago with the appearance of 13.8 billion years of history and a universe that is actually 13.8 billion years old. As Gosse himself recognized, every scientific conclusion about the earth\u2019s past would remain the same\u2014only the question of whether that past was real or \u201Cprojected in the mind of God\u201D would differ.")
]));

content.push(para([
  t("Fifth, young earth advocates point to what they consider anomalies in radiometric dating. They argue that the assumptions underlying these methods\u2014constant decay rates, known initial conditions, closed systems\u2014cannot be verified for events in the unobserved past. The RATE (Radioisotopes and the Age of The Earth) research project, funded by the Institute for Creation Research and the Creation Research Society, reported findings of carbon-14 in coal and diamonds that, under standard assumptions, should contain none. They also reported helium retention in zircon crystals (extremely hard, naturally occurring minerals that trap radioactive elements and their decay products, making them useful as geological clocks) at levels they argued were inconsistent with billions of years of radioactive decay.")
]));

content.push(para([
  t("Sixth, the earth\u2019s magnetic field has been measured to be decaying. Thomas G. Barnes, a physicist, argued in 1973 that if this decay is exponential and has been constant, the field would have been impossibly strong more than about 10,000 years ago\u2014consistent with a young earth."),
  sup("3"),
  t(" This argument was influential among young earth advocates for decades.")
]));

content.push(para([
  t("Seventh, some young earth advocates point to \u201Cpolystrate fossils\u201D\u2014tree trunks and other structures that extend vertically through multiple geological strata. If each stratum represents millions of years of deposition, how could a tree trunk remain upright and intact while being slowly buried over eons? This, they argue, suggests rapid deposition consistent with a global flood rather than gradual accumulation over millions of years.")
]));

content.push(para([
  t("Eighth, and perhaps the most far-reaching argument, is the claim that the physical constants and natural rates we observe today were not always constant. Young earth advocates argue that processes like the speed of light, radioactive decay, stalactite growth, and geological deposition may have operated at vastly different rates in the past\u2014rendering all uniformitarian dating methods unreliable. If light traveled much faster in the early universe, it could have crossed 13.8 billion light-years in only a few thousand years. If radioactive decay was dramatically accelerated during or shortly after Creation Week, radiometric dates of billions of years would be artifacts of that acceleration, not evidence of actual deep time.")
]));

content.push(para([
  t("This argument has real teeth, because science itself provides examples of processes that turn out to be non-uniform. Stalactites and stalagmites are commonly said to grow at rates of roughly one inch per century\u2014yet dramatically faster growth has been documented in specific conditions. Stalactites have been observed forming on concrete structures, bridge underpasses, and mine ceilings in mere years or decades, sometimes growing several inches in under a decade when mineral-rich water flows rapidly through porous material. If growth rates can vary this dramatically for speleothems, the argument goes, why should we assume constancy for other processes?")
]));

content.push(para([
  t("The White Cliffs of Dover, one of England\u2019s most iconic geological formations, provide another example young earth advocates cite. The cliffs are composed of chalk\u2014the compressed remains of trillions of microscopic marine organisms called coccolithophores (single-celled algae, smaller than the width of a human hair, that build tiny shells out of calcium carbonate\u2014the same mineral found in limestone and seashells). Standard geology holds that this chalk was deposited over tens of millions of years during the Late Cretaceous period, roughly 100 to 66 million years ago, when a warm shallow sea covered much of what is now southern England. The cliffs stand up to 110 meters tall and stretch for miles along the English Channel. Young earth advocates argue that catastrophic conditions\u2014such as massive algal blooms triggered by volcanic activity during the Genesis Flood\u2014could have produced and deposited vast quantities of coccolithophore remains in a much shorter time, perhaps weeks or months rather than millions of years. Coccolithophore blooms are observable today: satellite imagery regularly captures blooms covering thousands of square kilometers of ocean surface. If a global catastrophe triggered sustained, massive blooms while simultaneously depositing sediment, the argument goes, the chalk could have accumulated rapidly.")
]));

content.push(para([
  t("Finally, young earth advocates point to the history of science itself as evidence that \u201Csettled science\u201D can be overturned. Copernicus displaced the earth from the center of the cosmos; Kepler refined the model with his laws of planetary motion; Galileo championed it and was famously punished by the Church for doing so. Einstein replaced Newtonian physics with relativity, demonstrating that space, time, and even the speed of light\u2019s relationship to matter were not what centuries of physics had assumed. If the greatest scientific frameworks in history have been overturned by new evidence, why should we treat the current consensus on the earth\u2019s age as beyond revision? Science, they argue, is a method for revising assumptions\u2014and the assumption of uniformity across billions of years is the biggest unverified assumption of all.")
]));

content.push(heading2("Why Some Catholics Argue Young Earth Belief Is Required"));

content.push(para([
  t("The strongest case for a young earth within Catholicism does not come from the Protestant fundamentalist tradition but from a distinctly Catholic argument rooted in the Church Fathers, ecumenical councils, and Thomistic metaphysics. The most prominent advocate of this position is the Kolbe Center for the Study of Creation, founded in 2000 and directed by Hugh Owen."),
  sup("4"),
  t(" Their arguments deserve serious engagement, because they appeal to sources that every Catholic must take seriously.")
]));

content.push(para([
  tb("The Church Fathers Argument. "),
  t("The Kolbe Center argues that every Apostle, Father, and Doctor of the Church upheld a young earth chronology derived from Genesis. They challenge opponents to \u201Cshow us a single statement from a Church Father who taught that God used long periods of time in the creation of the material universe.\u201D This matters because the First Vatican Council, "),
  ti("Dei Filius"),
  t(", Chapter 2, teaches that Scripture must be interpreted \u201Caccording to that sense which Holy Mother Church has held and holds\u201D and \u201Cin accordance with the unanimous consent of the Fathers.\u201D If the Fathers unanimously taught a young earth, a Catholic might be bound to accept it.")
]));

content.push(para([
  t("However, this argument has a critical weakness: the Fathers were not, in fact, unanimous on this point. Saint Augustine, in "),
  ti("De Genesi ad Litteram"),
  t(" (circa 415 AD), explicitly argued that the \u201Cdays\u201D of Genesis were not ordinary days but a literary framework whose actual duration was unknown. Augustine wrote that the creation narrative was arranged not according to temporal sequence but according to a logical order. Saint Basil of Caesarea, while defending the days as real periods, acknowledged that the first day was called \u201Cone\u201D rather than \u201Cfirst\u201D to indicate its special character. The very existence of disagreement among the Fathers means the \u201Cunanimous consent\u201D rule does not apply to the specific question of the earth\u2019s age.")
]));

content.push(para([
  tb("The Fourth Lateran Council Argument. "),
  t("The Kolbe Center and the Catholic Origins apostolate argue that the Fourth Lateran Council (1215), in its "),
  ti("Firmiter"),
  t(" constitution, dogmatically defined fiat creation. The key Latin text reads: "),
  ti("Deus\u2026 sua omnipotenti virtute simul ab initio temporis utramque de nihilo condidit creaturam"),
  t(" (\u201CGod\u2026 by His own omnipotent power at once from the beginning of time created each creature from nothing\u201D). Young earth advocates read "),
  ti("simul"),
  t(" as \u201Csimultaneously\u201D and "),
  ti("ab initio temporis"),
  t(" as \u201Cfrom the beginning of time,\u201D concluding that creation was instantaneous and occurred at the very start of time\u2014allowing no room for billions of years. Saint Lawrence of Brindisi (1559\u20131619), a Doctor of the Church, read the text this way, as did the Flemish Jesuit exegete Cornelius a Lapide (1567\u20131637).")
]));

content.push(para([
  t("However, reputable theologians such as P. Hurter, S.J. and M. Jungmann have argued that "),
  ti("simul"),
  t(" in the Lateran text can be understood not as simultaneity of time but as unity of plan and community of origin\u2014meaning that all creatures share one Creator and one act of creation, not necessarily that they were created in a single instant. The Council\u2019s primary target was the Albigensian/Catharist heresy, which denied that the material world was created by the good God. The "),
  ti("Firmiter"),
  t(" was asserting that both spiritual and material creation come from the same God, against Cathar dualism\u2014not defining a timeline for creation.")
]));

content.push(para([
  tb("The Creation-Providence Framework. "),
  t("Hugh Owen argues that all arguments for an old earth assume a \u201Cnaturalistic-uniformitarian framework\u201D inherited from Enlightenment philosophers, which was rejected by all the Church Fathers. The Fathers instead embraced what Owen calls a \u201CCreation-Providence Framework,\u201D in which the entire work of creation was supernatural, and the natural order only began when creation was complete. Therefore, natural processes cannot be extrapolated backward to determine the age of creation. Owen rejects the label \u201CYoung Earth Creationist\u201D in favor of \u201CDRAC\u201D\u2014\u201CDivinely-Revealed-Age-Catholic\u201D\u2014framing his position as the default Catholic position held by the Fathers, not a modern innovation.")
]));

content.push(para([
  tb("The Cana Wine Analogy. "),
  t("The Kolbe Center draws a parallel to Jesus turning water into wine at Cana (John 2:1\u201311). The wine had all the chemical markers of having gone through a long natural process of fermentation and aging\u2014yet it was created instantaneously by divine power. Just as we can only know the true age of the Cana wine from the testimony of Scripture (not from chemical analysis), we can only know the true age of the cosmos from Genesis. This is essentially a more theologically grounded version of the Omphalos argument.")
]));

content.push(para([
  t("These are real arguments, held by serious Catholics, grounded in genuine sources. They deserve honest engagement rather than dismissal\u2014and they will receive it in the next chapter. The case for a young earth is stronger than many old-earth advocates acknowledge. The reader should sit with these arguments before moving on, because the framework we propose in the rest of this document takes the young earth position seriously precisely because it "),
  ti("is"),
  t(" serious.")
]));

// Chapter 2 footnotes
content.push(spacer());
content.push(para([
  sup("1"),
  t("John Paul II. "),
  ti("Fides et Ratio."),
  t(" Encyclical Letter, September 14, 1998. https://www.vatican.va/content/john-paul-ii/en/encyclicals/documents/hf_jp-ii_enc_14091998_fides-et-ratio.html")
], { spacing: { after: 80, line: 240 } }));
content.push(para([
  sup("2"),
  t("Gosse, Philip Henry. "),
  ti("Omphalos: An Attempt to Untie the Geological Knot."),
  t(" John Van Voorst, 1857. https://archive.org/details/omphalosattemptt00goss")
], { spacing: { after: 80, line: 240 } }));
content.push(para([
  sup("3"),
  t("Barnes, Thomas G. \u201CDecay of the Earth\u2019s Magnetic Moment and the Geochronological Implications.\u201D "),
  ti("Creation Research Society Quarterly"),
  t(" 9 (1973): 24\u201329.")
], { spacing: { after: 80, line: 240 } }));
content.push(para([
  sup("4"),
  t("Owen, Hugh, and the Kolbe Center. "),
  ti("Creation, Evolution, and Catholicism."),
  t(" Kolbe Center, 2000ff. https://kolbecenter.org/")
], { spacing: { after: 80, line: 240 } }));

content.push(pageBreak());

// ===== CHAPTER 3: THE CRUX =====
content.push(heading1("Chapter 3: The Crux\u2014Why This Document Parts Ways with the Young Earth Position"));

content.push(para([
  t("The previous chapter stated the case for a young earth as fairly as we could. This chapter explains why, despite the strength of those arguments, we believe the young earth position faces difficulties it cannot fully resolve\u2014not only because of the scientific evidence (though it is substantial), but because of a tension with dogmatic Catholic teaching that has not yet received adequate attention from either side.")
]));

content.push(para([
  t("But first, an essential clarification.")
]));

content.push(heading2("Can a Catholic Hold a Young Earth Position?"));

content.push(para([
  tb("Yes."),
  t(" The Catholic Church does not require belief in an old earth, and a Catholic who holds a young earth position is not in heresy. This must be stated clearly, because intellectual honesty demands it. The question of the earth\u2019s age is not defined by any ecumenical council, papal encyclical, or ex cathedra statement. Ludwig Ott\u2019s "),
  ti("Fundamentals of Catholic Dogma"),
  t(" does not list the earth\u2019s age among the "),
  ti("de fide"),
  t(" (divinely revealed) teachings of the Church. The Pontifical Biblical Commission (1909) explicitly ruled that the word "),
  ti("yom"),
  t(" in Genesis may be understood either as a literal day or as \u201Ca certain space of time\u201D\u2014and that this question \u201Cmay be the subject of free discussion among exegetes.\u201D Catholic Answers, the most prominent Catholic apologetics organization, states plainly: \u201CThe Catholic Church does not have a teaching about the theory of evolution or the extinction of the dinosaurs. You can be a faithful Catholic and deny or accept evolution.\u201D")
]));

content.push(para([
  t("What the Church "),
  ti("does"),
  t(" require is that certain theological truths be upheld regardless of one\u2019s position on the earth\u2019s age: that God is Creator, that Adam and Eve were real individuals, that all humans descend from them, that original sin is transmitted through generation, and that every human soul is directly created by God. A young earth Catholic who affirms all of these is fully within the bounds of Catholic orthodoxy.")
]));

content.push(para([
  t("Our argument is not that the young earth position is heretical. It is that it is "),
  ti("untenable"),
  t("\u2014that it requires accepting consequences that stand in tension with other things the Church teaches, and that the weight of evidence\u2014both scientific and theological\u2014points in the other direction. The distinction between \u201Cpermitted\u201D and \u201Cprudent\u201D matters here. A position can be theologically permissible and still be one that the evidence counsels against holding.")
]));

content.push(heading2("The Scientific Evidence for Deep Time"));

content.push(para([
  t("Before turning to the theological argument, it is worth noting that the scientific evidence for deep time extends far beyond starlight and radiometric dating. Multiple independent lines of evidence converge, each using different physical processes, and their agreement is what gives the case its cumulative force.")
]));

content.push(para([
  t("Ice cores drilled in Greenland and Antarctica contain annual layers\u2014visible as alternating light and dark bands caused by seasonal variation in snowfall, dust content, and chemistry. The EPICA core from Antarctica contains over 800,000 annual layers. Each layer can be independently verified by volcanic ash markers, atmospheric gas ratios, and isotopic signatures. Eight hundred thousand layers means 800,000 years\u2014minimum.")
]));

content.push(para([
  t("Dendrochronology\u2014tree ring dating\u2014provides another independent clock. Living trees produce one ring per year. By overlapping the ring patterns of living trees with those of dead trees, researchers have constructed continuous tree ring chronologies extending over 12,000 years. The bristlecone pines of California\u2019s White Mountains include individual specimens over 4,800 years old. The German oak-pine chronology extends back 12,460 years. These are not estimates or models\u2014they are counted, one ring at a time.")
]));

content.push(para([
  t("Coral reefs present a similar challenge. The Great Barrier Reef has been growing for approximately 500,000 years. Coral growth rates are measurable in the present: typically a few millimeters to a few centimeters per year. The Eniwetok Atoll in the Pacific has reef limestone over 1,400 meters thick, requiring hundreds of thousands of years of growth at observed rates. A young earth requires that either coral grew hundreds of times faster in the past\u2014contradicting observable biology\u2014or that God created reefs with the appearance of ancient growth, returning us once again to Gosse\u2019s Omphalos hypothesis and the theological difficulty it creates, which we address below.")
]));

content.push(para([
  t("Continental drift provides evidence on an even grander scale. The Mid-Atlantic Ridge is spreading at approximately 2.5 centimeters per year\u2014measurable today by GPS. The Atlantic Ocean is approximately 5,000 kilometers wide. At current rates, this requires roughly 200 million years. The magnetic striping of the ocean floor, recorded in volcanic rock as it cools, preserves a precise record of the earth\u2019s magnetic field reversals stretching back hundreds of millions of years\u2014and incidentally refutes the Barnes magnetic decay argument, since the field does not simply decay but oscillates and reverses cyclically.")
]));

content.push(para([
  t("The RATE project\u2019s findings, while impressive in their ambition, have been extensively critiqued by mainstream geologists and physicists. The carbon-14 in coal and diamonds is most plausibly explained by in-situ production from nitrogen-14 through neutron bombardment from surrounding uranium and thorium decay\u2014a known and measured process. The helium retention findings have been challenged on methodological grounds by multiple independent researchers. Most critically, the RATE team themselves acknowledged that if billions of years of radioactive decay occurred in a young earth, the heat generated would have melted the earth\u2019s crust multiple times over\u2014a problem they could not resolve and described as requiring \u201Cmiracles.\u201D")
]));

content.push(para([
  t("The polystrate fossil argument, while initially striking, is well understood in geology. Rapid local deposition events\u2014such as volcanic mudflows, turbidity currents, and flood deposits\u2014can bury objects quickly while the broader geological column still represents vast time. The 1980 eruption of Mount St. Helens deposited dozens of distinct layers in hours, demonstrating that individual strata can form rapidly within a long-age framework. The existence of rapid local deposition is not evidence that all strata were deposited rapidly.")
]));

content.push(para([
  t("What makes the case for deep time compelling is not any single line of evidence but the convergence of all of them. Ice cores, tree rings, coral growth, radiometric dating (using multiple independent isotope systems), continental drift, ocean floor magnetic striping, amino acid racemization, luminescence dating, and cosmological observation all independently point to the same timescales. For all of these to be wrong, they would all have to be wrong in exactly the same way, by exactly the same amount\u2014a convergence difficult to explain without accepting that the earth is old.")
]));

content.push(heading2("The Theological Difficulty"));

content.push(para([
  t("The Omphalos hypothesis is philosophically consistent, but it raises a serious theological problem\u2014and this is where we believe it falters. The difficulty is not simply that it makes God a deceiver (a charge its defenders rightly resist). The deeper issue is that it stands in tension with the dogmatic teaching of an ecumenical council and with the very foundation by which Catholic theology says we can know that God exists.")
]));

content.push(para([
  t("Thomas Aquinas, in the "),
  ti("Summa Theologica"),
  t(" (Prima Pars, Question 2, Article 3), presented five demonstrations of God\u2019s existence\u2014the famous Five Ways. All five proceed "),
  ti("a posteriori"),
  t(": from observations of the created world to the existence of God as their necessary explanation. The First Way reasons from motion in the world to an Unmoved Mover. The Second Way reasons from chains of efficient causes to a First Cause. The Third Way reasons from contingent beings to a Necessary Being. The Fourth Way reasons from degrees of perfection in things to a source of all perfection. The Fifth Way reasons from the purposeful order of natural things to an Intelligent Governor of the universe. Every one of these arguments depends on the created world being "),
  ti("real evidence"),
  t("\u2014on the motions, causes, contingencies, perfections, and purposes we observe in creation being genuine features of reality, not fabrications.")
]));

content.push(para([
  t("The First Vatican Council (1870), in its dogmatic constitution "),
  ti("Dei Filius"),
  t(", elevated this principle to the level of dogma. The Council taught: \u201CThe same Holy Mother Church holds and teaches that God, the beginning and end of all things, can be known with certainty by the natural light of human reason from created things.\u201D The Council then issued its teaching under anathema\u2014the strongest language available to an ecumenical council, meaning that the condemned position is formally incompatible with Catholic faith. In the early Church, anathema meant complete excommunication; by the time of the great councils, it functioned as a declaration that the rejected view constitutes heresy, and that a Catholic who knowingly and obstinately holds it has placed himself outside the faith on that point. It does not mean automatic damnation\u2014that judgment belongs to God alone\u2014but it means the Church has drawn a line and will not move it. The canon reads: \u201CIf anyone says that the one, true God, our creator and lord, cannot be known with certainty from the things that have been made, by the natural light of human reason: let him be anathema.\u201D The Catechism of the Catholic Church repeats this at \u00A736: God \u201Ccan be known with certainty from the created world by the natural light of human reason.\u201D And the Council cited Romans 1:20: \u201CFor the invisible things of him, from the creation of the world, are clearly seen, being understood by the things that are made.\u201D")
]));

content.push(para([
  t("Now consider what the Omphalos hypothesis requires. If God created the universe six thousand years ago with the appearance of billions of years of history, then God embedded in creation an elaborate record of events that never happened. The light arriving tonight from the Andromeda galaxy\u2014light that appears to have traveled 2.5 million years\u2014was created already in transit, carrying information about a galaxy that never went through the processes that information describes. The fossils in the rocks record the deaths of creatures that never lived. The radioactive decay products in minerals record billions of years of atomic processes that never occurred. The cosmic microwave background radiation describes a Big Bang that never happened.")
]));

content.push(para([
  t("This does not merely mean that God created a world that "),
  ti("looks"),
  t(" old. It means God created a world that "),
  ti("testifies falsely"),
  t(". Every photon of starlight, every fossil, every isotope ratio, every ice core layer, every tree ring sequence, every coral growth band, every supernova remnant would be recording a history that did not actually occur\u2014evidence embedded in creation that points to events God did not allow to happen.")
]));

content.push(para([
  t("But if creation testifies falsely, then creation cannot be relied upon as evidence for God\u2019s existence\u2014and yet Vatican I defined "),
  ti("under anathema"),
  t(" that God "),
  ti("can"),
  t(" be known with certainty from created things. If the starlight does not reflect real history, Aquinas\u2019s First Way is weakened: the motions we observe in the cosmos did not really happen as observed, so it becomes harder to reason from them to an Unmoved Mover. If the fossils do not record real events, the Fifth Way is weakened: the purposeful order we see in the development of life was not a genuine feature of creation, so reasoning from it to an Intelligent Governor becomes uncertain. If the isotope ratios do not reflect real processes, the Second Way is weakened: the causal chains we trace through geological history are not reliable, so reasoning from them to a First Cause becomes problematic.")
]));

content.push(para([
  t("Furthermore, "),
  ti("Dei Filius"),
  t(" Chapter 4 teaches: \u201CSince the same God who reveals mysteries and infuses faith has bestowed the light of reason on the human mind, God cannot deny himself, nor can truth ever contradict truth.\u201D If creation and revelation are both from the same God, and God cannot contradict Himself, then the evidence of creation and the truth of revelation must be compatible. A creation that bears false witness about its own history contradicts truth\u2014and thereby contradicts God Himself.")
]));

content.push(para([
  t("The Omphalos hypothesis, then, raises a difficulty that goes beyond the question of divine deception. If taken to its logical conclusion, it stands in tension with the very foundation by which Catholic dogma says we can know that God exists. It sits uneasily with an anathematized canon of an ecumenical council. It weakens the evidentiary basis of the Five Ways. And it risks pitting creation against revelation in precisely the way "),
  ti("Dei Filius"),
  t(" says is impossible. This is not a minor theological difficulty. It is a serious internal tension that any Catholic holding this position would need to resolve.")
]));

content.push(heading2("The Starlight Problem\u2014and Its Beautiful Inversion"));

content.push(para([
  t("The starlight problem is the most vivid illustration of why the appearance-of-age argument fails\u2014but it is also, when taken seriously, one of the most beautiful arguments for the grandeur of God\u2019s creative plan.")
]));

content.push(para([
  t("When we look at the night sky, we are looking into the past. Light from the nearest star beyond our sun, Proxima Centauri, left that star 4.2 years ago. Light from the Andromeda galaxy left 2.5 million years ago. Light from the most distant observable galaxies has been traveling for over 13 billion years. Some of the stars whose light we see tonight have already died\u2014they burned through their hydrogen, collapsed, exploded as supernovae, and scattered their elements into space. We are still receiving their light because it has been traveling for so long.")
]));

content.push(para([
  t("Now consider what those dead stars produced. The heavy elements that compose your body\u2014the iron in your blood, the calcium in your bones, the carbon in every cell, the oxygen you are breathing as you read this\u2014were forged inside stars that lived and died billions of years before the earth formed. These stars had to burn for millions of years, converting hydrogen to helium, helium to carbon, carbon to oxygen, building heavier and heavier elements in their cores. Then they had to explode as supernovae, scattering those elements into the interstellar medium, where they coalesced into new solar systems, new planets\u2014including ours. You are made of stardust. And that stardust had to be "),
  ti("manufactured"),
  t(" across billions of years of stellar processes.")
]));

content.push(para([
  t("The phrase in Genesis 2:7\u2014\u201Cthen the Lord God formed man from the dust of the ground\u201D\u2014takes on a resonance the ancient authors could not have imagined. The \u201Cdust of the ground\u201D is star-stuff. The ground itself is the product of billions of years of cosmic engineering. And the process of making it required a universe of 200 billion galaxies operating across 13.8 billion years.")
]));

content.push(para([
  t("This is not an argument against God. It is an argument for a God whose creative vision is far more vast than a six-day creation. The God who designed a universe where the initial conditions of the Big Bang\u2014the cosmological constants, the laws of physics, the ratio of matter to antimatter, calibrated to astonishing precision\u2014inevitably unfold across 13.8 billion years into a planet with creatures ready to receive rational souls\u2026 that God is playing a longer, deeper, more magnificent game than even the young earth advocates imagine.")
]));

content.push(heading2("The Text Itself Signals Something Other Than Literal Days"));

content.push(para([
  t("The case against a literal six-day creation does not rest solely on science. The text of Genesis itself provides internal evidence that \u201Cday\u201D ("),
  ti("yom"),
  t(" in Hebrew) is not being used as a twenty-four-hour solar period. The most obvious indicator is that the sun is not created until Day Four (Genesis 1:14\u201319). A \u201Cday\u201D defined by solar rotation cannot exist before the sun exists. The text signals from its opening verses that it operates on a different kind of timescale.")
]));

content.push(para([
  t("This is not a modern observation forced onto the text by scientific embarrassment. Saint Augustine of Hippo, writing in the fifth century\u2014long before anyone had a scientific reason to question a young earth\u2014argued that the \u201Cdays\u201D of Genesis were not ordinary days but a framework for divine creative acts whose actual duration was unknown to us. Augustine\u2019s "),
  ti("De Genesi ad Litteram"),
  t(" ("),
  ti("The Literal Meaning of Genesis"),
  t(") explicitly warned against Christians making claims about the natural world that contradicted well-established knowledge, lest they bring the faith into disrepute. This warning was issued sixteen centuries ago and remains worth heeding.")
]));

content.push(para([
  t("The Pontifical Biblical Commission, in its 1909 response on the historical character of Genesis, was asked directly whether the word "),
  ti("yom"),
  t(" must be taken as a natural day or may be understood as a certain space of time. The answer: \u201CIn the affirmative\u201D\u2014meaning Catholics are free to interpret the days of Genesis as periods of time rather than twenty-four-hour days. This was not a concession forced by modernity; it was a recognition of what the text itself permits.")
]));

content.push(heading2("Required vs. Open: What the Church Demands About the Age of the Earth"));

content.push(para([
  t("To answer this question with precision, we must understand the levels of doctrinal authority in Catholic theology. Ludwig Ott, in his authoritative "),
  ti("Fundamentals of Catholic Dogma"),
  t(" (1952), classifies teachings by their degree of certainty: "),
  ti("de fide definita"),
  t(" (divinely revealed and solemnly defined\u2014denial is heresy); "),
  ti("de fide"),
  t(" (divinely revealed\u2014denial is heresy); "),
  ti("sententia fidei proxima"),
  t(" (close to faith\u2014denial is near-heresy); "),
  ti("sententia certa"),
  t(" (theologically certain); "),
  ti("sententia communis"),
  t(" (common teaching); and "),
  ti("sententia probabilis"),
  t(" (probable opinion). This hierarchy matters enormously, because not everything taught by Catholic authorities carries the same weight.")
]));

content.push(para([
  tb("Required (De Fide): "),
  t("The following teachings about creation are classified by Ott as "),
  ti("de fide"),
  t("\u2014divinely revealed truths whose denial constitutes heresy: All that exists outside God was, in its whole substance, produced out of nothing by God (Fourth Lateran Council; Vatican I, "),
  ti("Dei Filius"),
  t(", Chapter 1, Canon 5). God was moved by His goodness to create the world (Vatican I, "),
  ti("Dei Filius"),
  t(", Chapter 1, Canon 2). The world had a beginning in time ("),
  ti("Dei Filius"),
  t(", Chapter 1, Canon 5: \u201CIf anyone does not confess that the world and all things which are contained in it, both spiritual and material, as regards their whole substance, have been produced by God from nothing\u2026 let him be anathema\u201D). God alone created the world ("),
  ti("Dei Filius"),
  t(", Chapter 1). God keeps all created things in existence and guides them through His Providence ("),
  ti("Dei Filius"),
  t(", Chapter 1). The first man was created by God (Genesis 1:27; CCC \u00A7356). Man consists of a material body and a spiritual soul (CCC \u00A7362\u2013368). The rational soul is the essential form of the body (Council of Vienne, 1312). Every human soul is directly created by God ("),
  ti("Humani Generis"),
  t(", \u00A736; CCC \u00A7366). Adam and Eve are real, historical individuals from whom all humans descend ("),
  ti("Humani Generis"),
  t(", \u00A737; Council of Trent, Session V, Canons 1\u20134). Creation reveals God\u2019s existence and attributes to human reason (Romans 1:19\u201320; "),
  ti("Dei Filius"),
  t(", Chapter 2, Canon 1; CCC \u00A736). The Genesis account, while using \u201Cfigurative language\u201D (CCC \u00A7390), \u201Caffirms a primeval event, a deed that took place at the beginning of the history of man.\u201D")
]));

content.push(para([
  tb("Not required (Open): "),
  t("The age of the earth is not listed among the "),
  ti("de fide"),
  t(" teachings in Ott or any other standard manual of Catholic dogmatic theology. It is not defined by any ecumenical council, papal encyclical, or ex cathedra statement. This is documented in the following sources:")
]));

content.push(para([
  t("The Pontifical Biblical Commission (1909), in its decree "),
  ti("De charactere historico trium priorum capitum Geneseos"),
  t(", was asked (Question VIII): \u201CIn the designation and distinction of the six days mentioned in the first chapter of Genesis may the word "),
  ti("yom"),
  t(" (day) be taken either in the literal sense for the natural day or in an applied sense for a certain space of time, and may this question be the subject of free discussion among exegetes?\u201D The Commission answered: \u201CIn the affirmative.\u201D The same Commission affirmed (Question VII) that the sacred author did not intend \u201Cto give scientific teaching about the internal constitution of visible things\u201D but rather \u201Ca popular notion in accord with the current speech of the time.\u201D And (Question VI) that \u201Cprovided that the literal and historical sense is presupposed,\u201D passages \u201Cmay wisely and profitably be interpreted in an allegorical and prophetical sense, in the light of the example of the holy Fathers and of the Church itself.\u201D")
]));

content.push(para([
  t("In 1948, the Pontifical Biblical Commission sent a letter to Cardinal Suhard of Paris, effectively clarifying the scope of its 1909 responses: \u201CThese literary forms do not correspond exactly with any classical category\u201D and the \u201Chistoricity can neither be denied nor affirmed simply.\u201D Pope Pius XII, in "),
  ti("Humani Generis"),
  t(" (1950), \u00A736, explicitly permitted Catholics to investigate evolution as it pertains to the human body. The International Theological Commission, in its 2004 document \u201CCommunion and Stewardship,\u201D approved by the Congregation for the Doctrine of the Faith (then headed by Cardinal Ratzinger), stated that \u201Cthe story of human origins is complex and subject to revision.\u201D")
]));

content.push(para([
  t("Saint Augustine, in "),
  ti("De Genesi ad Litteram"),
  t(" (circa 415 AD), argued that the \u201Cdays\u201D of Genesis were not ordinary days but a literary framework whose actual duration was unknown\u2014and was not condemned for this view. The Pontifical Academy of Sciences, established by Pope Pius XI in 1936, operates on the assumption of deep time and modern cosmology. Cardinal Paul Poupard, then President of the Pontifical Council for Culture, stated that \u201Cthe faithful have the obligation to listen to that which secular modern science has to offer,\u201D warning of \u201Cthe dangers of a religion that severs its links with reason.\u201D")
]));

content.push(para([
  t("None of the "),
  ti("de fide"),
  t(" requirements listed above specify an age for the earth. None require six literal days. None prohibit deep time. The question of the earth\u2019s age is, in Catholic theology, an open question\u2014and the convergence of evidence from physics, chemistry, geology, astronomy, and biology points to a universe approximately 13.8 billion years old and an earth approximately 4.5 billion years old.")
]));

content.push(heading2("A Word to Young Earth Believers"));

content.push(para([
  t("This document does not aim to mock or dismiss those who hold to a young earth. The arguments outlined above are real arguments, held by serious people, and the instinct behind them\u2014that Scripture should be taken seriously, that God\u2019s Word should not be subordinated to human theories\u2014is a sound instinct that the Catholic tradition shares. The disagreement is not over whether Scripture is authoritative. It is over what Scripture is actually saying in its opening chapters, and whether the figurative language the Catechism acknowledges in those chapters extends to their chronological framework.")
]));

content.push(para([
  t("Our framework requires deep time. The rest of this document will show why that deep time, far from diminishing God or undermining Scripture, reveals a Creator whose patience, craftsmanship, and foresight are written in every star that burns, every element that forms, every hominid lineage that unfolds toward the moment when God breathes a rational soul into the dust of the ground\u2014dust that He spent 13.8 billion years preparing.")
]));

content.push(pageBreak());

// ===== CHAPTER 4: EXISTING MODELS =====
content.push(heading1("Chapter 4: Existing Models\u2014Their Strengths and Limitations"));

content.push(para([
  t("Before presenting our synthesis, it is worth surveying the major models that Catholic thinkers have proposed to reconcile Adam and Eve with modern science. Each has real strengths. Each also has significant weaknesses that our framework attempts to address.")
]));

content.push(heading2("The Swamidass Model: The Genealogical Adam and Eve"));

content.push(para([
  t("S. Joshua Swamidass, a computational biologist at Washington University in St. Louis, published "),
  ti("The Genealogical Adam and Eve"),
  t(" in 2019. His central insight is powerful: genealogical ancestry and genetic ancestry are different things. You have exponentially more genealogical ancestors than genetic ancestors\u2014you may share no DNA with many of your ancestors just a few hundred years back, but they are still your ancestors. Swamidass demonstrated mathematically that a single couple living in the Middle East as recently as six thousand to ten thousand years ago could become the genealogical ancestors of every human on earth by approximately 1 AD.")
]));

content.push(para([
  t("The strength of this model is that it sidesteps the genetic diversity problem entirely. Adam and Eve are placed alongside an already-existing evolved human population. Their descendants interbreed with everyone else. The genetic diversity was already in the broader population; only the genealogical origin traces back to two individuals.")
]));

content.push(para([
  t("The weakness, for Catholic purposes, is significant. Swamidass\u2019s model requires the existence of fully human beings who are not descended from Adam and Eve\u2014at least initially. This is difficult to reconcile with the Catholic requirement (expressed in "),
  ti("Humani Generis"),
  t(") that all true humans descend from Adam. It also raises the question of the moral and spiritual status of these non-Adamic humans. Do they have souls? Do they bear original sin? Swamidass himself acknowledges this as a theological question his model does not resolve.")
]));

content.push(heading2("The Kemp Model: Theological Monogenism Within Biological Polygenism"));

content.push(para([
  t("Kenneth Kemp, a philosopher at the University of St. Thomas, published an influential 2011 paper in the "),
  ti("American Catholic Philosophical Quarterly"),
  t(" proposing what he calls a distinction between \u201Cbiological humans\u201D and \u201Ctheological humans.\u201D In his model, God selects two individuals from an existing population of biologically human hominids and endows them with rational souls, making them the first \u201Ctheological humans.\u201D Their descendants interbreed with the biologically human but not-yet-ensouled population, and God grants rational souls to all offspring of ensouled beings. Over time, every living hominid has Adam and Eve among their ancestors and possesses a rational soul.")
]));

content.push(para([
  t("Kemp\u2019s model is elegant and has been widely discussed. It preserves strict monogenism in the theological sense\u2014every truly human being descends from Adam and Eve\u2014while accepting the genetic evidence for a larger ancestral population. The International Theological Commission\u2019s 2004 language about human emergence \u201Cwhether as individuals or in populations\u201D seems to leave room for exactly this kind of model.")
]));

content.push(para([
  t("The weakness is the one that strikes most people immediately: the \u201Csoulless twin\u201D problem. In Kemp\u2019s model, the beings surrounding Adam and Eve are "),
  ti("biologically identical"),
  t(" to them. They look the same, act the same, and presumably suffer the same. The only difference is an invisible metaphysical property\u2014the rational soul. Calling biologically identical beings \u201Cnon-human\u201D solely on the basis of an undetectable spiritual quality is philosophically uncomfortable and scientifically meaningless. As one of Kemp\u2019s critics pointed out, if these beings are not rational, they should not be called \u201Cbiologically human\u201D at all\u2014but if they are indistinguishable from humans in every observable way, the distinction feels arbitrary.")
]));

content.push(para([
  t("There is also the moral problem. Dennis Bonnette, a Catholic philosopher at Niagara University, has argued that interbreeding between ensouled humans and non-ensouled hominids constitutes bestiality\u2014\u201Ca grossly perverse use of the sexual faculties\u201D and \u201Cthe worst of the unnatural sexual sins.\u201D While defenders of the Kemp model (including Thomist philosopher Edward Feser) have pushed back on this characterization, the objection has force. If these beings are truly non-rational animals, mating with them is a grave moral disorder, regardless of their physical appearance.")
]));

content.push(heading2("The Craig/Bonnette Model: Pushing Adam Deep Into the Past"));

content.push(para([
  t("William Lane Craig, in his 2021 book "),
  ti("In Quest of the Historical Adam"),
  t(", and Dennis Bonnette in several articles, have argued that the genetic diversity problem can be resolved by placing Adam and Eve very deep in the past\u2014perhaps 500,000 years ago or even one million years ago. At these timescales, they argue, normal population growth and genetic drift from a single pair could generate the diversity we observe, and no interbreeding with non-human hominids is required.")
]));

content.push(para([
  t("Craig specifically proposes that Adam and Eve may have been "),
  ti("Homo heidelbergensis"),
  t("\u2014the species generally considered the last common ancestor of modern humans, Neanderthals, and Denisovans. This would make all subsequent hominid groups descendants of Adam, neatly accounting for the fossil record.")
]));

content.push(para([
  t("The strength of this model is its simplicity and its theological cleanliness. There are no soulless near-humans, no bestiality problem, no complicated interbreeding scenarios. Adam and Eve are the first and only humans, period.")
]));

content.push(para([
  t("The weakness is genetic. Population geneticists argue that the allelic diversity patterns in the human genome\u2014particularly in the HLA immune system genes, where some variants predate the human-chimpanzee split\u2014cannot be explained by descent from two individuals at any point in "),
  ti("Homo sapiens"),
  t(" history. Craig addresses this by placing Adam earlier than "),
  ti("Homo sapiens"),
  t(", but the further back you push the pair, the more you rely on the increasing uncertainty of deep-time genetic models\u2014which is a defensible but not entirely satisfying move.")
]));

content.push(heading2("The Suarez Variation: Mass Ensoulment at the Fall"));

content.push(para([
  t("Antoine Suarez, a physicist and philosopher, has proposed a variation in which God ensouled Adam and Eve as the first rational humans, and then, at the moment of the Fall, simultaneously raised all non-rational biological humans to the status of rational beings. This avoids the interbreeding problem entirely\u2014everyone becomes human at the same moment\u2014but it creates its own theological difficulty: original sin would need to spread instantaneously to beings who did not commit it and were not descended from those who did, which is hard to square with the Catholic doctrine that original sin is transmitted \u201Cthrough generation\u201D (Council of Trent, Session V).")
]));

content.push(heading2("Required vs. Open: What the Church Demands of Any Model"));

content.push(para([
  tb("Required: "),
  t("Any Catholic model of human origins must affirm that Adam and Eve were real, historical individuals\u2014not symbols, not a \u201Ccertain number of first parents\u201D ("),
  ti("Humani Generis"),
  t(", \u00A737). All true humans must descend from them biologically. Original sin must be transmitted through generation, not imitation (Council of Trent, Session V). The human soul must be directly created by God in each individual (CCC \u00A7366). These are non-negotiable dogmatic commitments. Any model that violates them is not a Catholic option, however scientifically elegant it may be.")
]));

content.push(para([
  tb("Open: "),
  t("The Church has not endorsed any particular model for how Adam and Eve relate to the broader hominid population. Catholics are free to explore the Swamidass genealogical model, the Kemp biological/theological distinction, the Craig deep-time approach, the Suarez variation, or the synthesis proposed in this document. The precise dating of Adam and Eve, the mechanism by which genetic diversity entered the human lineage, the identity of the \u201Cother people\u201D in Genesis, and the exact relationship between ensouled humans and the broader hominid population are all matters of legitimate theological and scientific inquiry. No Catholic is bound to any one answer on these questions.")
]));

content.push(pageBreak());

// ===== CHAPTER 5: THE NEW BIOLOGY =====
content.push(heading1("Chapter 5: Augros and Stanciu\u2014The New Biology and Latent Potential"));

content.push(para([
  t("Before presenting our synthesis, we need one more piece of the puzzle. In 1987, philosopher Robert Augros and physicist George Stanciu published "),
  ti("The New Biology: Discovering the Wisdom in Nature"),
  t(". (The two also co-authored "),
  ti("The New Story of Science"),
  t(", published by Bantam New Age, from which the title of the current document is partly derived.) Augros holds a doctorate in philosophy from Saint Anselm College; Stanciu has a Ph.D. in theoretical physics and conducted research at Los Alamos National Laboratory.")
]));

content.push(para([
  t("Their central argument challenges the standard Darwinian account of how new species arise. Rather than new forms emerging gradually through random mutation filtered by natural selection, Augros and Stanciu proposed that organisms carry "),
  ti("latent genetic potential"),
  t(" that unfolds under the right conditions. As they put it, \u201Csome process develops new regulatory gene patterns that eventually produce new body plans and hence new species.\u201D In their view, there is an internal genetic mechanism in living things that sometimes causes DNA that is superfluous\u2014not currently being expressed\u2014to be engaged, producing a new species over time.")
]));

content.push(para([
  t("An analogy may help, though it should not be pressed too far: an acorn contains within itself, invisibly, the full blueprint for an oak tree\u2014roots, trunk, branches, leaves, acorns of its own. No new information is added from outside; the oak unfolds from what was already present. Augros and Stanciu suggest something analogous operates in the genome: the entire diversity of biological form is present in potential from the beginning and unfolds over time, rather than being generated from scratch by random mutation. This is a philosophical and biological proposal, not yet a scientific consensus, but it resonates with discoveries in evo-devo that reveal deep genetic conservation across vastly different organisms.")
]));

content.push(heading2("The Unfolding from the Big Bang"));

content.push(para([
  t("To appreciate the full scope of the Augros/Stanciu insight, it helps to trace the unfolding from the very beginning. If latent potential is built into creation from its first instant, then the entire history of the universe can be read as a single, continuous act of unfolding\u2014from the simplest possible state to the most complex beings in the cosmos. What follows is that story, told in stages.")
]));

content.push(heading3("Stage One: The First Moments (0 to 380,000 Years)"));

content.push(para([
  t("At the instant of the Big Bang\u201413.8 billion years ago\u2014all matter, energy, space, and time come into existence. (A note on the scientific consensus: the standard model of cosmology holds that there was one Big Bang. Alternative models\u2014Roger Penrose\u2019s Conformal Cyclic Cosmology and Paul Steinhardt\u2019s cyclic/bouncing cosmology\u2014propose that the universe may undergo repeated cycles, but these remain minority positions. The 2024\u20132025 DESI data hinting that dark energy may be weakening has generated renewed interest in cyclic models, but the single-Big-Bang model remains the dominant scientific framework.) In the first fractions of a second, the four fundamental forces (gravity, electromagnetism, the strong nuclear force, and the weak nuclear force) separate from what physicists believe was a single unified force. Quarks form and combine into protons and neutrons. Within the first three minutes, a process called Big Bang nucleosynthesis\u2014confirmed by decades of observation and laboratory nuclear physics\u2014produces the lightest elements: roughly 75% hydrogen, 25% helium, and trace amounts of lithium and deuterium. These ratios are among the most precisely confirmed predictions in all of cosmology. Nothing heavier exists yet. No carbon, no oxygen, no iron\u2014none of the elements necessary for life or for solid planets.")
]));

content.push(para([
  t("For the next 380,000 years, the universe is a hot, opaque plasma. Then it cools enough for electrons to combine with nuclei, forming the first neutral atoms. Light breaks free. That light\u2014stretched by 13.8 billion years of cosmic expansion\u2014is still detectable today as the cosmic microwave background radiation, the oldest observable signal in the universe. At this stage, the universe contains nothing but gas and radiation. Yet everything that will follow\u2014stars, planets, oceans, cells, consciousness\u2014is latent in the physical constants and laws governing this primordial simplicity.")
]));

content.push(heading3("Stage Two: The First Stars and Stellar Nucleosynthesis (200 Million to 1 Billion Years)"));

content.push(para([
  t("Gravity draws hydrogen and helium into increasingly dense clouds. Roughly 200 million years after the Big Bang, the first stars ignite. Theoretical models predict these \u201CPopulation III\u201D stars were massive\u2014possibly hundreds of times the mass of our sun\u2014and burned hot and fast. As of 2025, no Population III star has been definitively confirmed by observation, though the James Webb Space Telescope has identified a strong candidate in the galaxy LAP1-B (Visbal et al., "), ti("The Astrophysical Journal Letters"), t(", 2025), seen as it was just 800 million years after the Big Bang. In the cores of massive stars, nuclear fusion builds heavier elements through a well-established process called stellar nucleosynthesis: hydrogen fuses into helium, helium into carbon, carbon into oxygen, oxygen into neon, neon into silicon, and silicon into iron. Iron is the end of the line for exothermic fusion\u2014fusing iron absorbs energy rather than releasing it. This fusion chain is confirmed by spectroscopic observations of stellar atmospheres and by laboratory nuclear physics.")
]));

content.push(para([
  t("When these massive stars exhaust their fuel, they collapse and explode as supernovae. The explosion generates temperatures and pressures extreme enough to forge some elements heavier than iron through the rapid neutron-capture process (r-process). The explosion scatters these newly created elements into the surrounding space, enriching the interstellar medium with the raw materials for a second generation of stars and, crucially, for rocky planets. However, supernovae are not the only source of heavy elements. In 2017, the LIGO and Virgo gravitational-wave detectors observed the merger of two neutron stars (event GW170817), and the electromagnetic afterglow\u2014called a kilonova\u2014confirmed that neutron star mergers are a major, perhaps dominant, source of the heaviest r-process elements: gold, platinum, and uranium among them (Pian et al., "), ti("Nature"), t(", 2017; Kasen et al., "), ti("Nature"), t(", 2017). In 2023, the James Webb Space Telescope spectroscopically identified tellurium in the kilonova associated with GRB 230307A (Levan et al., "), ti("Nature"), t(", 2024), providing the most direct identification yet of a specific heavy element produced in a neutron star merger. The picture that emerges is that the elements necessary for life are manufactured through multiple cosmic processes\u2014stellar fusion for the lighter elements up through iron, supernovae and neutron star mergers for the heavier ones.")
]));

content.push(para([
  t("This is the cosmic alchemy that makes life possible. Every atom of carbon in your body was forged in the core of a star that died before the sun was born. Every atom of iron in your blood was manufactured in a massive star\u2019s core and scattered by a supernova. Every atom of calcium in your bones, every atom of oxygen in your lungs, was built inside a star through nuclear fusion. And trace amounts of heavier elements\u2014the iodine in your thyroid, the cobalt in your vitamin B12\u2014may trace their origins to the cataclysmic collision of neutron stars. Genesis 2:7\u2019s image of God forming man from \u201Cthe dust of the ground\u201D is, read through the lens of modern astrophysics, literally true\u2014we are made of star-dust and merger-debris, and that dust had to be manufactured across billions of years of stellar life cycles and cosmic collisions.")
]));

content.push(heading3("Stage Three: The Solar System and Earth (4.6 Billion Years Ago)"));

content.push(para([
  t("Approximately 4.6 billion years ago, a cloud of gas and dust\u2014enriched by multiple generations of stellar nucleosynthesis\u2014collapses under gravity to form our solar system. The sun ignites at the center. Rocky material aggregates into the inner planets\u2014Mercury, Venus, Earth, Mars\u2014while lighter gases form the giant outer planets. The early Earth is a molten ball, bombarded by asteroids and comets. Over hundreds of millions of years, it cools. Water accumulates\u2014some from volcanic outgassing, some delivered by comets. Oceans form. The atmosphere stabilizes. The stage is set.")
]));

content.push(heading3("Stage Four: The Emergence of Life (3.8 to 3.5 Billion Years Ago)"));

content.push(para([
  t("Within roughly the first billion years of Earth\u2019s existence, life appears. The oldest confirmed microfossils date to approximately 3.5 billion years ago; chemical signatures in rocks suggest life may have existed as early as 3.8 billion years ago. How the first self-replicating molecules arose from non-living chemistry\u2014the origin of life itself\u2014remains one of the deepest unsolved problems in science. What is clear is that once life appears, it persists and diversifies.")
]));

content.push(para([
  t("For the next two billion years\u2014a span almost incomprehensibly long\u2014life consists entirely of single-celled organisms. Bacteria and archaea dominate. They transform the planet\u2019s chemistry: cyanobacteria develop photosynthesis, producing oxygen as a waste product, gradually converting Earth\u2019s atmosphere from a reducing to an oxidizing environment. This is the Great Oxidation Event, roughly 2.4 billion years ago. It is simultaneously one of the greatest ecological catastrophes in Earth\u2019s history (anaerobic organisms are poisoned by the oxygen) and the essential precondition for all complex life to come.")
]));

content.push(heading3("Stage Five: Complex Life and the Cambrian Explosion (1 Billion to 500 Million Years Ago)"));

content.push(para([
  t("Approximately 1.5 to 2 billion years ago, eukaryotic cells appear\u2014cells with nuclei, mitochondria, and internal organization far more complex than bacteria. Around 600 million years ago, multicellular organisms emerge. Then, approximately 540 million years ago, the Cambrian explosion occurs: in a geologically brief window of perhaps 20 million years, nearly all major animal body plans appear in the fossil record. This event has fascinated and troubled biologists since Darwin, who acknowledged it as a difficulty for his theory. The Augros/Stanciu thesis offers an interpretation: the Cambrian explosion represents the activation of latent developmental potential that had been building in the genome for hundreds of millions of years, triggered by the right environmental and genetic conditions.")
]));

content.push(heading3("Stage Six: The Vertebrate Lineage (500 Million to 65 Million Years Ago)"));

content.push(para([
  t("From the Cambrian onward, the story is one of progressive unfolding through the vertebrate lineage. Fish appear and diversify. Some develop lobed fins and transition onto land as the first amphibians, roughly 375 million years ago ("),
  ti("Tiktaalik"),
  t(" is the iconic transitional fossil). Reptiles emerge and diversify. Mammals appear alongside the dinosaurs roughly 225 million years ago but remain small and marginal for over 150 million years\u2014nocturnal, insectivorous, living in the shadows of the great reptiles.")
]));

content.push(para([
  t("Then, 66 million years ago, an asteroid impact triggers the Cretaceous\u2013Paleogene extinction event, wiping out the non-avian dinosaurs and opening ecological niches that mammals rapidly fill. The latent potential for mammalian diversification\u2014present but suppressed for 150 million years\u2014unfolds explosively. Primates appear within 10 million years of the extinction. The road to humanity is being prepared.")
]));

content.push(heading3("Stage Seven: The Primate Lineage (65 Million to 1 Million Years Ago)"));

content.push(para([
  t("The primate lineage unfolds through a series of increasingly sophisticated forms. Early primates are small, arboreal, and insectivorous. Over tens of millions of years, they develop larger brains relative to body size, stereoscopic vision, grasping hands, and increasingly complex social behavior. The great apes diverge from the monkey lineage roughly 25 million years ago. The human lineage splits from the chimpanzee lineage approximately 6\u20137 million years ago.")
]));

content.push(para([
  t("Then comes the progression through the hominids: "),
  ti("Australopithecus"),
  t(" (upright walking, small brains, simple stone tools), "),
  ti("Homo habilis"),
  t(" (larger brains, more sophisticated tools), "),
  ti("Homo erectus"),
  t(" (fire control, migration out of Africa, Acheulean hand axes), and finally "),
  ti("Homo heidelbergensis"),
  t(" (brains approaching modern size, cooperative hunting, possible ritual behavior). Each stage is genuinely different from the last. Each represents the unfolding of potential that was latent in the previous stage.")
]));

content.push(para([
  t("Read through the Augros/Stanciu lens, this entire 13.8-billion-year trajectory\u2014from the Big Bang\u2019s hydrogen and helium through stellar nucleosynthesis, planetary formation, the origin of life, the Cambrian explosion, the rise of mammals, the primate lineage, and the hominid family tree\u2014is a single, continuous act of unfolding. The potential for humanity was present at the Big Bang, encoded in the physical constants and natural laws that govern the universe. It unfolds through billions of years of cosmic, chemical, and biological development. And at the end of this vast preparation\u2014at the moment when the biological substrate is finally ready\u2014God completes the work by breathing a rational soul into the dust of the ground. The dust He has spent 13.8 billion years preparing.")
]));

content.push(heading2("Scientific Reception and Relevance"));

content.push(para([
  t("It must be acknowledged honestly that "),
  ti("The New Biology"),
  t(" received mixed reviews from mainstream biologists. Critics, including R.A. Cooper in a well-known Amazon review, argued that Augros and Stanciu were essentially updating William Paley\u2019s "),
  ti("Natural Theology"),
  t(" (1802) with a teleological view of nature guided by divine artistry. Sir John Eccles, the Nobel laureate in neuroscience, praised the book for its \u201Cemphasis on new ideas in biology\u201D and its discrediting of \u201Creductionist materialism.\u201D The book remains outside the mainstream of evolutionary biology.")
]));

content.push(para([
  t("However, the gap between the Augros/Stanciu proposal and mainstream science has narrowed somewhat since 1987. The discovery of regulatory genes, epigenetics, and the growing recognition that most evolutionary change comes from changes in gene "),
  ti("regulation"),
  t(" rather than the creation of entirely new genes has moved mainstream biology at least partly toward the idea that organisms carry latent developmental potential. The \u201Cevo-devo\u201D (evolutionary developmental biology) revolution has shown that small changes in when and where existing genes are expressed can produce dramatic changes in body plan. This is not identical to the Augros/Stanciu thesis, but it shares the basic intuition that biological form is not generated entirely by random mutation and selection.")
]));

content.push(heading2("Why This Matters for Human Origins"));

content.push(para([
  t("The Augros/Stanciu framework becomes relevant to our synthesis in a specific way. If the primate lineage carries latent potential for increasingly complex forms, then the appearance of near-human hominids\u2014"),
  ti("Homo erectus"),
  t(", "),
  ti("Homo heidelbergensis"),
  t(", and others\u2014is not a random accident but the unfolding of a divinely designed process. These creatures are not defective humans or accidental byproducts. They are the pinnacle of what nature can produce on its own\u2014the biological substrate that God has been preparing for the ultimate creative act: the ensoulment of the first true humans.")
]));

content.push(para([
  t("This distinction is crucial. In the Kemp model, the non-ensouled hominids surrounding Adam and Eve are "),
  ti("biologically identical"),
  t(" to them. The only difference is metaphysical. In our framework, the non-ensouled hominids are "),
  ti("genuinely different"),
  t("\u2014the product of nature\u2019s unfolding, impressive and sophisticated, but observably distinct from the completed human form that God produced through ensoulment. The difference is not invisible. It is manifest in behavior, in cognitive capacity, in the presence or absence of symbolic thought and moral reasoning.")
]));

content.push(heading2("Required vs. Open: What the Church Demands About Creation\u2019s Mechanism"));

content.push(para([
  tb("Required: "),
  t("God is the Creator of all things visible and invisible (Nicene Creed). Creation is not an accident but an act of divine will and wisdom. The human soul cannot be a product of material processes\u2014it is directly created by God ("),
  ti("Humani Generis"),
  t(", \u00A736; CCC \u00A7366). The created world reflects God\u2019s wisdom and can be known through reason (Romans 1:19\u201320; Vatican I, "),
  ti("Dei Filius"),
  t("). These are doctrinal givens.")
]));

content.push(para([
  tb("Open: "),
  t("The Church has not defined the specific mechanism by which God brought about biological complexity. Catholics are free to hold that God used evolutionary processes, that latent potential unfolds through natural law (as Augros and Stanciu propose), or that God intervened directly at key moments\u2014or some combination of these. The Augros/Stanciu model of latent unfolding is one legitimate philosophical interpretation. Standard evolutionary biology\u2019s account of mutation and natural selection is another. The evo-devo synthesis that emphasizes regulatory gene changes is a third. The Church requires that God is the author of the process, whatever the process turns out to be. The details of the mechanism are a matter for science and philosophy, not dogma.")
]));

content.push(pageBreak());

// ===== CHAPTER 6: THE HOMINID FAMILY =====
content.push(heading1("Chapter 6: The Hominid Family Tree\u2014Who Are These Cousins?"));

content.push(para([
  t("Before presenting the synthesis, it is important to understand the cast of characters. The fossil record reveals a rich and complex family of hominid species spanning millions of years. Here are the major players relevant to our discussion.")
]));

content.push(heading2("Homo erectus (Upright Man)"));
content.push(para([
  t("Emerging nearly two million years ago in Africa, "),
  ti("Homo erectus"),
  t(" was the first hominid to spread beyond the African continent. They used stone tools (Acheulean hand axes), controlled fire, and may have constructed simple shelters. Their brains were significantly larger than those of earlier hominids (approximately 900\u20131100 cubic centimeters, compared to modern humans\u2019 average of 1350 cc). They survived for over a million years\u2014an extraordinarily successful species\u2014but show no clear evidence of symbolic thought, art, or ritual burial. In our framework, they represent an earlier stage of the unfolding of latent biological potential\u2014remarkable animals, but not yet the substrate from which God would form Adam.")
]));

content.push(heading2("Homo heidelbergensis (Heidelberg Man)"));
content.push(para([
  t("Named after a jawbone discovered near Heidelberg, Germany, in 1907, "),
  ti("Homo heidelbergensis"),
  t(" lived from roughly 700,000 to 200,000 years ago across Africa, Europe, and possibly western Asia. They are generally considered the last common ancestor of modern humans, Neanderthals, and Denisovans. Their brains were large (1100\u20131400 cc, overlapping with modern human range), they hunted big game cooperatively, built shelters, and controlled fire systematically. Evidence from the Sima de los Huesos site in Spain suggests they may have practiced deliberate burial as early as 400,000 years ago.")
]));

content.push(para([
  t("Critically for our framework, a 2023 genetic study published in "),
  ti("Science"),
  t(" found that the global population of human ancestors was reduced to fewer than 1,300 individuals between 800,000 and 900,000 years ago\u2014an extreme population bottleneck occurring at precisely the time period when "),
  ti("Homo heidelbergensis"),
  t(" was emerging. While mainstream science attributes this to environmental catastrophe, the coincidence of timing with our proposed ensoulment event is striking.")
]));

content.push(para([
  ti("Homo heidelbergensis"),
  t(" originated in Africa, with the oldest material coming from sites in Ethiopia dating to roughly 600,000 years ago, though transitional forms may extend to 875,000 years ago based on skull material from the Melka Kunture Formation in Ethiopia. In early 2026, fossils found in Thomas Quarry, Casablanca, Morocco, dating to precisely 773,000 years ago, were identified as the best candidate for the last common ancestor of "),
  ti("Homo sapiens"),
  t(", Neanderthals, and Denisovans. The fossils exhibit a mix of archaic and modern traits near the base of the sapiens-Neanderthal lineage.")
]));

content.push(heading2("Homo neanderthalensis (Neanderthal Man)"));
content.push(para([
  t("Named after the Neander Valley ("),
  ti("Neander Thal"),
  t(") in Germany where the first recognized fossils were found in 1856, Neanderthals lived across Europe and western Asia from roughly 400,000 to 40,000 years ago. They diverged from the modern human lineage approximately 500,000\u2013650,000 years ago, likely evolving from "),
  ti("Homo heidelbergensis"),
  t(" populations that had migrated into Europe. Cold conditions led them to develop specialized adaptations: stocky builds, wide noses for warming and humidifying air, and short limbs that conserved heat.")
]));

content.push(para([
  t("The evidence for Neanderthal rationality has grown dramatically in recent years. According to the Smithsonian Institution, Neanderthals \u201Cmade and used a diverse set of sophisticated tools, controlled fire, lived in shelters, made and wore clothing, were skilled hunters of large animals and also ate plant foods, and occasionally made symbolic or ornamental objects. There is evidence that Neanderthals deliberately buried their dead and occasionally even marked their graves with offerings, such as flowers. No other primates, and no earlier human species, had ever practiced this sophisticated and symbolic behavior.\u201D")
]));

content.push(para([
  t("In 2018, studies published in the journal "),
  ti("Science"),
  t(" using uranium-thorium dating revealed that Neanderthals created cave paintings in Spain more than 64,000 years ago\u2014at least 20,000 years before modern humans arrived in Europe. As Alistair Pike, professor of archaeological sciences at the University of Southampton, stated: \u201CUndoubtedly it is showing that Neanderthals were thinking and behaving just like modern humans. We should no longer think of them as a different species, just humans in different places.\u201D")
]));

content.push(para([
  t("All modern human populations outside Africa carry approximately 1\u20134% Neanderthal DNA, confirming that interbreeding occurred. In our framework, this is not human-animal hybridization but family reuniting after hundreds of thousands of years of geographic separation.")
]));

content.push(heading2("The Denisovans"));
content.push(para([
  t("The Denisovans are perhaps the most mysterious members of the hominid family. They are known primarily from a few fragmentary fossils found in Denisova Cave in the Altai Mountains of Siberia, and from the Baishiya Karst Cave on the Tibetan Plateau in China. Their name comes simply from the cave where they were discovered. Unlike Neanderthals and "),
  ti("Homo sapiens"),
  t(", there are too few Denisovan fossils to give a complete physical description of the species. Until June 2025, when the Harbin cranium was identified as potentially Denisovan through mitochondrial DNA and autosomal proteomics, they had not even been given a formal species name\u2014they are the first ancient hominid species identified primarily through DNA rather than fossils.")
]));

content.push(para([
  t("DNA evidence suggests that Denisovans shared a common ancestor with Neanderthals approximately 400,000\u2013640,000 years ago. They split from the Neanderthal lineage and moved east into Asia. Denisovan DNA is found at significant levels in modern Melanesian, Australian Aboriginal, and some Southeast Asian populations\u2014approximately 4\u20136% of their genome\u2014indicating substantial interbreeding between Denisovans and the ancestors of these peoples. About 4% of the Denisovan genome itself derives from an unidentified archaic human species that diverged from the modern human lineage over one million years ago, adding yet another layer of complexity to the hominid family tree.")
]));

content.push(para([
  t("In our framework, the Denisovans are simply the eastern branch of Adam\u2019s family\u2014descendants who migrated into Asia and adapted to that environment over hundreds of thousands of years, just as Neanderthals adapted to Europe.")
]));

content.push(heading2("Other Hominids: Homo floresiensis, Homo naledi, and More"));
content.push(para([
  t("The fossil record includes additional hominid species that further illustrate the diversity of the human family. "),
  ti("Homo floresiensis"),
  t(" (\u201CHobbit Man\u201D), discovered on the Indonesian island of Flores, was a diminutive hominid standing only about 3.5 feet tall, with a small brain but evidence of tool use. "),
  ti("Homo naledi"),
  t(", discovered in South Africa\u2019s Rising Star Cave, had a small brain but may have practiced deliberate burial deep in cave systems, and recent claims suggest they created symbolic carvings. "),
  ti("Homo luzonensis"),
  t(" was identified from fossils found in the Philippines. These species lived contemporaneously with "),
  ti("Homo sapiens"),
  t(" in at least some periods, presenting a picture of a world populated by multiple hominid species at the same time.")
]));

content.push(para([
  t("As paleoanthropologist Chris Stringer of the Natural History Museum, London, has noted: \u201CIt is now looking like Africa and Eurasia were inhabited by a whole range of hominin species just a few hundred thousand years ago.\u201D In our framework, these are all branches of the same Adamic family tree, diversified through geographic isolation and environmental adaptation over the vast timescales that Genesis compresses into a few chapters.")
]));

content.push(heading2("The Taxonomic Question: Species or Subspecies?"));
content.push(para([
  t("An important note on classification. In biological taxonomy, Neanderthals are classified either as a separate species ("),
  ti("Homo neanderthalensis"),
  t(") or as a subspecies of "),
  ti("Homo sapiens"),
  t(" ("),
  ti("Homo sapiens neanderthalensis"),
  t("). Scientists do not fully agree. The fact that Neanderthals and modern humans interbred and produced fertile offspring satisfies the classic biological species test for belonging to the same species. The trend in recent research has been toward recognizing greater cognitive and behavioral similarity between Neanderthals and modern humans than was previously assumed. This taxonomic ambiguity actually supports our framework: these are not radically different creatures but closely related members of the same extended family.")
]));

content.push(heading2("Required vs. Open: What the Church Demands About Our Hominid Relatives"));

content.push(para([
  tb("Required: "),
  t("Human beings are made in the image and likeness of God (Genesis 1:27; CCC \u00A7356; "),
  ti("Gaudium et Spes"),
  t(", \u00A712: \u201CAccording to the almost unanimous opinion of believers and unbelievers alike, all things on earth should be related to man as their center and crown\u201D). The human soul is directly created by God and is not the product of material evolution (CCC \u00A7366; "),
  ti("Humani Generis"),
  t(", \u00A736: \u201Cthe Catholic faith obliges us to hold that souls are immediately created by God\u201D). The soul is the substantial form of the body (Council of Vienne, 1312, "),
  ti("Fidei Catholicae"),
  t("; Fifth Lateran Council, 1513, "),
  ti("Apostolici Regiminis"),
  t("; CCC \u00A7365). All true human beings\u2014those possessing rational souls\u2014descend from Adam and Eve ("),
  ti("Humani Generis"),
  t(", \u00A737).")
]));

content.push(para([
  tb("Open: "),
  t("The Church has issued no definitive teaching on the spiritual status of Neanderthals, Denisovans, "),
  ti("Homo erectus"),
  t(", or any other hominid group. The International Theological Commission\u2019s 2004 document \u201CCommunion and Stewardship\u201D acknowledges \u201Cthe emergence of the first members of the human species (whether as individuals or in populations)\u201D without specifying which fossil species counts as human. Pope Pius XII, in "),
  ti("Humani Generis"),
  t(", \u00A736, permitted investigation of bodily evolution from pre-existing living matter but made no pronouncement on which ancestral forms qualify. Whether Neanderthals and Denisovans possessed rational souls, whether they are descendants of Adam, and how they relate to the ensoulment event are all questions of legitimate inquiry. Our framework proposes that all hominid groups showing evidence of symbolic, rational behavior are ensouled descendants of Adam\u2014but this is a theological interpretation, not a dogmatic requirement. A Catholic could coherently hold different views on the spiritual status of Neanderthals without contradicting any defined teaching.")
]));

content.push(pageBreak());

// ===== CHAPTER 7: THE SYNTHESIS =====
content.push(heading1("Chapter 7: The Synthesis\u2014A Proposed Framework"));

content.push(para([
  t("Having surveyed the evidence and the existing models, we are now in a position to present the framework that this document proposes. It attempts to satisfy all of the following constraints simultaneously:")
]));

content.push(para([
  t("Catholic monogenism: Adam and Eve are the first and only ensouled humans, and every true human being descends from them. Original sin is transmitted through descent, as the Council of Trent requires. The genetic diversity we observe in modern human populations must be accounted for without requiring impossible genetics from a single pair. The \u201Cother people\u201D Cain fears and the wife he finds must be explained. Mating with biologically identical soulless beings (the \u201Csoulless twin\u201D problem) must be avoided. The various hominid groups in the fossil record must be accounted for. And the evidence of rational, symbolic behavior in Neanderthals and Denisovans must be explained.")
]));

content.push(heading2("The Framework"));

content.push(heading3("Stage One: The Preparation (Billions of Years to ~1 Million Years Ago)"));
content.push(para([
  t("God\u2019s creation unfolds over billions of years through processes built into nature. Through something like the mechanism Augros and Stanciu describe\u2014latent biological potential unfolding in stages\u2014the primate lineage produces increasingly sophisticated hominids. "),
  ti("Homo habilis"),
  t(" gives way to "),
  ti("Homo erectus"),
  t(", which gives way to "),
  ti("Homo heidelbergensis"),
  t(". Each stage is genuinely different from the last\u2014different brain size, different tool traditions, different behavioral complexity. These are not slight variations. They represent the progressive unfolding of a divinely guided process.")
]));

content.push(para([
  t("By roughly 900,000 to 1,000,000 years ago, this process has produced beings that are biologically very close to what we would call human. They have complex brains, they use tools, they control fire, they live in social groups. But they lack rational souls. They are the most sophisticated animals on earth\u2014but they are still animals. In Thomistic philosophy, they possess "),
  ti("sensitive souls"),
  t(" (the capacity to perceive, feel, respond, and learn) but not "),
  ti("rational souls"),
  t(" (the capacity for abstract thought, moral reasoning, self-awareness, and knowledge of God).")
]));

content.push(heading3("Stage Two: The Act of God (~750,000\u20131,000,000 Years Ago)"));
content.push(para([
  t("God acts directly. He takes material from this lineage\u2014\u201Cformed man from the dust of the ground\u201D (Genesis 2:7)\u2014and creates Adam. The \u201Cdust of the ground\u201D is the biological substrate that the entire creative process has been building toward. God is not working from nothing; He is completing what He has been preparing. The ensoulment is not just adding an invisible property to an unchanged body. Catholic teaching holds that the rational soul is the "),
  ti("form"),
  t(" of the body (Council of Vienne, 1312). It transforms the whole being. As William Lane Craig puts it, \u201CGod\u2019s creation of Adam and Eve plausibly required both biological and spiritual renovations, biological to equip their brains with the capacity to serve as instruments of rational thought and spiritual to furnish them with rational souls.\u201D")
]));

content.push(para([
  t("Eve is then created from Adam\u2014\u201Cfrom his side\u201D\u2014however one understands this: a second direct creative act using Adam\u2019s biological material as substrate, ensuring that the two ensouled beings share the same nature completely.")
]));

content.push(para([
  t("The result is a being that is "),
  ti("genuinely different"),
  t(" from the hominids around him. Not just invisibly, metaphysically different. Actually, observably different. Adam can think abstractly. He can recognize God. He can name things\u2014which in Genesis is an act of intellectual comprehension, not just labeling. He understands moral categories. He can choose. None of the surrounding hominids can do these things, because these capacities require the rational soul, and the rational soul transforms the whole being.")
]));

content.push(para([
  t("They are placed in the Garden. They fall. They are expelled into the wider world.")
]));

content.push(heading3("Stage Three: The Early Generations"));
content.push(para([
  t("Now Adam\u2019s descendants are among the non-ensouled hominid population. Their children need mates. And here we encounter the most theologically delicate aspect of the framework.")
]));

content.push(para([
  t("The near-human hominids produced by the natural unfolding process are not chimps. They are not radically different animals. They are beings biologically very similar to Adam and Eve\u2014produced by the same divinely guided process that produced Adam\u2019s body\u2014but they are genuinely distinct. Think of the difference between "),
  ti("Homo erectus"),
  t(" and modern humans: real, measurable, significant\u2014but not so different that interbreeding is impossible, just as "),
  ti("Homo sapiens"),
  t(" and Neanderthals were different enough to be classified separately but similar enough to produce fertile offspring.")
]));

content.push(para([
  t("Is such interbreeding bestiality? This is where the Abraham and Jacob precedent becomes crucial. Paul writes in Romans 5:13, \u201CSin is not counted where there is no law.\u201D Abraham, the \u201CFather in Faith,\u201D had children by Hagar and Keturah while married to Sarah. Jacob fathered the twelve tribes of Israel through four different women\u2014Leah, Rachel, Bilhah, and Zilpah. These arrangements are not presented as scandalous in the text; they are the normal way God\u2019s plan unfolds at that stage of salvation history. The Mosaic law against such arrangements had not yet been given.")
]));

content.push(para([
  t("The same principle applies to the earliest generations after creation. Catholic theology already holds that sibling marriage was "),
  ti("permitted by necessity"),
  t(" in the first generations of Adam\u2019s children, even though it later became prohibited. The same logic extends: before the moral law was promulgated, interbreeding with near-human hominids\u2014beings 99%+ biologically similar to humans, produced by the same divinely guided process\u2014was tolerated by God as the necessary means of establishing the human race\u2019s genetic diversity. Not ideal, but not the same category as bestiality with an animal of radically different nature, and not subject to moral prohibition before such prohibition was given.")
]));

content.push(para([
  t("Critically, every child of such a union receives a rational soul from God, because it descends from Adam. The soul does not come from the non-ensouled parent; it comes from God directly, triggered by descent from the ensouled lineage. This is consistent with Catholic teaching that every human soul is individually created by God (Catechism, \u00A7366).")
]));

content.push(heading3("Stage Four: The Dispersal (~500,000\u2013300,000 Years Ago)"));
content.push(para([
  t("Over generations, the ensouled population grows. The rational soul propagates through descent. The genetic diversity of the broader hominid population is absorbed into the human lineage through interbreeding. Eventually, every living hominid is descended from Adam and has a rational soul.")
]));

content.push(para([
  t("As the ensouled population grows and spreads\u2014out of Africa, into Europe, into Asia\u2014geographic isolation and climate adaptation produce the various hominid groups we find in the fossil record. Around 300,000 years ago, a severe cold, dry period turned the Sahara into an impassable barrier, isolating African and European populations. European populations adapted to cold environments and developed the stocky builds and specialized features of the Neanderthals. Eastern populations became the Denisovans. African populations eventually became anatomically modern "),
  ti("Homo sapiens"),
  t(".")
]));

content.push(para([
  t("But by this point\u2014and this is the critical claim\u2014"),
  tb("all of these populations are already fully ensouled descendants of Adam"),
  t(". That is why Neanderthals create cave art, bury their dead, wear jewelry, make musical instruments, and collect objects of no practical value. That is why Denisovans contributed genetic material to modern human populations through interbreeding. They are not separate creations, not soulless near-humans, not animals. They are Adam\u2019s children, adapted to different environments over hundreds of thousands of years.")
]));

content.push(heading3("Stage Five: The Reunion (~100,000\u201340,000 Years Ago)"));
content.push(para([
  t("When anatomically modern "),
  ti("Homo sapiens"),
  t(" migrate out of Africa and encounter Neanderthals in Europe and Denisovans in Asia, the interbreeding that the genetic evidence documents is family reuniting after long separation. All modern human populations outside Africa carry 1\u20134% Neanderthal DNA. Melanesian and Australian Aboriginal populations carry 4\u20136% Denisovan DNA. A first-generation hybrid child of a Neanderthal mother and Denisovan father (\u201CDenny\u201D) has been identified from a bone fragment found in Denisova Cave. This is not evidence against monogenism. It is evidence "),
  ti("for"),
  t(" it\u2014evidence of a single family tree reconnecting.")
]));

content.push(heading2("Required vs. Open: What the Church Demands of This Synthesis"));

content.push(para([
  tb("Required: "),
  t("The dogmatic requirements constraining this synthesis are drawn from the highest levels of Church authority. Adam and Eve must be real, historical individuals ("),
  ti("Humani Generis"),
  t(", \u00A737: the faithful \u201Ccannot embrace that opinion which maintains\u2026 that Adam represents a certain number of first parents\u201D). All humans must descend from them through biological generation (Council of Trent, Session V, Canon 3: original sin \u201Cin its origin is one, and being transfused into all by propagation, not by imitation\u201D). The soul must be directly created by God in each individual (CCC \u00A7366; "),
  ti("Humani Generis"),
  t(", \u00A736). The soul is the form of the body, transforming the whole being (Council of Vienne, 1312). The Fall was a real event with real consequences for all humanity (CCC \u00A7390; Council of Trent, Session V, Canons 1\u20132). Our framework is constructed specifically to satisfy every one of these requirements.")
]));

content.push(para([
  tb("Open: "),
  t("The specific date of ensoulment (our proposal of 750,000 to 1,000,000 years ago), the identification of Adam with "),
  ti("Homo heidelbergensis"),
  t(", the mechanism of early interbreeding, the exact timeline of dispersal, and the claim that all post-dispersal hominid groups are ensouled\u2014these are all interpretive proposals operating within the open space Catholic theology permits. The International Theological Commission (2004) acknowledged that \u201Cthe story of human origins is complex and subject to revision,\u201D and "),
  ti("Humani Generis"),
  t(", \u00A736, permits inquiry into bodily evolution \u201Cin as far as it inquires into the origin of the human body as coming from pre-existent and living matter.\u201D The Pontifical Biblical Commission (1909) confirmed that Catholics may interpret the \u201Cdays\u201D of Genesis as periods of time. A Catholic could accept our framework\u2019s dogmatic foundations while differing on its specific scientific and historical claims. The synthesis is offered as a coherent possibility, not as a binding interpretation.")
]));

content.push(pageBreak());

// ===== CHAPTER 8: CAIN AND ABEL =====
content.push(heading1("Chapter 8: The Cain and Abel Problem"));

content.push(para([
  t("If Adam and Eve are the first humans and the Fall happens before any children are born, then when Cain kills Abel and is exiled to the land of Nod, where are the other people he fears? Where does his wife come from?")
]));

content.push(para([
  t("Genesis itself never explains this, regardless of timescale. The text simply introduces other people without accounting for them. This is a puzzle under any reading of Genesis\u2014young earth, old earth, or otherwise.")
]));

content.push(para([
  t("Under the deep-time framework presented here, the resolution is straightforward. Adam and Eve fall before reproducing. They then have children. Over many generations\u2014compressed by Genesis into a few verses\u2014the population grows substantially. By the time the Cain and Abel event occurs, there are enough people for Cain to fear strangers and find a wife in Nod.")
]));

content.push(para([
  t("But in the earliest period, before the ensouled population has fully absorbed the broader hominid population, the \u201Cother people\u201D Cain fears may include near-human hominids who are not yet part of the ensouled lineage. These beings are dangerous not because they are evil in a moral sense but because they are sophisticated animals without moral reasoning\u2014like encountering a group of very intelligent, very strong primates who do not recognize murder as wrong.")
]));

content.push(para([
  t("Cain and Abel, critically, are not necessarily the first and second children of Adam and Eve. They are the first "),
  ti("narratively and theologically important"),
  t(" children. Genesis handles genealogy this way throughout\u2014it skips generations freely, gives the significant figures, and compresses potentially vast stretches of time. Matthew\u2019s genealogy of Jesus famously skips known kings. The Hebrew word for \u201Cson of\u201D ("),
  ti("ben"),
  t(") also means \u201Cdescendant of.\u201D The text is giving theological narrative, not a census.")
]));

content.push(heading2("Required vs. Open: What the Church Demands About Cain, Abel, and the \u201COther People\u201D"));

content.push(para([
  tb("Required: "),
  t("The narrative of the Fall conveys a real, historical event\u2014\u201Ca deed that took place at the beginning of the history of man\u201D (CCC \u00A7390). Sin and its consequences are real. The theological truths embedded in the Cain and Abel story\u2014that sin escalates, that violence follows disobedience, that God holds us accountable\u2014are matters of faith and morals.")
]));

content.push(para([
  tb("Open: "),
  t("Whether Cain and Abel were literally the first and second children born to Adam and Eve, who the \u201Cother people\u201D were, where Nod was located, and the chronological scope of the narrative are all open questions. The Catechism acknowledges that Genesis uses \u201Cfigurative language\u201D (\u00A7390), and the Pontifical Biblical Commission\u2019s 1948 letter grants liberty regarding the literary forms of Genesis 1\u201311. The identity of Cain\u2019s wife has been an open question since the patristic era\u2014Augustine addressed it, as did Aquinas\u2014and the Church has never issued a definitive answer.")
]));

content.push(pageBreak());

// ===== CHAPTER 9: GENETIC DIVERSITY =====
content.push(heading1("Chapter 9: The Genetic Diversity Problem\u2014Honestly Addressed"));

content.push(para([
  t("The most scientifically challenging aspect of any monogenist framework is the genetic diversity problem. It deserves honest treatment.")
]));

content.push(heading2("The Problem Stated"));
content.push(para([
  t("Two individuals can carry at most four versions (alleles) of any given gene. Modern human populations carry thousands of variants at many gene loci. The HLA immune system genes\u2014critical for disease resistance\u2014are among the most polymorphic in the human genome, with some variants that appear to predate the human-chimpanzee split (approximately 6\u20137 million years ago). In 1998, geneticist Francisco Ayala presented this evidence to the United States Catholic Bishops, arguing that the diversity at HLA loci was too great to have passed through a bottleneck as narrow as a single couple.")
]));

content.push(para([
  t("Some have proposed that Adam and Eve were created with enormous heterozygosity\u2014far more genetic variation packed into two individuals than any natural pair would have. This is the \u201Cfront-loaded genome\u201D hypothesis. It must be acknowledged honestly that this is scientifically very weak. Four alleles per locus cannot account for thousands of variants. And the "),
  ti("pattern"),
  t(" of diversity matters as much as the "),
  ti("amount"),
  t("\u2014population genetics can detect whether diversity has the statistical signature of passing through a large population versus a pair, and modern human diversity bears the signature of a population.")
]));

content.push(heading2("How Our Framework Addresses It"));
content.push(para([
  t("Our framework addresses the genetic diversity problem through two mechanisms working together.")
]));

content.push(para([
  t("First, "),
  tb("deep time"),
  t(". By placing Adam and Eve at 750,000 to 1,000,000 years ago, we allow an enormous span for population growth, mutation, genetic drift, and diversification from the original pair. The further back the pair is placed, the more time exists for diversity to accumulate naturally. This alone does not fully resolve the problem\u2014population geneticists would argue that even at these timescales, the allelic diversity patterns don\u2019t fit a two-person bottleneck\u2014but it significantly narrows the gap.")
]));

content.push(para([
  t("Second, "),
  tb("early interbreeding with near-human hominids"),
  t(". As the earliest generations of Adam\u2019s descendants interbreed with the biologically compatible but non-ensouled hominid population, the genetic diversity of that broader population enters the human lineage. This is the same mechanism by which Neanderthal and Denisovan DNA entered the modern human genome\u2014interbreeding between related but distinct populations. The genetic diversity was already present in the broader hominid population, having accumulated over millions of years. It enters the ensouled human lineage through interbreeding almost immediately after the ensoulment event.")
]));

content.push(para([
  t("This leads to a crucial point: "),
  tb("our framework does not predict a two-person genetic bottleneck"),
  t(". The ensoulment of two individuals within an existing population, followed by immediate interbreeding with that population, would be "),
  ti("genetically invisible"),
  t(". A population geneticist can truthfully say, \u201CWe see no evidence of a two-person bottleneck.\u201D Our framework can respond, \u201CCorrect\u2014you wouldn\u2019t, because the genetic population was never two. Only the spiritual origin was two.\u201D")
]));

content.push(heading2("The Unfalsifiability Objection"));
content.push(para([
  t("A scientist would correctly note that this makes the ensoulment claim unfalsifiable\u2014it cannot be tested or disproven by genetic evidence. This is true. But unfalsifiable is not the same as implausible. Many scientific hypotheses involve unobservable causes inferred from observable effects. Dark matter is unobservable\u2014we infer it from gravitational effects. Our framework infers ensoulment from the observable effects of rational, symbolic behavior appearing in the archaeological record.")
]));

content.push(para([
  t("The honest position is this: the genetic evidence does not "),
  ti("confirm"),
  t(" our framework (it cannot, since ensoulment is not a genetic event), but it also does not "),
  ti("refute"),
  t(" it (since the genetic population was never two). The framework is compatible with the evidence without being provable by it.")
]));

content.push(heading2("Required vs. Open: What the Church Demands About Genetic Origins"));

content.push(para([
  tb("Required: "),
  t("Monogenism\u2014all humans descend from one original pair. This is stated clearly in "),
  ti("Humani Generis"),
  t(" \u00A737 and is grounded in the Council of Trent\u2019s teaching that original sin is \u201Cin its origin one\u201D and is transmitted \u201Cby propagation, not by imitation.\u201D The framework must account for universal descent from Adam and Eve.")
]));

content.push(para([
  tb("Open: "),
  t("The mechanism by which genetic diversity arose from a founding pair is entirely open. Whether Adam and Eve were created with extraordinary heterozygosity, whether diversity entered through interbreeding with a broader hominid population, or whether some combination of deep time, mutation, and population dynamics accounts for it\u2014these are scientific questions on which the Church has no dogmatic position. The Church teaches "),
  ti("that"),
  t(" all humans descend from Adam, not "),
  ti("how"),
  t(" the genetic mathematics work out. Catholics are free to explore any mechanism that preserves universal Adamic descent.")
]));

content.push(pageBreak());

// ===== CHAPTER 10: CONSCIOUSNESS =====
content.push(heading1("Chapter 10: The Hard Problem of Consciousness\u2014The Strongest Argument"));

content.push(para([
  t("The strongest evidence for a divine act in human origins is not a gap in the fossil record. It is a gap in scientific explanation itself.")
]));

content.push(para([
  t("In 1994, philosopher David Chalmers identified what he called the \u201Chard problem of consciousness.\u201D The \u201Ceasy problems\u201D of consciousness\u2014how the brain integrates information, categorizes stimuli, focuses attention\u2014are amenable to standard neuroscience. They are difficult in practice but not in principle. The hard problem is different: even after all the relevant functional facts are explained, there remains a further question\u2014why is the performance of these functions accompanied by subjective "),
  ti("experience"),
  t("? Why does it feel like something to be you?")
]));

content.push(para([
  t("Ian Tattersall, curator of anthropology at the American Museum of Natural History, puts it bluntly: \u201CWe have no idea how the brain translates a mass of electrochemical symbols into what we subjectively experience as consciousness. As long as we don\u2019t understand that, we really won\u2019t know what symbolism means in terms of brain architecture and mental process.\u201D")
]));

content.push(para([
  t("This is not a theological claim. It is a claim made by secular scientists and philosophers. The hard problem of consciousness is recognized across disciplines as potentially unsolvable within a purely materialist framework. Some philosophers (Daniel Dennett, for example) deny the problem exists; others (like Chalmers) argue it points to something fundamental about the relationship between mind and matter that our current science cannot explain.")
]));

content.push(heading2("What This Means for Our Framework"));

content.push(para([
  t("A dog has a complex brain. A dog processes information, responds to stimuli, shows something like emotion. But a dog does not ask why it exists. A dog does not create art for aesthetic contemplation. A dog does not bury its dead with ritual significance. A dog does not reason abstractly about justice or contemplate the existence of God.")
]));

content.push(para([
  t("The gap between the most sophisticated animal cognition and the simplest human rational thought is not a matter of degree\u2014it is a matter of kind. Catholic philosophy calls this the difference between a sensitive soul (which animals possess) and a rational soul (which only humans possess). The hard problem of consciousness is, from the Catholic perspective, not a problem at all. It is exactly what you would expect if human rational thought originates not from matter but from an immaterial rational soul created directly by God.")
]));

content.push(para([
  t("The appearance of rational, symbolic behavior in the hominid record\u2014burial of the dead, creation of art, body ornamentation, collection of objects with no practical purpose, the creation of musical instruments\u2014marks the point at which ensouled beings, children of Adam, began to leave their traces in the world. Science can document "),
  ti("when"),
  t(" this behavior appears. It can describe the brain structures associated with it. What it cannot do\u2014and what its leading philosophers openly acknowledge it cannot do\u2014is explain "),
  ti("why"),
  t(" physical processes produce subjective experience, self-awareness, moral reasoning, or the capacity for abstract thought.")
]));

content.push(para([
  t("This is the \u201Cjump\u201D\u2014not a missing fossil, not a gap in the geological record, but an explanatory gap at the very foundation of science\u2019s understanding of the human mind. Catholic theology offers a straightforward answer: these capacities exist because they originate not from matter alone but from the rational soul, which God alone creates.")
]));

content.push(heading2("Required vs. Open: What the Church Demands About the Soul and Consciousness"));

content.push(para([
  tb("Required: "),
  t("The rational soul is directly created by God and is immaterial\u2014it is not \u201Cproduced\u201D by the parents (CCC \u00A7366). The soul is the form of the body (Council of Vienne, 1312; CCC \u00A7365). Human dignity is grounded in the fact that human beings are made in the image of God, possessing intellect and free will (CCC \u00A71700\u20131706). The difference between human beings and animals is not merely one of degree but of kind\u2014the rational soul confers capacities that matter alone cannot produce.")
]));

content.push(para([
  tb("Open: "),
  t("The relationship between brain structures and rational thought, the precise mechanisms by which the immaterial soul interacts with the material body, and the philosophical analysis of the hard problem of consciousness are all open questions. Whether the hard problem is genuinely unsolvable or merely unsolved, whether animal cognition admits of degrees that blur the line more than traditional Thomistic categories suggest, and how exactly to interpret the archaeological evidence of symbolic behavior\u2014these are matters of legitimate philosophical and scientific debate. The Church requires the reality of the rational soul. It does not require any particular theory of consciousness or any specific account of how soul and brain interact.")
]));

content.push(pageBreak());

// ===== CHAPTER 11: ORIGINAL SIN =====
content.push(heading1("Chapter 11: Original Sin and the Nature of the Fall"));

content.push(para([
  t("The Catholic claim about original sin is not that humanity has a design flaw that education, politics, technology, or evolution can fix. It is that humanity has a spiritual wound that only grace can heal.")
]));

content.push(para([
  t("This is one of the most empirically testable claims in theology. Every civilization, every philosophy, every political system has grappled with the fact that human beings consistently choose wrong even when they know better. We build systems of justice because people are unjust. We write laws because people break them. No culture has ever had to teach children to be selfish\u2014selfishness is the default, not a learned behavior.")
]));

content.push(para([
  t("Every utopian project in history\u2014every attempt to perfect humanity through education, revolution, social engineering, or technology\u2014has failed. Not because the attempts were poorly executed, but because the people executing them carried the same wound they were trying to cure. The revolution devours its children. The reformers become tyrants. The technology designed to liberate becomes a tool of control.")
]));

content.push(para([
  t("If original sin were ignorance, education would fix it. If it were bad social structures, politics would fix it. If it were evolutionary selfishness, we could evolve past it. The Catholic position is that none of these work at the fundamental level because the problem is spiritual, not material. Only grace heals it\u2014grace that comes from outside us, from God, through the sacraments and ultimately through Christ\u2019s redemptive act.")
]));

content.push(heading2("Biological Death and Spiritual Death"));
content.push(para([
  t("One tension within our framework deserves acknowledgment. Traditional Catholic teaching has sometimes been read as claiming that physical death itself is a consequence of the Fall\u2014that Adam and Eve, had they not sinned, would never have died bodily. This is difficult to maintain in light of the fossil record, which shows that animals had been dying for hundreds of millions of years before any human existed.")
]));

content.push(para([
  t("The more defensible position, and one well-supported in the Catholic tradition, is that biological death was natural all along\u2014part of the created order for all living things, including the biological substrate from which God formed Adam. What the Fall introduced was "),
  ti("spiritual death"),
  t("\u2014separation from God, the loss of sanctifying grace, the transformation of natural death from a safe passage (under the preternatural gift of bodily immortality that God offered) into something final and terrifying. As the Society of Catholic Scientists explains: \u201CThe traditional Catholic doctrine is that the first humans were offered bodily immortality for themselves and their descendants as a preternatural gift\u2014a gift that goes beyond what is natural\u2014on the condition that they would not transgress the commandment God had given them.\u201D Ecclesiastes 3:19 itself acknowledges: \u201CSurely the fate of human beings is like that of the animals; the same fate awaits them both. As one dies, so dies the other.\u201D")
]));

content.push(heading2("Required vs. Open: What the Church Demands About Original Sin and the Fall"));

content.push(para([
  tb("Required: "),
  t("Original sin is real. It was committed by a real, historical Adam. It is transmitted to all his descendants through generation, not imitation (Council of Trent, Session V, Canons 1\u20134). All humans are born in a state of original sin and require baptism for its remission. The Fall resulted in the loss of sanctifying grace and of the preternatural gifts God had bestowed. Only the grace of Christ, applied through the sacraments, heals the wound of original sin. These are dogmatic, non-negotiable teachings.")
]));

content.push(para([
  tb("Open: "),
  t("Whether physical death was a consequence of the Fall or only spiritual death is a matter of legitimate theological discussion. The nature of the preternatural gifts (bodily immortality, freedom from suffering, infused knowledge, integrity of the passions) and their exact scope are debated among theologians. The precise mechanism by which original sin is \u201Ctransmitted through generation\u201D\u2014whether this is a biological, metaphysical, or combined process\u2014has been discussed by theologians from Augustine to the present without a definitive resolution. The Catechism itself acknowledges that original sin\u2019s transmission is \u201Ca mystery that we cannot fully understand\u201D (\u00A7404). What the Church requires is the "),
  ti("fact"),
  t(" of transmission through descent. The "),
  ti("mechanism"),
  t(" remains open.")
]));

content.push(pageBreak());



// ===== CHAPTER 12: THE BOTTLENECK, THE FLOOD, AND UNIVERSAL MEMORY =====
content.push(heading1("Chapter 12: The Bottleneck, the Flood, and the Memory of Near-Extinction"));

content.push(para([
  t("Before exploring the connection between the population bottleneck and the Genesis Flood, it is essential to distinguish clearly between what the Catholic Church "),
  ti("requires"),
  t(" its faithful to believe and what it leaves open to legitimate inquiry. This distinction matters enormously for what follows.")
]));

content.push(heading2("What the Church Requires: Dogmatic Teachings"));

content.push(para([
  t("On Adam and Eve, the Church\u2019s teaching is dogmatic and non-negotiable. The Council of Trent (1546), Session V, Canon 1, declares under anathema: \u201CIf anyone does not confess that the first man, Adam, when he had transgressed the commandment of God in Paradise, immediately lost the holiness and justice in which he had been constituted\u2026 let him be anathema.\u201D Canon 2 adds: \u201CIf anyone asserts that the prevarication of Adam injured himself alone, and not his posterity; and that the holiness and justice, received of God, which he lost, he lost for himself alone, and not for us also\u2026 let him be anathema.\u201D Canon 3 states that this sin of Adam, \u201Cwhich in its origin is one, and being transfused into all by propagation, not by imitation, is in each one as his own.\u201D")
]));

content.push(para([
  t("Pope Pius XII, in "),
  ti("Humani Generis"),
  t(" (1950), paragraph 37, made this even more explicit: \u201CThe faithful cannot embrace that opinion which maintains that either after Adam there existed on this earth true men who did not take their origin through natural generation from him as from the first parent of all, or that Adam represents a certain number of first parents. Now it is in no way apparent how such an opinion can be reconciled with that which the sources of revealed truth and the documents of the Teaching Authority of the Church propose with regard to original sin, which proceeds from a sin actually committed by an individual Adam and which, through generation, is passed on to all and is in everyone as his own.\u201D")
]));

content.push(para([
  t("The Catechism of the Catholic Church (\u00A7390) states that the account of the Fall \u201Cuses figurative language, but affirms a primeval event, a deed that took place at the beginning of the history of man.\u201D Paragraph 366 teaches that \u201Cevery spiritual soul is created immediately by God\u2014it is not \u2018produced\u2019 by the parents.\u201D")
]));

content.push(para([
  t("From these sources, the following are dogmatically required beliefs for Catholics:")
]));

content.push(para([
  tb("1. "),
  t("Adam was a real, historical individual\u2014not a symbol, not a metaphor, not \u201Ca certain number of first parents.\u201D")
]));
content.push(para([
  tb("2. "),
  t("Adam committed an actual sin (the Fall), and lost holiness and justice for himself and for all his posterity.")
]));
content.push(para([
  tb("3. "),
  t("Original sin is transmitted through generation (propagation), not imitation\u2014meaning all humans must biologically descend from Adam.")
]));
content.push(para([
  tb("4. "),
  t("Every human soul is directly created by God.")
]));
content.push(para([
  tb("5. "),
  t("The human body may have evolved from pre-existing living matter, but the soul cannot have evolved\u2014it is directly created by God ("),
  ti("Humani Generis"),
  t(", paragraph 36).")
]));

content.push(para([
  t("Our framework satisfies every one of these requirements. Adam is a real individual. He commits an actual sin. All humans descend from him biologically. Every soul is directly created by God. The human body is formed from pre-existing biological material (\u201Cdust of the ground\u201D). Nothing in our synthesis contradicts any dogmatic teaching.")
]));

content.push(heading2("How Science Shows This Is Possible"));

content.push(para([
  t("The standard scientific objection to monogenism\u2014that two individuals cannot generate the genetic diversity we observe\u2014is addressed in our framework through two mechanisms. First, deep time: placing Adam and Eve at 750,000 to 1,000,000 years ago provides an enormous span for diversity to accumulate. Second, early interbreeding with the broader hominid population brings that population\u2019s pre-existing genetic diversity into the Adamic lineage. The genetic population was never two; only the theological origin was two. This means the framework does not predict a two-person genetic bottleneck, and the genetic evidence against such a bottleneck does not refute it.")
]));

content.push(para([
  t("The 2023 study in "),
  ti("Science"),
  t(" by Hu et al. independently confirmed a severe population bottleneck to approximately 1,280 breeding individuals between 800,000 and 930,000 years ago\u2014at precisely the time our framework places the ensoulment event. This bottleneck is consistent with the transition our framework describes: a small ensouled population emerging from and gradually replacing the broader non-ensouled hominid population.")
]));

content.push(heading2("What the Church Does Not Require: Open Questions"));

content.push(para([
  t("On Noah and the Flood, the Church\u2019s position is markedly different from its position on Adam. There is no dogmatic definition requiring belief in a literal global flood, a literal wooden ark, or a literal eight survivors.")
]));

content.push(para([
  t("The Catholic Answers apostolate summarizes the Church\u2019s position clearly: the Church \u201Cdoes not prohibit interpretations of Genesis 6\u20138 that include a worldwide flood, but neither does the Church require there to be a worldwide flood.\u201D Pius XII\u2019s own "),
  ti("Humani Generis"),
  t(" (paragraph 38) described the first eleven chapters of Genesis as conveying principal truths fundamental for salvation in \u201Csimple and metaphorical language adapted to the mentality of a people but little cultured.\u201D")
]));

content.push(para([
  t("The 1948 letter from the Pontifical Biblical Commission to Cardinal Suhard of Paris granted Catholic scholars considerable liberty regarding \u201Cthe literary genre of the first eleven chapters of Genesis,\u201D noting that \u201Cthese literary forms do not correspond exactly with any classical category\u201D and that their \u201Chistoricity can neither be denied nor affirmed simply.\u201D")
]));

content.push(para([
  t("The Catholic Encyclopedia\u2019s entry on the Deluge acknowledged that the question of whether the Flood narrative should be \u201Cconsidered as strictly historical throughout, or only in their outward form\u201D is legitimate. It noted that the view which preserves \u201Cunder the embroidery of poetical parlance, the memory of a fact handed down by a very old tradition\u201D could \u201Cbe readily accepted by a Catholic.\u201D")
]));

content.push(para([
  t("What the Church "),
  ti("does"),
  t(" require regarding the Flood is this: the narrative conveys real theological truth. God judges sin. God saves the righteous. God offers new beginnings. The Fathers of the Church regarded the Ark and the Flood as types (prefigurations) of baptism and the Church, based on 1 Peter 3:20, and this typological significance belongs to matters of faith and morals. Jesus himself referred to Noah as a historical figure (Matthew 24:37\u201339, Luke 17:26\u201327). There must be "),
  ti("some"),
  t(" real event underlying the narrative\u2014but its scope, mechanism, exact number of survivors, and chronological placement are all open questions.")
]));

content.push(para([
  t("This gives our framework genuine latitude. We need Adam and Eve to be real, historical, first parents of all humanity\u2014the Church demands this dogmatically. With Noah, we need a real event of divine judgment and preservation, but the details are legitimately open to interpretation informed by science.")
]));

content.push(heading2("The Bottleneck as the Flood"));

content.push(para([
  t("In Chapter 4, we noted that the 2023 "),
  ti("Science"),
  t(" study identified a bottleneck of approximately 1,280 individuals lasting roughly 117,000 years. We called its timing \u201Cstriking\u201D without explaining why. The explanation is this.")
]));

content.push(para([
  t("Our framework proposes that God ensouled Adam and Eve within an existing hominid population around 750,000 to 1,000,000 years ago. If their descendants began interbreeding with and gradually replacing the non-ensouled population, you would expect the broader hominid population to decline\u2014either absorbed into the ensouled lineage or outcompeted by beings with rational souls and the cognitive advantages they confer. A massive population crash at precisely the proposed moment of ensoulment could represent exactly this transition: the old, non-ensouled population collapsing while the new, ensouled lineage emerges.")
]));

content.push(para([
  t("The study\u2019s authors acknowledged difficulty identifying a specific environmental cause sufficient to explain such an extreme and prolonged bottleneck. Our framework offers an alternative reading: this is not a catastrophe that nearly destroyed humanity. It is the "),
  ti("birth"),
  t(" of humanity\u2014the narrow passage through which the ensouled lineage emerged. What science sees as a bottleneck, theology reads as a beginning.")
]));

content.push(para([
  t("The theological structure of the Genesis Flood\u2014divine judgment, near-extinction, a tiny remnant surviving to repopulate the earth\u2014matches the structure of the bottleneck event. If we read the Flood as a compressed account of this bottleneck, with Noah\u2019s family representing the narrative focus rather than the literal total (just as Genesis compresses vast timescales elsewhere), we preserve the theological truth the Church requires while placing it within a scientifically documented event.")
]));

content.push(heading2("Why the Human Genome Rules Out Eight Survivors"));

content.push(para([
  t("Intellectual honesty requires addressing a question that naturally arises: does the human genome show evidence of an eight-person bottleneck, as a literal reading of Noah\u2019s Flood would require? The answer is no\u2014and since the Church does not require belief in a literal eight survivors, this is not a problem for our framework.")
]));

content.push(para([
  t("If the entire human race had passed through a bottleneck of eight individuals at any point, the genetic consequences would be severe and detectable. Eight people carry a maximum of sixteen alleles per genetic locus. Modern human populations carry thousands of variants at many gene loci. The HLA immune system genes alone have hundreds of allelic variants, some of which diverged millions of years ago. Population geneticists can detect whether diversity has the statistical signature of passing through a large population versus a tiny one, and modern human diversity bears the signature of a population in the low thousands, not single digits.")
]));

content.push(para([
  t("The well-known \u201C50/500 rule\u201D in conservation biology suggests that a minimum of 50 individuals is needed to prevent inbreeding depression in the short term, and 500 to guard against genetic drift over the long term. For mammals like humans, a minimum viable population generally ranges from 500 to 5,000 individuals.")
]));

content.push(para([
  t("Nature has shown that species "),
  ti("can"),
  t(" survive extreme bottlenecks\u2014northern elephant seals recovered from approximately 20 individuals, and cheetahs from a similarly severe crash\u2014but these species carry obvious genetic scars: extraordinarily low diversity, vulnerability to disease, and in the cheetahs\u2019 case, the ability to accept skin grafts between unrelated individuals because they are so genetically similar. Humans show nothing like this. We have enough genetic diversity for organ transplant rejection between siblings. Our bottleneck, whatever it was, was not as severe as eight.")
]));

content.push(para([
  t("The approximately 1,280-person bottleneck identified by the 2023 study fits the evidence precisely. It is severe\u2014below the 500-individual threshold for avoiding genetic drift\u2014but it is recoverable without catastrophic genetic damage. And since the Church does not require a literal eight, this is where our framework rests: the Flood as a compressed theological account of a real, scientifically documented near-extinction event involving a population in the low thousands.")
]));

content.push(heading2("The Universal Memory: Flood Stories Across the World"));

content.push(para([
  t("Perhaps the most fascinating dimension of the Flood question is this: flood narratives appear across cultures worldwide, including cultures with no contact with each other or with the biblical tradition. Scholars have catalogued more than 270 distinct flood narratives from cultures around the world. The breadth of this distribution is genuinely striking.")
]));

content.push(para([
  tb("Mesopotamia"),
  t(" provides the most famous parallel. The Epic of Gilgamesh, committed to writing around 2100 BC but drawing on older Sumerian traditions, contains the story of Utnapishtim, who is warned by the gods to build a boat, loads it with animals and his family, survives a great flood, sends out birds to find land, and makes a sacrifice afterward. The parallels with Genesis are so close that scholars have debated the relationship for over a century. The even older Sumerian flood story of Ziusudra and the Akkadian Atrahasis epic tell essentially the same narrative.")
]));

content.push(para([
  tb("Hindu tradition"),
  t(" tells of Manu, the first man, who is warned by a fish (an avatar of Vishnu) about a coming deluge. He builds a boat, preserves the seeds of life, and repopulates the earth after the waters recede. This tradition is ancient, appearing in the Shatapatha Brahmana, one of the oldest Hindu texts. The concept of "),
  ti("manvantara-sandhya"),
  t("\u2014the period of dissolution between cosmic ages\u2014frequently involves a universal flood.")
]));

content.push(para([
  tb("Greek mythology"),
  t(" gives us Deucalion and Pyrrha, who survive a flood sent by Zeus and repopulate the earth by throwing stones over their shoulders, which become human beings.")
]));

content.push(para([
  tb("Pre-Columbian Americas"),
  t("\u2014and this is where the evidence truly challenges any diffusionist explanation, because there is no plausible route of biblical influence. The Maya Popol Vuh, their sacred text, describes a flood sent by the gods to destroy an earlier, flawed creation of humanity\u2014wooden beings who lacked souls and could not properly worship the gods. The Aztecs had the story of a great flood that destroyed a previous world age. The Inca told of Unu Pachakuti, a deluge that spared only two people atop an Andean peak. The Hopi of Arizona recount a flood destroying a corrupt world, with Spider Woman aiding survivors to safety. The Ojibwe and many other Great Lakes nations tell of Nanabozho surviving a great flood on a raft with animals. The Blackfoot of the Great Plains preserve a story in which the deity Napi recounts a great flood that swept through the land. Across North and South America, flood narratives appear with remarkable frequency and striking structural parallels to the Genesis account.")
]));

content.push(para([
  tb("Australian Aboriginal"),
  t(" traditions\u2014representing possibly the oldest continuous cultures on earth\u2014contain stories of a time when the sea rose and covered the land. Research by Patrick Nunn of the University of the Sunshine Coast and Nicholas Reid of the University of New England, published in the "),
  ti("Australian Geographer"),
  t(", has identified 21 Aboriginal stories from across the Australian coastline that accurately describe geographical features from a time when sea levels were lower than today. Their analysis suggests these oral traditions have endured for between 7,250 and 13,070 years\u2014and more recent research published in the "),
  ti("Journal of Archaeological Science"),
  t(" has demonstrated that Tasmanian Aboriginal stories have been passed down for more than 12,000 years, confirmed by multiple independent lines of evidence. Some Aboriginal tribes can still point to islands that no longer exist and provide their original names.")
]));

content.push(para([
  tb("Chinese"),
  t(" tradition tells of the Great Flood of Gun-Yu, in which floods covered the earth and the hero Yu spent years draining the waters.")
]));

content.push(heading2("Three Explanations\u2014and a Fourth"));

content.push(para([
  t("There are three standard explanations for why flood myths are so universal, and our framework suggests a fourth.")
]));

content.push(para([
  tb("The independent invention view"),
  t(" holds that floods are common natural disasters everywhere, so every culture develops flood myths independently. Rivers flood, coastlines change, tsunamis hit\u2014it is simply a universal human experience being mythologized. This explains the existence of flood stories but struggles to account for their striking structural similarities: divine warning, one family or group saved, animals preserved, sacrifice or renewal afterward, a fresh start for humanity.")
]));

content.push(para([
  tb("The diffusionist view"),
  t(" proposes that all these stories trace back to one original story that spread as humans migrated and traded. This is plausible for the Mesopotamian-biblical connection but very difficult to sustain for pre-Columbian American, Aboriginal Australian, and other geographically isolated traditions.")
]));

content.push(para([
  tb("The regional event view"),
  t(" suggests that specific catastrophic floods\u2014the flooding of the Black Sea around 5600 BC is a popular candidate, as is the post-Ice Age sea level rise\u2014became mythologized in the cultures that experienced them. Archaeologist Bruce Masse has proposed that an oceanic asteroid impact around 2807 BC may have generated tsunamis remembered in multiple traditions. This view explains some flood stories well but cannot account for traditions from inland cultures or from peoples who experienced no known catastrophic flooding.")
]));

content.push(para([
  tb("The ancestral memory view"),
  t("\u2014suggested by our framework\u2014proposes something deeper. If the population bottleneck at 800,000\u2013900,000 years ago represents the near-extinction event behind the Flood narrative, then it occurred "),
  ti("before"),
  t(" the geographic dispersal of human populations into the groups that became Neanderthals, Denisovans, and various Homo sapiens lineages. Every subsequent human culture would share this ancestral experience. As populations dispersed across the globe over hundreds of thousands of years, they carried some deep memory of this near-extinction event, expressed through their own cultural lens and mixed with local flood experiences.")
]));

content.push(para([
  t("This is admittedly the most speculative element of our framework. Eight hundred thousand years is vastly longer than even the most generous estimates for oral tradition\u2019s survival. Nunn and Reid\u2019s research suggests oral traditions can endure demonstrably for over 7,000 years, possibly up to 13,000, under optimal conditions of cultural isolation and specialized story-keepers\u2014but the gap between 13,000 years and 800,000 years is enormous.")
]));

content.push(para([
  t("However, several considerations soften this objection. First, a near-extinction event is not a normal event\u2014it is the most dramatic thing that could possibly happen to a species. If anything can survive in cultural memory across vast timescales, however transformed, it would be this. Second, the memory need not have survived as a single continuous oral tradition. It could have been reinforced and refreshed by subsequent regional floods, each of which became a vehicle for expressing an older, deeper truth about judgment and renewal. Third, the structural similarities between flood narratives\u2014divine judgment, a remnant saved, a fresh start\u2014may reflect not a single transmitted story but a shared theological instinct rooted in the same ancestral experience. Finally, and most intriguingly, the Maya Popol Vuh specifies that the beings destroyed by the flood were those who "),
  ti("lacked souls"),
  t("\u2014a detail hauntingly resonant with our framework\u2019s claim that the bottleneck represents the transition from non-ensouled to ensouled humanity.")
]));

content.push(heading2("An Honest Assessment"));

content.push(para([
  t("The connection between the 800,000\u2013900,000-year bottleneck and the Genesis Flood is speculative. We present it as a possibility, not a claim. But the pieces are genuinely suggestive: a population bottleneck documented in peer-reviewed science, at precisely the time our framework places the ensoulment event, reducing the ancestral population to a remnant from which all subsequent humans descend, occurring before the geographic dispersal that produced the world\u2019s diverse cultures\u2014cultures that independently developed strikingly similar stories about a great flood, divine judgment, and a new beginning.")
]));

content.push(para([
  t("What we can say with confidence is this: the Church requires belief in a real Adam who really sinned and from whom all humans really descend. The science of population genetics is compatible with this, given our framework\u2019s mechanisms of deep time and early interbreeding. The Church does not require belief in a literal global flood or literal eight survivors. The science of population genetics rules out an eight-person bottleneck in human history, but confirms a bottleneck in the low thousands at the right time and place. Our framework reads the Flood as a compressed theological account of that documented event. The dogma is preserved. The science is respected. And the 270 flood narratives from cultures around the world remain one of the most haunting patterns in all of human storytelling.")
]));

content.push(heading2("Required vs. Open: Summary for the Bottleneck and the Flood"));

content.push(para([
  tb("Required: "),
  t("On Adam, the requirements are dogmatic and non-negotiable: Adam was a real, historical individual who committed an actual sin, and all humans descend from him through generation (Council of Trent, Session V, Canons 1\u20134; "),
  ti("Humani Generis"),
  t(", \u00A737; CCC \u00A7\u00A7390, 404). Every human soul is directly created by God (CCC \u00A7366; "),
  ti("Humani Generis"),
  t(", \u00A736). On the Flood, the Church requires that the narrative conveys real theological truth: God judges sin, God saves the righteous, God offers new beginnings. The Ark and the Flood are established types (prefigurations) of baptism and the Church (1 Peter 3:20\u201321; CCC \u00A71219). Jesus referred to Noah as a historical figure (Matthew 24:37\u201339; Luke 17:26\u201327). There must be some real event underlying the narrative.")
]));

content.push(para([
  tb("Open: "),
  t("Whether the Flood was global or regional, whether the ark was a literal vessel or a narrative vehicle, whether Noah\u2019s family numbered literally eight or represents a compressed account of a larger remnant\u2014these are all open questions. The Pontifical Biblical Commission\u2019s 1948 letter to Cardinal Suhard granted \u201Cconsiderable liberty\u201D regarding \u201Cthe literary genre of the first eleven chapters of Genesis.\u201D Pope Pius XII in "),
  ti("Humani Generis"),
  t(", \u00A738, described these chapters as using \u201Csimple and metaphorical language adapted to the mentality of a people but little cultured.\u201D The Catholic Encyclopedia\u2019s article on the Deluge acknowledged that viewing the Flood as preserving \u201Cunder the embroidery of poetical parlance, the memory of a fact handed down by a very old tradition\u201D could \u201Cbe readily accepted by a Catholic.\u201D The connection between the 800,000\u2013900,000-year bottleneck (Hu et al., "),
  ti("Science"),
  t(", 2023) and the Genesis Flood is a speculative proposal within this open space\u2014not a dogmatic claim.")
]));

content.push(pageBreak());

// ===== CHAPTER 13: WHAT A SCIENTIST WOULD SAY =====
content.push(heading1("Chapter 13: What a Scientist Would Say\u2014An Honest Assessment"));

content.push(para([
  t("Any framework that claims compatibility with science must be willing to face scientific scrutiny. Here is an honest assessment of how a fair-minded, non-believing scientist would likely evaluate our proposal.")
]));

content.push(heading2("What They Would Accept"));
content.push(para([
  t("The deep timeline. Placing human origins at 750,000 to 1,000,000 years ago is within the range that paleoanthropology recognizes for the emergence of the hominid lineage leading to modern humans. The hominid diversification through geographic isolation. This is standard paleoanthropology. The interbreeding among hominid groups. This is established, peer-reviewed science. The evidence of rational behavior across hominid groups. The scientific trend strongly supports this. The population bottleneck of ~1,300 individuals at 800,000\u2013900,000 years ago. This is published in "),
  ti("Science"),
  t(" and is peer-reviewed.")
]));

content.push(heading2("What They Would Push Back On"));
content.push(para([
  t("The bottleneck being literally two instead of ~1,300. Population genetics models say two is insufficient. But if the ensouled pair interbreed with the broader population immediately, the "),
  ti("genetic"),
  t(" bottleneck was never two\u2014only the theological one was. This is a key point: the framework does not predict a two-person genetic bottleneck, so the genetic evidence against one does not refute it.")
]));

content.push(para([
  t("The ensoulment claim itself. A methodological naturalist cannot accept \u201CGod breathed a rational soul into two hominids\u201D as a scientific explanation. But our document is not claiming to do science. It is claiming that the theological narrative is "),
  ti("compatible"),
  t(" with science\u2014that the two accounts do not contradict each other even if they operate in different domains.")
]));

content.push(heading2("What They Would Find Interesting"));
content.push(para([
  t("The correlation between the proposed timeline and the actual fossil record. If the framework predicts that all hominid groups after the ensoulment event should show evidence of symbolic, rational behavior while groups before it should not, this is a pattern that could in principle be checked against the archaeological record\u2014and it roughly fits. The earliest clear evidence of symbolic thought appears in the Middle Pleistocene, roughly 300,000\u2013500,000 years ago.")
]));

content.push(para([
  t("The fact that the framework "),
  ti("predicts"),
  t(" Neanderthals and Denisovans should be rational is also significant, because science is increasingly confirming exactly that. A framework that anticipated this before the evidence came in would have genuine intellectual credibility.")
]));

content.push(heading2("The Bottom Line"));
content.push(para([
  t("A fair-minded non-believing scientist would probably say something like: \u201CThis is not science, and I do not accept the metaphysical claims. But I acknowledge that it does not contradict anything we know scientifically. The timeline is plausible. The mechanism of genetic diversity through interbreeding is consistent with what we observe. The claim that ensoulment is genetically invisible is logically coherent even if I find it unnecessary. And the prediction that all post-dispersal hominid groups should show rational behavior is interestingly consistent with the evidence. It is the most scientifically literate theological framework I have encountered on this topic, even if I think the theological layer is unnecessary.\u201D")
]));

content.push(para([
  t("That assessment\u2014not agreement, but acknowledgment of intellectual coherence and compatibility with the evidence\u2014is about the most that any theological framework can hope for from empirical science. And it is considerably more than most theological frameworks on human origins currently achieve.")
]));

content.push(heading2("Required vs. Open: What the Church Demands About the Relationship Between Faith and Science"));

content.push(para([
  tb("Required: "),
  t("Faith and reason cannot contradict each other. The First Vatican Council, "),
  ti("Dei Filius"),
  t(", Chapter 4, teaches: \u201CSince the same God who reveals mysteries and infuses faith has bestowed the light of reason on the human mind, God cannot deny himself, nor can truth ever contradict truth.\u201D The same document (Chapter 2, Canon 1) defines under anathema that God \u201Ccan be known with certainty from the things that have been made, by the natural light of human reason.\u201D Pope St. John Paul II, in "),
  ti("Fides et Ratio"),
  t(" (1998), \u00A7\u00A713\u201316, affirmed that faith and reason are \u201Clike two wings on which the human spirit rises to the contemplation of truth\u201D and that reason retains its proper autonomy within its own domain. The Pontifical Academy of Sciences, established by Pope Pius XI in 1936 and renewed by John Paul II in 1986, exists precisely to honor the Church\u2019s commitment to genuine scientific inquiry.")
]));

content.push(para([
  tb("Open: "),
  t("The precise relationship between theological claims and scientific methodology\u2014how non-overlapping magisteria interact, whether and how theology may inform scientific interpretation, and what counts as genuine conflict versus mere apparent tension\u2014these are matters of ongoing discussion. Pope Benedict XVI, in his 2007 meeting at Castel Gandolfo, noted that \u201Cthe question of origins is not merely a scientific question but also a philosophical and theological one.\u201D The Church does not require any particular philosophy of science. It requires only that science\u2019s legitimate findings not be dismissed, and that theology\u2019s legitimate claims not be surrendered. Our framework operates within this space: accepting the findings of science while maintaining the theological commitments the Church defines as non-negotiable.")
]));

content.push(pageBreak());

// ===== CHAPTER 14: SUMMARY =====
content.push(heading1("Chapter 14: The Framework Summarized"));

content.push(para([
  t("For clarity, here is the complete framework in condensed form:")
]));

content.push(para([
  tb("1. "),
  t("God\u2019s creation unfolds over billions of years. Through processes built into nature\u2014including the latent unfolding of biological potential\u2014the primate lineage produces increasingly sophisticated hominids.")
]));
content.push(para([
  tb("2. "),
  t("God creates and ensouls Adam and Eve approximately 750,000 to 1,000,000 years ago in Africa, using the most advanced hominid form as biological substrate. The rational soul transforms them into genuinely new beings\u2014observably different from the surrounding hominid population in cognitive capacity, moral reasoning, and self-awareness.")
]));
content.push(para([
  tb("3. "),
  t("They fall before reproducing. The Genesis sequence is preserved: creation, Garden, Fall, then children. Original sin enters the human story.")
]));
content.push(para([
  tb("4. "),
  t("In the earliest generations, Adam\u2019s descendants interbreed with biologically compatible but non-ensouled hominids. This is tolerated under the pre-law moral framework (Romans 5:13: \u201Csin is not counted where there is no law\u201D), just as sibling marriage was tolerated in the first generation. Every child of such a union receives a rational soul from God through descent from Adam. Genetic diversity enters the human lineage through this interbreeding.")
]));
content.push(para([
  tb("5. "),
  t("Over generations, the ensouled population grows and absorbs the broader hominid population. Eventually, every living hominid is descended from Adam and possesses a rational soul.")
]));
content.push(para([
  tb("6. "),
  t("As the ensouled population spreads across Africa, Europe, and Asia, geographic isolation and climate adaptation produce the various hominid groups in the fossil record: Neanderthals in Europe, Denisovans in Asia, anatomically modern Homo sapiens in Africa, and others. All are ensouled. All carry original sin. All are genuinely human.")
]));
content.push(para([
  tb("7. "),
  t("The archaeological evidence of symbolic thought, burial, art, and rational behavior across these hominid groups is exactly what the framework predicts\u2014they are all children of Adam.")
]));
content.push(para([
  tb("8. "),
  t("When these long-separated populations re-encounter and interbreed (documented in modern DNA), it is family reuniting\u2014not human/non-human hybridization.")
]));
content.push(para([
  tb("9. "),
  t("The \u201Chard problem of consciousness\u201D\u2014the inability of materialist science to explain why physical processes produce subjective experience\u2014is the deepest evidence that something happened in human origins that nature alone cannot account for. The rational soul, directly created by God, is the Catholic answer.")
]));
content.push(para([
  tb("10. "),
  t("The fact that something is fundamentally broken in the human condition is not seriously in question by anyone who looks honestly at human history and human behavior. The Catholic claim is that this brokenness has a name (original sin), an origin (the Fall), and a cure (redemption through Christ).")
]));

content.push(heading2("Required vs. Open: The Dogmatic Core of the Framework"));

content.push(para([
  t("Of the ten points above, the following are grounded in dogmatic teaching and are non-negotiable for any Catholic framework:")
]));

content.push(para([
  tb("Dogmatic (Required): "),
  t("God is Creator of all things (Nicene Creed; Fourth Lateran Council, 1215; First Vatican Council, "),
  ti("Dei Filius"),
  t(", Chapter 1). Adam and Eve are real, historical individuals ("),
  ti("Humani Generis"),
  t(", \u00A737). All humans descend from them through generation (Council of Trent, Session V, Canon 3: original sin is \u201Ctransfused into all by propagation, not by imitation\u201D). The Fall was a real, historical event (CCC \u00A7390). Original sin is transmitted to all descendants (Council of Trent, Session V, Canons 1\u20134). Every human soul is directly created by God (CCC \u00A7366; "),
  ti("Humani Generis"),
  t(", \u00A736). The soul is the form of the body (Council of Vienne, 1312; CCC \u00A7365). Redemption comes through Christ alone (Council of Trent, Session VI, Chapter 3; CCC \u00A7\u00A7388\u2013389, 402\u2013405).")
]));

content.push(para([
  tb("Interpretive (Open): "),
  t("The specific dating of Adam and Eve (~750,000\u20131,000,000 years ago). The identification of the biological substrate with "),
  ti("Homo heidelbergensis"),
  t(". The mechanism of early interbreeding as the source of genetic diversity. The claim that all post-dispersal hominid groups (Neanderthals, Denisovans) are ensouled descendants of Adam. The connection between the population bottleneck and the Genesis Flood. The Augros/Stanciu model of latent biological potential. The \u201Cjump\u201D argument from the hard problem of consciousness. These are all proposals within the open space Catholic theology permits\u2014the best synthesis we can construct from available evidence, offered as a coherent possibility rather than a binding interpretation.")
]));

content.push(pageBreak());

// ===== CHAPTER 15: ACKNOWLEDGMENTS OF WEAKNESS =====
content.push(heading1("Chapter 15: Acknowledged Weaknesses and Open Questions"));

content.push(para([
  t("Intellectual honesty requires acknowledging where this framework is weakest and where questions remain open.")
]));

content.push(para([
  tb("The early interbreeding remains morally uncomfortable"),
  t(", even with the pre-law precedent. Some Catholic thinkers will reject it. The argument that mating with near-human hominids is not bestiality because the moral category had not yet been promulgated is theologically defensible but will not satisfy everyone. The idea that God would design a system requiring this is theologically debatable.")
]));

content.push(para([
  tb("The transition point is fuzzy"),
  t(". When does the last non-ensouled hominid disappear from the population? Our framework does not specify a precise date. But this fuzziness is shared by every other model, including mainstream scientific accounts of when \u201Cbehavioral modernity\u201D emerged.")
]));

content.push(para([
  tb("The \u201Cdust of the ground\u201D reading is metaphorical"),
  t(". Interpreting \u201Cformed man from the dust of the ground\u201D as \u201Cused pre-existing biological material\u201D is standard in Catholic theistic evolution but is not the only traditional reading. Some Catholics maintain that Adam\u2019s body was created directly and miraculously, with no biological precursor. Our framework requires the metaphorical reading.")
]));

content.push(para([
  tb("The genetic evidence remains challenging for strict monogenism"),
  t(", even with the interbreeding mechanism. The allelic diversity patterns, particularly at HLA loci, are difficult to explain from any scenario involving an initial pair, even with subsequent interbreeding. However, the further back the pair is placed and the more immediately they interbreed with the surrounding population, the weaker this objection becomes\u2014and our framework places them very deep indeed.")
]));

content.push(para([
  tb("The Augros/Stanciu mechanism is not mainstream biology"),
  t(". While the evo-devo revolution has moved science somewhat toward the idea of latent developmental potential, the specific model Augros and Stanciu propose remains outside the scientific mainstream. Our framework does not strictly require their model\u2014it could work with standard evolutionary mechanisms producing the hominid substrate\u2014but the Augros/Stanciu framework provides a more philosophically satisfying account of "),
  ti("why"),
  t(" the biological preparation was so precisely directed toward a form capable of receiving a rational soul.")
]));

content.push(para([
  tb("The framework is unfalsifiable at its core"),
  t(". The ensoulment event leaves no genetic or fossil signature. This is a genuine weakness from a scientific standpoint, even though it is a logical feature of the model (immaterial souls would not be expected to leave material traces). The framework\u2019s compatibility with evidence should not be confused with confirmation by evidence.")
]));

content.push(heading2("Required vs. Open: Why Acknowledging Weakness Is Itself a Theological Requirement"));

content.push(para([
  tb("Required: "),
  t("Intellectual honesty is a theological obligation, not merely a rhetorical strategy. The First Vatican Council, "),
  ti("Dei Filius"),
  t(", Chapter 4, teaches that \u201Creason, illuminated by faith, when it seeks earnestly, piously and calmly, attains by a gift from God some understanding, and that a most fruitful one, of mysteries.\u201D The word \u201Csome\u201D is significant\u2014the Council explicitly acknowledges the limits of human understanding even when aided by faith. The same document warns against \u201Cthat false appearance of knowledge\u201D which presents speculation as certainty. Pope St. John Paul II, in "),
  ti("Fides et Ratio"),
  t(", \u00A74, insisted that philosophy and theology must maintain \u201Ca legitimate autonomy\u201D and that faith \u201Cdoes not fear reason, but seeks it out and has trust in it.\u201D Acknowledging weaknesses in a theological framework is not a failure of faith; it is fidelity to the Church\u2019s own teaching about the limits of human reasoning.")
]));

content.push(para([
  tb("Open: "),
  t("All six weaknesses acknowledged above operate within the open space of Catholic theology. The early interbreeding question involves a moral judgment about pre-law conditions\u2014a matter on which the Church has issued no definitive ruling. The fuzzy transition point is shared by every competing model. The metaphorical reading of \u201Cdust of the ground\u201D is permitted by "),
  ti("Humani Generis"),
  t(", \u00A736, which allows that the human body may derive from \u201Cpre-existing and living matter.\u201D The genetic challenge to monogenism is addressed by our mechanisms but not fully resolved\u2014a candor the Church\u2019s own International Theological Commission (2004) models when it acknowledges that the science of human origins is \u201Ccomplex and subject to revision.\u201D The Augros/Stanciu mechanism is a philosophical proposal, not a doctrinal commitment. And the unfalsifiability of ensoulment is a necessary feature of any claim about an immaterial reality acting on a material world\u2014a feature shared by every Catholic doctrine about the soul.")
]));

content.push(pageBreak());

// ===== REFERENCES =====
content.push(heading1("References and Further Reading"));

// References with optional URLs for clickable hyperlinks
const refs = [
  { text: "Augros, Robert, and George Stanciu. The New Biology: Discovering the Wisdom in Nature. New Science Library/Shambhala, 1987." },
  { text: "Augros, Robert, and George Stanciu. The New Story of Science. Bantam New Age, 1984." },
  { text: "Augustine of Hippo. De Genesi ad Litteram (The Literal Meaning of Genesis). Circa 415 AD.", url: "https://www.newadvent.org/fathers/1407.htm" },
  { text: "Ayala, Francisco. \"Evolution and the Uniqueness of Humankind.\" Origins: CNS Documentary Service 27 (1998): 565\u201374." },
  { text: "Bonnette, Dennis. \"Monogenism and Polygenism.\" In New Catholic Encyclopedia Supplement 2012\u20132013: Ethics and Philosophy, Vol. 3." },
  { text: "Bonnette, Dennis. \"Time to Abandon the Genesis Story?\" Homiletic & Pastoral Review, July 2014." },
  { text: "Catechism of the Catholic Church, Second Edition. Vatican City, 1994.", url: "https://www.vatican.va/archive/ENG0015/_INDEX.HTM" },
  { text: "Chalmers, David. \"Facing Up to the Problem of Consciousness.\" Journal of Consciousness Studies 2 (1995): 200\u201319.", url: "https://consc.net/papers/facing.html" },
  { text: "Craig, William Lane. In Quest of the Historical Adam: A Biblical and Scientific Exploration. Eerdmans, 2021." },
  { text: "Hoffmann, D.L., et al. \"U-Th Dating of Carbonate Crusts Reveals Neandertal Origin of Iberian Cave Art.\" Science 359 (2018): 912\u201315.", url: "https://doi.org/10.1126/science.aap7778" },
  { text: "International Theological Commission. \"Communion and Stewardship: Human Persons Created in the Image of God.\" 2004.", url: "https://www.vatican.va/roman_curia/congregations/cfaith/cti_documents/rc_con_cfaith_doc_20040723_communion-stewardship_en.html" },
  { text: "Kemp, Kenneth W. \"Science, Theology, and Monogenesis.\" American Catholic Philosophical Quarterly 85, no. 2 (2011): 217\u201336.", url: "https://doi.org/10.5840/acpq201185213" },
  { text: "Kemp, Kenneth W. \"Adam and Eve and Evolution.\" Society of Catholic Scientists, 2024." },
  { text: "Pius XII. Humani Generis. Encyclical Letter, 1950.", url: "https://www.vatican.va/content/pius-xii/en/encyclicals/documents/hf_p-xii_enc_12081950_humani-generis.html" },
  { text: "Smithsonian Institution. \"Ancient DNA and Neanderthals.\" Human Origins Program, 2024.", url: "https://humanorigins.si.edu/evidence/genetics/ancient-dna-and-neanderthals" },
  { text: "Smithsonian Institution. \"Homo heidelbergensis.\" Human Origins Program, 2024.", url: "https://humanorigins.si.edu/evidence/human-fossils/species/homo-heidelbergensis" },
  { text: "Smithsonian Institution. \"Homo neanderthalensis.\" Human Origins Program, 2024.", url: "https://humanorigins.si.edu/evidence/human-fossils/species/homo-neanderthalensis" },
  { text: "Society of Catholic Scientists. \"Q6: How Do Adam and Eve Fit in with Evolution and the Science of Human Origins?\" 2022.", url: "https://www.catholicscientists.org/common-questions/adam-and-eve" },
  { text: "Stringer, Chris, et al. \"Dating the Broken Hill Skull.\" Nature, April 2020.", url: "https://doi.org/10.1038/s41586-020-2224-8" },
  { text: "Swamidass, S. Joshua. The Genealogical Adam and Eve: The Surprising Science of Universal Ancestry. IVP Academic, 2019.", url: "https://www.ivpress.com/the-genealogical-adam-and-eve" },
  { text: "Tabaczek, Mariusz. \"Contemporary Version of the Monogenetic Model of Anthropogenesis.\" Religions 14, no. 4 (2023): 528.", url: "https://doi.org/10.3390/rel14040528" },
  { text: "Tattersall, Ian. Quoted in \"Symbolic Thought in Humans: A Creative Explosion.\" American Museum of Natural History." },
  { text: "Thomas Quarry Fossils. \"The Last Common Ancestor of Humans and Neanderthals Is Found, in Morocco.\" Haaretz, January 2026." },
  { text: "Hu, Haipeng, et al. \"Genomic Inference of a Severe Human Bottleneck During the Early to Middle Pleistocene Transition.\" Science 381 (2023): 979\u201384.", url: "https://doi.org/10.1126/science.abq7487" },
  { text: "Natural History Museum, London. \"Who Were the Neanderthals?\" 2024.", url: "https://www.nhm.ac.uk/discover/who-were-the-neanderthals.html" },
  { text: "DeRosa, John. \"Adam & Eve: A Survey of Models for Catholics.\" Peaceful Science, October 2022.", url: "https://peacefulscience.org/articles/adam-eve-catholic-models/" },
  { text: "Hofmann, James R. \"Catholicism and Evolution: Polygenism and Original Sin.\" Scientia et Fides 8, no. 2 (2020).", url: "https://doi.org/10.12775/SetF.2020.019" },
  { text: "Franklin, Ian R. \"Evolutionary Change in Small Populations.\" In Conservation Biology: An Evolutionary-Ecological Perspective, edited by Michael E. Soul\u00e9 and Bruce A. Wilcox, 135\u2013149. Sinauer Associates, 1980." },
  { text: "Nunn, Patrick D., and Nicholas J. Reid. \"Aboriginal Memories of Inundation of the Australian Coast Dating from More than 7000 Years Ago.\" Australian Geographer 47, no. 1 (2016): 11\u201347.", url: "https://doi.org/10.1080/00049182.2015.1077539" },
  { text: "Frazer, James George. Folklore in the Old Testament: Studies in Comparative Religion, Legend, and Law. Macmillan, 1918.", url: "https://archive.org/details/folkloreinoldtes01fraz" },
  { text: "Gosse, Philip Henry. Omphalos: An Attempt to Untie the Geological Knot. John Van Voorst, 1857.", url: "https://archive.org/details/omabornattemptto00goss" },
  { text: "First Vatican Council. Dei Filius: Dogmatic Constitution on the Catholic Faith. April 24, 1870.", url: "https://www.vatican.va/content/pius-ix/la/documents/constitutio-dogmatica-dei-filius-24-aprilis-1870.html" },
  { text: "Thomas Aquinas. Summa Theologica, Prima Pars, Question 2, Article 3.", url: "https://www.newadvent.org/summa/1002.htm#article3" },
  { text: "Pontifical Biblical Commission. \"On the Historical Character of the First Three Chapters of Genesis.\" June 30, 1909." },
  { text: "Masse, W. Bruce. \"The Archaeology and Anthropology of Quaternary Period Cosmic Impact.\" In Comet/Asteroid Impacts and Human Society, edited by Peter T. Bobrowsky and Hans Rickman, 25\u201370. Springer, 2007." },
  { text: "Rooth, Anna Birgitta. \"The Creation Myths of the North American Indians.\" Anthropos 52 (1957): 497\u2013508." },
  { text: "Council of Trent. Session V: Decree Concerning Original Sin. June 17, 1546.", url: "https://www.ewtn.com/catholicism/library/decree-concerning-original-sin-1503" },
  { text: "Pontifical Biblical Commission. Letter to Cardinal Suhard on the Pentateuch and Genesis 1\u201311. January 16, 1948." },
  { text: "Council of Vienne. Decrees on the Soul as the Form of the Body. 1312." },
  { text: "RATE Project. Vardiman, Larry, Andrew A. Snelling, and Eugene F. Chaffin, eds. Radioisotopes and the Age of the Earth, Vol. 2. Institute for Creation Research, 2005." },
  { text: "Barnes, Thomas G. \"Decay of the Earth's Magnetic Moment and the Geochronological Implications.\" Creation Research Society Quarterly 9 (1973): 24\u201329." },
  { text: "EPICA Community Members. \"Eight Glacial Cycles from an Antarctic Ice Core.\" Nature 429 (2004): 623\u2013628.", url: "https://doi.org/10.1038/nature02599" },
  { text: "Friedrich, Michael, et al. \"The 12,460-Year Hohenheim Oak and Pine Tree-Ring Chronology.\" Radiocarbon 46 (2004): 1111\u20131122.", url: "https://doi.org/10.1017/S0033822200033078" },
  { text: "John Paul II, Pope. Fides et Ratio. Encyclical Letter, September 14, 1998.", url: "https://www.vatican.va/content/john-paul-ii/en/encyclicals/documents/hf_jp-ii_enc_14091998_fides-et-ratio.html" },
  { text: "Second Vatican Council. Gaudium et Spes: Pastoral Constitution on the Church in the Modern World. December 7, 1965.", url: "https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_const_19651207_gaudium-et-spes_en.html" },
  { text: "Fourth Lateran Council. Constitution 1: On the Catholic Faith (Firmiter Credimus). 1215." },
  { text: "Fifth Lateran Council. Apostolici Regiminis: Bull on the Immortality of the Soul. December 19, 1513." },
  { text: "Pontifical Academy of Sciences. Founded 1936 by Pope Pius XI; Statutes renewed by Pope John Paul II, 1986.", url: "https://www.pas.va/en.html" },
  { text: "Ott, Ludwig. Fundamentals of Catholic Dogma. Translated by Patrick Lynch. Edited by James Canon Bastible. Baronius Press, 2018 (orig. 1952).", url: "https://www.baronius.com/fundamentals-of-catholic-dogma.html" },
  { text: "Pontifical Biblical Commission. De charactere historico trium priorum capitum Geneseos (On the Historical Character of the First Three Chapters of Genesis). June 30, 1909.", url: "http://catholicapologetics.info/scripture/oldtestament/commission.htm" },
  { text: "Owen, Hugh, and the Kolbe Center for the Study of Creation. Creation, Evolution, and Catholicism: A Discussion for Those Who Believe. Kolbe Center, 2000ff.", url: "https://kolbecenter.org/" },
  { text: "Pius X, Pope St. Praestantia Scripturae. Motu proprio on the authority of the Pontifical Biblical Commission, November 18, 1907." },
  { text: "Poupard, Cardinal Paul. Address on Faith and Science, Pontifical Council for Culture. Cited in Catholic News Service reports on the Galileo Commission findings." },
  { text: "Pian, E., et al. \"Spectroscopic identification of r-process nucleosynthesis in a double neutron-star merger.\" Nature 551 (2017): 67\u201370.", url: "https://doi.org/10.1038/nature24298" },
  { text: "Kasen, Daniel, et al. \"Origin of the heavy elements in binary neutron-star mergers from a gravitational-wave event.\" Nature 551 (2017): 80\u201384.", url: "https://doi.org/10.1038/nature24453" },
  { text: "Levan, A.J., et al. \"Heavy-element production in a compact object merger observed by JWST.\" Nature 626 (2024): 737\u2013741.", url: "https://doi.org/10.1038/s41586-023-06759-1" },
  { text: "Visbal, Eli, et al. \"LAP1-B is the First Observed System Consistent with Theoretical Predictions for Population III Stars.\" The Astrophysical Journal Letters (2025).", url: "https://arxiv.org/abs/2508.03842" },
  { text: "Catholic Answers. \"Can Catholics Believe in a Young Earth?\" Catholic Answers Magazine.", url: "https://www.catholic.com/magazine/print-edition/the-six-days-of-creation" }
];

refs.forEach((ref, i) => {
  const children = [t(`${i + 1}. ${ref.text}`)];
  if (ref.url) {
    children.push(t("  "));
    children.push(new ExternalHyperlink({
      children: [new TextRun({ text: "[Link]", size: 24, font: "Georgia", color: "0563C1", underline: { type: "single" } })],
      link: ref.url
    }));
  }
  content.push(para(children, { spacing: { after: 120, line: 276 } }));
});

content.push(pageBreak());

// ===== INDEX =====
content.push(heading1("Index of Key Terms and Persons"));

const indexEntries = [
  "Adam and Eve \u2014 Chapters 2\u201315, passim",
  "Aquinas, Thomas (Five Ways) \u2014 Chapter 3",
  "Augros, Robert \u2014 Chapter 5",
  "Augustine of Hippo, Saint \u2014 Chapters 2, 3",
  "Australopithecus \u2014 Chapter 5",
  "Ayala, Francisco \u2014 Chapter 9",
  "Barnes, Thomas G. (magnetic field decay) \u2014 Chapter 2",
  "Behavioral modernity \u2014 Chapter 10",
  "Bestiality objection \u2014 Chapters 4, 7",
  "Big Bang \u2014 Chapters 3, 5",
  "Bonnette, Dennis \u2014 Chapters 4, 7",
  "Bottleneck, population \u2014 Chapters 6, 9, 12",
  "Cain and Abel \u2014 Chapter 8",
  "Cambrian explosion \u2014 Chapter 5",
  "Catholic Answers (on YE permissibility) \u2014 Chapter 3",
  "Chalmers, David \u2014 Chapter 10",
  "Consciousness, hard problem of \u2014 Chapter 10",
  "Continental drift \u2014 Chapter 3",
  "Coral reef growth \u2014 Chapter 3",
  "Cosmic microwave background \u2014 Chapter 5",
  "Council of Trent \u2014 Chapters 4, 7, 11",
  "Council of Vienne \u2014 Chapter 7",
  "Craig, William Lane \u2014 Chapters 4, 7",
  "Cyclic universe models (Penrose, Steinhardt) \u2014 Chapter 5",
  "De fide definita (levels of doctrinal authority) \u2014 Chapter 3",
  "Dei Filius (Vatican I) \u2014 Chapters 2, 3",
  "Dendrochronology (tree rings) \u2014 Chapter 3",
  "Denisovans \u2014 Chapters 6, 7",
  "Deucalion and Pyrrha \u2014 Chapter 12",
  "Ensoulment \u2014 Chapters 5, 7, 9, 10, 12",
  "EPICA ice core \u2014 Chapter 3",
  "Evo-devo (evolutionary developmental biology) \u2014 Chapter 5",
  "Feser, Edward \u2014 Chapter 4",
  "Fides et Ratio \u2014 Chapters 13, 15",
  "50/500 rule \u2014 Chapter 12",
  "Flood, Genesis \u2014 Chapter 12",
  "Flood myths, cross-cultural \u2014 Chapter 12",
  "Genetic diversity \u2014 Chapter 9",
  "Gilgamesh, Epic of \u2014 Chapter 12",
  "Gosse, Philip Henry \u2014 Chapters 2, 3",
  "Great Oxidation Event \u2014 Chapter 5",
  "Hard problem of consciousness \u2014 Chapter 10",
  "HLA genes \u2014 Chapter 9",
  "Homo erectus \u2014 Chapters 5, 6, 7",
  "Homo floresiensis \u2014 Chapter 6",
  "Homo habilis \u2014 Chapter 5",
  "Homo heidelbergensis \u2014 Chapters 5, 6, 7",
  "Homo naledi \u2014 Chapter 6",
  "Homo neanderthalensis \u2014 see Neanderthals",
  "Humani Generis \u2014 Chapters 2, 3, 4, 7",
  "Ice cores \u2014 Chapter 3",
  "Interbreeding, early \u2014 Chapters 7, 9, 14",
  "Kemp, Kenneth \u2014 Chapter 4",
  "Kolbe Center for the Study of Creation \u2014 Chapter 2",
  "Lateran IV, Firmiter constitution \u2014 Chapters 2, 14",
  "Latent potential, biological \u2014 Chapter 5",
  "Minimum viable population \u2014 Chapter 12",
  "Monogenism \u2014 Chapters 4, 7, 9, 13",
  "Mount St. Helens \u2014 Chapter 3",
  "Neanderthals \u2014 Chapters 6, 7, 10",
  "Neutron star mergers \u2014 Chapter 5",
  "Nunn, Patrick \u2014 Chapter 12",
  "Omphalos hypothesis \u2014 Chapters 2, 3",
  "Original sin \u2014 Chapters 7, 11",
  "Ott, Ludwig (Fundamentals of Catholic Dogma) \u2014 Chapter 3",
  "Owen, Hugh \u2014 Chapter 2",
  "Pike, Alistair \u2014 Chapter 6",
  "Pius XII, Pope \u2014 Chapters 2, 3, 4",
  "Polystrate fossils \u2014 Chapter 2",
  "Polygenism \u2014 Chapter 4",
  "Pontifical Biblical Commission, 1909 decree \u2014 Chapters 2, 3",
  "Popol Vuh \u2014 Chapter 12",
  "Poupard, Cardinal Paul \u2014 Chapter 3",
  "Radiometric dating \u2014 Chapter 2",
  "RATE project \u2014 Chapters 2, 3",
  "Rational soul \u2014 Chapters 5, 7, 10",
  "Required vs. open framework \u2014 Chapters 2\u201315",
  "Romans 5:13 \u2014 Chapters 7, 14",
  "Sensitive soul \u2014 Chapters 5, 7",
  "Stanciu, George \u2014 Chapter 5",
  "Starlight problem \u2014 Chapter 3",
  "Stellar nucleosynthesis \u2014 Chapter 5",
  "Stringer, Chris \u2014 Chapter 6",
  "Suarez, Antoine \u2014 Chapter 4",
  "Supernovae \u2014 Chapters 3, 5",
  "Swamidass, S. Joshua \u2014 Chapter 4",
  "Symbolic behavior \u2014 Chapters 6, 10",
  "Tattersall, Ian \u2014 Chapter 10",
  "Thomistic philosophy \u2014 Chapters 5, 7",
  "Tiktaalik \u2014 Chapter 5",
  "Young earth creationism \u2014 Chapters 2, 3"
];

indexEntries.forEach(entry => {
  content.push(para([t(entry)], { spacing: { after: 80, line: 240 } }));
});

// Build document
const doc = new Document({
  features: {
    updateFields: true
  },
  styles: {
    default: {
      document: {
        run: { font: "Georgia", size: 24 }
      }
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
      },
      {
        id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, italics: true, font: "Georgia", color: "2d3436" },
        paragraph: { spacing: { before: 240, after: 140 }, outlineLevel: 2 }
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
          children: [new TextRun({ text: "Genesis, Science, and the Human Soul", italics: true, size: 18, font: "Georgia", color: "888888" })],
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
  fs.writeFileSync("Genesis_Science_Catholic_Theology-33.docx", buffer);
  console.log("Document created successfully");
});
