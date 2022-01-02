var app = new function()
{
    this.el = document.getElementById('games');

    this.games = [];

    this.FetchAll = function()
    {
        var data = '';
        if(this.games.length > 0)
        {
            for(i = 0; i < this.games.length; i++)
            {
                data += '<tr>';
                data += '<td>'+(i+1)+ ". " + this.games[i] + '</td>';
                data += '<td><button onclick="app.Edit(' + i + ')" class="btn btn-warning">Edit</button></td>';
                data += '<td><button onclick="app.Delete(' + i + ')" class="btn btn-danger">Delete</button></td>';
                data += '</tr>';
            }
        }
        this.Count(this.games.length);
        return this.el.innerHTML = data;
    };
    
    this.Add = function()
    {
        el = document.getElementById('add-juego');
        var game = el.value;

        if(game)
        {
            this.games.push(game.trim())
            localStorage.setItem('Juegos', JSON.stringify(this.games));

            el.value = '';
            this.FetchAll();
        }
    };

    this.Edit = function(item)
    {
        var el = document.getElementById('edit-juego');
        el.value = this.games[item];
        document.getElementById('edit-box').style.display = 'block';
        self = this;

        document.getElementById('save-edit').onsubmit = function()
        {
            var game = el.value;

            if(game)
            {
                self.games.splice(item, 1, game.trim());
                localStorage.setItem('Juegos' , JSON.stringify(self.games));

                self.FetchAll();

                CloseInput();
            }
        }
    };
    
    this.Delete = function(item)
    {
        this.games.splice(item, 1);
        localStorage.setItem('Juegos', JSON.stringify(this.games));
        this.FetchAll();
    };

    this.Count = function(data)
    {
        var el = document.getElementById('counter')
        var name = 'Videojuegos';

        if(data)
        {
            if(data == 1)
            {
                name = 'Videojuego';
            }
            el.innerHTML = data + ' ' + name;
        }
        else
        {
            el.innerHTML = 'No. ' + name;
        }
    };

    this.Storage = function()
    {
        var x = JSON.parse(localStorage.getItem('Juegos'));
        if(x !== null)
        {
            this.games = x;
            this.FetchAll();
        }
    };
    this.Storage();

}


  app.FetchAll();

  function CloseInput()
  {
      document.getElementById('edit-box').style.display = 'none';
  }