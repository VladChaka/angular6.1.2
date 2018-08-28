const Core    = require("./core").Core,
      modules = Core.module('app');

module.exports.Core = Core;

require("../User");
require("../Library");
require("../../servise/UserDataServise");
require("../../servise/LibraryDataService");
require("../../servise/PhotoDataService");
require("../../servise/Middleware");

modules.run();

module.exports = { 
    userDataServise: modules.get('app.userDataServise'),
    middleware: modules.get('app.middleware'),
    userRepository: modules.get('app.userRepository'),
    libraryRepository: modules.get('app.libraryRepository'),
    libraryDataService: modules.get('app.libraryDataService'),
    photoDataService: modules.get('app.photoDataService')
};