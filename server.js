const express = require('express');
const path = require('path');
const app = express();

const FLAG = 'flag{you_are_my_crush}';

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // serve files from public/

// Login page (GET /)
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>💕 Secret Crush Login 💕</title>
      <!-- P.S. Lovers leave secret notes in /real_hints.html -->
      <style>
        body {
          font-family: Arial;
          background: linear-gradient(135deg, #ff69b4, #ffb6c1);
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          margin: 0;
        }
        .box {
          background: white;
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.2);
          width: 320px;
          text-align: center;
        }
        h1 { color: #ff1493; margin-bottom: 10px; }
        input {
          width: 100%;
          padding: 10px;
          margin: 8px 0;
          border: 1px solid #ffb6c1;
          border-radius: 5px;
          box-sizing: border-box;
        }
        button {
          width: 100%;
          padding: 10px;
          background: #ff1493;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-weight: bold;
          margin-top: 10px;
        }
        button:hover { background: #ff69b4; }
        .hint {
          background: #fff0f5;
          padding: 10px;
          border-radius: 5px;
          margin-top: 15px;
          font-size: 13px;
          text-align: left;
        }
        .error {
          color: red;
          margin-top: 10px;
        }
        <!Hopefully you
         didn't feel too heartbroken over
         my joke earlier,
         the real secret notes are usually
         kept in /hints.txt>  
      </style>
    </head>
    <body>
      <div class="box">
        <h1>💕 Secret Crush 💕</h1>
        <p>Log in to read your secret Valentine confession.</p>

        <form action="/login" method="POST">
          <input type="text" name="username" value="crush" readonly>
          <input type="password" name="password" placeholder="Password" required>
          <button type="submit">Login</button>
        </form>

        <div class="hint">
          <strong>Valentine Hint:</strong><br>
          You've got to <strong>find</strong> the hints.<br>
          And remember: the number goes <em>after</em> the word.
        </div>
      </div>
    </body>
    </html>
  `);
});

// Handle login (POST /login)
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Correct credentials
  if (username === 'crush' && password === 'hearts12') {
    return res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Secret Confession</title>
        <style>
          body {
            font-family: Arial;
            background: linear-gradient(135deg, #ff69b4, #ffb6c1);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
          }
          .box {
            background: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.2);
            width: 380px;
            text-align: center;
          }
          h1 { color: #ff1493; }
          .flag {
            margin-top: 20px;
            background: #fff0f5;
            padding: 15px;
            border-radius: 5px;
            font-family: monospace;
          }
        </style>
      </head>
      <body>
        <div class="box">
          <h1>💘 Secret Confession 💘</h1>
          <p>Nice job finding the hidden hints and guessing my password.</p>
          <div class="flag">
            FLAG: ${FLAG}
          </div>
          <p style="margin-top:15px;font-size:13px;">
            Lesson: Hiding hints in files doesn’t fix weak passwords.
          </p>
        </div>
      </body>
      </html>
    `);
  }

  // Wrong creds → redisplay with error (still includes hidden comments)
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>💕 Secret Crush Login 💕</title>
      <!-- P.S. Lovers leave secret notes in /real_hints.html -->
      <style>
        body {
          font-family: Arial;
          background: linear-gradient(135deg, #ff69b4, #ffb6c1);
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          margin: 0;
        }
        .box {
          background: white;
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.2);
          width: 320px;
          text-align: center;
        }
        h1 { color: #ff1493; margin-bottom: 10px; }
        input {
          width: 100%;
          padding: 10px;
          margin: 8px 0;
          border: 1px solid #ffb6c1;
          border-radius: 5px;
          box-sizing: border-box;
        }
        button {
          width: 100%;
          padding: 10px;
          background: #ff1493;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-weight: bold;
          margin-top: 10px;
        }
        button:hover { background: #ff69b4; }
        .hint {
          background: #fff0f5;
          padding: 10px;
          border-radius: 5px;
          margin-top: 15px;
          font-size: 13px;
          text-align: left;
        }
        .error {
          color: red;
          margin-top: 10px;
        }
        <!Hopefully you
         didn't feel too heartbroken over
         my joke earlier,
         the real secret notes are usually
        kept in /hints.txt>
      </style>
    </head>
    <body>
      <div class="box">
        <h1>💕 Secret Crush 💕</h1>
        <p>Log in to read your secret Valentine confession.</p>

        <form action="/login" method="POST">
          <input type="text" name="username" value="crush" readonly>
          <input type="password" name="password" placeholder="Password" required>
          <button type="submit">Login</button>
        </form>

        <div class="error">Wrong password! Maybe there are hidden hints somewhere on the server… 👀</div>

        <div class="hint">
          <strong>Valentine Hint:</strong><br>
          You've got to <strong>find</strong> the hints.<br>
          And remember: the number goes <em>after</em> the word.
        </div>
      </div>
    </body>
    </html>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`💘 Secret Crush Login running on http://localhost:${PORT}`);
});
