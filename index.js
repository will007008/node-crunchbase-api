// Copyright 2014 CodingHouse Winter Cohort

var config = require('./config'),
request = require('request'),
urlHelper = require('./util/url_helper');

function init(apikey) {
  config.apikey = apikey;
}

function getOrganizations(params, callback) {
  var url = urlHelper.getOrganizationsUrl(params);
  createRequest(url, callback);
}

function getPeople(page, callback){
  var url = urlHelper.getPeopleUrl(page);
  createRequest(url, callback);
}

function getPerson(permalink, callback){
  var url = urlHelper.getPersonUrl(permalink);
  createRequest(url, callback);
}

function createRequest(url, callback) {
  request(url, function (error, response, body) {
    try {
      callback(error, JSON.parse(body));
    } catch (error) {
      callback(error, body);
    }
  });
}

module.exports = {
  init: function(apikey) {
    return init(apikey);
  },

  organizations: function(params, callback) {
    return getOrganizations(params, callback);
  },
  people: function(page, callback) {
    return getPeople(page, callback);
  },
  person: function(permalink, callback) {
    return getPerson(permalink, callback);
  }
}