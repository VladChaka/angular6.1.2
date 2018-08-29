const Core    = require("./core").Core,
      modules = Core.module('app');

module.exports.Core = Core;

require("../User");
require("../Library");
require("../../service/UserDataService");
require("../../service/LibraryDataService");
require("../../service/PhotoDataService");
require("../../service/Middleware");

modules.run();

module.exports = { 
    userDataService: modules.get('app.userDataService'),
    middleware: modules.get('app.middleware'),
    userRepository: modules.get('app.userRepository'),
    libraryRepository: modules.get('app.libraryRepository'),
    libraryDataService: modules.get('app.libraryDataService'),
    photoDataService: modules.get('app.photoDataService')
};