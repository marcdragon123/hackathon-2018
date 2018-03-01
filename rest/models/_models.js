const models = {
  patients : require('./Patient.js'),
  genes : require('./Gene.js'),
  relatedgenes : require('./Gene.js'),
  phenotypes : require('./Phenotype.js'),
  diplotypes : require('./Diplotype.js'),
  polymorphisms : require('./Polymorphism.js'),
  genotypes : require('./Genotype.js'),
  inputGenotypes : require('./Genotype.js'),
  outputGenotypes : require('./Genotype.js'),
  actitypes : require('./ActiType.js'),
  activations : require('./ActiType.js'),
  bioinformatics : require('./Trigger.js'),
  drugs : require('./Drug.js'),
  nutriments : require('./Nutriment.js'),
  pharmacogenetics : require('./RecommendationPQx.js'),
  nutrigenomics : require('./RecommendationNQx.js')
}

module.exports = models;
