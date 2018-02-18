const models = {
  genes : require('./Gene.js'),
  phenotypes : require('./Phenotype.js'),
  diplotypes : require('./Diplotype.js'),
  polymorphisms : require('./Polymorphism.js'),
  genotypes : require('./Genotype.js'),
  actitypes : require('./ActiType.js'),
  bioinformatics : require('./Trigger.js'),
  drugs : require('./Drug.js'),
  nutriments : require('./Nutriment.js'),
  pharmacogenetics : require('./RecommendationPQx.js'),
  nutrigenomics : require('./RecommendationNQx.js'),
  patients : require('./Patient.js')
}

module.exports = models;
