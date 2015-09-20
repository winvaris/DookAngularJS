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

    $s.move = function(item, id) {
        var tempData = todoApi.query();
        for (var i = 0; i < tempData.length; i++)
        {
            if (typeof id != 'undefined' && tempData[i] == item && id != uiCurrent && id <= tabNum && id >= 1)
            {
                tempData[i].list = $s.tab[id - 1].tabName;
                todoApi.create(tempData[i]);
                todoApi.destroy(i);
            }
        }
    }

    $s.adder = function() {
        if (typeof $s.add != 'undefined')
        {
            todoApi.create({list: $s.tab[uiCurrent - 1].tabName, name: $s.add, complete: false});
            $s.backupData = todoApi.query();
        }
    }

    $s.newTabAdder = function() {
        if (typeof $s.newTabAdd != 'undefined')
        {
            $s.tab.push({tabID: ++tabNum, tabName: $s.newTabAdd});
            uiCurrent = tabNum;
        }
    }

    $s.remove = function(item) {
        var tempData = todoApi.query();
        for (var i = 0; i < tempData.length; i++)
        {
            if (tempData[i] == item)
                todoApi.destroy(i);
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
