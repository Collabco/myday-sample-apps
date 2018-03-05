(function () {
  'use strict';

  angular
    .module('app.collabco.todo')
    .controller('CollabcoToDoCtrl', CollabcoToDoCtrl);
    CollabcoToDoCtrl.$inject = ['$scope','CollabcoToDoService'];

  function CollabcoToDoCtrl ($scope, CollabcoToDoService) {
    var vm = this;
    // Retrieve the list of saved todo items (defaults to empty array)
    vm.todos = CollabcoToDoService.get();

    // Add a new note to the todos array
    vm.add = function (item) {

      // Add the new ToDo object to the todos array
      vm.todos.push({
        title: item,
        complete: false
      });

      // Clear the text in the input field
      vm.newTodo = '';

      // Persist to the Service
      vm.save();
    };

    // Toggle editing for a ToDo item
    vm.toggleEdit = function (todo, editing) {

      // Set the editing property to True or False
      todo.editing = editing;

      // If no longer editing, save
      if (!editing) {
        vm.save();
      }
    };

    // Delete a ToDo Item
    vm.delete = function (index) {
      // Remove at the desired array index
      vm.todos.splice(index, 1);
      // Persist to the Service
      vm.save();
    };

    // Save the ToDos to local storage
    vm.save = function () {
      // Call the service .save method, passing in the vm.todos array
      CollabcoToDoService.save(vm.todos);
    };
  }



})();
