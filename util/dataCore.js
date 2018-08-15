let Core = require("../repository/core").Core;
    modules = Core.module('app');

module.exports.Core = Core;

require("../repository/User");
require("../repository/Library");
require("../Servise/UserDataServise");
require("../Servise/LibraryDataService");

modules.run();

module.exports = { 
    userDataServise: modules.get('app.userDataServise'),
    userRepository: modules.get('app.userRepository'),
    libraryRepository: modules.get('app.libraryRepository'),
    libraryDataService: modules.get('app.libraryDataService')
};