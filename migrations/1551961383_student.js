const Student = artifacts.require("Student");
const Person  = artifacts.require("Person");

module.exports = function(deployer) {
  deployer.deploy(Person);
  deployer.link(Person, Student);
  deployer.deploy(Student);
};
