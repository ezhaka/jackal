requirejs.config({
  baseUrl: 'Script'
});

requirejs(['game'],
  function (Game) {
    var model = {
      players: [{
        id: 1,
        name: 'mcgee'
      },
        {
          id: 2,
          name: 'asko'
        }],
      cells: [
        {
          "id": 0,
          "content": {
            "type": 4
          },
          "coords": [
            0,
            0
          ]
        },
        {
          "id": 1,
          "content": {
            "type": 4
          },
          "coords": [
            0,
            1
          ]
        },
        {
          "id": 2,
          "content": {
            "type": 4
          },
          "coords": [
            0,
            2
          ]
        },
        {
          "id": 3,
          "content": {
            "type": 4
          },
          "coords": [
            0,
            3
          ]
        },
        {
          "id": 4,
          "content": {
            "type": 4
          },
          "coords": [
            0,
            4
          ]
        },
        {
          "id": 5,
          "content": {
            "type": 4
          },
          "coords": [
            0,
            5
          ]
        },
        {
          "id": 6,
          "content": {
            "type": 4
          },
          "coords": [
            1,
            0
          ]
        },
        {
          "id": 7,
          "content": {
            "type": 1
          },
          "coords": [
            1,
            1
          ]
        },
        {
          "id": 8,
          "content": {
            "type": 1
          },
          "coords": [
            1,
            2
          ]
        },
        {
          "id": 9,
          "content": {
            "type": 1
          },
          "coords": [
            1,
            3
          ]
        },
        {
          "id": 10,
          "content": {
            "type": 1
          },
          "coords": [
            1,
            4
          ]
        },
        {
          "id": 11,
          "content": {
            "type": 4
          },
          "coords": [
            1,
            5
          ]
        },
        {
          "id": 12,
          "content": {
            "type": 4
          },
          "coords": [
            2,
            0
          ]
        },
        {
          "id": 13,
          "content": {
            "type": 1
          },
          "coords": [
            2,
            1
          ]
        },
        {
          "id": 14,
          "content": {
            "type": 3
          },
          "coords": [
            2,
            2
          ]
        },
        {
          "id": 15,
          "content": {
            "type": 1
          },
          "coords": [
            2,
            3
          ]
        },
        {
          "id": 16,
          "content": {
            "type": 1
          },
          "coords": [
            2,
            4
          ]
        },
        {
          "id": 17,
          "content": {
            "type": 4
          },
          "coords": [
            2,
            5
          ]
        },
        {
          "id": 18,
          "content": {
            "type": 4
          },
          "coords": [
            3,
            0
          ]
        },
        {
          "id": 19,
          "content": {
            "type": 2,
            "direction": 1
          },
          "coords": [
            3,
            1
          ]
        },
        {
          "id": 20,
          "content": {
            "type": 1
          },
          "coords": [
            3,
            2
          ]
        },
        {
          "id": 21,
          "content": {
            "type": 1
          },
          "coords": [
            3,
            3
          ]
        },
        {
          "id": 22,
          "content": {
            "type": 2,
            "direction": 170
          },
          "coords": [
            3,
            4
          ]
        },
        {
          "id": 23,
          "content": {
            "type": 4
          },
          "coords": [
            3,
            5
          ]
        },
        {
          "id": 24,
          "content": {
            "type": 4
          },
          "coords": [
            4,
            0
          ]
        },
        {
          "id": 25,
          "content": {
            "type": 1
          },
          "coords": [
            4,
            1
          ]
        },
        {
          "id": 26,
          "content": {
            "type": 1
          },
          "coords": [
            4,
            2
          ]
        },
        {
          "id": 27,
          "content": {
            "type": 3
          },
          "coords": [
            4,
            3
          ]
        },
        {
          "id": 28,
          "content": {
            "type": 1
          },
          "coords": [
            4,
            4
          ]
        },
        {
          "id": 29,
          "content": {
            "type": 4
          },
          "coords": [
            4,
            5
          ]
        },
        {
          "id": 30,
          "content": {
            "type": 4
          },
          "coords": [
            5,
            0
          ]
        },
        {
          "id": 31,
          "content": {
            "type": 4
          },
          "coords": [
            5,
            1
          ]
        },
        {
          "id": 32,
          "content": {
            "type": 4
          },
          "coords": [
            5,
            2
          ]
        },
        {
          "id": 33,
          "content": {
            "type": 4
          },
          "coords": [
            5,
            3
          ]
        },
        {
          "id": 34,
          "content": {
            "type": 4
          },
          "coords": [
            5,
            4
          ]
        },
        {
          "id": 35,
          "content": {
            "type": 4
          },
          "coords": [
            5,
            5
          ]
        }
      ],
      pirates: [{
        id: 1,
        playerId: 1,
        cellId: 15
      },
        {
          id: 2,
          playerId: 1,
          cellId: 4
        }],
      fieldSize: [6, 6]
    };

    $(function () {
      var game = new Game();
      game.init(model);
      game.render($('.gameContainer'));
      game.bindEvents();
    });
  });