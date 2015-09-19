angular.module('todo', [])
    .controller('page', ['$scope', 'todoApi',

function ($s, todoApi) {
    var uiCurrent = 1;
    var tabNum = 2;

    $s.tab = [{
        tabID: 1,
        tabName: 'shopping'
    }, {
        tabID: 2,
        tabName: 'business'
    }]

    $s.backupData = todoApi.query();

    $s.ui = {
        current: function (newUICurrent) {
            if (typeof newUICurrent != 'undefined') {
                uiCurrent = newUICurrent;
            }
            return uiCurrent;
        },
        isCurrent: function (c) {
            return (uiCurrent === c);
        }
    }


    $s.marker = function(item) {
        if (item.complete)
            item.complete = false;
        else
            item.complete = true;
    };

}])
.factory('todoApi', [function () {
    var data = [
        {
            list: 'shopping',
            name: 'buy eggs',
            complete: false
        },
        {
            list: 'shopping',
            name: 'buy milk',
            complete: true
        },
        {
            list: 'business',
            name: 'collect underpants',
            complete: false
        },
        {
            list: 'business',
            name: '...',
            complete: false
        },
        {
            list: 'business',
            name: 'profit',
            complete: false
        }
    ];
    return {
        query: function () {
            return data;
        },
        get: function (id) {
            return data[id];
        },
        create: function(obj) {
            data.push(obj);
            return obj;
        },
        update: function(id, obj) {
            data[id] = obj;
            return obj;
        },
        destroy: function(id) {
            data.splice(id, 1);
            return data;
        }
    };
}]);
