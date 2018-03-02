const models = {
  patients : require('./Patient.js'),
  genes : require('./Gene.js'),
  relatedgenes : require('./Gene.js'),
  phenotypes : require('./Phenotype.js'),
  diplotypes : require('./Diplotype.js'),
  polymorphisms : require('./Polymorphism.js'),
  polymorphism : require('./Polymorphism.js'),
  genotypes : require('./Genotype.js'),
  inputGenotypes : require('./Genotype.js'),
  outputGenotypes : require('./Genotype.js'),
  actitypes : require('./Activation.js'),
  activations : require('./Activation.js'),
  bioinformatics : require('./Bioinformatic.js'),
  drugs : require('./Drug.js'),
  nutriments : require('./Nutriment.js'),
  pharmacogenetics : require('./Pharmacogenetic.js'),
  nutrigenomics : require('./Nutrigenomic.js')
}

module.exports = models;
