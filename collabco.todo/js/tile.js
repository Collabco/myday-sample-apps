(function() {
  'use strict';

  angular
    .module('tile.collabco.todo', [])
    .controller('tile.collabco.todo', TileCtrl)
    .dependencies = ['CollabcoToDoService'];



  function TileCtrl ($scope, MydaySidebar, CollabcoToDoService) {

    // The tile object representing this tile is accessed at $scope.tile
    var tile = $scope.tile;

    // Call our service to get a list of ToDo items
    var todos = CollabcoToDoService.get();
    var length = todos.length;

    if (length) {

      // Count the amount of items that are complete/incomplete
      var done = 0;
      var todo = 0;

      // Loop through all items. If an item is complete, increment done, else increment todo.
      for (var i = 0; i < length; i++) {
        if (todos[i].complete) {
          done++;
        }
        else {
          todo++;
        }
      }

      // Set the App notifications as the amount of tasks not completed
      // ToDo: This needs re-designing...
      MydaySidebar.setAppNotifications('collabco.todo', todo);

      // Depending on the template, display different content.
      if (tile.template === 'info') {

        tile.content.push({
          title: todo,
          subtitle: 'app.collabco-todo.tile.TODO',
          translationMap: {
            title: false,
            subtitle: true
          }
        });

        tile.content.push({
          title: done,
          subtitle: 'app.collabco-todo.tile.COMPLETE',
          translationMap: {
            title: false,
            subtitle: true
          }
        });

      }
      else if (tile.template === 'multiline') {
        var slideLimit = tile.properties.slideLimit || 5;
        var limit = length < slideLimit ? length : slideLimit;

        for (var x = 0; x < limit; x++) {
          tile.content.push({
            title: todos[x].title,
            subtitle: todos[x].complete ? 'app.collabco-todo.tile.COMPLETE' : 'app.collabco-todo.tile.INCOMPLETE',
            translationMap: {
              title: false,
              subtitle: true
            }
          });
        }
      }

      tile.ready();
    }
    else {
      tile.setEmpty();
    }

  }

})();
