'use strict';

const Fse = require('fs-extra');
const Path = require('path');
const _ = require('lodash');

class ServerlessPluginPackageCommonCopy {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.serviceOptions = this.serverless.service.custom || {};
    this.allFunctions = this.serverless.service.functions;
    this.buildPath = './.serverless';

    this.hooks = {
      'before:package:createDeploymentArtifacts': this.onBeforePackageCreateDeploymentArtifacts.bind(this),
    };
  }

  onBeforePackageCreateDeploymentArtifacts() {
    _.forIn(this.allFunctions, (item, name) => {
      const funcPath = `${this.buildPath}/${item.module}/requirements`;
      [ ...this.serviceOptions.pythonRequirementsCommonCopy, ...(item.pythonRequirementsCommonCopy || []) ].forEach(item => {
        this.serverless.cli.log(`[serverless-python-requirements-common-copy] Copying ${item}`);
        Fse.copySync(item, Path.resolve(funcPath, item), { dereference: true });
      });

      this.serverless.cli.log(`[serverless-python-requirements-common-copy] Copied common files/directories for ${name}`);

    });

  }
}

module.exports = ServerlessPluginPackageCommonCopy;
