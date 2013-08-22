function ProjectsController($scope, $routeParams, $location, Global, Projects) {
  $scope.global = Global;

  $scope.tags = [];

  $scope.create = function () {
    var project = new Projects({
      title: this.title,
      content: this.content,
      short: this.short,
      github: this.github
    });

    project.$save(function (response) {
      $scope.projects = $scope.find();
      $location.path("projects/" + response._id);
    });
  };

  $scope.isSelected = function (project) {
    return project._id === $routeParams.projectId;
  };

  $scope.remove = function (project) {
    project.$remove();

    for (var i in $scope.projects) {
      if ($scope.projects[i] == project) {
        $scope.projects.splice(i, 1);
      }
    }
  };

  $scope.update = function () {
    var project = $scope.project;
    project.looking_for = $scope.tags;
    if (!project.updated) {
      project.updated = [];
    }
    project.updated.push(new Date().getTime());

    project.$update(function () {
      $scope.projects = $scope.find();
      $location.path("projects/" + project._id);
    });
  };

  $scope.find = function (query) {
    Projects.query(query, function (projects) {
      $scope.projects = projects;
    });
  };

  $scope.findOne = function () {
    Projects.get({ projectId: $routeParams.projectId }, function (project) {
      $scope.project = project;
    });
  };
}